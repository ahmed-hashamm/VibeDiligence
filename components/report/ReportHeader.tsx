/**
 * @file ReportHeader.tsx
 * @description Header section of the audit report, containing repository info and actions.
 */

import { Button } from "@/components/ui/Button";
import StatusEyebrow from "@/components/ui/StatusEyebrow";
import { Share2, Download } from "lucide-react";
import { ReportData } from "@/types/audit";

interface ReportHeaderProps {
  data: ReportData;
}

/**
 * ReportHeader component.
 * Displays repository identity, version, audit date, and primary actions.
 */
export default function ReportHeader({ data }: ReportHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 animate-enter">
      <div className="space-y-6">
        <StatusEyebrow text={data.id} />
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
          {data.repo}
        </h1>
        <p className="text-[11px] font-mono font-bold text-secondary/40 uppercase tracking-[0.2em] flex items-center gap-3">
          VERSION: {data.version} <span className="opacity-30">•</span> AUDITED: {data.date}
        </p>
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" className="bg-surface/40 hover:bg-surface/60 border-white/5 h-12 px-8 text-[11px] font-bold tracking-[0.2em] uppercase gap-3">
          <Share2 size={16} /> SHARE
        </Button>
        <Button variant="ghost" className="bg-white/5 hover:bg-white/10 border-white/5 h-12 px-8 text-[11px] font-bold tracking-[0.2em] uppercase gap-3">
          <Download size={16} /> EXPORT PDF
        </Button>
      </div>
    </div>
  );
}
