import { index, primaryKey, text, integer } from "drizzle-orm/pg-core";
import { tableCreator } from "..";
import { type AdapterAccount } from "next-auth/adapters";
import { userSchema } from "@/server/db/schemas/auth/user.schema";

export const accountSchema = tableCreator(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => userSchema.id),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("user_id_idx").on(account.userId),
  }),
);
