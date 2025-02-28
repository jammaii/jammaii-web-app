import { boolean, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tableCreator, metaDataSchema } from "@/server/db/schemas";
import { userRoleSchema } from "./enums/user-roles";

export const userSchema = tableCreator("user", {
  id: text("id").notNull().primaryKey(),

  email: text("email").notNull(),
  // Name is optional.
  firstName: text("first_name"),
  lastName: text("last_name"),
  middleName: text("middle_name"),
  phoneNumber: text("phone_number"),
  role: userRoleSchema("role").notNull().default("USER"),
  profileCompleted: boolean("profile_completed").notNull().default(false),

  // For auth, but not used in the app.
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }),
  name: text("name"),
  password: text("password"),
  username: text("username"),
  image: text("image"),
  lastActiveAt: timestamp("last_active_at"),
  ...metaDataSchema,
});
