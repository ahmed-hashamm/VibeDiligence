/**
 * @file StatsBar.tsx
 * @description Display bar for key platform metrics.
 */

import { LANDING_STATS } from "@/data/landing";
import TechLogos from "@/animations/svgs/TechLogos";

/**
 * StatsBar component.
 * Displays high-level stats with animated-feeling monospace typography.
 * Matches the design exactly: columns for stats + a tech stack row.
 */
export default function StatsBar() {
  return (
    <div className="w-full bg-surface/30 border-y border-white/5 py-12 relative z-20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        {/* Main Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-10 px-4">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="group">
              <div className="text-4xl md:text-5xl font-mono font-bold text-pink-500 mb-2 tracking-tighter drop-shadow-[0_0_10px_rgba(255,46,109,0.2)]">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs font-mono font-bold text-muted uppercase tracking-[0.3em] leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Logos Row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pt-6 border-t border-white/10">
          <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-[0.3em]">
            WORKS WITH YOUR TECH:
          </span>
          <TechLogos />
        </div>
      </div>
    </div>
  );
}
