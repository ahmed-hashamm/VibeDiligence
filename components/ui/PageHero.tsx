/**
 * @file PageHero.tsx
 * @description A reusable high-fidelity hero section for sub-pages (Security, Privacy, etc.).
 */

import StatusEyebrow from "./StatusEyebrow";

/**
 * PageHeroProps interface.
 */
interface PageHeroProps {
  eyebrow: string;
  heading: string;
  subheading?: string;
  lastUpdated?: string;
}

/**
 * PageHero component.
 * Features a high-fidelity design matching the 'Institutional Grade' look.
 */
export default function PageHero({ eyebrow, heading, subheading, lastUpdated }: PageHeroProps) {
  return (
    <div className="mb-24">
      {/* Eyebrow Pill */}
      <StatusEyebrow text={eyebrow} className="mb-10" />

      {/* Main Heading */}
      <h1
        className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      {/* Metadata Row: Last Updated / Effective Date */}
      {lastUpdated && (
        <div className="flex items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-secondary/40 mb-12">
          {lastUpdated} — EFFECTIVE DATE: MARCH 2026
        </div>
      )}

      {/* Subheading / Description */}
      {subheading && (
        <p className="text-xl md:text-2xl text-secondary/70 max-w-5xl leading-relaxed font-medium">
          {subheading}
        </p>
      )}
    </div>
  );
}
