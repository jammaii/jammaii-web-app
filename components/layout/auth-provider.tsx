'use client';

import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { type ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  // @ts-expect-error - NextAuth SessionProvider type issue with React 18
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
