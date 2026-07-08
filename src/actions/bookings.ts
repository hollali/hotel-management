"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { bookings, payments } from "@/db/schema";
import { eq, and, gte, lte, desc } from "drizzle-orm";
import { sanityFetch, groq, getPromotionByCode } from "@/app/libs/sanityFetch";
import { ensureDbUser } from "@/app/libs/ensureUser";
import * as Sentry from "@sentry/nextjs";

type InitializePaymentInput = {
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  totalPrice: number;
  discount?: number;
  promoCode?: string;
  specialRequests?: string;
};

export async function initializePayment(input: InitializePaymentInput) {
  try {
    const session = await auth();
    if (!session.userId) {
      throw new Error("Unauthorized");
    }

    const dbUser = await ensureDbUser();
    const email = dbUser.email;

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

    let roomDiscountAmount = room.discount > 0 ? (room.price * room.discount) / 100 : 0;
    let pricePerNight = room.price - roomDiscountAmount;
    let promoDiscountAmount = 0;
    let promoDiscountPct = 0;
    let validatedPromoCode = "";

    if (input.promoCode) {
      const promo = await getPromotionByCode(input.promoCode);
      if (!promo) {
        throw new Error("Invalid promo code");
      }
      const now = new Date();
      if (promo.validFrom && new Date(promo.validFrom) > now) {
        throw new Error("Promo code is not yet valid");
      }
      if (promo.validUntil && new Date(promo.validUntil) < now) {
        throw new Error("Promo code has expired");
      }
      promoDiscountPct = promo.discountPercentage;
      promoDiscountAmount = (pricePerNight * promoDiscountPct) / 100;
      pricePerNight = pricePerNight - promoDiscountAmount;
      validatedPromoCode = input.promoCode;
    }

    const calculatedTotalPrice = pricePerNight * numberOfDays;

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

    const bookingId = randomUUID();
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      throw new Error("Online payments are not available at the moment. Please try again later.");
    }

    const amountInPesewas = Math.round(calculatedTotalPrice * 100);
    const combinedDiscount = roomDiscountAmount + promoDiscountAmount;
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInPesewas,
        currency: "GHS",
        callback_url: `${baseUrl}/payment/callback`,
        metadata: { bookingId },
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      throw new Error(paystackData.message || "Failed to initialize payment");
    }

    const reference = paystackData.data.reference;

    const specialRequests = [
      input.specialRequests,
      ...(validatedPromoCode ? [`Promo: ${validatedPromoCode} (${promoDiscountPct}% off)`] : []),
    ]
      .filter(Boolean)
      .join(" | ");

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
      discount: (combinedDiscount * numberOfDays).toString(),
      status: "pending_payment",
      specialRequests: specialRequests || null,
    });

    await db.insert(payments).values({
      id: randomUUID(),
      bookingId,
      amount: calculatedTotalPrice.toString(),
      currency: "GHS",
      method: "paystack",
      status: "pending",
      transactionId: reference,
    });

    revalidatePath("/dashboard/bookings");

    return { authorizationUrl: paystackData.data.authorization_url, bookingId };
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export async function verifyPayment(reference: string) {
  try {
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecretKey) {
      throw new Error("Payment not configured");
    }

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: { Authorization: `Bearer ${paystackSecretKey}` },
      }
    );

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok || !paystackData.status) {
      throw new Error(paystackData.message || "Verification failed");
    }

    const transactionStatus = paystackData.data.status;
    const bookingId = paystackData.data.metadata?.bookingId as string | undefined;

    if (!bookingId) {
      throw new Error("Booking ID not found in transaction metadata");
    }

    const [payment] = await db
      .select()
      .from(payments)
      .where(eq(payments.transactionId, reference))
      .limit(1);

    if (!payment) {
      throw new Error("Payment record not found");
    }

    if (transactionStatus === "success") {
      await db
        .update(bookings)
        .set({ status: "confirmed", updatedAt: new Date() })
        .where(eq(bookings.id, bookingId));

      await db
        .update(payments)
        .set({ status: "completed", paidAt: new Date(), updatedAt: new Date() })
        .where(eq(payments.id, payment.id));

      revalidatePath("/dashboard/bookings");
      revalidatePath("/rooms");

      return { success: true, status: "confirmed" as const };
    }

    await db
      .update(bookings)
      .set({ status: "cancelled", updatedAt: new Date() })
      .where(eq(bookings.id, bookingId));

    await db
      .update(payments)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(payments.id, payment.id));

    revalidatePath("/dashboard/bookings");

    return { success: false, status: transactionStatus };
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
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
