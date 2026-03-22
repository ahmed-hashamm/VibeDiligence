import { Metadata } from "next";
import GridBackground from "@/animations/svgs/GridBackground";
import SecurityContent from "@/components/SecurityContent";
import { SECURITY_CONTENT } from "@/data/legal";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Security & Data Protection",
  description: "Institutional-grade security standards. Learn how VibeDiligence protects your data and ensures repository privacy.",
};

/**
 * SecurityPage component.
 * Pure page entry point.
 * Features a high-fidelity hero section matching the 'Institutional Grade' design.
 */
export default function SecurityPage() {
  return (
    <main className="min-h-screen pt-40 pb-20 bg-bg relative hero-bg">
      <GridBackground />
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        {/* Institutional Hero */}
        <PageHero
          eyebrow={SECURITY_CONTENT.eyebrow}
          heading={SECURITY_CONTENT.heading}
          lastUpdated={SECURITY_CONTENT.lastUpdated}
        />

        <SecurityContent />
      </div>
    </main>
  );
}
