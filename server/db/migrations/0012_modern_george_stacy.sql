CREATE TABLE IF NOT EXISTS "support-message" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"content" text NOT NULL,
	"is-resolved" boolean,
	"meta_created_by" text DEFAULT 'system' NOT NULL,
	"meta_created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"meta_updated_at" timestamp,
	"meta_updated_by" text
);
--> statement-breakpoint
ALTER TABLE "user-investment" ALTER COLUMN "transaction_status" SET DEFAULT 'COMPLETED';