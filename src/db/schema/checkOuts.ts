import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { bookings } from "./bookings";
import { users } from "./users";

export const checkOuts = pgTable("check_outs", {
  id: text("id").primaryKey(),
  bookingId: text("booking_id")
    .notNull()
    .references(() => bookings.id),
  checkedOutBy: text("checked_out_by")
    .notNull()
    .references(() => users.id),
  actualCheckOut: timestamp("actual_check_out").notNull().defaultNow(),
  keyReturned: text("key_returned").notNull().default("yes"),
  damageCharges: text("damage_charges").default("0"),
  additionalCharges: text("additional_charges").default("0"),
  notes: text("notes"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type CheckOut = typeof checkOuts.$inferSelect;
export type NewCheckOut = typeof checkOuts.$inferInsert;
