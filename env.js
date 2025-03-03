import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('YOUR_POSTGRES_URL_HERE'),
        'You forgot to change the default URL'
      ),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    VERCEL_URL: z.string().optional(),
    PORT: z.string().optional(),

    NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      // This prevents Vercel deployments from failing if you don't set
      // NEXTAUTH_URL, since NextAuth.js automatically uses the VERCEL_URL
      // if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url()
    ),

    // Add AWS credentials here if you want to use image upload
    S3_UPLOAD_KEY: z.string().optional(),
    S3_UPLOAD_SECRET: z.string().optional(),
    S3_UPLOAD_BUCKET: z.string().optional(),
    S3_UPLOAD_REGION: z.string().optional(),

    // Ensure mailing credentials are added, to send emails.
    PLATFORM_MAILING_EMAIL: z.string().optional(),
    PLATFORM_MAILING_NAME: z.string().optional(),
    RESEND_API_KEY: z.string().optional(),
    PLATFORM_LOGO_URL: z
      .string()
      .refine((s) => {
        return !s.includes('svg') && s.includes('aws');
      }, 'Logo should be a non-svg AWS url. SVGs are widely unsupported in e-mails.')
      .optional(),
    PLATFORM_APP_HOME_FULL_URL: z.string().optional(),
    PAYSTACK_SECRET: z.string().optional()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: z.string()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    S3_UPLOAD_KEY: process.env.S3_UPLOAD_KEY,
    S3_UPLOAD_SECRET: process.env.S3_UPLOAD_SECRET,
    S3_UPLOAD_BUCKET: process.env.S3_UPLOAD_BUCKET,
    S3_UPLOAD_REGION: process.env.S3_UPLOAD_REGION,
    PLATFORM_MAILING_EMAIL: process.env.PLATFORM_MAILING_EMAIL,
    PLATFORM_MAILING_NAME: process.env.PLATFORM_MAILING_NAME,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PLATFORM_LOGO_URL: process.env.PLATFORM_LOGO_URL,
    PLATFORM_APP_HOME_FULL_URL: process.env.PLATFORM_APP_HOME_FULL_URL,
    NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    PAYSTACK_SECRET: process.env.PAYSTACK_SECRET
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});
