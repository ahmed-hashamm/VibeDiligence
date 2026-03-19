/**
 * @file ReportContent.tsx
 * @description Orchestrates the internal sections of the Example Report page.
 */

import ReportHeader from "./ReportHeader";
import ReportScoreCard from "./ReportScoreCard";
import ReportMetricsGrid from "./ReportMetricsGrid";
import ReportFindingsList from "./ReportFindingsList";
import { EXAMPLE_REPORT_DATA } from "@/data/landing";

/**
 * ReportContent component.
 * Assembles the high-fidelity audit report demonstration.
 */
export default function ReportContent() {
  const data = EXAMPLE_REPORT_DATA;

  return (
    <div className="max-w-[1400px] mx-auto px-12 relative z-10">
      <ReportHeader data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-32">
        <ReportScoreCard
          score={data.global_score}
          verdict={data.verdict}
          description={data.verdict_desc}
        />
        <ReportMetricsGrid metrics={data.metrics} />
      </div>

      <ReportFindingsList findings={data.findings} />
    </div>
  );
}
