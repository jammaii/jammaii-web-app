import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/layout/providers';
import GoogleAnalytics from '@/components/general/google-analytics';

export const metadata = {
  title: 'Real Estate Crowdfunding in Nigeria | Invest with Jammaii',
  description:
    'Join Jammaii to co-invest in premium Nigerian real estate projects. Start small, earn big. Easy, secure, and profitable property crowdfunding.'
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
        <Toaster />
        <Analytics />
        <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
      </body>
    </html>
  );
}
