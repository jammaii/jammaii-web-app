import { type EmailConfig } from 'next-auth/providers';
import NextAuth, { type NextAuthConfig, type DefaultSession } from 'next-auth';
import { createId } from '@paralleldrive/cuid2';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/server/db';
import { type DefaultJWT } from 'next-auth/jwt';
import { SigninEmailTemplate } from '@/features/email/templates/signin-template';
import { MailService } from './api/features/services/mail.service';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    email: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt'
  },
  providers: [
    {
      id: 'resend',
      type: 'email',
      name: 'Email', // Added missing required property
      from: process.env.EMAIL_FROM,
      server: {},
      async sendVerificationRequest({ identifier, url }) {
        try {
          await MailService.sendEmail({
            to: identifier,
            subject: 'Sign in to JAMMAII',
            template: SigninEmailTemplate({ url })
          });
        } catch (error) {
          console.error('Error sending verification email:', error);
          throw new Error('Failed to send verification email');
        }
      },
      async generateVerificationToken() {
        return createId();
      }
    } satisfies EmailConfig
  ],
  callbacks: {
    async signIn({ user }) {
      // Allow all email sign-ins
      return true;
    },
    // @ts-ignore - types here are defined, update to match nextjs updates.
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.email = token.email!;
      }
      return session;
    },
    // @ts-ignore - types here are defined, update to match nextjs updates.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email!;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows redirects to the same origin
      else if (new URL(url).origin === baseUrl) return url;
      // Default to dashboard after sign in
      return '/admin';
    }
  },
  pages: {
    signIn: '/signin',
    verifyRequest: '/check-email',
    newUser: '/complete-profile',
    error: '/auth/error'
  }
} satisfies NextAuthConfig);
