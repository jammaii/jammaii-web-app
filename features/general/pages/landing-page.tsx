import { HeroSection } from '@/features/general/components/hero-section';
import { FeaturedProjectsSection } from '@/features/general/components/featured-projects-section';
import { HowItWorksSection } from '@/features/general/components/how-it-works-section';
import { TeamSection } from '@/features/general/components/team-section';
import { TestimonialsSection } from '@/features/general/components/testimonials-section';
import { CTASection } from '@/features/general/components/cta-section';
import { Footer } from '@/features/general/components/footer';
import { NavSection } from '@/features/general/components/nav-section';
import { ContactSection } from '@/features/general/components/contact-section';

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <NavSection />

      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* Featured Properties Carousel */}
      <FeaturedProjectsSection />

      {/* How it Works Section */}
      <HowItWorksSection />

      {/* Team Section */}
      <TeamSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
