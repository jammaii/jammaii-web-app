'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { YouTubePlayer } from '@/features/file-upload/components/youtube-player';

export const HeroSection = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline // Keeps video playing in its container on iOS
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              JAMMAII Real Estates
              <span className="mt-2 block text-amber-400 drop-shadow-lg">
                Premium Investments Made Simple
              </span>
            </h1>
            <p className="max-w-xl text-xl text-white/90">
              Join thousands of investors building wealth through fractional
              real estate investment.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="group gap-2 bg-primary/90 hover:bg-primary"
              >
                Start Investing
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                onClick={() => setVideoModalOpen(true)}
              >
                <PlayCircle className="h-5 w-5" />
                Watch Video
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative aspect-video w-full max-w-4xl">
            <YouTubePlayer url="https://youtu.be/4jnzf1yj48M?si=nOipCygQBXbUmcXG" />
            {/* <iframe
                  width="100%"
                  height="100%"
                  src="https://youtu.be/KGVaBo8JNbI?si=TblPlCoXjb-WnMbe"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                /> */}
            <Button
              variant="ghost"
              className="absolute -top-12 right-0 text-white hover:text-white/80"
              onClick={() => setVideoModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
