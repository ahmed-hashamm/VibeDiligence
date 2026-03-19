/**
 * @file example-report/page.tsx
 * @description A static demonstration page showing a sample audit report.
 * Rule: Imports and JSX only. Pure entry point.
 */

import GridBackground from "@/animations/svgs/GridBackground";
import ReportContent from "@/components/report/ReportContent";

/**
 * ExampleReportPage component.
 * Displays a high-profile repository audit demonstration using modular components.
 */
export default function ExampleReportPage() {
  return (
    <main className="min-h-screen pt-32 pb-40 bg-bg relative overflow-hidden hero-bg">
      <GridBackground />
      <ReportContent />
    </main>
  );
}
