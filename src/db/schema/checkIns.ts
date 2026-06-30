import { pgTable, text, timestamp, time } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { users } from "./users";

export const checkIns = pgTable("check_ins", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id),
  guestId: text("guest_id").notNull(), // guest record ID
  checkedInBy: text("checked_in_by")
    .notNull()
    .references(() => users.id),
  expectedCheckIn: timestamp("expected_check_in").notNull(),
  actualCheckIn: timestamp("actual_check_in").notNull().defaultNow(),
  idVerified: text("id_verified").notNull().default("no"),
  idType: text("id_type"),
  idNumber: text("id_number"),
  roomKeyIssued: text("room_key_issued").notNull().default("no"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CheckIn = typeof checkIns.$inferSelect;
export type NewCheckIn = typeof checkIns.$inferInsert;
