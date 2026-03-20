/**
 * @file UnlockedReport.tsx
 * @description Full unlocked audit report view for paid audits.
 * Displays all scores, issues, critical findings, and top 5 fixes with PDF download.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, AlertTriangle, CheckCircle2, ShieldAlert, XCircle } from "lucide-react";
import { SECTION_LABELS, VERDICT_CONFIG, PRIORITY_COLORS } from "@/data/audit-labels";
import { getScoreColor } from "@/types/audit";
import type { AuditRow, AuditResult } from "@/types/audit";
import ScrollReveal from "@/components/ScrollReveal";

interface UnlockedReportProps {
  audit: AuditRow;
}

/**
 * UnlockedReport component.
 * Full report view with all findings, PDF download, and section detail cards.
 */
export default function UnlockedReport({ audit }: UnlockedReportProps) {
  const scores = audit.scores;
  const verdictConfig = VERDICT_CONFIG[scores.verdict as keyof typeof VERDICT_CONFIG];
  const repoName = audit.repo_url.replace("https://github.com/", "");

  const sections: { key: keyof Pick<AuditResult, "security" | "production_readiness" | "code_quality" | "scalability">; label: string }[] = [
    { key: "security", label: SECTION_LABELS.security },
    { key: "production_readiness", label: SECTION_LABELS.production_readiness },
    { key: "code_quality", label: SECTION_LABELS.code_quality },
    { key: "scalability", label: SECTION_LABELS.scalability },
  ];

  return (
    <div className="container mx-auto px-6 relative z-10">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Full Audit Report"
          heading="Report Unlocked."
          subheading={`Complete technical audit for ${repoName}`}
        />
      </ScrollReveal>

      {/* Header with score + PDF download */}
      <ScrollReveal delay={0.2}>
        <div className="max-w-5xl mx-auto mb-16">
          <Card className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{repoName}</h2>
                <div className="flex items-center gap-4">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold border"
                    style={{
                      color: verdictConfig?.color ?? "#F0F0FF",
                      borderColor: `${verdictConfig?.color ?? "#F0F0FF"}40`,
                      backgroundColor: `${verdictConfig?.color ?? "#F0F0FF"}10`,
                    }}
                  >
                    {verdictConfig?.label ?? scores.verdict}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p
                    className="text-6xl font-black font-mono"
                    style={{ color: getScoreColor(scores.overall_score) }}
                  >
                    {scores.overall_score}
                  </p>
                  <p className="text-xs font-mono text-muted mt-1">OVERALL</p>
                </div>
                <a href={`/api/report/${audit.id}`}>
                  <Button variant="ghost" className="gap-2">
                    <Download size={16} /> Download PDF
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </ScrollReveal>

      {/* Section score cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {sections.map((s, index) => {
          const section = scores[s.key];
          return (
            <ScrollReveal key={s.key} delay={0.1 * index}>
              <Card className="p-8 h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-bold">{s.label}</h3>
                  <span
                    className="text-3xl font-bold font-mono"
                    style={{ color: getScoreColor(section.score) }}
                  >
                    {section.score}
                  </span>
                </div>

                {/* Critical issues */}
                {section.critical.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-mono text-[#FF4444] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <ShieldAlert size={12} /> Critical Issues
                    </p>
                    <ul className="space-y-2">
                      {section.critical.map((c, i) => (
                        <li key={i} className="text-sm text-secondary/80 flex items-start gap-2">
                          <XCircle size={14} className="text-[#FF4444] flex-shrink-0 mt-0.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Issues */}
                {section.issues.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                      <AlertTriangle size={12} /> Issues Found
                    </p>
                    <ul className="space-y-2">
                      {section.issues.map((issue, i) => (
                        <li key={i} className="text-sm text-secondary/60 flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-muted flex-shrink-0 mt-0.5" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Top 5 Fixes */}
      <div className="max-w-5xl mx-auto mb-20">
        <ScrollReveal>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-6">
            Top 5 Fixes
            <div className="h-px flex-1 bg-white/5" />
          </h2>
        </ScrollReveal>
        <div className="space-y-4">
          {scores.top_5_fixes.map((fix, i) => (
            <ScrollReveal key={i} delay={0.1 * i} direction="left">
              <Card className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-black font-mono text-muted/30">{i + 1}</span>
                  <div>
                    <p className="font-semibold mb-1">{fix.issue}</p>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded"
                        style={{
                          color: PRIORITY_COLORS[fix.priority as keyof typeof PRIORITY_COLORS],
                          backgroundColor: `${PRIORITY_COLORS[fix.priority as keyof typeof PRIORITY_COLORS]}15`,
                        }}
                      >
                        {fix.priority}
                      </span>
                      <span className="text-xs text-muted font-mono">~{fix.est_hours}h estimated</span>
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Support */}
      <ScrollReveal delay={0.5}>
        <div className="text-center">
          <p className="text-muted mb-4">Questions about this audit?</p>
          <a href="mailto:support@vibediligence.com" className="flex items-center justify-center gap-2 text-pink-500 hover:text-pink-400 font-medium transition-colors">
            Contact Support
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
