/**
 * @file example-report/page.tsx
 * @description A static demonstration page showing a sample audit report.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import GridBackground from "@/animations/svgs/GridBackground";
import { Download, Share2, CheckCircle2, TrendingUp } from "lucide-react";
import { EXAMPLE_REPORT_DATA } from "@/data/landing";

/**
 * ExampleReportPage component.
 * Rule: Imports and JSX only. Displays the mock results of a high-profile repository.
 */
export default function ExampleReportPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Badge variant="pink" className="mb-4">PREMIUM EXAMPLE REPORT</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{EXAMPLE_REPORT_DATA.repo}</h1>
            <p className="text-secondary mt-2 font-mono text-sm">
              Audit Date: {EXAMPLE_REPORT_DATA.date} • Version {EXAMPLE_REPORT_DATA.version}
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="gap-2">
              <Download size={18} /> Export PDF
            </Button>
            <Button variant="ghost" className="gap-2">
              <Share2 size={18} /> Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Score Column */}
          <Card className="lg:col-span-1 flex flex-col items-center justify-center text-center p-12">
            <div className="relative mb-8">
              <div className="text-8xl font-bold text-success drop-shadow-[0_0_30px_rgba(22,199,132,0.3)]">
                {EXAMPLE_REPORT_DATA.global_score}
              </div>
              <div className="text-xs font-mono text-muted absolute -top-4 -right-8 bg-surface px-2 py-1 border border-border rounded">GLOBAL</div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Vibe: {EXAMPLE_REPORT_DATA.verdict}</h3>
            <p className="text-secondary text-sm leading-relaxed">
              {EXAMPLE_REPORT_DATA.verdict_desc}
            </p>
          </Card>

          {/* Metric Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXAMPLE_REPORT_DATA.metrics.map((m) => (
              <Card key={m.label} className="flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-sm font-mono font-bold text-muted uppercase tracking-widest">{m.label}</h4>
                    <span className={m.color === "success" ? "text-success font-bold text-xl" : "text-warning font-bold text-xl"}>
                      {m.score}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-4">
                    <div className={`h-full bg-${m.color} w-[${m.score}%]`} style={{ width: `${m.score}%` }} />
                  </div>
                </div>
                <p className="text-xs text-secondary">{m.status}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Findings Teaser */}
        <Card className="p-8">
          <SectionHeader
            eyebrow="Key Findings"
            heading="Top 5 Recommendations"
            center={false}
            className="mb-8 max-w-none text-left"
          />
          <div className="space-y-4">
            {EXAMPLE_REPORT_DATA.findings.map((f) => (
              <div 
                key={f.title} 
                className={`p-4 rounded-xl border border-${f.variant}/20 bg-${f.variant}/5 flex justify-between items-center`}
              >
                <div className="flex items-center gap-4">
                  {f.variant === "success" ? <CheckCircle2 size={24} className="text-success" /> : <TrendingUp size={24} className="text-warning" />}
                  <div>
                    <h5 className="font-bold">{f.title}</h5>
                    <p className="text-sm text-secondary">{f.desc}</p>
                  </div>
                </div>
                <Badge variant={f.variant}>{f.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
