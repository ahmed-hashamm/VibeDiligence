/**
 * @file StepsSection.tsx
 * @description Visualizes the 3-step audit process using data from landing.ts.
 */

import { Card } from "@/components/ui/Card";
import { Link, FileText, Download, ShieldCheck } from "lucide-react";
import { STEPS, STEPS_CONTENT } from "@/data/landing";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

/**
 * StepsSection component.
 * Visualizes the 3-step audit process with custom UI elements for each phase.
 * Matches the design exactly: custom grid + unique visual components.
 */
export default function StepsSection() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-bg relative">
      <div className=" mx-auto px-12 relative z-10">
        {/* Header */}
        <div className="mb-16">
          <div className="text-[10px] font-mono font-bold text-pink-500 uppercase tracking-[0.4em] mb-4">
            {STEPS_CONTENT.eyebrow}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            {STEPS_CONTENT.heading}
          </h2>
        </div>

        {/* Custom Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* STEP 01: Secure Integration (1/3 Width) */}
          <Card className="lg:col-span-1 p-10 bg-surface/30 border-white/5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-10 right-10 text-white/10">
              <Link size={48} strokeWidth={1.5} />
            </div>

            <div>
              <div className="text-sm font-mono text-muted uppercase tracking-widest mb-6">
                STEP_{STEPS[0].number}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-6">{STEPS[0].title}</h3>
              <p className="text-secondary text-sm md:text-base leading-relaxed mb-8">
                {STEPS[0].description}
              </p>
            </div>

            <div className="flex gap-3">
              {STEPS[0].badges?.map((b) => (
                <Badge key={b} variant="outline" className="text-[10px] font-mono border-white/10 text-muted">
                  {b}
                </Badge>
              ))}
            </div>
          </Card>

          {/* STEP 02: Neural Dependency Mapping (2/3 Width) */}
          <Card className="lg:col-span-2 p-10 bg-surface/30 border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-12 items-start justify-between">
            <div className="flex-1">
              <div className="text-sm font-mono text-muted uppercase tracking-widest mb-6">
                STEP_{STEPS[1].number}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-6">{STEPS[1].title}</h3>
              <p className="text-secondary text-sm md:text-base leading-relaxed max-w-sm">
                {STEPS[1].description}
              </p>
            </div>

            {/* Analysis Result Visual */}
            <div className="w-full md:w-80 p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 font-mono text-[11px] shadow-2xl relative">
              <div className="text-pink-500 mb-3">// Analysis result</div>
              <div className="space-y-1">
                <div className="text-muted flex justify-between">
                  <span>Found:</span>
                  <span className="text-primary">Complexity &gt; 24</span>
                </div>
                <div className="text-muted flex justify-between">
                  <span>Action:</span>
                  <span className="text-yellow-500">Refactor</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-500/10 blur-3xl rounded-full pointer-events-none" />
            </div>
          </Card>
        </div>

        {/* STEP 03: Investor-Ready Reports (Full Width) */}
        <Card className="col-span-full p-10 bg-surface/30 border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center justify-between min-h-[250px]">
          <div className="flex-1">
            <div className="text-sm font-mono text-muted uppercase tracking-widest mb-6">
              STEP_{STEPS[2].number}
            </div>
            <h3 className="text-2xl font-bold text-primary mb-6">{STEPS[2].title}</h3>
            <p className="text-secondary text-sm md:text-base leading-relaxed">
              {STEPS[2].description}
            </p>
          </div>

          {/* PDF Preview Visual */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 py-4 px-6 rounded-xl bg-white/[0.03] border border-white/5 shadow-xl">
              <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500">
                <FileText size={24} />
              </div>
              <div>
                <div className="text-[11px] font-mono font-bold text-primary mb-0.5">AUDIT_REPORT_2024.pdf</div>
                <div className="text-[9px] font-mono text-muted">2.4 MB • 60s Generation</div>
              </div>
            </div>

            <button className="w-14 h-14 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,46,109,0.4)] hover:scale-110 transition-transform outline-none">
              <Download size={24} />
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
