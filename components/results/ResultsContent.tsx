/**
 * @file ResultsContent.tsx
 * @description Assembler for the audit results page content (paywall state).
 * Displays teaser scores and a paywall overlay with Paddle checkout link.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import ResultsTeaser from "./ResultsTeaser";
import PaywallOverlay from "./PaywallOverlay";
import { ShieldIcon } from "lucide-react";
import type { AuditRow } from "@/types/audit";

interface ResultsContentProps {
  audit: AuditRow;
}

/**
 * ResultsContent component.
 * Combines teaser content with real audit scores and the paywall overlay.
 */
export default function ResultsContent({ audit }: ResultsContentProps) {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeader
        eyebrow="Audit Results"
        heading="Scan Complete."
        subheading="We've processed your repository. Your technical due diligence report is ready for unlocking."
      />

      <div className="max-w-5xl mx-auto relative">
        <ResultsTeaser audit={audit} />
        <PaywallOverlay auditId={audit.id} repoUrl={audit.repo_url} />
      </div>

      <div className="mt-20 text-center">
        <p className="text-muted mb-4">Questions about this audit?</p>
        <a href="mailto:support@vibediligence.com" className="flex items-center justify-center gap-2 text-pink-500 hover:text-pink-400 font-medium transition-colors">
          <ShieldIcon size={16} /> Contact Support
        </a>
      </div>
    </div>
  );
}
