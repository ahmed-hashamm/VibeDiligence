import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS, REASSURANCES } from "@/data/landing";
import { Check } from "lucide-react";
import Link from "next/link";

/**
 * PricingSection: Subscription-less, pay-per-audit plans.
 */
export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-24 md:py-32 bg-surface/30 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Pricing"
          heading="Investment Grade Plans."
          subheading="Institutional-grade audits designed for modern deal cycles."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <Card 
              key={tier.name} 
              className={`p-8 md:p-12 relative flex flex-col ${tier.isHighlighted ? 'border-pink-500/50 shadow-[0_0_40px_rgba(255,46,109,0.15)] ring-1 ring-pink-500/50' : 'border-white/5 bg-surface/50'}`}
              isHighlighted={tier.isHighlighted}
            >
              <div className="mb-8">
                <h3 className="text-sm font-bold tracking-widest uppercase text-pink-500 mb-4">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl md:text-6xl font-bold">{tier.price}</span>
                  <span className="text-text-muted text-lg">/ Audit</span>
                </div>
                <p className="text-text-secondary">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                    <Check size={16} className="text-pink-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/audit" className="w-full">
                <Button 
                  className={`w-full py-6 h-auto text-sm tracking-widest font-bold uppercase ${tier.isHighlighted ? '' : 'bg-white/5 hover:bg-white/10 text-white'}`}
                >
                  {tier.cta || 'Start Audit'}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Reassurances Bar */}
        <div className="mt-16 bg-bg/50 border border-white/5 rounded-2xl py-6 px-8 flex flex-wrap justify-center gap-8 md:gap-16">
          {REASSURANCES.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs font-mono text-text-muted uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
