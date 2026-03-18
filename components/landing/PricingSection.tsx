import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS, REASSURANCES, PRICING_CONTENT } from "@/data/landing";
import { Check, Lock, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * PricingSection component.
 * Displays tiered pricing cards and a trust/reassurance bar.
 * Matches the design exactly: Detailed badges, mono typography, and trust icons.
 */
export default function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-16 bg-bg relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2">
            {PRICING_CONTENT.heading}
          </h2>
          <p className="text-[10px] font-mono font-bold text-muted uppercase tracking-[0.4em]">
            {PRICING_CONTENT.subheading}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "p-8 md:p-10 relative flex flex-col bg-surface/30 transition-all duration-500",
                tier.isHighlighted
                  ? "border-pink-500/40 shadow-[0_0_50px_rgba(255,46,109,0.1)]"
                  : "border-white/5"
              )}
            >
              {/* Popular Badge */}
              {tier.isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-pink-500 text-[10px] font-mono font-bold text-white tracking-[0.2em] shadow-lg shadow-pink-500/20">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <div className={cn(
                  "text-[10px] font-mono font-bold uppercase tracking-[0.3em] mb-6",
                  tier.isHighlighted ? "text-pink-500" : "text-muted"
                )}>
                  {tier.name}
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={cn("text-5xl font-bold tracking-tighter", tier.isHighlighted ? "text-primary" : "text-white")}>{tier.price}</span>
                  <span className="text-muted font-mono text-xs tracking-widest">{tier.description}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-xs font-mono font-bold text-primary/80 uppercase tracking-widest leading-none">
                    <Check size={16} className={cn("shrink-0", tier.isHighlighted ? "text-pink-500" : "text-muted/40")} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/audit" className="w-full">
                <Button
                  className={cn(
                    "w-full py-6 text-[10px] tracking-[0.3em] font-bold uppercase rounded-sm transition-all duration-300",
                    tier.isHighlighted
                      ? "bg-pink-500 hover:bg-pink-600 text-white shadow-xl shadow-pink-500/10"
                      : "bg-[#0a0a0b] border border-white/5 hover:border-white/10 text-white"
                  )}
                >
                  {tier.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        {/* Reassurances Bar */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {REASSURANCES.map((item, idx) => {
            const Icon = idx === 0 ? Lock : idx === 1 ? Zap : ShieldCheck;
            return (
              <div key={item} className="flex items-center gap-2 text-[10px] font-mono font-bold text-muted uppercase tracking-[0.2em]">
                <Icon size={14} className="text-muted/50" />
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Bloom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-pink-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
}
