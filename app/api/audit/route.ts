/**
 * @file route.ts
 * @description POST /api/audit — accepts an intake form, fetches repo files,
 * runs AI audit, stores results in Supabase, and returns a teaser only.
 * Never returns issues or top_5_fixes before payment.
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, errorResponse } from '@/lib/errors';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { IntakeFormSchema } from '@/lib/validation';
import { fetchRepoFiles } from '@/lib/github';
import { runAudit } from '@/lib/openai';
import { supabaseAdmin } from '@/lib/supabase';

/** Maximum allowed request body size in bytes. */
const MAX_BODY_SIZE = 10_000;

/** Rate limit: 5 requests per IP per hour. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export const POST = withErrorHandling(async (req: NextRequest) => {
  // 1. Rate limit
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(ip, RATE_LIMIT, RATE_WINDOW_MS);
  if (!allowed) {
    return errorResponse('RATE_LIMITED');
  }

  // 2. Check body size
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return errorResponse('BODY_TOO_LARGE');
  }

  // 3. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new Error('INVALID_BODY');
  }

  // 4. Validate with Zod
  const parsed = IntakeFormSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse('VALIDATION_ERROR', {
      details: parsed.error.issues.map(i => i.message),
    });
  }

  const intake = parsed.data;

  // 5. Fetch repo files (SSRF-safe)
  const codeContent = await fetchRepoFiles(intake.repo_url);

  // 6. Run AI audit
  const auditResult = await runAudit(codeContent, intake);

  // 7. Insert to Supabase (paid: false)
  const { data, error } = await supabaseAdmin
    .from('audits')
    .insert({
      repo_url: intake.repo_url,
      framework: intake.framework,
      auth: intake.auth,
      database: intake.database,
      deployment: intake.deployment,
      scores: auditResult,
      verdict: auditResult.verdict,
      paid: false,
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('[POST /api/audit] Supabase insert error');
    throw new Error('INTERNAL_ERROR');
  }

  // 8. Return teaser ONLY — never issues or top_5_fixes before payment
  return NextResponse.json({
    auditId: data.id,
    overall_score: auditResult.overall_score,
    verdict: auditResult.verdict,
    section_scores: {
      security: auditResult.security.score,
      production_readiness: auditResult.production_readiness.score,
      code_quality: auditResult.code_quality.score,
      scalability: auditResult.scalability.score,
    },
  });
});
