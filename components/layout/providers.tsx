'use client';

import { AuthProvider } from './auth-provider';
import { cookies } from 'next/headers';
import { TRPCReactProvider } from '@/trpc/react';
import { Analytics } from '@vercel/analytics/react';

export { SessionProvider } from 'next-auth/react';

const ALL_APP_PROVIDERS = [AuthProvider];
/**
 * This function takes an array of React components and combines them into one component, nesting them inside each other.
 * Creating a new component that wraps `Curr` with `Prev` if `Prev` exists, otherwise just renders `Curr` with `children`.
 *
 * @param providers An array of React components, each expecting a `children` prop.
 * @returns A new React component that combines the provided components.
 */
const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => {
    const Provider = Prev ? (
      <Prev>
        <Curr>{children}</Curr>
      </Prev>
    ) : (
      <Curr>{children}</Curr>
    );
    return Provider;
  });

const ComposedProviders = compose(ALL_APP_PROVIDERS);

export interface ProvidersProps {
  children: React.ReactNode;
}

export async function Providers({ children }: ProvidersProps) {
  const cookieData = await cookies();
  return (
    <TRPCReactProvider cookies={cookieData.toString()}>
      <Analytics />
      <ComposedProviders>{children}</ComposedProviders>
    </TRPCReactProvider>
  );
}
