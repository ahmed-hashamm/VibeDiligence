/**
 * @file terms/page.tsx
 * @description The terms of service page.
 */

import { Metadata } from "next";
import { PRIVACY_CONTENT, TERMS_CONTENT } from "@/data/legal";
import PageHero from "@/components/ui/PageHero";
import TermsContent from "@/components/TermsContent";
import GridBackground from "@/animations/svgs/GridBackground";
import FaqSection from "@/components/landing/FaqSection";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The legal agreement between you and VibeDiligence. Read our Terms of Service for using our audit platform.",
};

/**
 * TermsPage component.
 * Features a high-fidelity design matching the Security and Privacy pages.
 */
export default function TermsPage() {
  return (
    <main className="min-h-screen pt-40 pb-32 bg-bg relative hero-bg">
      <GridBackground />
      
      <div className="container mx-auto px-12 relative z-10 max-w-[1400px]">
        {/* Page Hero */}
        <PageHero
          eyebrow={TERMS_CONTENT.eyebrow}
          heading={TERMS_CONTENT.heading}
          lastUpdated={TERMS_CONTENT.lastUpdated}
        />

        {/* Core Content */}
        <TermsContent />
      </div>
    </main>
  );
}
