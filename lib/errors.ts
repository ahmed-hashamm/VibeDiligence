/**
 * @file errors.ts
 * @description Centralized error handling for API routes.
 * Maps error code strings to HTTP status codes and safe user-facing messages.
 * Never exposes stack traces, DB errors, internal paths, or API key names.
 */

import { NextRequest, NextResponse } from 'next/server';

/** Maps internal error codes to HTTP status and safe user-facing message. */
export const ERROR_MAP: Record<string, { status: number; message: string }> = {
  INVALID_BODY:     { status: 400, message: 'Invalid request body' },
  VALIDATION_ERROR: { status: 400, message: 'Validation failed' },
  INVALID_URL:      { status: 400, message: 'Please enter a valid public GitHub repository URL' },
  INVALID_ID:       { status: 400, message: 'Invalid audit ID' },
  BODY_TOO_LARGE:   { status: 413, message: 'Request body too large' },
  NOT_PAID:         { status: 403, message: 'Payment required to access this report' },
  REPO_NOT_FOUND:   { status: 404, message: 'Repository not found. Check the URL and make sure it is public.' },
  REPO_PRIVATE:     { status: 403, message: 'This repository is private. Make it public to use VibeDiligence.' },
  REPO_EMPTY:       { status: 422, message: 'This repository does not have enough code to analyze.' },
  AUDIT_FAILED:     { status: 500, message: 'Analysis failed. Please try again in a moment.' },
  INTERNAL_ERROR:   { status: 500, message: 'Something went wrong. Please try again.' },
  RATE_LIMITED:     { status: 429, message: 'Too many requests. Please wait a moment and try again.' },
};

/**
 * Creates a NextResponse JSON error from an error code string.
 * Only returns safe, user-facing messages — never internal details.
 */
export function errorResponse(code: string, extra?: object): NextResponse {
  const { status, message } = ERROR_MAP[code] ?? ERROR_MAP.INTERNAL_ERROR;
  return NextResponse.json({ error: message, code, ...extra }, { status });
}

/**
 * Higher-order function that wraps an API route handler with error handling.
 * Catches thrown error code strings and maps them to safe responses.
 * Unknown errors are logged server-side and returned as INTERNAL_ERROR.
 */
export function withErrorHandling(
  handler: (req: NextRequest, ctx?: unknown) => Promise<NextResponse>
) {
  return async (req: NextRequest, ctx?: unknown): Promise<NextResponse> => {
    try {
      return await handler(req, ctx);
    } catch (err: unknown) {
      const code = err instanceof Error ? err.message : 'INTERNAL_ERROR';
      if (code in ERROR_MAP) return errorResponse(code);
      console.error(`[${req.method} ${req.nextUrl.pathname}]`, err);
      return errorResponse('INTERNAL_ERROR');
    }
  };
}
