"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, bookings, payments, reviews, checkIns, checkOuts, activityLogs, notifications, invoices, guests, staffAssignments } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import * as Sentry from "@sentry/nextjs";

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

export async function deleteAccount() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  const clerkId = session.userId;

  const userBookings = await db
    .select({ id: bookings.id })
    .from(bookings)
    .where(eq(bookings.userId, clerkId));

  const bookingIds = userBookings.map((b) => b.id);

  await db.delete(payments).where(
    or(...bookingIds.map((id) => eq(payments.bookingId, id)))
  );

  for (const id of bookingIds) {
    await db.delete(checkIns).where(eq(checkIns.bookingId, id));
    await db.delete(checkOuts).where(eq(checkOuts.bookingId, id));
    await db.delete(invoices).where(eq(invoices.bookingId, id));
  }

  await db.delete(notifications).where(eq(notifications.userId, clerkId));
  await db.delete(activityLogs).where(eq(activityLogs.userId, clerkId));
  await db.delete(staffAssignments).where(
    or(
      eq(staffAssignments.userId, clerkId),
      eq(staffAssignments.assignedBy, clerkId)
    )
  );
  await db.delete(reviews).where(eq(reviews.userId, clerkId));
  await db.delete(guests).where(eq(guests.userId, clerkId));
  await db.delete(bookings).where(eq(bookings.userId, clerkId));
  await db.delete(users).where(eq(users.clerkId, clerkId));

  try {
    const client = await clerkClient();
    await client.users.deleteUser(clerkId);
  } catch {
    // User may already be deleted from Clerk
  }

  return { success: true };
}
