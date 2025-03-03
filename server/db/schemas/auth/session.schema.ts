import { index, timestamp, text } from 'drizzle-orm/pg-core';
import { tableCreator } from '..';
import { userSchema } from './user.schema';

export const sessionSchema = tableCreator(
  'session',
  {
    sessionToken: text('sessionToken').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => userSchema.id),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (session) => ({
    userIdIdx: index('user_session_id_idx').on(session.userId)
  })
);
