export type AuditIssue = {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  code_snippet: string;
  explanation: string;
  fix: string;
};

export type AuditSection = {
  score: number;
  summary: string;
  issues: AuditIssue[];
  critical: string[];
};

export type AuditFix = {
  issue: string;
  location: string;
  priority: 'critical' | 'high' | 'medium';
  est_hours: number;
  impact: string;
  fix_steps: string[];
};

export type AuditResult = {
  security: AuditSection;
  production_readiness: AuditSection;
  code_quality: AuditSection;
  scalability: AuditSection;
  verdict: 'ready_to_raise' | 'fix_first' | 'needs_work';
  verdict_reasoning: string;
  top_5_fixes: AuditFix[];
  overall_score: number;
  executive_summary: string;
  strengths: string[];
};

export type IntakeForm = { repo_url: string; framework: string; auth: string; database: string; deployment: string };
export type AuditRow = { id: string; repo_url: string; framework: string; auth: string; database: string; deployment: string; scores: AuditResult; verdict: string; paid: boolean; email: string | null; created_at: string };

export type LegalSubsection = {
  id?: string;
  title: string;
  content?: string;
  bullets?: string[];
  nestedContent?: string;
  nestedBullets?: string[];
};

export type LegalTable = {
  headers: string[];
  rows: string[][];
};

export type LegalSection = {
  id: string;
  title: string;
  intro?: string;
  content?: string;
  bullets?: string[];
  subsections?: LegalSubsection[];
  table?: LegalTable;
  important?: string;
  footer?: string;
};

export type LegalContent = {
  eyebrow: string;
  heading: string;
  // subheading: string;
  lastUpdated?: string;
  intro?: string;
  acknowledgement?: string;
  contactLine?: string;
  sections: LegalSection[];
  faqs?: { question: string; answer: string }[];
  contact: {
    title: string;
    description: string;
    email: string;
  };
};

export type Metric = {
  label: string;
  score: number;
  status: string;
  color: string;
};

export type Finding = {
  title: string;
  desc: string;
  priority: string;
  icon: string;
  variant: 'success' | 'pink';
};

export type ReportData = {
  id: string;
  repo: string;
  date: string;
  version: string;
  global_score: number;
  verdict: string;
  verdict_desc: string;
  metrics: Metric[];
  findings: Finding[];
};

export type SecurityPillar = {
  title: string;
  icon: string;
  description?: string;
  intro?: string;
  sections?: { label: string; desc: string }[];
  features?: { label: string; desc: string }[];
  contact?: { email: string; subject: string };
  includeInReport?: string[];
  whatToExpect?: string[];
  commitment?: string;
  footerNote?: string;
  outOfScope?: string;
  encryptionTransit?: string;
  encryptionRest?: string;
  repositoryData?: { intro: string; practices: string[] };
  caution?: string;
  practices?: string[];
};

/**
 * Returns a hex color string based on a score.
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return '#16C784';
  if (score >= 60) return '#F0A500';
  if (score >= 40) return '#FF7A00';
  return '#FF4444';
}