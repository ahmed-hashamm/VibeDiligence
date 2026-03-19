/**
 * @file SecurityExclusions.tsx
 * @description Renders the 'What We Do Not Do' exclusion list.
 */

import { Card } from "@/components/ui/Card";
import { CircleSlash, X } from "lucide-react";

interface SecurityExclusionsProps {
  items: string[];
}

/**
 * SecurityExclusions component.
 * Transparently lists out-of-scope security practices.
 */
export default function SecurityExclusions({ items }: SecurityExclusionsProps) {
  return (
    <div className="mb-32">
      <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04] overflow-hidden">
        <div className="flex items-center gap-5 mb-10">
          <div className="p-4 rounded-[1.25rem] bg-[#FF2D6B]">
            <CircleSlash className="fill-white text-[#FF2D6B]" size={24} strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">What We Do Not Do</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {items.map((item) => (
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
  );
}
