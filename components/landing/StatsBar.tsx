import Link from "next/link";
import { LANDING_STATS } from "@/data/landing";

/**
 * StatsBar: Key metrics shown below the hero.
 */
export default function StatsBar() {
  return (
    <div className="w-full bg-surface/50 border-y border-white/5 py-12 relative z-20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:divide-x divide-white/10">
          {LANDING_STATS.map((stat) => (
            <div key={stat.label} className="px-4">
              <div className="text-4xl md:text-6xl font-bold font-mono text-pink-500 mb-2 tracking-tighter">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
