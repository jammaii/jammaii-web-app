import { pgEnum } from 'drizzle-orm/pg-core';

export const PROJECT_STATUSES = [
  'CROWDFUNDING',
  'CONSTRUCTION',
  'COMPLETED'
] as const;

export const projectStatusSchema = pgEnum('status', PROJECT_STATUSES);
