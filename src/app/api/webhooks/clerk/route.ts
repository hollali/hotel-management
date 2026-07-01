export const dynamic = "force-dynamic";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.warn("CLERK_SIGNING_SECRET not set — skipping webhook processing");
    return new Response("Webhook secret not configured", { status: 200 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const data = evt.data as unknown as Record<string, unknown>;
    const id = data.id as string;
    const email_addresses = data.email_addresses as { email_address: string }[] | undefined;
    const first_name = data.first_name as string | undefined;
    const last_name = data.last_name as string | undefined;
    const image_url = data.image_url as string | undefined;

    const email = email_addresses?.[0]?.email_address;
    if (!email) {
      return new Response("No email address", { status: 400 });
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, id))
      .limit(1);

    const userData: Partial<typeof users.$inferInsert> = {
      clerkId: id,
      updatedAt: new Date(),
    };

    if (email !== undefined) userData.email = email;
    if (first_name !== undefined) userData.firstName = first_name;
    if (last_name !== undefined) userData.lastName = last_name;
    if (image_url !== undefined) userData.imageUrl = image_url;

    if (existing.length > 0) {
      await db.update(users).set(userData).where(eq(users.clerkId, id));
    } else {
      await db.insert(users).values({
        id,
        clerkId: id,
        email,
        firstName: first_name ?? null,
        lastName: last_name ?? null,
        imageUrl: image_url ?? null,
        role: "guest",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  if (eventType === "user.deleted") {
    const data = evt.data as unknown as Record<string, unknown>;
    const id = data.id as string;
    if (id) {
      await db.delete(users).where(eq(users.clerkId, id));
    }
  }

  return new Response("Webhook received", { status: 200 });
}
