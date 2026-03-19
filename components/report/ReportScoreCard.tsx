/**
 * @file ReportScoreCard.tsx
 * @description Maturity score and verdict display for the report.
 */

import { Card } from "@/components/ui/Card";

interface ReportScoreCardProps {
  score: number;
  verdict: string;
  description: string;
}

/**
 * ReportScoreCard component.
 * Highlights the global maturity score and providing an executive summary (verdict).
 */
export default function ReportScoreCard({ score, verdict, description }: ReportScoreCardProps) {
  return (
    <Card className="lg:col-span-5 p-16 border-white/5 bg-surface/20 rounded-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 opacity-20 group-hover:opacity-40 transition-opacity" />

      <div className="relative z-10 space-y-12">
        <div className="space-y-4">
          <span className="text-[11px] font-mono font-bold text-pink-500 uppercase tracking-[0.2em]">
            Maturity Score
          </span>
          <div className="flex items-baseline gap-4">
            <span className="text-[120px] font-black leading-none text-pink-500 tracking-tighter drop-shadow-[0_0_50px_rgba(255,45,107,0.2)]">
              {score}
            </span>
            <span className="text-4xl font-bold text-secondary/20">/100</span>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white tracking-tight">
            Vibe: {verdict}
          </h2>
          <p className="text-secondary/60 leading-relaxed text-lg max-w-sm">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
