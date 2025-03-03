import { integer, json, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { tableCreator, metaDataSchema } from '@/server/db/schemas';
import { userSchema } from '@/server/db/schemas/auth/user.schema';
import { projectStatusSchema } from './enums/project-status.schema';
import { projectSchema } from './project.schema';
import { transactionStatusSchema } from './enums/transaction-status.schema';
import { paymentProviderSchema } from './enums/payment-provider.schema';

export const userInvestmentSchema = tableCreator('user-investment', {
  id: uuid('id').notNull().primaryKey(),
  slots: integer('units').notNull(),

  // Payments
  status: transactionStatusSchema('transaction_status')
    .notNull()
    .default('COMPLETED'),
  paymentProvider: paymentProviderSchema('payment_provider')
    .notNull()
    .default('PAYSTACK'),
  transactionReference: text('transaction_reference').notNull(),
  totalAmount: integer('amount').notNull(),

  // Relations
  userId: text('user_id')
    .notNull()
    .references(() => userSchema.id),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projectSchema.id),

  ...metaDataSchema
});
