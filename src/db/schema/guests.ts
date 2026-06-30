import { pgTable, text, timestamp, date, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const guests = pgTable("guests", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .references(() => users.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  dateOfBirth: date("date_of_birth"),
  nationality: text("nationality"),
  idType: text("id_type"),
  idNumber: text("id_number"),
  isVip: boolean("is_vip").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Guest = typeof guests.$inferSelect;
export type NewGuest = typeof guests.$inferInsert;
