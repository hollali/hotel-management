import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const reviews = pgTable("reviews", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  roomId: text("room_id").notNull(),
  roomName: text("room_name").notNull(),
  guestName: text("guest_name").notNull(),
  text: text("text").notNull(),
  userRating: integer("user_rating").notNull().default(5),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
