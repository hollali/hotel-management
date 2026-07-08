"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { roomAvailability } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-auth";
import { randomUUID } from "crypto";

export async function getAvailability(roomId: string) {
  await requireAdmin();

  return db
    .select()
    .from(roomAvailability)
    .where(eq(roomAvailability.roomId, roomId));
}

export async function toggleAvailability(
  roomId: string,
  date: string,
  isAvailable: boolean
) {
  await requireAdmin();

  const existing = await db
    .select()
    .from(roomAvailability)
    .where(
      and(
        eq(roomAvailability.roomId, roomId),
        eq(roomAvailability.date, date)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(roomAvailability)
      .set({ isAvailable, updatedAt: new Date() })
      .where(eq(roomAvailability.id, existing[0].id));
  } else {
    await db.insert(roomAvailability).values({
      id: randomUUID(),
      roomId,
      date,
      isAvailable,
      totalRooms: 1,
      bookedRooms: 0,
      blockedRooms: isAvailable ? 0 : 1,
    });
  }

  revalidatePath("/dashboard/admin/availability");
  return { success: true };
}
