/**
 * @file privacy/page.tsx
 * @description The privacy policy page.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import GridBackground from "@/animations/svgs/GridBackground";
import PrivacyContent from "@/components/PrivacyContent";
import { PRIVACY_CONTENT } from "@/data/legal";

/**
 * PrivacyPage component.
 * Pure page entry point.
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <SectionHeader
          eyebrow={PRIVACY_CONTENT.eyebrow}
          heading={PRIVACY_CONTENT.heading}
          subheading={PRIVACY_CONTENT.subheading}
        />
        <PrivacyContent />
      </div>
    </main>
  );
}
