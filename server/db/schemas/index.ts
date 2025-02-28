import { sql } from "drizzle-orm";
import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

export const tableCreator = pgTableCreator((name) => `${name}`);

export const metaDataSchema = {
  metaCreatedBy: text("meta_created_by").default("system").notNull(),
  metaCreatedAt: timestamp("meta_created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  metaUpdatedAt: timestamp("meta_updated_at"),
  metaUpdatedBy: text("meta_updated_by"),
};
