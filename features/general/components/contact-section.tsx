"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { SendSupportMessageRequest } from "../types/app";
import { sendSupportMessage } from "../types/app";

export function ContactSection() {
  const { toastSuccess, toastError } = useToast();

  const form = useForm<SendSupportMessageRequest>({
    resolver: zodResolver(sendSupportMessage),
  });

  const sendMessage = api.support.sendMessage.useMutation({
    onSuccess: () => {
      toastSuccess({ message: "Message sent successfully!" });
      form.reset();
    },
    onError: () => {
      toastError({ message: "Failed to send message. Please try again." });
    },
  });

  const onSubmit = async (data: SendSupportMessageRequest) => {
    await sendMessage.mutateAsync(data);
  };

  return (
    <section id="contact" className="bg-muted/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mb-8 text-muted-foreground">
            Have questions about investing? We're here to help you get started.
          </p>
        </div>

        <div className="mx-auto max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message"
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full sm:w-auto"
                rightIcon={<SendIcon className="ml-2 h-4 w-4" />}
                isLoading={sendMessage.isPending}
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
