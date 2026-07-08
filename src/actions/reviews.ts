"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { eq, and } from "drizzle-orm";
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
      roomName: input.roomName,
      guestName: input.guestName,
      text: input.text,
      userRating: input.userRating,
    });

    revalidatePath(`/rooms/${input.roomName}`);
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
