/**
 * @file audit/page.tsx
 * @description The audit intake page.
 * Rule: Page component remains a pure entry point with imports only.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import AuditForm from "@/components/AuditForm";
import GridBackground from "@/animations/svgs/GridBackground";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * AuditPage component.
 * Serves as the high-level container for the repository intake process.
 */
export default function AuditPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative hero-bg">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Intake Form"
            heading="Initialize your scan."
            subheading="Paste your repository details below. Our agentic AI will begin the audit immediately."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AuditForm />
        </ScrollReveal>
      </div>

    </main>
  );
}
