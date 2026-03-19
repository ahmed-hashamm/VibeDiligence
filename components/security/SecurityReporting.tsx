/**
 * @file SecurityReporting.tsx
 * @description Renders the 'Reporting a Vulnerability' section.
 */

import { Card } from "@/components/ui/Card";
import { Mail } from "lucide-react";

interface SecurityReportingProps {
  title: string;
  email: string;
  subject: string;
  thankYou: string;
}

/**
 * SecurityReporting component.
 * Provides clear instructions for responsible security reporting.
 */
export default function SecurityReporting({ title, email, subject, thankYou }: SecurityReportingProps) {
  return (
    <div className="mb-32">
      <Card className="p-10 md:p-12 rounded-[2rem] border border-white/[0.04]">
        <div className="flex items-center gap-5 mb-10">
          <div className="p-4 rounded-[1.25rem] bg-[#1A0B13]">
            <Mail className="fill-[#FF2D6B] text-[#1A0B13]" size={24} strokeWidth={2.5} />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        </div>

        <div className="space-y-3 mb-8 pl-1">
          <div className="flex gap-4 items-center">
            <span className="text-secondary/50 font-mono text-sm w-16">Email:</span>
            <span className="text-pink-500 font-mono text-sm tracking-tight">{email}</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-secondary/50 font-mono text-[13px] w-16">Subject:</span>
            <span className="text-secondary/90 font-mono text-[13px]">{subject}</span>
          </div>
        </div>

        <p className="text-secondary/60 leading-relaxed text-[15px] pl-1 max-w-3xl">
          {thankYou}
        </p>
      </Card>
    </div>
  );
}
