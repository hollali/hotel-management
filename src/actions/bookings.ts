"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { bookings, roomAvailability } from "@/db/schema";
import { eq, and, gte, lte, sql } from "drizzle-orm";


export type CreateBookingInput = {
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  totalPrice: number;
  discount?: number;
  specialRequests?: string;
};

export async function createBooking(input: CreateBookingInput) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  const numberOfDays = Math.ceil(
    (input.checkOut.getTime() - input.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (numberOfDays < 1) {
    throw new Error("Check-out must be after check-in");
  }

  const existingBooking = await db
    .select()
    .from(bookings)
    .where(
      and(
        eq(bookings.roomId, input.roomId),
        eq(bookings.status, "confirmed"),
        lte(bookings.checkIn, input.checkOut),
        gte(bookings.checkOut, input.checkIn)
      )
    );

  if (existingBooking.length > 0) {
    throw new Error("Room is not available for the selected dates");
  }

  const bookingId = crypto.randomUUID();
  await db.insert(bookings).values({
    id: bookingId,
    userId: session.userId,
    roomId: input.roomId,
    roomName: input.roomName,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    numberOfDays,
    adults: input.adults,
    children: input.children,
    totalPrice: input.totalPrice.toString(),
    discount: (input.discount ?? 0).toString(),
    status: "confirmed",
    specialRequests: input.specialRequests,
  });

  revalidatePath("/dashboard/bookings");
  revalidatePath("/rooms");

  return { success: true, bookingId };
}

export async function getUserBookings() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  return db
    .select()
    .from(bookings)
    .where(eq(bookings.userId, session.userId))
    .orderBy(bookings.createdAt);
}

export async function getAllBookings() {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  return db.select().from(bookings).orderBy(bookings.createdAt);
}

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session.userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(bookings)
    .set({ status: "cancelled", updatedAt: new Date() })
    .where(eq(bookings.id, bookingId));

  revalidatePath("/dashboard/bookings");
  return { success: true };
}
