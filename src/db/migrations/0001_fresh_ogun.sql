ALTER TYPE "public"."booking_status" ADD VALUE 'pending_payment' BEFORE 'confirmed';--> statement-breakpoint
ALTER TYPE "public"."payment_method" ADD VALUE 'paystack';--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"room_id" text NOT NULL,
	"room_name" text NOT NULL,
	"guest_name" text NOT NULL,
	"text" text NOT NULL,
	"user_rating" integer DEFAULT 5 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_room_date" ON "room_availability" USING btree ("room_id","date");