export type AuditSection = { score: number; issues: string[]; critical: string[] };
export type AuditFix = { issue: string; priority: 'critical'|'high'|'medium'; est_hours: number };
export type AuditResult = {
  security: AuditSection; production_readiness: AuditSection;
  code_quality: AuditSection; scalability: AuditSection;
  verdict: 'ready_to_raise'|'fix_first'|'needs_work';
  top_5_fixes: AuditFix[]; overall_score: number;
};
export type IntakeForm = { repo_url: string; framework: string; auth: string; database: string; deployment: string };
export type AuditRow = { id: string; repo_url: string; framework: string; auth: string; database: string; deployment: string; scores: AuditResult; verdict: string; paid: boolean; email: string|null; created_at: string };

/**
 * Returns a hex color string based on a score.
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return '#16C784'; 
  if (score >= 60) return '#F0A500';
  if (score >= 40) return '#FF7A00'; 
  return '#FF4444';
}
