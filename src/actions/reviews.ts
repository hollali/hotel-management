"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { sanityFetch, groq } from "@/app/libs/sanityFetch";
import * as Sentry from "@sentry/nextjs";

export async function submitReview(input: {
  roomId: string;
  roomName: string;
  guestName: string;
  text: string;
  userRating: number;
}) {
  try {
    const session = await auth();
    if (!session.userId) {
      throw new Error("You must be signed in to submit a review");
    }

    const text = typeof input.text === "string" ? input.text.trim() : "";
    const rating = Number(input.userRating);

    if (text.length < 3 || text.length > 2000) {
      throw new Error("Review must be between 3 and 2000 characters");
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5 stars");
    }

    const room = await sanityFetch<{
      name: string;
      slug: { current: string };
    }>(
      groq`*[_type == "hotelRoom" && _id == $roomId][0] { name, slug }`,
      { roomId: input.roomId }
    );

    if (!room?.slug?.current) {
      throw new Error("Room not found");
    }

    const [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, session.userId))
      .limit(1);

    const guestName =
      [dbUser?.firstName, dbUser?.lastName].filter(Boolean).join(" ").trim() ||
      "Guest";

    const existing = await db
      .select()
      .from(reviews)
      .where(
        and(eq(reviews.userId, session.userId), eq(reviews.roomId, input.roomId))
      )
      .limit(1);

    if (existing.length > 0) {
      throw new Error("You have already reviewed this room");
    }

    await db.insert(reviews).values({
      id: randomUUID(),
      userId: session.userId,
      roomId: input.roomId,
      roomName: room.name,
      guestName,
      text,
      userRating: rating,
    });

    revalidatePath(`/rooms/${room.slug.current}`);
    return { success: true };
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
}

export async function getRoomReviews(roomId: string) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.roomId, roomId))
    .orderBy(reviews.createdAt);
}
