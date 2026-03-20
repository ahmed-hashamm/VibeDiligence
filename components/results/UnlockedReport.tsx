/**
 * @file UnlockedReport.tsx
 * @description Full unlocked audit report view for paid audits.
 * Displays all scores, issues, critical findings, and top 5 fixes with PDF download.
 */

/**
 * @file UnlockedReport.tsx
 * @description Full unlocked audit report view for paid audits.
 * Displays all scores, issues, critical findings, and top 5 fixes with PDF download.
 */

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Download, AlertTriangle, CheckCircle2, ShieldAlert, XCircle, MapPin, Wrench, Zap, ChevronDown } from "lucide-react";
import { SECTION_LABELS, VERDICT_CONFIG, PRIORITY_COLORS } from "@/data/audit-labels";
import { getScoreColor } from "@/types/audit";
import type { AuditRow, AuditResult, AuditIssue } from "@/types/audit";
import ScrollReveal from "@/components/ScrollReveal";

interface UnlockedReportProps {
  audit: AuditRow;
}

const SEVERITY_COLORS: Record<AuditIssue["severity"], string> = {
  critical: "#FF4444",
  high: "#FF7A00",
  medium: "#F0A500",
  low: "#16C784",
};

/**
 * IssueCard — renders a single detailed AuditIssue with location, snippet, explanation, fix.
 */
function IssueCard({ issue }: { issue: AuditIssue }) {
  return (
    <div className="border border-white/5 rounded-lg p-5 space-y-4 bg-white/[0.02]">
      {/* Title + severity */}
      <div className="flex items-start justify-between gap-4">
        <p className="font-semibold text-sm">{issue.title}</p>
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded flex-shrink-0"
          style={{
            color: SEVERITY_COLORS[issue.severity],
            backgroundColor: `${SEVERITY_COLORS[issue.severity]}15`,
          }}
        >
          {issue.severity}
        </span>
      </div>

      {/* Location */}
      {issue.location && issue.location !== "N/A" && (
        <div className="flex items-center gap-2 text-xs text-muted font-mono">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{issue.location}</span>
        </div>
      )}

      {/* Code snippet */}
      {issue.code_snippet && issue.code_snippet !== "N/A" && (
        <pre className="text-sm font-mono bg-black/40 border border-white/5 rounded p-4 overflow-x-auto text-primary/90 whitespace-pre-wrap leading-relaxed">
          {issue.code_snippet}
        </pre>
      )}

      {/* Explanation */}
      <p className="text-xs text-secondary/60 leading-relaxed">{issue.explanation}</p>

      {/* Fix */}
      <div className="border-t border-white/5 pt-3">
        <p className="text-[10px] font-mono text-[#16C784] uppercase tracking-widest mb-2 flex items-center gap-1">
          <Wrench size={10} /> Fix
        </p>
        <p className="text-xs text-secondary/70 leading-relaxed font-mono">{issue.fix}</p>
      </div>
    </div>
  );
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
        <div className="max-w-5xl mx-auto mb-10">
          <Card className="p-8 md:p-12 border-white/5 bg-surface/20 rounded-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-800/80" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{repoName}</h2>
                <div className="flex items-center gap-4">
                  <span
                    className="px-4 py-2 rounded-full text-sm font-bold border"
                    style={{
                      color: verdictConfig?.color ?? "#ff2d6b",
                      borderColor: `${verdictConfig?.color ?? "#ff2d6b"}40`,
                      backgroundColor: `${verdictConfig?.color ?? "#ff2d6b"}10`,
                    }}
                  >
                    {verdictConfig?.label ?? scores.verdict}
                  </span>
                  <span className="text-xs font-mono text-muted">
                    {new Date(audit.created_at).toLocaleDateString()}
                  </span>
                </div>
                {/* Verdict reasoning */}
                {scores.verdict_reasoning && (
                  <p className="text-sm text-secondary/60 max-w-md leading-relaxed">
                    {scores.verdict_reasoning}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p
                    className="text-8xl font-black font-mono"
                    style={{ color: getScoreColor(scores.overall_score) }}
                  >
                    {scores.overall_score}
                  </p>
                  <p className="text-sm font-mono text-muted mt-1">OVERALL</p>
                </div>
                <a href={`/api/report/${audit.id}`}>
                  <Button variant="primary" className="gap-2">
                    <Download size={16} /> Download PDF
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </ScrollReveal>

      {/* Executive Summary */}
      {scores.executive_summary && (
        <ScrollReveal delay={0.25}>
          <div className="max-w-5xl mx-auto mb-10">
            <Card className="p-8 border-white/5 bg-surface/20 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-pink-600/80" />
              <div className="relative z-10">
                <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Executive Summary</p>
                <p className="text-secondary/80 leading-relaxed">{scores.executive_summary}</p>
              </div>
            </Card>
          </div>
        </ScrollReveal>
      )}

      {/* Metrics Grid (Score Boxes) - Replicated from Example UI */}
      <ScrollReveal delay={0.28}>
        <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s) => {
            const section = scores[s.key];
            const color = getScoreColor(section.score);
            let statusLabel = "CRITICAL RISK";
            if (section.score >= 80) statusLabel = "STRONG";
            else if (section.score >= 60) statusLabel = "MODERATE";
            else if (section.score >= 40) statusLabel = "ATTENTION NEEDED";

            return (
              <Card key={s.key} className="p-10 border-white/5 bg-surface/20 rounded-sm relative overflow-hidden flex flex-col justify-between group">
                <div
                  className="absolute top-0 left-0 w-1.5 h-full opacity-80"
                  style={{ backgroundColor: color }}
                />

                <div className="flex justify-between items-start mb-8">
                  <span className="text-[11px] font-mono font-bold text-secondary/40 uppercase tracking-[0.2em]">
                    {s.label}
                  </span>
                  <span className="text-3xl font-bold font-mono" style={{ color }}>
                    {section.score}%
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${section.score}%`, backgroundColor: color }}
                    />
                  </div>
                  <p className="text-[10px] font-mono font-bold text-secondary/30 uppercase tracking-[0.1em]">
                    {statusLabel}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Strengths */}
      {scores.strengths && scores.strengths.length > 0 && (
        <ScrollReveal delay={0.3}>
          <div className="max-w-5xl mx-auto mb-16">
            <Card className="p-8">
              <p className="text-xs font-mono text-[#16C784] uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 size={12} /> What This Codebase Does Well
              </p>
              <ul className="space-y-2">
                {scores.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-secondary/70 flex items-start gap-2">
                    <Zap size={13} className="text-[#16C784] flex-shrink-0 mt-0.5" />
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </ScrollReveal>
      )}

      {/* Section detail cards */}
      <div className="max-w-5xl mx-auto space-y-8 mb-16">
        {sections.map((s, index) => {
          const section = scores[s.key];
          return (
            <ScrollReveal key={s.key} delay={0.1 * index}>
              <Card className="p-8">
                {/* Section header */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{s.label}</h3>
                  <span
                    className="text-3xl font-bold font-mono"
                    style={{ color: getScoreColor(section.score) }}
                  >
                    {section.score}
                  </span>
                </div>

                {/* Summary */}
                {section.summary && (
                  <p className="text-sm text-secondary/60 leading-relaxed mb-6">{section.summary}</p>
                )}

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

                {/* Detailed issues */}
                {section.issues.length > 0 && (
                  <div>
                    <p className="text-xs font-mono text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                      <AlertTriangle size={12} /> Issues Found ({section.issues.length})
                    </p>
                    <div className="space-y-4">
                      {section.issues.map((issue, i) => (
                        <IssueCard key={i} issue={issue} />
                      ))}
                    </div>
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
              <Card className="p-6 flex flex-col gap-4">
                {/* Top row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-black font-mono text-muted/30">{i + 1}</span>
                    <div>
                      <p className="font-semibold mb-1">{fix.issue}</p>
                      <div className="flex items-center gap-3 flex-wrap">
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
                        {fix.location && (
                          <span className="text-xs text-muted font-mono flex items-center gap-1">
                            <MapPin size={10} /> {fix.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact */}
                {fix.impact && (
                  <p className="text-xs text-secondary/60 leading-relaxed pl-10">{fix.impact}</p>
                )}

                {/* Fix steps */}
                {fix.fix_steps && fix.fix_steps.length > 0 && (
                  <div className="pl-10">
                    <p className="text-[10px] font-mono text-[#16C784] uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Wrench size={10} /> Steps to Fix
                    </p>
                    <ol className="space-y-1">
                      {fix.fix_steps.map((step, j) => (
                        <li key={j} className="text-xs text-secondary/60 flex items-start gap-2">
                          <span className="font-mono text-muted/50 flex-shrink-0">{j + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
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
