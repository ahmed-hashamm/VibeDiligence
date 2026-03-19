/**
 * @file PrivacySectionItem.tsx
 * @description Renders an individual privacy policy section with support for tables and nesting.
 */

import { LegalSection } from "@/types/audit";

interface PrivacySectionItemProps {
  section: LegalSection;
}

/**
 * PrivacySectionItem component.
 * Handles specialized rendering for numbered sections, subsections, and data mapping tables.
 */
export default function PrivacySectionItem({ section }: PrivacySectionItemProps) {
  return (
    <section key={section.id} className="scroll-mt-32">
      {/* Section Heading */}
      <div className="mb-8 group">
        <h2 className="text-2xl font-bold text-white flex items-baseline gap-4">
          <span className="text-pink-500 text-3xl opacity-50 group-hover:opacity-100 transition-opacity font-mono">
            {section.id}.
          </span>
          <span>{section.title}</span>
        </h2>
      </div>

      {/* Section Body */}
      <div className="space-y-8 pl-12 border-l border-white/5 ml-4">
        {/* Intro Content */}
        {section.intro && (
          <p className="text-sm text-secondary/50 leading-relaxed">
            {section.intro}
          </p>
        )}

        {/* Standard Content & Bullets */}
        {section.content && (
          <p className="text-sm text-secondary/50 leading-relaxed">
            {section.content}
          </p>
        )}
        {section.bullets && section.bullets.length > 0 && (
          <ul className="space-y-4">
            {section.bullets.map((bullet, idx) => (
              <li key={idx} className="flex gap-4 items-start font-mono uppercase tracking-widest text-[11px]">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1 flex-shrink-0" />
                <span className="text-secondary/50">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Subsections */}
        {section.subsections && section.subsections.length > 0 && (
          <div className="space-y-10">
            {section.subsections.map((sub, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-3">
                  <span className="text-secondary/40 font-mono text-xs">{sub.id}</span>
                  <span className="uppercase tracking-widest text-sm font-mono font-bold text-pink-500/80">{sub.title}</span>
                </h3>
                {sub.content && (
                  <p className="text-sm text-secondary/50 leading-relaxed">
                    {sub.content}
                  </p>
                )}
                {sub.bullets && sub.bullets.length > 0 && (
                  <ul className="space-y-3">
                    {sub.bullets.map((b: string, bIdx: number) => (
                      <li key={bIdx} className="flex gap-4 items-start font-mono uppercase tracking-wider text-sm">
                        <div className="w-1 h-1 rounded-full bg-secondary mt-1 shrink-0" />
                        <span className="text-secondary/40">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sub.nestedContent && (
                  <p className="text-sm text-secondary/50 leading-relaxed mt-4">
                    {sub.nestedContent}
                  </p>
                )}
                {sub.nestedBullets && sub.nestedBullets.length > 0 && (
                  <ul className="space-y-3">
                    {sub.nestedBullets.map((nb: string, nbIdx: number) => (
                      <li key={nbIdx} className="flex gap-4 items-start font-mono uppercase tracking-wider text-sm">
                        <div className="w-1 h-1 rounded-full bg-secondary mt-1 shrink-0" />
                        <span className="text-secondary/40">{nb}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Table Rendering */}
        {section.table && (
          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  {section.table.headers.map((header) => (
                    <th key={header} className="px-8 py-5 font-mono font-medium text-[11px] text-secondary/40 uppercase tracking-[0.2em]">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[13px]">
                {section.table.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.01] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-8 py-5 text-secondary/60 align-top leading-relaxed">
                        {typeof cell === 'string' && (cell.includes('.com') || cell.includes('.github.com')) ? (
                          <a href={`https://${cell}`} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline transition-all">
                            {cell}
                          </a>
                        ) : (
                          <span className={cIdx === 0 ? "text-pink-500 font-bold" : ""}>{cell}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Important Warning Box */}
        {section.important && (
          <div className="p-6 rounded-xl bg-pink-500/5 border border-pink-500/20 space-y-3">
            <p className="text-xs font-bold text-pink-500 uppercase tracking-widest border-b border-pink-500/20 pb-2">
              Important
            </p>
            <p className="text-xs text-secondary/70 leading-relaxed font-mono">
              {section.important}
            </p>
          </div>
        )}

        {/* Section Footer */}
        {section.footer && (
          <p className="text-xs text-secondary/50 italic leading-relaxed pt-2 border-t border-white/5">
            {section.footer}
          </p>
        )}
      </div>
    </section>
  );
}
