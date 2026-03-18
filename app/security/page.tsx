import GridBackground from "@/animations/svgs/GridBackground";
import SecurityContent from "@/components/SecurityContent";
import { SECURITY_CONTENT } from "@/data/legal";
import { Calendar, ShieldCheck } from "lucide-react";

/**
 * SecurityPage component.
 * Pure page entry point.
 * Features a high-fidelity hero section matching the 'Institutional Grade' design.
 */
export default function SecurityPage() {
  const ICON_MAP: Record<string, any> = { Calendar, ShieldCheck };

  return (
    <main className="min-h-screen pt-40 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      <div className="max-w-[1400px] mx-auto px-12 relative z-10">
        {/* Institutional Hero */}
        <div className="mb-24">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-10">
            {SECURITY_CONTENT.eyebrow}
          </div>

          {/* Main Heading */}
          <h1
            className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: SECURITY_CONTENT.heading }}
          />

          {/* Metadata Row */}
          {/* <div className="flex flex-wrap items-center gap-x-10 gap-y-4 mb-16">
            {SECURITY_CONTENT.metadata.map((item: { icon: string; text: string }) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <div key={item.text} className="flex items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-secondary/40">
                  <Icon size={14} className="text-pink-500/60" />
                  {item.text}
                </div>
              );
            })}
          </div> */}

          {/* Foundational Body */}
          {/* <p className="text-xl md:text-2xl text-secondary/70 max-w-5xl leading-relaxed font-medium">
            {SECURITY_CONTENT.mainBody}
          </p> */}
        </div>

        <SecurityContent />
      </div>
    </main>
  );
}
