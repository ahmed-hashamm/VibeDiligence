import { Card } from "@/components/ui/Card";
import { SECURITY_CONTENT } from "@/data/legal";
import { Shield, Lock, Zap, Server, Globe, ShieldCheck, Info, CreditCard, Cloud, Check, CircleSlash, X, Mail, Bug, Code, } from "lucide-react";
import { cn } from "@/lib/utils";

// Define a type for the whole security content structure
interface SecurityContentData {
  mainBody: string;
  pillars: Pillar[];
  headers: { name: string; value: string }[];
  headerFooter?: string;
  whatWeDoNotDo: string[];
  limitations: {
    title: string;
    intro: string;
    items: { title: string; desc: string }[];
  };
  reporting: {
    title: string;
    email: string;
    subject: string;
    thankYou: string;
  };
}

interface Pillar {
  title: string;
  icon: string;
  description?: string;
  intro?: string;
  sections?: { label: string; desc: string }[];
  features?: { label: string; desc: string }[];
  contact?: { email: string; subject: string };
  includeInReport?: string[];
  whatToExpect?: string[];
  commitment?: string;
  footerNote?: string;
  outOfScope?: string;
  encryptionTransit?: string;
  encryptionRest?: string;
  repositoryData?: { intro: string; practices: string[] };
  caution?: string;
  practices?: string[];
}

/**
 * SecurityContent component.
 * Displays security commitment, tech cards, HTTP headers table, and reporting info.
 * Matches the 'Institutional Grade' design exactly.
 */
export default function SecurityContent() {
  const content = SECURITY_CONTENT as unknown as SecurityContentData;
  const ICON_MAP: Record<string, any> = { Lock, Zap, Server, ShieldCheck, CreditCard, Cloud };

  return (
    <>
      {/* Hero Body Text */}
      <div className="max-w-4xl mb-24">
        <p className="text-secondary text-lg leading-relaxed border-l-2 border-pink-500 pl-8 py-2">
          {content.mainBody}
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="flex flex-col gap-12 mb-32">
        {content.pillars.map((pillar) => {
          const Icon = ICON_MAP[pillar.icon] || ShieldCheck;
          const isDisclosure = pillar.title === "Responsible Disclosure";
          const isDataProtection = pillar.title === "Data Protection";
          const isPayment = pillar.title === "Payment Security";
          const isInfra = pillar.title === "Infrastructure Security";
          const isAppSec = pillar.title === "Application Security";

          return (
            <Card
              key={pillar.title}
              className={cn(
                "p-10 border-white/5 bg-surface/20 flex flex-col h-full rounded-[2rem] transition-all duration-500",
                isDisclosure || isDataProtection || isPayment || isInfra || isAppSec ? "w-full" : "w-full lg:w-1/2"
              )}
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 rounded-2xl bg-[#1A0B13]">
                  <Icon size={28} className="fill-[#FF2D6B] text-[#1A0B13]" />
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{pillar.title}</h3>
              </div>

              {/* High-Fidelity Infrastructure Security Content */}
              {isInfra ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {pillar.sections?.map((section: any) => (
                    <div key={section.label}>
                      <h4 className="text-xl font-bold mb-4">{section.label}</h4>
                      <p className="text-sm text-secondary/70 leading-relaxed font-medium">
                        {section.desc}
                      </p>
                    </div>
                  ))}
                </div>
              ) : isPayment ? (
                /* High-Fidelity Payment Security Content */
                <div className="space-y-10">
                  <p className="text-secondary/90 leading-relaxed text-lg">{pillar.intro}</p>
                  <ul className="space-y-4">
                    {pillar.practices?.map((practice: string, idx: number) => (
                      <li key={idx} className="flex gap-4 text-sm text-secondary/70 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : isDataProtection ? (
                /* High-Fidelity Data Protection Content */
                <div className="space-y-12">
                  {/* Two Column Encryption */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                      <h4 className="text-xl font-bold mb-4">Encryption in Transit</h4>
                      <p className="text-sm text-secondary/70 leading-relaxed font-medium">
                        {pillar.encryptionTransit}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-4">Encryption at Rest</h4>
                      <p className="text-sm text-secondary/70 leading-relaxed font-medium">
                        {pillar.encryptionRest}
                      </p>
                    </div>
                  </div>

                  {/* Repository Data */}
                  <div>
                    <h4 className="text-xl font-bold mb-4">Repository Data</h4>
                    <p className="text-sm text-secondary/70 mb-8 font-medium">{pillar.repositoryData?.intro}</p>
                    <ul className="grid grid-cols-1 gap-6">
                      {pillar.repositoryData?.practices.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-4 text-sm text-secondary/80 leading-relaxed group/item">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5 group-hover/item:scale-125 transition-transform" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Caution Box */}
                  <div className="p-8 rounded-2xl bg-pink-500/[0.03] border border-pink-500/10 relative group/caution overflow-hidden">
                    <div className="absolute left-0 top-0 w-1 h-full bg-pink-500/40" />
                    <p className="text-xs text-secondary/60 leading-relaxed italic">
                      {pillar.caution}
                    </p>
                  </div>
                </div>
              ) : isDisclosure ? (
                /* High-Fidelity Responsible Disclosure Content */
                <div className="space-y-10">
                  <p className="text-secondary/90 leading-relaxed text-lg">{pillar.intro}</p>

                  {/* Contact Box */}
                  {pillar.contact && (
                    <div className="p-8 rounded-2xl bg-black/40 border border-white/5 font-mono text-sm leading-relaxed">
                      <div className="flex gap-4">
                        <span className="text-secondary/40">Contact:</span>
                        <span className="text-pink-500 font-bold">{pillar.contact.email}</span>
                      </div>
                      <div className="flex gap-4 mt-2">
                        <span className="text-secondary/40">Subject line:</span>
                        <span className="text-secondary/80 font-bold">{pillar.contact.subject}</span>
                      </div>
                    </div>
                  )}

                  {/* Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* What to include */}
                    {pillar.includeInReport && (
                      <div>
                        <h4 className="text-sm font-bold mb-6 text-primary">What to include in your report:</h4>
                        <ul className="space-y-4">
                          {pillar.includeInReport.map((item: string, idx: number) => (
                            <li key={idx} className="flex gap-4 text-sm text-secondary/70 leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* What to expect */}
                    {pillar.whatToExpect && (
                      <div>
                        <h4 className="text-sm font-bold mb-6 text-primary">What to expect:</h4>
                        <ul className="space-y-4">
                          {pillar.whatToExpect.map((item: string, idx: number) => (
                            <li key={idx} className="flex gap-4 text-sm text-secondary/70 leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Commitment Box */}
                  {pillar.commitment && (
                    <div className="p-8 rounded-2xl bg-pink-500/5 border-l-2 border-pink-500/40 italic">
                      <p className="text-sm text-secondary/60 leading-relaxed">
                        {pillar.commitment}
                      </p>
                    </div>
                  )}

                  {/* Footer Notes */}
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    {pillar.footerNote && (
                      <p className="text-sm text-secondary/80 leading-relaxed">
                        {pillar.footerNote}
                      </p>
                    )}
                    {pillar.outOfScope && (
                      <p className="text-xs font-mono text-secondary/40 leading-relaxed">
                        {pillar.outOfScope}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Standard Pillar Content */
                <div className="space-y-8">
                  {pillar.description && (
                    <p className="text-secondary leading-relaxed">{pillar.description}</p>
                  )}

                  {pillar.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pillar.features.map((f: any) => (
                        <div key={f.label} className="p-10 rounded-[1.5rem] bg-[#0A0A0B]/60 border border-white/[0.03] hover:border-pink-500/20 transition-all duration-500 group/feature backdrop-blur-md">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
                              <Check className="text-white w-3 h-3 stroke-[4]" />
                            </div>
                            <h4 className="text-xl font-bold text-primary group-hover/feature:text-pink-500 transition-colors">
                              {f.label}
                            </h4>
                          </div>
                          <p className="text-sm text-secondary/60 leading-relaxed font-medium">
                            {f.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* HTTP Headers Table */}
      <div className="mb-32">
        <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04] overflow-hidden">
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 rounded-[1.25rem] bg-[#1A0B13]">
              <Code className=" text-[#FF2D6B]" size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">HTTP Security Headers</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.05]">
                  <th className="pb-6 text-[13px] font-mono font-medium text-secondary/60 w-1/3">Header</th>
                  <th className="pb-6 text-[13px] font-mono font-medium text-secondary/60">Configuration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {content.headers.map((h) => (
                  <tr key={h.name} className="group transition-colors hover:bg-white/[0.01]">
                    <td className="py-6 pr-8 align-top">
                      <span className="text-[13px] font-mono text-[#FF2D6B] tracking-tight whitespace-nowrap">
                        {h.name}
                      </span>
                    </td>
                    <td className="py-6 align-top">
                      <code className="text-[13px] text-secondary/70 font-mono leading-relaxed">
                        {h.value}
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {content.headerFooter && (
            <p className="mt-8 text-secondary/50 text-[13px] leading-relaxed max-w-5xl">
              {content.headerFooter}
            </p>
          )}
        </Card>
      </div>

      {/* What We Do Not Do */}
      <div className="mb-32">
        <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04] overflow-hidden">
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 rounded-[1.25rem] bg-[#FF2D6B]">
              <CircleSlash className="fill-white text-[#FF2D6B]" size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">What We Do Not Do</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {content.whatWeDoNotDo.map((item) => (
              <div key={item} className="flex gap-5 items-start">
                <X className="text-[#FF2D6B] w-6 h-6 shrink-0 mt-0.5 opacity-90" strokeWidth={2.5} />
                <span className="text-[17px] text-secondary/70 leading-relaxed font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Limitations and Honest Disclosures */}
      <div className="mb-32">
        <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04] overflow-hidden">
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 rounded-[1.25rem] bg-[#1A0B13]">
              <Info className="fill-[#64748B] text-[#1A0B13]" size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">{content.limitations.title}</h3>
          </div>

          <p className="text-secondary/60 mb-10 text-[15px] italic leading-relaxed">{content.limitations.intro}</p>

          <ul className="space-y-6">
            {content.limitations.items.map((item) => (
              <li key={item.title} className="flex gap-4 items-start relative ml-2">
                <span className="text-secondary/60 font-bold text-[18px] leading-none mt-0.5">•</span>
                <p className="text-secondary/50 leading-relaxed italic text-[15px] pr-4 md:pr-12">
                  <span className="font-bold text-secondary/80 mr-2">{item.title}</span>
                  {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Reporting a Vulnerability */}
      <div className="mb-32">
        <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04]">
          <div className="flex items-center gap-5 mb-10">
            <div className="p-4 rounded-[1.25rem] bg-[#1A0B13]">
              <Mail className="fill-[#FF2D6B] text-[#1A0B13]" size={24} strokeWidth={2.5} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">{content.reporting.title}</h3>
          </div>

          <div className="space-y-3 mb-8 pl-1">
            <div className="flex gap-4 items-center">
              <span className="text-secondary/50 font-mono text-sm w-16">Email:</span>
              <span className="text-pink-500 font-mono text-sm tracking-tight">{content.reporting.email}</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-secondary/50 font-mono text-[13px] w-16">Subject:</span>
              <span className="text-secondary/90 font-mono text-[13px]">{content.reporting.subject}</span>
            </div>
          </div>

          <p className="text-secondary/60 leading-relaxed text-[15px] pl-1 max-w-3xl">
            {content.reporting.thankYou}
          </p>
        </Card>
      </div>
    </>
  );
}
