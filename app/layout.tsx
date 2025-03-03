import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/layout/providers';

export const metadata = {
  title: 'JAMMAII',
  description:
    'Jammaii is a premium real estate investment platform for affiliate developers'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">
        <Providers>{children}</Providers>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
