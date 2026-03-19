/**
 * @file ResultsTeaser.tsx
 * @description Blurred teaser content showing real audit section scores.
 */

import { Card } from "@/components/ui/Card";
import { SECTION_LABELS } from "@/data/audit-labels";
import { getScoreColor } from "@/types/audit";
import type { AuditRow } from "@/types/audit";

interface ResultsTeaserProps {
  audit: AuditRow;
}

/**
 * ResultsTeaser component.
 * Displays real section scores from the audit in a blurred, non-interactive preview.
 */
export default function ResultsTeaser({ audit }: ResultsTeaserProps) {
  const sections = [
    { key: "security" as const, score: audit.scores.security.score },
    { key: "production_readiness" as const, score: audit.scores.production_readiness.score },
    { key: "code_quality" as const, score: audit.scores.code_quality.score },
    { key: "scalability" as const, score: audit.scores.scalability.score },
  ];

  return (
    <div className="space-y-8 opacity-40 pointer-events-none blur-[2px] scale-[0.99] transition-all">
      <Card className="p-8">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-3xl font-bold">{audit.repo_url.replace("https://github.com/", "")}</h3>
          <div
            className="text-5xl font-bold font-mono"
            style={{ color: getScoreColor(audit.scores.overall_score) }}
          >
            {audit.scores.overall_score}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.map(s => (
            <Card key={s.key} className="p-6 text-center">
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">
                {SECTION_LABELS[s.key]}
              </p>
              <p
                className="text-3xl font-bold font-mono"
                style={{ color: getScoreColor(s.score) }}
              >
                {s.score}
              </p>
            </Card>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-8">
        <Card className="h-64" />
        <Card className="h-64" />
      </div>
    </div>
  );
}
