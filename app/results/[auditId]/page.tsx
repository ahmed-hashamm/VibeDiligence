import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import GridBackground from "@/animations/svgs/GridBackground";
import { Lock, FileText, Download, CheckCircle, ShieldIcon } from "lucide-react";

/**
 * ResultsPage: The "teaser" result with a paywall overlay.
 */
export default function ResultsPage({ params }: { params: { auditId: string } }) {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Audit Results"
          heading="Scan Complete."
          subheading="We've processed your repository. Your technical due diligence report is ready for unlocking."
        />

        <div className="max-w-5xl mx-auto relative">
          {/* Teaser Content (Blurred/Faded) */}
          <div className="space-y-8 opacity-40 pointer-events-none blur-[2px] scale-[0.99] transition-all">
            <Card className="p-8">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-bold">organization/private-repo</h3>
                <div className="text-5xl font-bold text-warning">68</div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-surface rounded-xl border border-border" />)}
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-8">
              <Card className="h-64" />
              <Card className="h-64" />
            </div>
          </div>

          {/* Paywall Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
            <Card className="max-w-lg w-full p-10 md:p-12 border-pink-500/50 shadow-[0_0_80px_rgba(255,45,107,0.2)] bg-surface-raised/95 backdrop-blur-md text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 mx-auto mb-8">
                <Lock size={32} />
              </div>

              <h3 className="text-3xl font-bold mb-4">Report Locked</h3>
              <p className="text-secondary mb-8 leading-relaxed">
                Your institutional-grade audit for <span className="text-primary font-bold">organization/private-repo</span> is ready.
                Pay once to unlock the full interactive report and PDF download.
              </p>

              <div className="space-y-4 mb-10 text-left bg-bg/50 p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle size={16} className="text-success" />
                  <span>Full Security Vulnerability List</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle size={16} className="text-success" />
                  <span>Interactive Scalability Analysis</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle size={16} className="text-success" />
                  <span>PDF Export for VC/LPs</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button className="w-full py-4 text-lg h-auto">Unlock Report • $49</Button>
                <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-muted uppercase">
                  <span>SECURE PADDLE CHECKOUT</span>
                  <span>•</span>
                  <span>INSTANT ACCESS</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-20 text-center">
          <p className="text-muted mb-4">Questions about this audit?</p>
          <a href="mailto:support@vibediligence.com" className="flex items-center justify-center gap-2 text-pink-500 hover:text-pink-400 font-medium transition-colors">
            <ShieldIcon size={16} /> Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
