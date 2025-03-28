'use client';

import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const featuredProperties = [
  {
    title: 'SOLAR POWERED COMMUNITY',
    description:
      'Properties with constant energy supply that supports urban, stylish, and convenient living',
    image: '/images/features/solar.png'
  },
  {
    title: 'TERRACES',
    description:
      'Attention to detail finishing immersed in the pool & state of the art facilities and amenities',
    image: '/images/features/leisure.png'
  },
  {
    title: '247 SECURITY SURVEILLANCE',
    description:
      'Live assuredly in the style, peace and harmony of our automated security systems',
    image: '/images/features/security.png'
  },
  {
    title: 'INFRASTRUCTURE',
    description:
      'Array of self servicing amenities that eases lifestyle and contemporary living in an urban setting',
    image: '/images/features/infra.png'
  },
  {
    title: 'URBAN LIVING',
    description:
      "Contemporary living in the very heart of Nigeria's vibrant commercial and economic cities",
    image: '/images/features/urban.png'
  },
  {
    title: 'LEISURE',
    description:
      'Live in a community that supports relaxation, unwinding and socialization in serenity',
    image: '/images/features/pool.jpg'
  },
  {
    title: 'FITNESS',
    description:
      'Get the  vigour and strength essential for a healthy lifestyle in a stunning community',
    image: '/images/features/gym.jpg'
  }
];

export const FeaturedProjectsSection = () => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true
    },
    [
      Autoplay({
        delay: 4000, // Scroll every 4 seconds
        stopOnInteraction: false, // Don't stop on user interaction
        stopOnMouseEnter: true, // Optional: stops on mouse enter
        rootNode: (emblaRoot) => emblaRoot.parentElement // Optional: for proper event delegation
      })
    ]
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Featured Project</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our premium real estate developments carefully handpicked
            for you.
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
                      sizes="100%"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{property.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {property.description}
                    </p>
                    {/* <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">
                        {formatCurrency(property.pricePerSlot)}/slot
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push('/signin')}
                      >
                        View Details
                      </Button>
                    </div> */}
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
