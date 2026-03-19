/**
 * @file route.ts
 * @description GET /api/report/[auditId] — generates and streams the PDF audit report.
 * Only serves reports for audits where paid === true.
 * Returns 403 (NOT_PAID) if not paid — does not reveal whether audit exists.
 */

import { NextRequest, NextResponse } from 'next/server';
import { withErrorHandling, errorResponse } from '@/lib/errors';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { isValidUUID } from '@/lib/validation';
import { supabaseAdmin } from '@/lib/supabase';
import type { AuditRow } from '@/types/audit';

/** Rate limit: 30 requests per IP per hour. */
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60 * 60 * 1000;

export const GET = withErrorHandling(async (
  req: NextRequest,
  ctx: unknown
) => {
  // 1. Rate limit
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(ip, RATE_LIMIT, RATE_WINDOW_MS);
  if (!allowed) {
    return errorResponse('RATE_LIMITED');
  }

  // 2. Extract and validate auditId
  const { params } = ctx as { params: { auditId: string } };
  const { auditId } = params;

  if (!isValidUUID(auditId)) {
    return errorResponse('INVALID_ID');
  }

  // 3. Fetch from Supabase — only paid audits
  const { data: audit } = await supabaseAdmin
    .from('audits')
    .select('*')
    .eq('id', auditId)
    .eq('paid', true)
    .single();

  // 4. If not found or not paid → 403
  if (!audit) {
    return errorResponse('NOT_PAID');
  }

  const auditData = audit as AuditRow;

  // 5. Generate PDF using dynamic import for server-side rendering
  const ReactPDF = await import('@react-pdf/renderer');
  const React = await import('react');
  const { AuditReport } = await import('@/components/AuditReport');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfStream = await ReactPDF.renderToStream(
    React.createElement(AuditReport, { audit: auditData }) as any
  );

  // Convert Node stream to Web ReadableStream
  const readableStream = new ReadableStream({
    start(controller) {
      pdfStream.on('data', (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      pdfStream.on('end', () => {
        controller.close();
      });
      pdfStream.on('error', (err: Error) => {
        controller.error(err);
      });
    },
  });

  // 6. Stream PDF — filename uses auditId only, never user-controlled data
  return new NextResponse(readableStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="vibed-audit-${auditId}.pdf"`,
    },
  });
});
