'use client';

import { motion } from 'framer-motion';
import { LinkedinIcon, TwitterIcon } from 'lucide-react';
import Image from 'next/image';

const team = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    image: '/images/team/melania.jpg',
    bio: 'Over 15 years of real estate crowdfunding experience',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Sarah Johnson',
    role: 'Crowdfunding Director',
    image: '/images/team/melania.jpg',
    bio: 'Former VP at Goldman Sachs Real Estate Division',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: '/images/team/melania.jpg',
    bio: 'Managed $500M+ in real estate portfolios',
    linkedin: '#',
    twitter: '#'
  }
];

export function TeamSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Meet Our Team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Industry experts committed to your crowdfunding success
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
                <p className="mt-2 text-muted-foreground">{member.bio}</p>
                <div className="mt-4 flex gap-4">
                  <a
                    href={member.linkedin}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                  </a>
                  <a
                    href={member.twitter}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
