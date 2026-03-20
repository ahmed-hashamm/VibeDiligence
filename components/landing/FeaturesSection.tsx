/**
 * @file FeaturesSection.tsx
 * @description Showcases the core capabilities of the VibeDiligence engine.
 */

import { Card } from "@/components/ui/Card";
import { ShieldCheck, Layers, Network, Zap } from "lucide-react";
import { FEATURES, FEATURES_CONTENT } from "@/data/landing";
import { cn } from "@/lib/utils";

/**
 * FeaturesSection component.
 * Showcases the core capabilities of the VibeDiligence engine.
 * Matches the design exactly: 3-column grid with mono function-style titles.
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-20 bg-bg relative overflow-hidden">
      <div className=" mx-auto px-12 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="text-[10px] font-mono font-bold text-pink-500 uppercase tracking-[0.4em] mb-4">
            {FEATURES_CONTENT.eyebrow}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight max-w-2xl mx-auto md:mx-0">
            {FEATURES_CONTENT.heading}
          </h2>
        </div>

        {/* 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            // Map icon string to component
            const Icon = feature.icon === 'Shield'
              ? ShieldCheck
              : feature.icon === 'Layers'
                ? Layers
                : feature.icon === 'Network'
                  ? Network
                  : Zap;

            const colorClass = feature.color === 'pink' ? 'text-pink-500' : 'text-purple-500';

            return (
              <Card
                key={feature.title}
                className="flex flex-col items-start p-8 bg-surface/30 border-white/5 hover:border-white/10 transition-colors group min-h-[300px]"
              >
                <div className={cn("mb-8", colorClass)}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-mono font-bold text-primary mb-6">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
}
