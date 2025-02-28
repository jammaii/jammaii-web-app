DO $$ BEGIN
 CREATE TYPE "public"."payment_provider" AS ENUM('PAYSTACK');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."transaction_status" AS ENUM('COMPLETED', 'FAILED', 'PENDING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user-investment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"units" integer NOT NULL,
	"transaction_status" "transaction_status" DEFAULT 'PENDING' NOT NULL,
	"payment_provider" "payment_provider" DEFAULT 'PAYSTACK' NOT NULL,
	"transaction_reference" text NOT NULL,
	"amount" integer NOT NULL,
	"user_id" text NOT NULL,
	"project_id" uuid NOT NULL,
	"meta_created_by" text DEFAULT 'system' NOT NULL,
	"meta_created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"meta_updated_at" timestamp,
	"meta_updated_by" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user-investment" ADD CONSTRAINT "user-investment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user-investment" ADD CONSTRAINT "user-investment_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
