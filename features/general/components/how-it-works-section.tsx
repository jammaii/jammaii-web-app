'use client';

import { motion } from 'framer-motion';
import {
  SearchIcon,
  CreditCardIcon,
  BuildingIcon,
  BarChart2Icon
} from 'lucide-react';

const steps = [
  {
    title: 'Browse Projects',
    description:
      'Explore our curated selection of premium real estate developments.',
    icon: SearchIcon,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    title: 'Choose Your Preferred Project',
    description:
      'Select the number of slots you like to own in your preferred project.',
    icon: BuildingIcon,
    color: 'bg-green-500/10 text-green-500'
  },
  {
    title: 'Secure Payment',
    description:
      'Complete transaction to own the number of your selected slots using our secure payment platform.',
    icon: CreditCardIcon,
    color: 'bg-yellow-500/10 text-yellow-500'
  },
  {
    title: 'Track Slot Performance',
    description:
      'Monitor your slot performance, time of project completion, and payout.',
    icon: BarChart2Icon,
    color: 'bg-purple-500/10 text-purple-500'
  }
];

export function HowItWorksSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start your crowdfunding journey in four simple steps
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="space-y-6 rounded-2xl border bg-card p-6">
                <div className={`inline-block rounded-xl p-3 ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
