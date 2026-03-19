/**
 * @file SecurityHeadersTable.tsx
 * @description Renders the HTTP Security Headers table.
 */

import { Card } from "@/components/ui/Card";
import { Code } from "lucide-react";

interface Header {
  name: string;
  value: string;
}

interface SecurityHeadersTableProps {
  headers: Header[];
  footer?: string;
}

/**
 * SecurityHeadersTable component.
 * Displays technical security configurations in an institutional table format.
 */
export default function SecurityHeadersTable({ headers, footer }: SecurityHeadersTableProps) {
  return (
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
              {headers.map((h) => (
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

        {footer && (
          <p className="mt-8 text-secondary/50 text-[13px] leading-relaxed max-w-5xl">
            {footer}
          </p>
        )}
      </Card>
    </div>
  );
}
