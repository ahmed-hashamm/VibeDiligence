/**
 * @file page.tsx
 * @description The main landing page for VibeDiligence.
 * Rule: Imports and JSX only. No logic or data.
 */

import { Metadata } from "next";
import HeroSection from "@/components/landing/HeroSection";

export const metadata: Metadata = {
  title: "GitHub Audit & Technical Due Diligence",
  description: "Get institutional-grade security, scalability, and code quality audits for any GitHub repository in seconds.",
};

import StatsBar from "@/components/landing/StatsBar";
import ProblemSection from "@/components/landing/ProblemSection";
import StepsSection from "@/components/landing/StepsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FaqSection from "@/components/landing/FaqSection";
import PricingSection from "@/components/landing/PricingSection";
import CtaSection from "@/components/landing/CtaSection";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * LandingPage component.
 * Assembles the landing page sections in order.
 */
export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <HeroSection />
      
      <ScrollReveal className="w-full">
        <StatsBar />
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <ProblemSection />
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <StepsSection />
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <FeaturesSection />
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <FaqSection />
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <PricingSection />
      </ScrollReveal>

      <ScrollReveal className="w-full">
        <CtaSection />
      </ScrollReveal>
    </main>
  );
}
