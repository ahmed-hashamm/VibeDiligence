/**
 * @file AboutValues.tsx
 * @description Renders the core values grid for the About page.
 */

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { ABOUT_CONTENT } from "@/data/about";

/**
 * AboutValues component.
 * Displays a 3-column grid of core institutional values.
 */
export default function AboutValues() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-40">
      {ABOUT_CONTENT.values.map((v) => (
        <Card key={v.title} className="p-8 md:p-12 border-white/5 bg-surface/20 rounded-[2rem] md:rounded-[2.5rem] hover:border-pink-500/20 transition-all duration-500 group">
          <div className={cn("w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110", v.bg)}>
            <v.icon className={v.color} size={24} />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 uppercase tracking-tight">{v.title}</h3>
          <p className="text-sm md:text-base text-secondary/60 leading-relaxed font-medium">
            {v.desc}
          </p>
        </Card>
      ))}
    </div>
  );
}
