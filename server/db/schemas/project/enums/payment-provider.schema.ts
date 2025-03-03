import { pgEnum } from 'drizzle-orm/pg-core';

export const PAYMENT_PROVIDERS = ['PAYSTACK'] as const;

export const paymentProviderSchema = pgEnum(
  'payment_provider',
  PAYMENT_PROVIDERS
);
