"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentUserProfile() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, session.userId))
    .limit(1);

  return user;
}

export async function updateUserProfile(data: {
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.clerkId, session.userId));

  return { success: true };
}

export async function getAllUsers() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  const metadata = (session.sessionClaims as Record<string, unknown>)?.metadata as
    | Record<string, unknown>
    | undefined;
  const role = metadata?.role as string | undefined;
  if (role !== "admin") {
    throw new Error("Unauthorized: Admin access required");
  }

  return db.select().from(users);
}
