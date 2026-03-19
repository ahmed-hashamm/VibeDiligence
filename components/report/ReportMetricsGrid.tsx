/**
 * @file ReportMetricsGrid.tsx
 * @description Technical indicators grid for the audit report.
 */

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  score: number;
  status: string;
  color: string;
}

interface ReportMetricsGridProps {
  metrics: Metric[];
}

/**
 * ReportMetricsGrid component.
 * Visualizes individual technical metrics via progress bars and scores.
 */
export default function ReportMetricsGrid({ metrics }: ReportMetricsGridProps) {
  return (
    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
      {metrics.map((m) => (
        <Card key={m.label} className="p-10 border-white/5 bg-surface/20 rounded-sm relative overflow-hidden flex flex-col justify-between group">
          <div className={cn(
            "absolute top-0 left-0 w-1.5 h-full",
            m.color === "success" ? "bg-emerald-500" : "bg-pink-500"
          )} />

          <div className="flex justify-between items-start mb-8">
            <span className="text-[11px] font-mono font-bold text-secondary/40 uppercase tracking-[0.2em]">
              {m.label}
            </span>
            <span className={cn(
              "text-3xl font-bold font-mono",
              m.color === "success" ? "text-emerald-500" : "text-pink-500"
            )}>
              {m.score}%
            </span>
          </div>

          <div className="space-y-6">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-1000",
                  m.color === "success" ? "bg-emerald-500" : "bg-pink-500"
                )}
                style={{ width: `${m.score}%` }}
              />
            </div>
            <p className="text-[10px] font-mono font-bold text-secondary/30 uppercase tracking-[0.1em]">
              {m.status}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
