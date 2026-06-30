import { pgTable, text, timestamp, date, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const shiftEnum = pgEnum("shift", ["morning", "afternoon", "night"]);

export const staffAssignments = pgTable("staff_assignments", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  assignedBy: text("assigned_by")
    .notNull()
    .references(() => users.id),
  role: text("role").notNull(),
  shift: shiftEnum("shift").notNull(),
  assignmentDate: date("assignment_date").notNull(),
  area: text("area"), // e.g., "Front Desk", "Housekeeping", "Restaurant"
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type StaffAssignment = typeof staffAssignments.$inferSelect;
export type NewStaffAssignment = typeof staffAssignments.$inferInsert;
