"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateFormProps,
  PropertyDetailsRequestDto,
} from "@/features/projects/types/app";
import { propertyDetailsSchema } from "@/features/projects/types/app";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SignInRequestDto, signinSchema } from "@/features/auth/types/app";
import { AuthCard } from "@/features/auth/components/auth-card";
import Link from "next/link";
import { AuthHeader } from "@/features/auth/components/header";
import { CopyrightText } from "@/features/general/components/copyright";
import { useUser } from "@/hooks/use-user";
import { LoadingScreen } from "@/components/general/loading-screen";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toastError } = useToast();
  const currentYear = new Date().getFullYear();
  const { user, status } = useUser();

  const form = useForm<SignInRequestDto>({
    resolver: zodResolver(signinSchema),
  });

  const handleSubmit = async ({ email }: SignInRequestDto) => {
    setIsLoading(true);

    try {
      const result = await signIn("resend", {
        email,
        callbackUrl: "/auth",
        redirect: true,
      });

      if (result?.error) {
        toastError({ message: "Failed to send verification email" });
        return;
      }

      // toast.success('Check your email for the login link');
      router.push("/check-email");
    } catch (error) {
      toastError({ message: "Something went wrong" });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <LoadingScreen fullScreen />;
  }

  if (user) {
    router.push("/auth");
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-muted/40" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <AuthHeader />

          <AuthCard
            headerContent={
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold">Signin</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email to receive a magic sigin link.
                </p>
              </div>
            }
            footerContent={<CopyrightText />}
          >
            <Form {...form}>
              <form
                className="flex flex-col space-y-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" isLoading={isLoading}>
                  Submit
                </Button>
              </form>
            </Form>
          </AuthCard>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="container mx-auto max-w-[400px] py-12">
  //     <div className="rounded-lg border p-8">
  //       <h1 className="mb-6 text-2xl font-semibold">Sign In</h1>

  //       <form onSubmit={handleSubmit} className="space-y-4">
  //         <div className="space-y-2">
  //           <label htmlFor="email" className="text-sm font-medium">
  //             Email
  //           </label>
  //           <input
  //             id="email"
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full rounded-md border px-3 py-2"
  //             placeholder="you@example.com"
  //             required
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           className="w-full rounded-md bg-primary px-4 py-2 font-medium text-white"
  //           disabled={isLoading}
  //         >
  //           {isLoading ? 'Sending...' : 'Sign In with Email'}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
}
