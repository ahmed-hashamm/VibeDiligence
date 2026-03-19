/**
 * @file AuditReport.tsx
 * @description React-PDF document component for generating audit report PDFs.
 * Uses @react-pdf/renderer exclusively — no Tailwind, no HTML elements.
 * All styles via StyleSheet.create({}). All strings through sanitizeForPdf().
 * 7 pages: Cover → Score Summary → Security → Production → Quality → Scalability → Top 5 Fixes
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { sanitizeForPdf, scoreToColor, VERDICT_LABELS } from '@/lib/pdf-helpers';
import type { AuditRow, AuditSection } from '@/types/audit';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#08080F',
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#F0F0FF',
  },
  /* Cover */
  coverPage: {
    backgroundColor: '#08080F',
    padding: 60,
    fontFamily: 'Helvetica',
    color: '#F0F0FF',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 14,
    letterSpacing: 4,
    color: '#FF2D6B',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F0F0FF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8888AA',
    marginBottom: 40,
  },
  scoreLarge: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#8888AA',
    letterSpacing: 3,
    marginBottom: 40,
  },
  verdictBadge: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  meta: {
    fontSize: 10,
    color: '#4A4A6A',
    marginTop: 60,
  },
  /* Section pages */
  sectionHeader: {
    fontSize: 11,
    letterSpacing: 3,
    color: '#FF2D6B',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F0F0FF',
    marginBottom: 8,
  },
  sectionScore: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E35',
    marginBottom: 20,
    marginTop: 20,
  },
  itemLabel: {
    fontSize: 10,
    color: '#FF2D6B',
    letterSpacing: 2,
    marginBottom: 12,
  },
  issueText: {
    fontSize: 11,
    color: '#8888AA',
    lineHeight: 1.6,
    marginBottom: 6,
    paddingLeft: 12,
  },
  criticalText: {
    fontSize: 11,
    color: '#FF4444',
    lineHeight: 1.6,
    marginBottom: 6,
    paddingLeft: 12,
  },
  /* Score Summary */
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0F0F1A',
    borderRadius: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#F0F0FF',
  },
  summaryScore: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  /* Fixes */
  fixRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#0F0F1A',
    borderRadius: 6,
  },
  fixIssue: {
    fontSize: 11,
    color: '#F0F0FF',
    flex: 1,
    marginRight: 12,
  },
  fixMeta: {
    fontSize: 10,
    color: '#8888AA',
    textAlign: 'right',
    width: 100,
  },
  fixPriority: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#4A4A6A',
  },
});

/** Priority colors for fixes. */
const PRIORITY_COLORS: Record<string, string> = {
  critical: '#FF4444',
  high: '#FF7A00',
  medium: '#F0A500',
};

/** Section config for the detail pages. */
const SECTIONS = [
  { key: 'security' as const, eyebrow: 'SECURITY ANALYSIS', title: 'Security & Vulnerabilities' },
  { key: 'production_readiness' as const, eyebrow: 'PRODUCTION READINESS', title: 'Production Readiness' },
  { key: 'code_quality' as const, eyebrow: 'CODE QUALITY', title: 'Code Quality & Patterns' },
  { key: 'scalability' as const, eyebrow: 'SCALABILITY', title: 'Scalability & Load' },
];

/** Renders a section detail page with score, issues, and critical findings. */
function SectionPage({ eyebrow, title, section }: { eyebrow: string; title: string; section: AuditSection }) {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionHeader}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{sanitizeForPdf(title)}</Text>
      <Text style={{ ...styles.sectionScore, color: scoreToColor(section.score) }}>
        {section.score}/100
      </Text>
      <View style={styles.divider} />

      {section.critical.length > 0 && (
        <View>
          <Text style={styles.itemLabel}>CRITICAL ISSUES</Text>
          {section.critical.map((c, i) => (
            <Text key={i} style={styles.criticalText}>• {sanitizeForPdf(c)}</Text>
          ))}
          <View style={styles.divider} />
        </View>
      )}

      {section.issues.length > 0 && (
        <View>
          <Text style={styles.itemLabel}>ISSUES FOUND</Text>
          {section.issues.map((issue, i) => (
            <Text key={i} style={styles.issueText}>• {sanitizeForPdf(issue)}</Text>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text>VibeDiligence — AI-Generated Audit Report</Text>
        <Text>vibediligence.com</Text>
      </View>
    </Page>
  );
}

interface AuditReportProps {
  audit: AuditRow;
}

/**
 * AuditReport PDF Document component.
 * Generates a 7-page PDF audit report using @react-pdf/renderer.
 */
export function AuditReport({ audit }: AuditReportProps) {
  const scores = audit.scores;
  const repoName = sanitizeForPdf(audit.repo_url.replace('https://github.com/', ''));
  const verdictLabel = VERDICT_LABELS[scores.verdict] ?? scores.verdict;
  const verdictColor = scores.overall_score >= 75 ? '#16C784' : scores.overall_score >= 50 ? '#FF7A00' : '#FF4444';

  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.brand}>VIBEDILIGENCE</Text>
        <Text style={styles.title}>Technical Audit Report</Text>
        <Text style={styles.subtitle}>{repoName}</Text>
        <Text style={{ ...styles.scoreLarge, color: scoreToColor(scores.overall_score) }}>
          {scores.overall_score}
        </Text>
        <Text style={styles.scoreLabel}>OVERALL SCORE</Text>
        <Text style={{ ...styles.verdictBadge, color: verdictColor, backgroundColor: `${verdictColor}20` }}>
          {sanitizeForPdf(verdictLabel)}
        </Text>
        <Text style={styles.meta}>
          Generated: {new Date(audit.created_at).toLocaleDateString()} • AI-Generated Review • Not a Professional Security Audit
        </Text>
        <View style={styles.footer}>
          <Text>Confidential — For intended recipient only</Text>
          <Text>vibediligence.com</Text>
        </View>
      </Page>

      {/* Page 2: Score Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>SCORE SUMMARY</Text>
        <Text style={styles.sectionTitle}>Section Breakdown</Text>
        <View style={styles.divider} />
        {SECTIONS.map(s => (
          <View key={s.key} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{s.title}</Text>
            <Text style={{ ...styles.summaryScore, color: scoreToColor(scores[s.key].score) }}>
              {scores[s.key].score}
            </Text>
          </View>
        ))}
        <View style={styles.footer}>
          <Text>VibeDiligence — AI-Generated Audit Report</Text>
          <Text>vibediligence.com</Text>
        </View>
      </Page>

      {/* Pages 3-6: Section Details */}
      {SECTIONS.map(s => (
        <SectionPage
          key={s.key}
          eyebrow={s.eyebrow}
          title={s.title}
          section={scores[s.key]}
        />
      ))}

      {/* Page 7: Top 5 Fixes */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionHeader}>ACTION ITEMS</Text>
        <Text style={styles.sectionTitle}>Top 5 Recommended Fixes</Text>
        <View style={styles.divider} />
        {scores.top_5_fixes.map((fix, i) => (
          <View key={i} style={styles.fixRow}>
            <Text style={styles.fixIssue}>{i + 1}. {sanitizeForPdf(fix.issue)}</Text>
            <View>
              <Text style={{ ...styles.fixPriority, color: PRIORITY_COLORS[fix.priority] ?? '#F0A500' }}>
                {fix.priority.toUpperCase()}
              </Text>
              <Text style={styles.fixMeta}>~{fix.est_hours}h estimated</Text>
            </View>
          </View>
        ))}
        <View style={styles.footer}>
          <Text>VibeDiligence — AI-Generated Audit Report</Text>
          <Text>vibediligence.com</Text>
        </View>
      </Page>
    </Document>
  );
}
