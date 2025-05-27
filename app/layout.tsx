import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/layout/providers';
import GoogleAnalytics from '@/components/general/google-analytics';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jammaii.com'),
  title: {
    default: 'Real Estate Crowdfunding in Nigeria | Invest with Jammaii',
    template: '%s | Jammaii'
  },
  description:
    'Join Jammaii to co-invest in premium Nigerian real estate projects. Start small, earn big. Easy, secure, and profitable property crowdfunding.',
  keywords: [
    'real estate',
    'crowdfunding',
    'Nigeria',
    'property investment',
    'Jammaii'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://jammaii.com',
    siteName: 'Jammaii',
    title: 'Real Estate Crowdfunding in Nigeria | Invest with Jammaii',
    description:
      'Join Jammaii to co-invest in premium Nigerian real estate projects. Start small, earn big. Easy, secure, and profitable property crowdfunding.',
    images: [
      {
        url: '/jammaii-logo-0.jpg', // Add your OG image
        width: 1200,
        height: 630,
        alt: 'Jammaii Real Estate Crowdfunding'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate Crowdfunding in Nigeria | Invest with Jammaii',
    description:
      'Join Jammaii to co-invest in premium Nigerian real estate projects. Start small, earn big. Easy, secure, and profitable property crowdfunding.',
    images: ['/og-image.jpg'] // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  }
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
