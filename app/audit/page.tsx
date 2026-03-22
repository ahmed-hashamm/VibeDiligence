/**
 * @file audit/page.tsx
 * @description The audit intake page.
 * Rule: Page component remains a pure entry point with imports only.
 */

import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import AuditForm from "@/components/AuditForm";
import GridBackground from "@/animations/svgs/GridBackground";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Initialize Scan | Repo Intake",
  description: "Start your GitHub repository audit. Paste your repo URL and get instant feedback on security, scalability, and code quality.",
};

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
