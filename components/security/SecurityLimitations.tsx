/**
 * @file SecurityLimitations.tsx
 * @description Renders the 'Limitations and Honest Disclosures' section.
 */

import { Card } from "@/components/ui/Card";
import { Info } from "lucide-react";

interface LimitationItem {
  title: string;
  desc: string;
}

interface SecurityLimitationsProps {
  title: string;
  intro: string;
  items: LimitationItem[];
}

/**
 * SecurityLimitations component.
 * Provides critical context on what the agentic audit can and cannot verify.
 */
export default function SecurityLimitations({ title, intro, items }: SecurityLimitationsProps) {
  return (
    <div className="mb-32">
      <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04] overflow-hidden">
        <div className="flex items-center gap-5 mb-10">
          <div className="p-4 rounded-[1.25rem] bg-[#1A0B13]">
            <Info className="fill-[#64748B] text-[#1A0B13]" size={24} strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        </div>

        <p className="text-secondary/60 mb-10 text-[15px] italic leading-relaxed">{intro}</p>

        <ul className="space-y-6">
          {items.map((item) => (
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
  );
}
