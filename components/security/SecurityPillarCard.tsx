/**
 * @file SecurityPillarCard.tsx
 * @description Individual security pillar card with complex conditional content.
 */

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Check, ShieldCheck } from "lucide-react";

import { SecurityPillar } from "@/types/audit";

interface SecurityPillarCardProps {
  pillar: SecurityPillar;
  Icon: any;
}

/**
 * SecurityPillarCard component.
 * Handles specialized rendering for Infra, Payment, Data Protection, and Disclosure pillars.
 */
export default function SecurityPillarCard({ pillar, Icon }: SecurityPillarCardProps) {
  const isDisclosure = pillar.title === "Responsible Disclosure";
  const isDataProtection = pillar.title === "Data Protection";
  const isPayment = pillar.title === "Payment Security";
  const isInfra = pillar.title === "Infrastructure Security";
  const isAppSec = pillar.title === "Application Security";

  return (
    <Card
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
        <div className="space-y-12">
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
          <div className="p-8 rounded-2xl bg-pink-500/[0.03] border border-pink-500/10 relative group/caution overflow-hidden">
            <div className="absolute left-0 top-0 w-1 h-full bg-pink-500/40" />
            <p className="text-xs text-secondary/60 leading-relaxed italic">
              {pillar.caution}
            </p>
          </div>
        </div>
      ) : isDisclosure ? (
        <div className="space-y-10">
          <p className="text-secondary/90 leading-relaxed text-lg">{pillar.intro}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
          {pillar.commitment && (
            <div className="p-8 rounded-2xl bg-pink-500/5 border-l-2 border-pink-500/40 italic">
              <p className="text-sm text-secondary/60 leading-relaxed">
                {pillar.commitment}
              </p>
            </div>
          )}
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
}
