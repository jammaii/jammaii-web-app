'use client';

import { motion } from 'framer-motion';
import { StarIcon } from 'lucide-react';

const testimonials = [
  {
    quote:
      "I've worked with the CEO of Jammaii back from our university days and his consistency in advocating for wealth creation through the corridors of real estate remains unquenchable. His JREIT crowdfunding community is one of those initiatives he has created to achieve his goal of creating wealth for millions via real estate.",
    author: 'Engr. Omodolapo David Ajayi (PhD)',
    title: 'Texas Tech University Lubbock, Texas, United States.',
    rating: 5
  },
  {
    quote:
      'Not to say much, but the level of transparency and accountability the Jammaii team has shown the couple of times my company has worked with them gave me the courage to refer them to other industry colleagues. With Jammaii, be rest assured of your peace of mind and remittance without delays.',
    author: 'Joshua Shaibu; NIQS, YQSF',
    title: 'QS, Interdec Building Systems Victoria Island, Lagos, Nigeria.',
    rating: 5
  },
  {
    quote:
      'A business with Jammaii is synonymous with growth. If you really want to grow in wealth, do Jammaii. Wealth creation, growth, and expansion are their area of specialty.',
    author: 'AbdulRazzaq Ibrahim Inyass; GMNSE, MSPE, ISPON',
    title: 'Gas Engineer, Greenville LNG. Port Harcourt, Nigeria.',
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
            What Our Affiliate Developers Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our satisfied members in the journey of building wealth
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
