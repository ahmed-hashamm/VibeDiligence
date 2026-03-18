import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import GridBackground from "@/animations/svgs/GridBackground";
import { Download, Share2, ShieldAlert, CheckCircle2, TrendingUp } from "lucide-react";

/**
 * ExampleReportPage: A static demo of a full audit report.
 */
export default function ExampleReportPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <Badge variant="pink" className="mb-4">PREMIUM EXAMPLE REPORT</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">facebook/react</h1>
            <p className="text-text-secondary mt-2 font-mono text-sm">Audit Date: March 15, 2024 • Version 18.2.0</p>
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
              <div className="text-8xl font-bold text-success drop-shadow-[0_0_30px_rgba(22,199,132,0.3)]">94</div>
              <div className="text-xs font-mono text-text-muted absolute -top-4 -right-8 bg-surface px-2 py-1 border border-border rounded">GLOBAL</div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Vibe: Ready to Scale</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Institutional-grade maturity. This codebase represents the gold standard for performance and scalability.
            </p>
          </Card>

          {/* Metric Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-mono font-bold text-text-muted uppercase tracking-widest">Security</h4>
                  <span className="text-success font-bold text-xl">98%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-success w-[98%]" />
                </div>
              </div>
              <p className="text-xs text-text-secondary">0 Critical, 0 High vulnerabilities detected.</p>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-mono font-bold text-text-muted uppercase tracking-widest">Scalability</h4>
                  <span className="text-warning font-bold text-xl">82%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-warning w-[82%]" />
                </div>
              </div>
              <p className="text-xs text-text-secondary">Potential bottlenecks in concurrent state updates.</p>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-mono font-bold text-text-muted uppercase tracking-widest">Code Quality</h4>
                  <span className="text-success font-bold text-xl">91%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-success w-[91%]" />
                </div>
              </div>
              <p className="text-xs text-text-secondary">Strict typing and consistent architectural patterns.</p>
            </Card>

            <Card className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-sm font-mono font-bold text-text-muted uppercase tracking-widest">Readiness</h4>
                  <span className="text-success font-bold text-xl">100%</span>
                </div>
                <div className="h-1.5 w-full bg-border rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-success w-[100%]" />
                </div>
              </div>
              <p className="text-xs text-text-secondary">CI/CD pipelines and testing coverage at max capacity.</p>
            </Card>
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
            <div className="p-4 rounded-xl border border-success/20 bg-success/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <CheckCircle2 size={24} className="text-success" />
                <div>
                  <h5 className="font-bold">Virtual DOM Optimization</h5>
                  <p className="text-sm text-text-secondary">Reconciliation algorithms are highly optimized for leaf-node updates.</p>
                </div>
              </div>
              <Badge variant="success">LOW PRIORITY</Badge>
            </div>
            <div className="p-4 rounded-xl border border-warning/20 bg-warning/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <TrendingUp size={24} className="text-warning" />
                <div>
                  <h5 className="font-bold">State Management Bottleneck</h5>
                  <p className="text-sm text-text-secondary">High frequency updates in deep trees could benefit from transition signals.</p>
                </div>
              </div>
              <Badge variant="warning">MEDIUM PRIORITY</Badge>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
