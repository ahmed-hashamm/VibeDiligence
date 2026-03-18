/**
 * @file terms/page.tsx
 * @description The terms of service page.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import GridBackground from "@/animations/svgs/GridBackground";
import TermsContent from "@/components/TermsContent";
import { TERMS_CONTENT } from "@/data/legal";

/**
 * TermsPage component.
 * Pure page entry point.
 */
export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <SectionHeader
          eyebrow={TERMS_CONTENT.eyebrow}
          heading={TERMS_CONTENT.heading}
          subheading={TERMS_CONTENT.subheading}
        />
        <TermsContent />
      </div>
    </main>
  );
}
