/**
 * @file ProblemSection.tsx
 * @description Highlights the technical and financial risks of "vibe-coding" without due diligence.
 */

import { Card } from "@/components/ui/Card";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { PROBLEM_CONTENT } from "@/data/landing";
import { cn } from "@/lib/utils";

/**
 * ProblemSection component.
 * Displays high-stakes technical risks and the financial cost of technical debt.
 * Matches the design exactly: Split view with incidents and cost table.
 */
export default function ProblemSection() {
  return (
    <section id="problem" className="w-full py-12 md:py-20 bg-bg relative overflow-hidden">
      <div className=" mx-auto px-12 relative z-10">
        {/* Centered Heading */}
        <div className="text-center mb-10">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: PROBLEM_CONTENT.heading }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Column: Alerts/Incidents */}
          <div className="space-y-6">
            {PROBLEM_CONTENT.incidents.map((incident) => {
              const Icon = incident.color === 'red' ? AlertTriangle : incident.color === 'yellow' ? AlertCircle : Info;
              const colorClass = incident.color === 'red' ? 'text-danger' : incident.color === 'yellow' ? 'text-warning' : 'text-purple-500';
              const bgColorClass = incident.color === 'red' ? 'bg-danger/10' : incident.color === 'yellow' ? 'bg-warning/10' : 'bg-purple-500/10';

              return (
                <Card
                  key={incident.type}
                  className="p-6 bg-surface/30 border-white/5 flex gap-6 items-start hover:border-white/10 transition-colors group"
                >
                  <div className={cn("p-2 rounded-lg shrink-0", bgColorClass, colorClass)}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-muted uppercase tracking-[0.2em] mb-3">
                      {incident.type}
                    </div>
                    <p className="text-sm md:text-base text-secondary leading-relaxed group-hover:text-primary transition-colors">
                      {incident.content}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right Column: Cost Table */}
          <div className="lg:sticky lg:top-32">
            <h3 className="text-2xl font-bold mb-8 text-primary">
              {PROBLEM_CONTENT.cost_title}
            </h3>

            <div className="rounded-2xl bg-surface/30 border border-white/5 overflow-hidden">
              <div className="grid grid-cols-2 px-8 py-4 border-b border-white/5 text-[10px] font-mono font-bold text-muted uppercase tracking-widest">
                <span>SCENARIO</span>
                <span className="text-right">ESTIMATED COST</span>
              </div>

              <div className="divide-y divide-white/5">
                {PROBLEM_CONTENT.scenarios.map((s) => (
                  <div
                    key={s.name}
                    className={cn(
                      "grid grid-cols-2 px-8 py-6 items-center transition-colors",
                      s.isProduct ? "bg-[#2d0a11] hover:bg-[#3d0d16]" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-bold",
                      s.isProduct ? "text-white" : s.highlight ? "text-[#ff4444]" : "text-white/90"
                    )}>
                      {s.name}
                    </span>
                    <span className={cn(
                      "text-right font-mono font-bold",
                      s.isProduct ? "text-white" : s.highlight ? "text-[#ff4444]" : "text-muted"
                    )}>
                      {s.cost}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-500/5 blur-[150px] pointer-events-none" />
    </section>
  );
}
