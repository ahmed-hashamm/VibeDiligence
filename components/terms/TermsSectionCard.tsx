/**
 * @file TermsSectionCard.tsx
 * @description Renders an individual terms of service clause card.
 */

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LegalSection } from "@/types/audit";

interface TermsSectionCardProps {
  section: LegalSection;
}

/**
 * TermsSectionCard component.
 * Handles specialized rendering for numbered clauses, nested subsections, and security disclosures.
 */
export default function TermsSectionCard({ section }: TermsSectionCardProps) {
  return (
    <Card className="p-8 md:p-14 border-white/5 bg-surface/20 rounded-[2.5rem] overflow-hidden group hover:border-pink-500/20 transition-all duration-700">
      <div className="flex flex-col gap-10">
        <div className="flex items-start gap-8">
          <span className="text-3xl md:text-5xl font-bold text-pink-500 opacity-40 font-mono tracking-tighter shrink-0 select-none">
            {section.id.padStart(2, '0')}.
          </span>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white mt-1 group-hover:text-pink-500 transition-colors duration-500">
            {section.title}
          </h3>
        </div>

        <div className="space-y-10">
          {section.content && (
            <p className="text-base text-secondary/80 leading-relaxed max-w-4xl">
              {section.content}
            </p>
          )}

          {section.subsections && (
            <div className="space-y-12">
              {section.subsections.map((sub, i) => (
                <div key={i} className="space-y-6 group/sub">
                  <h4 className="text-[11px] md:text-xs font-bold text-pink-500 uppercase tracking-[0.2em] font-mono">
                    {sub.title}
                  </h4>
                  <div className="space-y-6">
                    {sub.content && (
                      <p className="text-sm text-secondary/70 leading-relaxed max-w-3xl">
                        {sub.content}
                      </p>
                    )}
                    {sub.bullets && (
                      <ul className="space-y-4">
                        {sub.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-4 items-start text-sm text-secondary/50 leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary/30 mt-2 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sub.nestedContent && (
                      <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                        <p className="text-sm text-secondary/60 leading-relaxed max-w-2xl italic">
                          {sub.nestedContent}
                        </p>
                        {sub.nestedBullets && (
                          <ul className="space-y-3">
                            {sub.nestedBullets.map((b, i) => (
                              <li key={i} className="flex gap-4 items-start text-sm text-secondary/50 leading-relaxed">
                                <div className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {section.bullets && (
            <ul className="space-y-4">
              {section.bullets.map((bullet, idx) => (
                <li key={idx} className="flex gap-4 items-start text-sm text-secondary/50 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary/30 mt-2 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {section.important && (
          <div className="p-8 rounded-2xl bg-pink-500/5 border border-pink-500/20 space-y-4 max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="w-1 h-4 bg-pink-500 rounded-full" />
              <p className="text-xs font-bold text-pink-500 uppercase tracking-widest font-mono">
                Security Protocol Disclosure
              </p>
            </div>
            <p className="text-xs text-secondary/60 leading-relaxed font-mono uppercase tracking-wide">
              {section.important}
            </p>
          </div>
        )}

        {section.footer && (
          <p className="text-xs text-secondary/30 italic pt-6 border-t border-white/5">
            Note: {section.footer}
          </p>
        )}
      </div>
    </Card>
  );
}
