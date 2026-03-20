/**
 * @file AuditReport.tsx
 * @description React-PDF document component for generating professional audit PDFs.
 * Uses @react-pdf/renderer primitives only — no HTML/CSS.
 */

import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { AuditRow, AuditResult, AuditIssue, AuditFix } from '@/types/audit';
import { getScoreColor } from '@/types/audit';

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg: '#0A0A0F',
  surface: '#111118',
  border: '#1E1E2E',
  borderLight: '#2A2A3E',
  primary: '#F0F0FF',
  secondary: '#9898B0',
  muted: '#555570',
  accent: '#7C6FFF',
  green: '#16C784',
  orange: '#FF7A00',
  yellow: '#F0A500',
  red: '#FF4444',
  white: '#FFFFFF',
};

const SEVERITY_COLORS: Record<AuditIssue['severity'], string> = {
  critical: C.red,
  high: C.orange,
  medium: C.yellow,
  low: C.green,
};

const PRIORITY_COLORS: Record<AuditFix['priority'], string> = {
  critical: C.red,
  high: C.orange,
  medium: C.yellow,
};

// ─── Styles ─────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    backgroundColor: C.bg,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica',
    color: C.primary,
  },

  // ── Header / Footer
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  pageHeaderTitle: { fontSize: 7, color: C.muted, letterSpacing: 2, textTransform: 'uppercase' },
  pageHeaderRight: { fontSize: 7, color: C.muted, fontFamily: 'Courier' },
  pageFooter: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 10,
  },
  pageFooterText: { fontSize: 7, color: C.muted },

  // ── Cover
  coverPage: {
    backgroundColor: C.bg,
    padding: 0,
    justifyContent: 'space-between',
  },
  coverTop: {
    backgroundColor: C.surface,
    padding: 48,
    paddingTop: 64,
    paddingBottom: 64,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  coverEyebrow: {
    fontSize: 8,
    color: C.accent,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 12,
    fontFamily: 'Courier',
  },
  coverTitle: { fontSize: 36, fontWeight: 'bold', color: C.white, marginBottom: 8, lineHeight: 1.15 },
  coverRepo: { fontSize: 14, color: C.secondary, fontFamily: 'Courier', marginBottom: 24 },
  coverMeta: { flexDirection: 'row', gap: 20, marginTop: 8 },
  coverMetaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
  },
  coverMetaBadgeText: { fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },

  coverBottom: { padding: 48, flex: 1, justifyContent: 'flex-end' },
  coverScoreRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, marginBottom: 4 },
  coverScoreNumber: { fontSize: 72, fontFamily: 'Courier-Bold', lineHeight: 1 },
  coverScoreLabel: { fontSize: 9, color: C.muted, letterSpacing: 2, marginBottom: 14 },
  coverScoreDesc: { fontSize: 11, color: C.secondary, maxWidth: 340, lineHeight: 1.6 },

  coverGrid: { flexDirection: 'row', gap: 12, marginTop: 32 },
  coverGridItem: {
    flex: 1,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 14,
  },
  coverGridLabel: { fontSize: 7, color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 },
  coverGridValue: { fontSize: 13, fontFamily: 'Courier-Bold' },

  // ── Section primitives
  sectionLabel: {
    fontSize: 7,
    color: C.muted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
    fontFamily: 'Courier',
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: C.white, marginBottom: 4 },
  sectionSubtitle: { fontSize: 10, color: C.secondary, lineHeight: 1.6, marginBottom: 20 },

  divider: { height: 1, backgroundColor: C.border, marginVertical: 20 },
  dividerLight: { height: 1, backgroundColor: C.borderLight, marginVertical: 12 },

  // ── Score overview
  scoreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  scoreCard: {
    width: '47.5%',
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 20,
  },
  scoreCardLabel: { fontSize: 8, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  scoreCardNumber: { fontSize: 32, fontFamily: 'Courier-Bold' },
  scoreCardBar: { height: 3, backgroundColor: C.border, borderRadius: 2, marginTop: 12 },
  scoreCardFill: { height: 3, borderRadius: 2 },
  scoreCardSummary: { fontSize: 8.5, color: C.secondary, lineHeight: 1.6, marginTop: 10 },

  // ── Issue card
  issueCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 6,
    padding: 14,
    marginBottom: 10,
  },
  issueCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  issueTitle: { fontSize: 10, fontWeight: 'bold', color: C.white, flex: 1, marginRight: 8, lineHeight: 1.4 },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  severityText: { fontSize: 7, fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'uppercase' },
  issueLocation: {
    fontSize: 8,
    color: C.accent,
    fontFamily: 'Courier',
    marginBottom: 8,
    backgroundColor: '#7C6FFF10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  issueSnippet: {
    backgroundColor: '#050508',
    borderWidth: 1,
    borderColor: C.borderLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    fontSize: 8.5,
    fontFamily: 'Courier',
    color: '#D0D0E0',
    lineHeight: 1.5,
  },
  issueExplanation: { fontSize: 9, color: C.secondary, lineHeight: 1.65, marginBottom: 8 },
  issueFix: {
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingTop: 8,
    marginTop: 4,
  },
  issueFixLabel: { fontSize: 7, color: C.green, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Courier' },
  issueFixText: { fontSize: 9, color: '#70C0A0', lineHeight: 1.65 },

  // ── Critical list
  criticalItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    backgroundColor: '#FF444408',
    borderLeftWidth: 2,
    borderLeftColor: C.red,
    paddingLeft: 10,
    paddingVertical: 6,
    paddingRight: 8,
    borderRadius: 4,
  },
  criticalDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.red,
    marginTop: 3,
    marginRight: 8,
    flexShrink: 0,
  },
  criticalText: { fontSize: 9, color: C.secondary, lineHeight: 1.6, flex: 1 },

  // ── Top 5 fixes
  fixCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 18,
    marginBottom: 12,
  },
  fixNumber: { fontSize: 9, color: C.muted, fontFamily: 'Courier', marginBottom: 6 },
  fixTitle: { fontSize: 11, fontWeight: 'bold', color: C.white, marginBottom: 6, lineHeight: 1.4 },
  fixMeta: { flexDirection: 'row', gap: 12, marginBottom: 10, alignItems: 'center' },
  fixPriorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  fixPriorityText: { fontSize: 7, fontWeight: 'bold', letterSpacing: 1.5, textTransform: 'uppercase' },
  fixHours: { fontSize: 8, color: C.muted, fontFamily: 'Courier' },
  fixLocation: { fontSize: 8, color: C.accent, fontFamily: 'Courier' },
  fixImpact: { fontSize: 9, color: C.secondary, lineHeight: 1.6, marginBottom: 10 },
  fixStepsLabel: { fontSize: 7, color: C.green, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Courier' },
  fixStep: { flexDirection: 'row', marginBottom: 5 },
  fixStepNum: { fontSize: 8.5, color: C.muted, fontFamily: 'Courier', marginRight: 8, flexShrink: 0 },
  fixStepText: { fontSize: 8.5, color: C.secondary, lineHeight: 1.6, flex: 1 },

  // ── Executive summary / strengths
  summaryBox: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  summaryText: { fontSize: 10, color: C.secondary, lineHeight: 1.75 },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 4,
  },
  strengthDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: C.green,
    marginTop: 3.5,
    marginRight: 10,
    flexShrink: 0,
  },
  strengthText: { fontSize: 9.5, color: C.secondary, lineHeight: 1.6, flex: 1 },

  // ── Verdict banner
  verdictBanner: {
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  verdictLabel: { fontSize: 7, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Courier' },
  verdictValue: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  verdictReasoning: { fontSize: 9.5, lineHeight: 1.7 },
});

// ─── Helpers ────────────────────────────────────────────────────────────────
function getVerdictConfig(verdict: AuditResult['verdict']) {
  const map = {
    ready_to_raise: { label: 'Ready to Raise', color: C.green },
    fix_first: { label: 'Fix First', color: C.yellow },
    needs_work: { label: 'Needs Work', color: C.red },
  };
  return map[verdict] ?? { label: verdict, color: C.secondary };
}

function getSectionLabel(key: string) {
  const map: Record<string, string> = {
    security: 'Security',
    production_readiness: 'Production Readiness',
    code_quality: 'Code Quality',
    scalability: 'Scalability',
  };
  return map[key] ?? key;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function PageHeader({ repo, section }: { repo: string; section: string }) {
  return (
    <View style={s.pageHeader}>
      <Text style={s.pageHeaderTitle}>VibeDiligence Audit — {repo}</Text>
      <Text style={s.pageHeaderRight}>{section}</Text>
    </View>
  );
}

function PageFooter({ page, total }: { page: number; total: number }) {
  return (
    <View style={s.pageFooter} fixed>
      <Text style={s.pageFooterText}>vibediligence.tech</Text>
      <Text style={s.pageFooterText}>CONFIDENTIAL</Text>
      <Text style={s.pageFooterText}>Page {page} of {total}</Text>
    </View>
  );
}

function IssueCardView({ issue }: { issue: AuditIssue }) {
  const color = SEVERITY_COLORS[issue.severity];
  return (
    <View style={s.issueCard} wrap={false}>
      <View style={s.issueCardHeader}>
        <Text style={s.issueTitle}>{issue.title}</Text>
        <View style={[s.severityBadge, { backgroundColor: `${color}20` }]}>
          <Text style={[s.severityText, { color }]}>{issue.severity}</Text>
        </View>
      </View>

      {issue.location && issue.location !== 'N/A' && (
        <Text style={s.issueLocation}>📍 {issue.location}</Text>
      )}

      {issue.code_snippet && issue.code_snippet !== 'N/A' && (
        <Text style={s.issueSnippet}>{issue.code_snippet}</Text>
      )}

      <Text style={s.issueExplanation}>{issue.explanation}</Text>

      <View style={s.issueFix}>
        <Text style={s.issueFixLabel}>→ Fix</Text>
        <Text style={s.issueFixText}>{issue.fix}</Text>
      </View>
    </View>
  );
}

function SectionPage({
  sectionKey,
  section,
  repoName,
  pageNum,
  totalPages,
}: {
  sectionKey: string;
  section: AuditResult['security'];
  repoName: string;
  pageNum: number;
  totalPages: number;
}) {
  const label = getSectionLabel(sectionKey);
  const color = getScoreColor(section.score);

  return (
    <Page size="A4" style={s.page}>
      <PageHeader repo={repoName} section={label} />

      {/* Section title row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <Text style={s.sectionTitle}>{label}</Text>
        <Text style={[s.coverScoreNumber, { fontSize: 36, color }]}>{section.score}</Text>
      </View>

      {section.summary && (
        <Text style={s.sectionSubtitle}>{section.summary}</Text>
      )}

      <View style={s.divider} />

      {/* Critical issues */}
      {section.critical.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          <Text style={[s.sectionLabel, { color: C.red }]}>Critical Issues</Text>
          {section.critical.map((c, i) => (
            <View key={i} style={s.criticalItem}>
              <View style={s.criticalDot} />
              <Text style={s.criticalText}>{c}</Text>
            </View>
          ))}
          <View style={s.dividerLight} />
        </View>
      )}

      {/* Detailed issues */}
      {section.issues.length > 0 && (
        <View>
          <Text style={s.sectionLabel}>
            Issues Found ({section.issues.length})
          </Text>
          {section.issues.map((issue, i) => (
            <IssueCardView key={i} issue={issue} />
          ))}
        </View>
      )}

      {section.issues.length === 0 && section.critical.length === 0 && (
        <View style={[s.summaryBox, { borderColor: C.green }]}>
          <Text style={[s.summaryText, { color: C.green }]}>✓ No issues found in this section.</Text>
        </View>
      )}

      <PageFooter page={pageNum} total={totalPages} />
    </Page>
  );
}

// ─── Main Document ───────────────────────────────────────────────────────────

interface AuditReportProps {
  audit: AuditRow;
}

export function AuditReport({ audit }: AuditReportProps) {
  const scores = audit.scores;
  const repoName = audit.repo_url.replace('https://github.com/', '');
  const date = new Date(audit.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const verdictCfg = getVerdictConfig(scores.verdict);

  const sectionKeys = ['security', 'production_readiness', 'code_quality', 'scalability'] as const;
  // Pages: 1 cover, 1 overview+exec, N section pages, 1 fixes page = N+3
  const totalPages = sectionKeys.length + 3;

  return (
    <Document
      title={`VibeDiligence Audit — ${repoName}`}
      author="VibeDiligence"
      subject="Technical Due Diligence Report"
    >
      {/* ── PAGE 1: Cover ──────────────────────────────────────────────── */}
      <Page size="A4" style={[s.page, s.coverPage]}>
        <View style={s.coverTop}>
          <Text style={s.coverEyebrow}>VibeDiligence • Technical Audit Report</Text>
          <Text style={s.coverTitle}>Repo Audit</Text>
          <Text style={s.coverRepo}>{repoName}</Text>

          <View style={s.coverMeta}>
            <View style={[s.coverMetaBadge, { borderColor: `${verdictCfg.color}40`, backgroundColor: `${verdictCfg.color}10` }]}>
              <Text style={[s.coverMetaBadgeText, { color: verdictCfg.color }]}>
                {verdictCfg.label}
              </Text>
            </View>
            <View style={[s.coverMetaBadge, { borderColor: C.border }]}>
              <Text style={[s.coverMetaBadgeText, { color: C.muted }]}>{date}</Text>
            </View>
          </View>
        </View>

        <View style={s.coverBottom}>
          {/* Overall score */}
          <View style={s.coverScoreRow}>
            <Text style={[s.coverScoreNumber, { color: getScoreColor(scores.overall_score) }]}>
              {scores.overall_score}
            </Text>
            <Text style={[s.coverScoreLabel, { marginBottom: 16 }]}> / 100</Text>
          </View>
          <Text style={s.coverScoreLabel}>OVERALL SCORE</Text>

          {scores.executive_summary && (
            <Text style={s.coverScoreDesc}>{scores.executive_summary}</Text>
          )}

          {/* Section score grid */}
          <View style={s.coverGrid}>
            {sectionKeys.map((key) => (
              <View key={key} style={s.coverGridItem}>
                <Text style={s.coverGridLabel}>{getSectionLabel(key)}</Text>
                <Text style={[s.coverGridValue, { color: getScoreColor(scores[key].score) }]}>
                  {scores[key].score}
                </Text>
              </View>
            ))}
          </View>

          {/* Stack info */}
          <View style={[s.coverGrid, { marginTop: 16 }]}>
            {[
              { label: 'Framework', value: audit.framework },
              { label: 'Auth', value: audit.auth },
              { label: 'Database', value: audit.database },
              { label: 'Deployment', value: audit.deployment },
            ].map((item) => (
              <View key={item.label} style={s.coverGridItem}>
                <Text style={s.coverGridLabel}>{item.label}</Text>
                <Text style={[s.coverGridValue, { fontSize: 9, color: C.secondary }]}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <PageFooter page={1} total={totalPages} />
      </Page>

      {/* ── PAGE 2: Overview + Exec Summary + Strengths ────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader repo={repoName} section="Overview" />

        {/* Verdict banner */}
        <View style={[s.verdictBanner, { borderColor: `${verdictCfg.color}30`, backgroundColor: `${verdictCfg.color}08` }]}>
          <Text style={[s.verdictLabel, { color: verdictCfg.color }]}>Verdict</Text>
          <Text style={[s.verdictValue, { color: verdictCfg.color }]}>{verdictCfg.label}</Text>
          {scores.verdict_reasoning && (
            <Text style={[s.verdictReasoning, { color: C.secondary }]}>{scores.verdict_reasoning}</Text>
          )}
        </View>

        {/* Section scores */}
        <Text style={s.sectionLabel}>Score Breakdown</Text>
        <View style={s.scoreGrid}>
          {sectionKeys.map((key) => {
            const sec = scores[key];
            const color = getScoreColor(sec.score);
            return (
              <View key={key} style={s.scoreCard}>
                <Text style={s.scoreCardLabel}>{getSectionLabel(key)}</Text>
                <Text style={[s.scoreCardNumber, { color }]}>{sec.score}</Text>
                <View style={s.scoreCardBar}>
                  <View style={[s.scoreCardFill, { width: `${sec.score}%`, backgroundColor: color }]} />
                </View>
                {sec.summary && (
                  <Text style={s.scoreCardSummary}>{sec.summary}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Strengths */}
        {scores.strengths && scores.strengths.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={[s.sectionLabel, { color: C.green }]}>What This Codebase Does Well</Text>
            {scores.strengths.map((strength, i) => (
              <View key={i} style={s.strengthItem}>
                <View style={s.strengthDot} />
                <Text style={s.strengthText}>{strength}</Text>
              </View>
            ))}
          </View>
        )}

        <PageFooter page={2} total={totalPages} />
      </Page>

      {/* ── PAGES 3–6: One per section ─────────────────────────────────── */}
      {sectionKeys.map((key, idx) => (
        <SectionPage
          key={key}
          sectionKey={key}
          section={scores[key]}
          repoName={repoName}
          pageNum={3 + idx}
          totalPages={totalPages}
        />
      ))}

      {/* ── LAST PAGE: Top 5 Fixes ─────────────────────────────────────── */}
      <Page size="A4" style={s.page}>
        <PageHeader repo={repoName} section="Action Plan" />

        <Text style={s.sectionTitle}>Top 5 Fixes</Text>
        <Text style={[s.sectionSubtitle, { marginBottom: 24 }]}>
          Ordered by priority. Estimated hours reflect a senior engineer's time.
        </Text>

        {scores.top_5_fixes.map((fix, i) => {
          const color = PRIORITY_COLORS[fix.priority];
          return (
            <View key={i} style={s.fixCard} wrap={false}>
              <Text style={s.fixNumber}>FIX {String(i + 1).padStart(2, '0')}</Text>
              <Text style={s.fixTitle}>{fix.issue}</Text>

              <View style={s.fixMeta}>
                <View style={[s.fixPriorityBadge, { backgroundColor: `${color}20` }]}>
                  <Text style={[s.fixPriorityText, { color }]}>{fix.priority}</Text>
                </View>
                <Text style={s.fixHours}>~{fix.est_hours}h estimated</Text>
                {fix.location && (
                  <Text style={s.fixLocation}>📍 {fix.location}</Text>
                )}
              </View>

              {fix.impact && (
                <Text style={s.fixImpact}>{fix.impact}</Text>
              )}

              {fix.fix_steps && fix.fix_steps.length > 0 && (
                <View>
                  <View style={s.dividerLight} />
                  <Text style={s.fixStepsLabel}>Steps to Fix</Text>
                  {fix.fix_steps.map((step, j) => (
                    <View key={j} style={s.fixStep}>
                      <Text style={s.fixStepNum}>{j + 1}.</Text>
                      <Text style={s.fixStepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}

        <PageFooter page={totalPages} total={totalPages} />
      </Page>
    </Document>
  );
}