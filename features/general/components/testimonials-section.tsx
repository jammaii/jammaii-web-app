'use client';

import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    quote:
      "The platform made real estate investment accessible to me. I'm now earning passive income from premium properties I never thought I could invest in.",
    author: 'Alice Williams',
    title: 'First-time Investor',
    image: '/images/testimonials/ro.jpg',
    rating: 5
  },
  {
    quote:
      'The transparency and professional management of investments gives me peace of mind. The returns have been consistently impressive.',
    author: 'David Chen',
    title: 'Portfolio Manager',
    image: '/images/testimonials/ro.jpg',
    rating: 5
  },
  {
    quote:
      "I've been investing in real estate for years, but this platform makes it so much easier. The team is professional and the results speak for themselves.",
    author: 'Sarah Martinez',
    title: 'Experienced Investor',
    image: '/images/testimonials/ro.jpg',
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            What Our Investors Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of satisfied investors building their wealth
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border bg-card p-6"
            >
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="mt-4">
                <p className="text-lg">{testimonial.quote}</p>
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
