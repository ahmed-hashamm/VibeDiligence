/**
 * @file page.tsx
 * @description The main landing page for VibeDiligence.
 * Rule: Imports and JSX only. No logic or data.
 */

import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import ProblemSection from "@/components/landing/ProblemSection";
import StepsSection from "@/components/landing/StepsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FaqSection from "@/components/landing/FaqSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";

/**
 * LandingPage component.
 * Assembles the landing page sections in order.
 */
export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <StepsSection />
      <FeaturesSection />
      <FaqSection />
      <PricingSection />
      <CtaSection />
    </main>
  );
}
