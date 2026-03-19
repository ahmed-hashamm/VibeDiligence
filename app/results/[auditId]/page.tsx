/**
 * @file results/[auditId]/page.tsx
 * @description The "teaser" result page with a paywall.
 * Rule: Imports and JSX only. Pure entry point.
 */

import GridBackground from "@/animations/svgs/GridBackground";
import ResultsContent from "@/components/results/ResultsContent";

/**
 * ResultsPage component.
 * Displays the audit results demo with a paywall using modular components.
 */
export default function ResultsPage({ params }: { params: { auditId: string } }) {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <ResultsContent />
    </main>
  );
}
