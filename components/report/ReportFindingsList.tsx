/**
 * @file ReportFindingsList.tsx
 * @description List of recommendation cards for the audit report.
 */

import { Card } from "@/components/ui/Card";
import { CheckCircle2, AlertTriangle, MoreHorizontal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Finding {
  title: string;
  desc: string;
  priority: string;
  icon: string;
  variant: string;
}

interface ReportFindingsListProps {
  findings: Finding[];
}

/**
 * ReportFindingsList component.
 * Displays high-priority recommendations with themed cards and hover effects.
 */
export default function ReportFindingsList({ findings }: ReportFindingsListProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white tracking-tight mb-12 flex items-center gap-6">
        Top 5 Recommendations
        <div className="h-px flex-1 bg-white/5" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {findings.map((f, idx) => {
          const Icon = f.icon === "check" ? CheckCircle2 : f.icon === "alert" ? AlertTriangle : MoreHorizontal;
          return (
            <Card
              key={idx}
              className={cn(
                "p-10 border-white/5 rounded-sm flex flex-col justify-between transition-all duration-500 group border-b-2",
                f.variant === "pink"
                  ? "bg-pink-500/[0.03] border-b-pink-600/30 hover:border-pink-500 hover:bg-pink-500/[0.06]"
                  : "bg-emerald-500/[0.03] border-b-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/[0.06]"
              )}
            >
              <div className="flex justify-between items-start mb-10">
                <div className={cn(
                  "px-3 py-1.5 text-[9px] font-mono font-bold tracking-[0.2em] uppercase",
                  f.variant === "success" ? "bg-emerald-500/20 text-emerald-500" : "bg-pink-600/20 text-pink-500"
                )}>
                  {f.priority}
                </div>
                <Icon size={20} className={cn(
                  "text-secondary/20 transition-all duration-500",
                  f.variant === "success"
                    ? "group-hover:text-emerald-500 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                    : "group-hover:text-pink-500 group-hover:drop-shadow-[0_0_8px_rgba(255,45,107,0.8)]"
                )} />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-secondary/50 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            </Card>
          );
        })}

        {/* Static View All card preserved for the demo */}
        <Card className="p-10 border-white/5 border-dashed bg-transparent rounded-[2rem] flex items-center justify-center text-center group cursor-pointer hover:border-pink-500/40 transition-colors">
          <div className="space-y-4">
            <p className="text-[11px] font-mono font-bold text-secondary/30 uppercase tracking-[0.2em] group-hover:text-pink-500/60 transition-colors">
              View All Analytics [14]
            </p>
            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mx-auto group-hover:border-pink-500/40 transition-colors">
              <ArrowRight size={20} className="text-secondary/20 group-hover:text-pink-500 transition-colors" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
