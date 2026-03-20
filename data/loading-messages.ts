/**
 * @file loading-messages.ts
 * @description Centralized library of "Agentic Thoughts" and loading messages.
 * These are used to provide an interactive, technical-sounding experience
 * while long-running audits or payment verifications are in progress.
 */

/** High-level primary steps shown during the initial audit intake. */
export const AUDIT_STEPS = [
  "Establishing secure tunnel to GitHub API...",
  "Recursive indexing of repository file tree...",
  "Identifying core architectural patterns & entry points...",
  "Tracing authentication & authorization logic...",
  "Deconstructing database schema & persistence layer...",
  "Scanning for configuration & secret exposure...",
  "Evaluating production-readiness & infra-as-code...",
  "Running complexity & technical debt heuristics...",
  "Synthesizing results into executive intelligence...",
  "Finalizing report structure & formatting assets...",
];

/** Ticker messages that cycle during the audit process to show "activity". */
export const AGENT_THOUGHTS = [
  "Verifying JWT implementation in /api/auth...",
  "Checking package.json for deprecated or vulnerable dependencies...",
  "Analyzing SQL injection vectors in persistence layer...",
  "Evaluating middleware chain for potential bypasses...",
  "Checking for hardcoded environment variables...",
  "Analyzing cross-origin resource sharing (CORS) policies...",
  "Verifying CSRF token validation on sensitive endpoints...",
  "Assessing rate-limiting granularity across API routes...",
  "Checking error handling for sensitive data leakage...",
  "Analyzing Dockerfile for non-root user best practices...",
  "Verifying S3/Storage bucket accessibility settings...",
  "Checking GitHub Actions workflows for secure secret usage...",
  "Analyzing TypeScript types for potential 'any' leaks...",
  "Evaluating API response structures for consistent status mapping...",
  "Checking for unencrypted sensitive data in local storage...",
  "Analyzing serverless function cold-starts & execution timeouts...",
  "Verifying proper database indexing on heavy query paths...",
  "Checking for potential race conditions in async operations...",
  "Evaluating cache-control headers on static & dynamic assets...",
  "Analyzing 'use client' vs 'use server' boundaries...",
];

/** Ticker messages specifically for the post-payment unlocking phase. */
export const UNLOCKING_MESSAGES = [
  "Verifying transaction with secure checkout...",
  "Synchronizing audit database records...",
  "Generating unique report cryptographic identifier...",
  "Allocating resources for interactive dashboard...",
  "Finalizing high-resolution PDF assets...",
  "Unlocking full issue details & code snippets...",
  "Preparing professional PDF for download...",
  "Verifying audit integrity & summary data...",
  "Synchronizing email delivery infrastructure...",
  "Finalizing your institutional-grade audit layout...",
];
