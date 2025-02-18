import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'JAMMAII',
  description:
    'Jammai is a premium real estate investment platform for affiliate developers'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
