import { tableCreator, metaDataSchema } from "@/server/db/schemas";
import { boolean, text, uuid } from "drizzle-orm/pg-core";

export const supportMessageSchema = tableCreator("support-message", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  isResolved: boolean("is-resolved"),
  ...metaDataSchema,
});
