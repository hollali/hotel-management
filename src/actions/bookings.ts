"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { bookings, roomAvailability } from "@/db/schema";
import { eq, and, gte, lte, desc } from "drizzle-orm";
import { sanityFetch, groq } from "@/app/libs/sanityFetch";


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

  const room = await sanityFetch<{ price: number; discount: number }>(
    groq`*[_type == "hotelRoom" && _id == $roomId][0] { price, discount }`,
    { roomId: input.roomId }
  );

  if (!room) {
    throw new Error("Room not found");
  }

  const numberOfDays = Math.ceil(
    (input.checkOut.getTime() - input.checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (numberOfDays < 1) {
    throw new Error("Check-out must be after check-in");
  }

  const calculatedDiscount = room.discount > 0 ? (room.price * room.discount) / 100 : 0;
  const calculatedPricePerNight = room.price - calculatedDiscount;
  const calculatedTotalPrice = calculatedPricePerNight * numberOfDays;

  if (Math.round(calculatedTotalPrice) !== Math.round(input.totalPrice)) {
    throw new Error("Price mismatch");
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
    totalPrice: calculatedTotalPrice.toString(),
    discount: (room.discount ?? 0).toString(),
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
    .orderBy(desc(bookings.createdAt));
}

export async function getAllBookings() {
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

  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
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
