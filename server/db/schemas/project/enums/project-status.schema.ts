import { pgEnum } from 'drizzle-orm/pg-core';

export const PROJECT_STATUSES = [
  'PENDING',
  'IN_PROGRESS',
  'COMPLETED'
] as const;

export const projectStatusSchema = pgEnum('status', PROJECT_STATUSES);
