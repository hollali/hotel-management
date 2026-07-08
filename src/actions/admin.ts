"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { bookings, users, payments, activityLogs } from "@/db/schema";
import { sql, eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-auth";
import * as Sentry from "@sentry/nextjs";

export async function getDashboardStats() {
  await requireAdmin();

  const totalBookings = await db
    .select({ count: sql<number>`count(*)` })
    .from(bookings);

  const totalUsers = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);

  const recentBookings = await db
    .select()
    .from(bookings)
    .orderBy(desc(bookings.createdAt))
    .limit(10);

  const revenueResult = await db
    .select({ total: sql<number>`coalesce(sum(amount), 0)` })
    .from(payments)
    .where(eq(payments.status, "completed"));

  const recentActivity = await db
    .select()
    .from(activityLogs)
    .orderBy(desc(activityLogs.createdAt))
    .limit(20);

  return {
    totalBookings: totalBookings[0]?.count ?? 0,
    totalUsers: totalUsers[0]?.count ?? 0,
    revenue: revenueResult[0]?.total ?? 0,
    recentBookings,
    recentActivity,
  };
}

export async function updateUserRole(userId: string, role: string) {
  await requireAdmin();

  await db
    .update(users)
    .set({ role: role as "guest" | "receptionist" | "manager" | "admin" })
    .where(eq(users.id, userId));

  return { success: true };
}

export async function updateBookingStatus(
  bookingId: string,
  status: "confirmed" | "checked_in" | "checked_out" | "cancelled"
) {
  await requireAdmin();

  await db
    .update(bookings)
    .set({ status, updatedAt: new Date() })
    .where(eq(bookings.id, bookingId));

  return { success: true };
}
