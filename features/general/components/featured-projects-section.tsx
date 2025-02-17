'use client';

import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const featuredProperties = [
  {
    title: 'Luxury Villa Estate',
    description: 'Premium 5-bedroom villas with modern amenities',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    pricePerSlot: 500000
  },
  {
    title: 'Urban Apartments',
    description: 'Contemporary living in the heart of the city',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    pricePerSlot: 500000
  },
  {
    title: 'Beach Resort',
    description: 'Oceanfront properties with stunning views',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    pricePerSlot: 500000
  },
  {
    title: 'Luxury Villa Estate',
    description: 'Premium 5-bedroom villas with modern amenities',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    pricePerSlot: 500000
  },
  {
    title: 'Urban Apartments',
    description: 'Contemporary living in the heart of the city',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800',
    pricePerSlot: 500000
  },
  {
    title: 'Beach Resort',
    description: 'Oceanfront properties with stunning views',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    pricePerSlot: 500000
  }
];

export const FeaturedProjectsSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true });

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our handpicked premium real estate opportunities
          </p>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {featuredProperties.map((property, index) => (
              <div
                key={index}
                className="relative min-w-0 flex-[0_0_100%] gap-4 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="group overflow-hidden rounded-xl border bg-card">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{property.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {property.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">
                        ₦{property.pricePerSlot.toLocaleString()}/slot
                      </span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
