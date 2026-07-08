"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { bookings, checkIns, checkOuts, activityLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireRole } from "@/app/libs/clerk";
import { randomUUID } from "crypto";
import * as Sentry from "@sentry/nextjs";

export async function getConfirmedBookings() {
  await requireRole("admin");

  return db
    .select()
    .from(bookings)
    .where(eq(bookings.status, "confirmed"))
    .orderBy(bookings.checkIn);
}

export async function getCheckedInBookings() {
  await requireRole("admin");

  return db
    .select()
    .from(bookings)
    .where(eq(bookings.status, "checked_in"))
    .orderBy(bookings.checkOut);
}

export async function checkInBooking(
  bookingId: string,
  input: { idType?: string; idNumber?: string; notes?: string }
) {
  try {
    await requireRole("admin");

    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, bookingId))
      .limit(1);

    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "confirmed") throw new Error("Booking is not confirmed");

    await db.transaction(async (tx) => {
      await tx
        .update(bookings)
        .set({ status: "checked_in", updatedAt: new Date() })
        .where(eq(bookings.id, bookingId));

      await tx.insert(checkIns).values({
        id: randomUUID(),
        bookingId,
        guestId: booking.userId,
        checkedInBy: booking.userId,
        expectedCheckIn: booking.checkIn,
        actualCheckIn: new Date(),
        idVerified: input.idNumber ? "yes" : "no",
        idType: input.idType || null,
        idNumber: input.idNumber || null,
        roomKeyIssued: "yes",
        notes: input.notes || null,
      });

      await tx.insert(activityLogs).values({
        id: randomUUID(),
        userId: booking.userId,
        action: "check_in",
        entity: "booking",
        entityId: bookingId,
        details: { roomName: booking.roomName },
      });
    });

    revalidatePath("/dashboard/admin/checkins");
    return { success: true };
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export async function checkOutBooking(
  bookingId: string,
  input: { damageCharges?: number; additionalCharges?: number; notes?: string; feedback?: string }
) {
  try {
    await requireRole("admin");

    const [booking] = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, bookingId))
      .limit(1);

    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "checked_in") throw new Error("Guest is not checked in");

    await db.transaction(async (tx) => {
      await tx
        .update(bookings)
        .set({ status: "checked_out", updatedAt: new Date() })
        .where(eq(bookings.id, bookingId));

      await tx.insert(checkOuts).values({
        id: randomUUID(),
        bookingId,
        checkedOutBy: booking.userId,
        actualCheckOut: new Date(),
        keyReturned: "yes",
        damageCharges: input.damageCharges?.toString() || null,
        additionalCharges: input.additionalCharges?.toString() || null,
        notes: input.notes || null,
        feedback: input.feedback || null,
      });

      await tx.insert(activityLogs).values({
        id: randomUUID(),
        userId: booking.userId,
        action: "check_out",
        entity: "booking",
        entityId: bookingId,
        details: { roomName: booking.roomName },
      });
    });

    revalidatePath("/dashboard/admin/checkins");
    return { success: true };
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}
