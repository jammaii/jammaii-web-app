'use client';

import { SessionProvider } from 'next-auth/react';
import { type Session } from 'next-auth';
import { type ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
  session?: Session | null;
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  return (
    <>
      {/* @ts-expect-error - Provider should be updated */}
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
};
