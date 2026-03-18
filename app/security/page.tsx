/**
 * @file security/page.tsx
 * @description The security overview page.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import GridBackground from "@/animations/svgs/GridBackground";
import SecurityContent from "@/components/SecurityContent";
import { SECURITY_CONTENT } from "@/data/legal";

/**
 * SecurityPage component.
 * Pure page entry point.
 */
export default function SecurityPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        <SectionHeader
          eyebrow={SECURITY_CONTENT.eyebrow}
          heading={SECURITY_CONTENT.heading}
          subheading={SECURITY_CONTENT.subheading}
          className="mb-20"
        />
        <SecurityContent />
      </div>
    </main>
  );
}
