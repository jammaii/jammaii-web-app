import { timestamp, text, primaryKey } from 'drizzle-orm/pg-core';
import { tableCreator } from '..';

export const verificationTokenSchema = tableCreator(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);
