import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as Sentry from "@sentry/nextjs";

export async function ensureDbUser() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  try {
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, session.userId))
      .limit(1);

    if (existing) {
      return existing;
    }
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }

  try {
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(session.userId);
    const primaryEmail = clerkUser.primaryEmailAddress?.emailAddress;
    if (!primaryEmail) {
      throw new Error("No email found for your account. Please contact support.");
    }

    const dbUser = {
      id: session.userId,
      clerkId: session.userId,
      email: primaryEmail,
      firstName: clerkUser.firstName ?? null,
      lastName: clerkUser.lastName ?? null,
      imageUrl: clerkUser.imageUrl ?? null,
      role: "guest" as const,
      isActive: true,
      metadata: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(users).values(dbUser);
    return dbUser;
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}
