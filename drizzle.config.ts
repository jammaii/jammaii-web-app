import { type Config } from 'drizzle-kit';

import { env } from '@/env';

export default {
  schema: './server/db/schema.ts',
  dialect: 'postgresql',
  out: './server/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL!
  }
} satisfies Config;
