import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";

/**
 * ProblemSection: Highlights the cost of bad code with a two-card layout.
 */
export default function ProblemSection() {
  const risks = [
    "Authentication & Permission leaks",
    "Scalability bottlenecks in DB layer",
    "Third-party dependency vulnerabilities",
    "Production readiness failures",
  ];

  return (
    <section id="problem" className="w-full py-24 md:py-32 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="The Hard Truth"
          heading="Vibe-coding ships fast. <br /> Security issues ship faster."
          subheading="A 'good vibe' isn't enough when millions are on the line. Traditional audits are too slow for modern build cycles."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Card: The Risk */}
          <Card className="p-8 lg:p-12 bg-surface/30 border-white/5 group hover:border-pink-500/30 transition-all duration-500">
            <div className="inline-flex p-3 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 mb-8">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-text-primary leading-tight">
              Your codebase is your biggest asset—and your biggest liability.
            </h3>
            <div className="space-y-4">
              {risks.map((risk) => (
                <div key={risk} className="flex items-center gap-3 text-text-secondary">
                  <CheckCircle2 size={18} className="text-pink-500 shrink-0" />
                  <span className="text-sm font-medium">{risk}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Card: The Cost */}
          <Card className="p-8 lg:p-12 bg-surface/30 border-white/5 overflow-hidden relative group hover:border-pink-500/30 transition-all duration-500">
            <div className="inline-flex p-3 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 mb-8">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-3xl font-bold mb-6 text-text-primary leading-tight">
              The Real cost of technical debt.
            </h3>
            <p className="text-text-secondary text-base leading-relaxed mb-8">
              Finding critical issues during active due diligence can tank your valuation by 30-40% or kill the deal entirely.
            </p>
            
            {/* Mock Visual: Table/Graph Area */}
            <div className="w-full h-48 bg-bg/50 rounded-xl border border-white/5 p-6 flex flex-col justify-end gap-2 relative group-hover:bg-pink-500/[0.02] transition-colors">
              <div className="flex items-end gap-2 h-full">
                <div className="w-full bg-white/5 rounded-t-sm h-[20%]" />
                <div className="w-full bg-white/5 rounded-t-sm h-[35%]" />
                <div className="w-full bg-white/5 rounded-t-sm h-[50%]" />
                <div className="w-full bg-pink-500/20 rounded-t-sm h-[80%] border-t-2 border-pink-500 shadow-[0_0_15px_rgba(255,46,109,0.3)]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-text-muted mt-2">
                <span>SEED</span>
                <span>SERIES A</span>
                <span>SERIES B</span>
                <span className="text-pink-500 font-bold uppercase tracking-tighter">Diligence</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Background Decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-pink-500/5 blur-[150px] pointer-events-none" />
    </section>
  );
}
