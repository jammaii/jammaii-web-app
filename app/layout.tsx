import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/react";
import { TRPCReactProvider } from "@/trpc/react";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/layout/auth-provider";

export const metadata = {
  title: "JAMMAII",
  description:
    "Jammai is a premium real estate investment platform for affiliate developers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieData = await cookies();

  return (
    <html lang="en">
      <TRPCReactProvider cookies={cookieData.toString()}>
        <body className="flex min-h-screen w-full flex-col">
          <AuthProvider>{children}</AuthProvider>
        </body>
        <Analytics />
        <Toaster />
      </TRPCReactProvider>
    </html>
  );
}
