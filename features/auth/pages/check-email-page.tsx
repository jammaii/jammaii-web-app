"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MailCheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function CheckEmailPage() {
  const router = useRouter();

  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md px-6 py-8 shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <MailCheckIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Check your email
          </h1>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            We sent you a login link. Be sure to check your spam folder if you
            don't see it.
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>Didn't receive an email?</p>
            <Button onClick={() => router.push("/signin")}>Try again</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
