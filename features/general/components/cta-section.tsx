'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <div className="absolute inset-0 bg-[url(/images/cta-pattern.png)] opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-lg text-primary-foreground/90">
              Join our community of investors and start building your real
              estate portfolio today. Get started with as little as ₦100,000.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/signin">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 sm:w-auto"
                  rightIcon={<ArrowRightIcon className="h-4 w-4" />}
                >
                  Create Account
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                >
                  View Properties
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
