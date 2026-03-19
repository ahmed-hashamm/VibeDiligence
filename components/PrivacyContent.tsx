/**
 * @file PrivacyContent.tsx
 * @description Renders the privacy policy sections with support for tables, nested subsections, and important notices.
 */

import { PRIVACY_CONTENT } from "@/data/legal";
import { Button } from "@/components/ui/Button";

/**
 * PrivacyContent component.
 * Displays the full privacy policy according to the refined design image.
 */
export default function PrivacyContent() {
  return (
    <div className="text-secondary/90 leading-relaxed mt-20">
      {/* Policy Meta Info */}
      <div className="max-w-4xl mb-32">
        <div className="border-l-2 border-pink-500 pl-8 py-2 space-y-4">
          <p className="text-secondary text-base md:text-lg leading-relaxed font-medium">
            {PRIVACY_CONTENT.intro}
          </p>
          <p className="text-secondary/70 text-sm md:text-base font-medium italic">
            {PRIVACY_CONTENT.acknowledgement}
          </p>
          <p className="text-xs text-secondary/40 font-mono uppercase tracking-[0.1em]">
            {PRIVACY_CONTENT.contactLine}
          </p>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-32">
        {PRIVACY_CONTENT.sections.map((section) => (
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

              {/* Subsections (Numbered) */}
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
                              {/* Check if cell is a link (for Third-party services) */}
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
        ))}
      </div>
      {/* Global Contact Section Card */}
        <div className="mt-24 p-8 rounded-3xl bg-pink-500/[0.03] border border-pink-500/10 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] -mr-32 -mt-32 rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-pink-500 rounded-full" />
                {PRIVACY_CONTENT.contact.title}
              </h3>
              <p className="text-sm text-secondary/70 max-w-md">
                {PRIVACY_CONTENT.contact.description}
              </p>
            </div>

            <a href={`mailto:${PRIVACY_CONTENT.contact.email}`} className="flex-shrink-0">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold h-14 px-8 rounded-2xl shadow-lg shadow-pink-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {PRIVACY_CONTENT.contact.email}
              </Button>
            </a>
          </div>
        </div>
      </div>
      );
}
