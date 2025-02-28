'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  Mail,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { CopyrightText } from './copyright';

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Vision and Mission', href: '/vision-mission' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/#' }
  ],
  resources: [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' }
  ],
  investments: [
    { label: 'Projects', href: '/#' },
    { label: 'Investment Guide', href: '/#' },
    { label: 'Market Updates', href: '/#' },
    { label: 'Success Stories', href: '/#' }
  ]
};

export function Footer() {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter subscription logic.
  };

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-5">
          {/* Brand and Newsletter */}
          <div className="xl:col-span-2">
            <Link
              href="/"
              className="group flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              {/* <Image
                src="/images/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 transition-transform group-hover:scale-105"
              /> */}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-bold text-transparent">
                JAMMAII REAL ESTATES
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Join our newsletter for the latest investment opportunities and
              market insights.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-4 flex max-w-md gap-2"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="max-w-xs bg-background/50 transition-colors focus:bg-background"
                required
              />
              <Button
                type="submit"
                className="group gap-2"
                rightIcon={
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-3">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold capitalize">{section}</h3>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <CopyrightText />
          <div className="flex gap-4">
            {[
              { icon: FacebookIcon, label: 'Facebook', href: '#' },
              { icon: TwitterIcon, label: 'Twitter', href: '#' },
              { icon: InstagramIcon, label: 'Instagram', href: '#' },
              { icon: LinkedinIcon, label: 'LinkedIn', href: '#' }
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="group rounded-full p-2 transition-colors hover:bg-muted"
                aria-label={label}
              >
                <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
