/**
 * @file audit/page.tsx
 * @description The audit intake page.
 * Rule: Page component remains a pure entry point with imports only.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import AuditForm from "@/components/AuditForm";
import GridBackground from "@/animations/svgs/GridBackground";

/**
 * AuditPage component.
 * Serves as the high-level container for the repository intake process.
 */
export default function AuditPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden hero-bg">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Intake Form"
          heading="Initialize your scan."
          subheading="Paste your repository details below. Our agentic AI will begin the audit immediately."
        />

        <AuditForm />
      </div>

    </main>
  );
}
