/**
 * @file ResultsContent.tsx
 * @description Assembler for the audit results page content.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import ResultsTeaser from "./ResultsTeaser";
import PaywallOverlay from "./PaywallOverlay";
import { ShieldIcon } from "lucide-react";

/**
 * ResultsContent component.
 * Combines teaser content, the paywall overlay, and support contact.
 */
export default function ResultsContent() {
  return (
    <div className="container mx-auto px-6 relative z-10">
      <SectionHeader
        eyebrow="Audit Results"
        heading="Scan Complete."
        subheading="We've processed your repository. Your technical due diligence report is ready for unlocking."
      />

      <div className="max-w-5xl mx-auto relative">
        <ResultsTeaser />
        <PaywallOverlay />
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
