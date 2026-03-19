/**
 * @file AboutTechnology.tsx
 * @description Renders the technology section for the About page.
 */

import { Card } from "@/components/ui/Card";
import { Cpu, Globe, Rocket } from "lucide-react";
import StatusEyebrow from "@/components/ui/StatusEyebrow";
import { ABOUT_CONTENT } from "@/data/about";

/**
 * AboutTechnology component.
 * Showcases the proprietary VibeEngine and mission-critical tech.
 */
export default function AboutTechnology() {
  const { technology: tech } = ABOUT_CONTENT;
  
  return (
    <div className="space-y-12">
      <div className="flex items-center gap-6">
        <h2 className="text-3xl font-bold text-white uppercase tracking-widest whitespace-nowrap">
          The Technology
        </h2>
        <div className="h-px w-full bg-white/5" />
      </div>

      <Card className="p-16 border-white/5 bg-surface/20 rounded-[3rem] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 opacity-20 group-hover:opacity-100 transition-all duration-700" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <StatusEyebrow text={tech.systemId} className="bg-white/5 border-white/10" />
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {tech.title} <br />
              <span className="text-secondary/40">{tech.subtitle}</span>
            </h3>
            <p className="text-lg text-secondary/60 leading-relaxed max-w-xl font-medium">
              {tech.description}
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-3 text-emerald-500 font-mono text-sm tracking-tighter">
                <Rocket size={18} /> SCALABILITY VERIFIED
              </div>
              <div className="flex items-center gap-3 text-pink-500 font-mono text-sm tracking-tighter">
                <Globe size={18} /> GLOBAL STANDARDS
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-pink-500/10 to-transparent border border-white/5 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1)_0%,transparent_70%)] animate-pulse" />
            <Cpu size={120} className="text-pink-500/20 group-hover:text-pink-500/40 transition-colors duration-700" />
            <div className="absolute bottom-10 left-10 p-6 rounded-2xl bg-bg/80 border border-white/5 backdrop-blur-xl space-y-2">
              <p className="text-[10px] font-mono font-bold text-pink-500 underline decoration-pink-500/30 underline-offset-4">
                {tech.status}
              </p>
              <p className="text-xs text-secondary/60 font-medium">{tech.cycle}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
