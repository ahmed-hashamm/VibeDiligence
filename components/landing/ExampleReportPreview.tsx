import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import ScanLine from "@/animations/svgs/ScanLine";

/**
 * ExampleReportPreview: A teaser card for the audit report.
 */
export default function ExampleReportPreview() {
  return (
    <div className="relative group max-w-4xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <Card className="relative p-0 overflow-hidden border-border-glow bg-surface-raised">
        <ScanLine />
        
        {/* Mock Report UI */}
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <Badge variant="pink" className="mb-4">REAL-TIME PREVIEW</Badge>
              <h3 className="text-3xl font-bold">facebook/react</h3>
              <p className="text-text-secondary text-sm font-mono mt-1">Audit ID: 8f2b-9a1c-5d3e</p>
            </div>
            <div className="text-right">
              <div className="text-6xl font-bold text-success">94</div>
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Global Vibe Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-success w-[94%]" />
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-text-secondary uppercase">Security</span>
                <span className="text-success">98/100</span>
              </div>
              
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-success w-[90%]" />
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-text-secondary uppercase">Quality</span>
                <span className="text-success">90/100</span>
              </div>
            </div>
            
            <div className="bg-bg/50 rounded-xl p-6 border border-border">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                KEY VERDICT
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                The codebase demonstrates exceptionally high maturity. Dependency management is strict, and security patterns follow industry best practices. Ready for institutional-grade deployment.
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link href="/example-report">
              <Button variant="ghost" className="px-12">View Full Interactive Report</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
