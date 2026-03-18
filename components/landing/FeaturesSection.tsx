import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FEATURES } from "@/data/landing";
import * as Icons from "lucide-react";

/**
 * FeaturesSection: Showcases key capabilities.
 */
export default function FeaturesSection() {
  return (
    <section id="features" className="w-full py-24 md:py-32 bg-bg relative">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Capabilities"
          heading="Everything you need to <br /> audit with confidence."
          subheading="We combine static analysis with agentic reasoning to find what standard linters miss."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {FEATURES.map((feature) => {
            // @ts-ignore
            const Icon = Icons[feature.icon] || Icons.Zap;
            return (
              <Card key={feature.title} className="flex flex-col items-start p-8 bg-surface/50 border-white/5 hover:bg-surface/80">
                <div className="p-3 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 mb-6 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3 tracking-widest uppercase">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
