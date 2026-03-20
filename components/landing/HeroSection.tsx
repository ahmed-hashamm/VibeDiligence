/**
 * @file HeroSection.tsx
 * @description Hero Section for the VibeDiligence landing page.
 * Features a high-impact heading and CTA, with a Spline visual for branding.
 */

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import HeroVisual from "@/animations/svgs/HeroVisual";
import GridBackground from "@/animations/svgs/GridBackground";
import { HERO_CONTENT } from "@/data/landing";

import StatusEyebrow from "@/components/ui/StatusEyebrow";

/**
 * HeroSection component.
 * Rule: No internal logic or hardcoded data.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full pt-20 pb-8 md:pt-24 md:pb-16 overflow-hidden hero-bg">
      <GridBackground />

      <div className="container  px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left z-10">
          <StatusEyebrow text={HERO_CONTENT.badge} className="mb-4" />

          <h1 className="text-5xl md:text-8xl font-bold font-sans leading-[1.0] mb-4 tracking-tighter">
            {HERO_CONTENT.title_part1} <br />
            <span className="gradient-text">{HERO_CONTENT.title_part2}</span>
          </h1>

          <p className="text-base md:text-lg text-secondary mb-6 max-w-lg leading-relaxed font-medium">
            {HERO_CONTENT.subheading}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/audit">
              <Button className="text-sm tracking-widest px-10 py-4 h-auto uppercase font-bold">
                {HERO_CONTENT.cta_primary}
              </Button>
            </Link>
            <Link href="/example-report">
              <Button variant="ghost" className="text-sm tracking-widest px-10 py-4 h-auto uppercase font-bold border border-white/10">
                {HERO_CONTENT.cta_secondary}
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>

      {/* Bottom fade decor */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </section>
  );
}
