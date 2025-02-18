'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';

export function ContactSection() {
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
          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea
              placeholder="Your Message"
              className="min-h-[150px] resize-none"
            />
            <Button className="w-full sm:w-auto">
              Send Message
              <SendIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
