import { pgEnum } from "drizzle-orm/pg-core";

export const TRANSACTION_STATUSES = ["COMPLETED", "FAILED", "PENDING"] as const;

export const transactionStatusSchema = pgEnum(
  "transaction_status",
  TRANSACTION_STATUSES,
);
