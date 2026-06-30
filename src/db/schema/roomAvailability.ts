import { pgTable, text, timestamp, date, boolean, integer } from "drizzle-orm/pg-core";

export const roomAvailability = pgTable("room_availability", {
  id: text("id").primaryKey(),
  roomId: text("room_id").notNull(), // references Sanity room document ID
  date: date("date").notNull(),
  isAvailable: boolean("is_available").notNull().default(true),
  totalRooms: integer("total_rooms").notNull().default(1),
  bookedRooms: integer("booked_rooms").notNull().default(0),
  blockedRooms: integer("blocked_rooms").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type RoomAvailability = typeof roomAvailability.$inferSelect;
export type NewRoomAvailability = typeof roomAvailability.$inferInsert;
