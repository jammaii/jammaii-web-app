DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" uuid PRIMARY KEY NOT NULL,
	"status" "status" DEFAULT 'PENDING' NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"location" text NOT NULL,
	"units" integer NOT NULL,
	"unit_detail" json NOT NULL,
	"images" json NOT NULL,
	"videos" json NOT NULL,
	"brochure" text,
	"slots" integer NOT NULL,
	"slot_price" integer NOT NULL,
	"duration" integer NOT NULL,
	"roi" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"user_id" text NOT NULL,
	"meta_created_by" text DEFAULT 'system' NOT NULL,
	"meta_created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"meta_updated_at" timestamp,
	"meta_updated_by" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
