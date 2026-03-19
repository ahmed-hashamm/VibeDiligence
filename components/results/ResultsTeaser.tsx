/**
 * @file ResultsTeaser.tsx
 * @description Blurred teaser content for the audit results page.
 */

import { Card } from "@/components/ui/Card";

import { RESULTS_LABELS } from "@/data/audit-labels";

/**
 * ResultsTeaser component.
 * Displays a non-interactive, blurred preview of the audit report.
 */
export default function ResultsTeaser() {
  return (
    <div className="space-y-8 opacity-40 pointer-events-none blur-[2px] scale-[0.99] transition-all">
      <Card className="p-8">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold">{RESULTS_LABELS.teaserRepo}</h3>
          <div className="text-5xl font-bold text-warning">{RESULTS_LABELS.teaserScore}</div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-surface rounded-xl border border-border" />)}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-8">
        <Card className="h-64" />
        <Card className="h-64" />
      </div>
    </div>
  );
}
