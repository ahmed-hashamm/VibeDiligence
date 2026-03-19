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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
      {ABOUT_CONTENT.values.map((v) => (
        <Card key={v.title} className="p-12 border-white/5 bg-surface/20 rounded-[2.5rem] hover:border-pink-500/20 transition-all duration-500 group">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110", v.bg)}>
            <v.icon className={v.color} size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{v.title}</h3>
          <p className="text-secondary/60 leading-relaxed font-medium">
            {v.desc}
          </p>
        </Card>
      ))}
    </div>
  );
}
