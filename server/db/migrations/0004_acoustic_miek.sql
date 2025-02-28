DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('USER', 'ADMIN', 'SUPER_ADMIN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "middle_name" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'USER' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "profile_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "is_administrator";