/**
 * @file pdf-helpers.ts
 * @description Utility functions for PDF generation.
 * Sanitizes strings, maps scores to colors, and provides verdict labels.
 */

/**
 * Sanitizes a string for safe PDF rendering.
 * Removes control characters and limits length.
 */
export function sanitizeForPdf(text: unknown): string {
  if (typeof text !== 'string') return '';
  return text.slice(0, 500).replace(/[\x00-\x1F\x7F]/g, ' ').trim();
}

/**
 * Maps a score to its corresponding color hex value.
 */
export function scoreToColor(score: number): string {
  if (score >= 80) return '#16C784';
  if (score >= 60) return '#F0A500';
  if (score >= 40) return '#FF7A00';
  return '#FF4444';
}

/** Human-readable verdict labels for PDF display. */
export const VERDICT_LABELS: Record<string, string> = {
  ready_to_raise: 'Ready to Raise',
  fix_first: 'Fix First',
  needs_work: 'Needs Work',
};
