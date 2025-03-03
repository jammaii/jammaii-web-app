import { pgEnum } from 'drizzle-orm/pg-core';

export const USER_ROLES = ['USER', 'ADMIN', 'SUPER_ADMIN'] as const;

export const userRoleSchema = pgEnum('role', USER_ROLES);
