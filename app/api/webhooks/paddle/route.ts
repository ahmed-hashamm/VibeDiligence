/**
 * @file route.ts
 * @description POST /api/webhooks/paddle — handles Paddle payment webhooks.
 * Verifies HMAC-SHA256 signature, handles transaction.completed events,
 * updates database, generates PDF, and sends a single confirmation email.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isValidUUID } from '@/lib/validation';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';
import type { AuditRow, AuditResult } from '@/types/audit';
import { getScoreColor } from '@/types/audit';

export const dynamic = 'force-dynamic';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

// ─── Constants ─────────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  security: 'Security',
  production_readiness: 'Production Readiness',
  code_quality: 'Code Quality',
  scalability: 'Scalability',
};

const VERDICT_CONFIG: Record<AuditResult['verdict'], { label: string; color: string; bg: string; desc: string }> = {
  ready_to_raise: {
    label: '✅ Ready to Raise',
    color: '#16C784',
    bg: '#16C78415',
    desc: 'This codebase is in strong shape for investor scrutiny.',
  },
  fix_first: {
    label: '⚠️ Fix First',
    color: '#F0A500',
    bg: '#F0A50015',
    desc: 'Solid foundation, but specific issues should be addressed before fundraising.',
  },
  needs_work: {
    label: '🔴 Needs Work',
    color: '#FF4444',
    bg: '#FF444415',
    desc: 'Significant issues found. Address these before going to market.',
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Verifies the Paddle webhook signature using HMAC-SHA256 with timing-safe comparison.
 */
function verifyPaddleSignature(rawBody: string, signatureHeader: string): boolean {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) return false;

  const parts: Record<string, string> = {};
  for (const segment of signatureHeader.split(';')) {
    const eqIndex = segment.indexOf('=');
    if (eqIndex === -1) continue;
    parts[segment.slice(0, eqIndex)] = segment.slice(eqIndex + 1);
  }

  const ts = parts['ts'];
  const h1 = parts['h1'];
  if (!ts || !h1) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${ts}:${rawBody}`)
    .digest('hex');

  const sigBuffer = Buffer.from(h1, 'hex');
  const expectedBuffer = Buffer.from(expected, 'hex');
  if (sigBuffer.length !== expectedBuffer.length) return false;

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}

/**
 * Generates the PDF report as a Buffer for email attachment.
 */
async function generatePdfBuffer(audit: AuditRow): Promise<Buffer> {
  const ReactPDF = await import('@react-pdf/renderer');
  const React = await import('react');
  const { AuditReport } = await import('@/components/AuditReport');

  const element = React.createElement(AuditReport, { audit }) as React.ReactElement;
  const stream = await ReactPDF.renderToStream(element);

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

function buildEmailHtml(audit: AuditRow, appUrl: string): string {
  const scores = audit.scores;
  const repoName = audit.repo_url.replace('https://github.com/', '');
  const verdictCfg = VERDICT_CONFIG[scores.verdict] ?? VERDICT_CONFIG.needs_work;
  const reportUrl = `${appUrl}/results/${audit.id}`;
  const sectionKeys = ['security', 'production_readiness', 'code_quality', 'scalability'] as const;

  const scoreBar = (score: number) => `
    <div style="background:#1E1E2E;border-radius:4px;height:6px;width:100%;margin-top:8px;">
      <div style="background:${getScoreColor(score)};height:6px;border-radius:4px;width:${score}%;"></div>
    </div>`;

  const sectionCards = sectionKeys.map((key) => {
    const sec = scores[key];
    const color = getScoreColor(sec.score);
    return `
      <div style="background:#111118;border:1px solid #1E1E2E;border-radius:8px;padding:16px;width:calc(50% - 8px);box-sizing:border-box;margin-bottom:12px;display:inline-block;vertical-align:top;">
        <p style="font-size:10px;color:#555570;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px 0;font-family:monospace;">${SECTION_LABELS[key]}</p>
        <p style="font-size:28px;font-weight:900;color:${color};margin:0;font-family:monospace;">${sec.score}</p>
        ${scoreBar(sec.score)}
      </div>`;
  }).join('');

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:20px;background:#08080F;font-family:sans-serif;color:#F0F0FF;">
  <div style="max-width:600px;margin:0 auto;background:#111118;border:1px solid #1E1E2E;padding:40px;border-radius:12px;">
    <h1 style="color:#7C6FFF;margin-bottom:8px;">VibeDiligence</h1>
    <p style="color:#9898B0;margin-bottom:32px;">Audit complete for <strong>${repoName}</strong></p>
    
    <div style="background:#1E1E2E30;border:1px solid ${verdictCfg.color}40;padding:24px;border-radius:8px;margin-bottom:32px;">
      <p style="font-size:10px;color:#555570;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px 0;">Overall Score</p>
      <p style="font-size:48px;font-weight:bold;color:${getScoreColor(scores.overall_score)};margin:0;line-height:1;">${scores.overall_score}</p>
      <p style="color:${verdictCfg.color};font-weight:700;margin:16px 0 4px 0;">${verdictCfg.label}</p>
      <p style="font-size:13px;color:#9898B0;margin:0;">${scores.verdict_reasoning ?? verdictCfg.desc}</p>
    </div>

    <div style="margin-bottom:32px;">
      ${sectionCards}
    </div>

    <div style="text-align:center;padding-top:20px;border-top:1px solid #1E1E2E;">
      <a href="${reportUrl}" style="background:#7C6FFF;color:#fff;padding:16px 32px;border-radius:100px;text-decoration:none;font-weight:bold;display:inline-block;">Access Full Report</a>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sends a single report email.
 */
async function sendReportEmail(
  email: string,
  audit: AuditRow,
  pdfBuffer?: Buffer,
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vibediligence.tech';
  const repoName = audit.repo_url.replace('https://github.com/', '').replace(/\//g, '-');
  const hasAttachment = !!(pdfBuffer && pdfBuffer.length > 0);

  console.log(`[Paddle Webhook] Sending email to ${email} (PDF: ${hasAttachment})`);

  try {
    const { data, error } = await getResend().emails.send({
      from: 'VibeDiligence <audit@vibediligence.tech>',
      to: email,
      subject: `Your Audit is Ready — Score: ${audit.scores.overall_score}/100`,
      html: buildEmailHtml(audit, appUrl),
      attachments: hasAttachment ? [
        {
          filename: `vibed-audit-${repoName}.pdf`,
          content: pdfBuffer!,
        },
      ] : undefined,
    });

    if (error) {
      console.error('[Paddle Webhook] Resend error:', error);
    } else {
      console.log(`[Paddle Webhook] Email sent: ${data?.id}`);
    }
  } catch (err) {
    console.error('[Paddle Webhook] Email failed:', err);
  }
}

// ─── Route Handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('[Paddle Webhook] START');

  // 1. Raw body first
  const rawBody = await req.text();

  // 2. Signature
  const signature = req.headers.get('paddle-signature');
  if (!signature || !verifyPaddleSignature(rawBody, signature)) {
    console.error('[Paddle Webhook] Signature failure');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // 3. Parse
  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (event.event_type !== 'transaction.completed') {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // 4. Extract
  const auditId = event.data?.custom_data?.audit_id;
  const email = event.data?.customer?.email;

  console.log(`[Paddle Webhook] AuditID: ${auditId}, Email: ${email}`);

  if (!auditId || !isValidUUID(auditId)) {
    return NextResponse.json({ error: 'Invalid audit ID' }, { status: 400 });
  }

  // 5. Database check
  const { data: existing } = await supabaseAdmin
    .from('audits')
    .select('*')
    .eq('id', auditId)
    .single();

  if (!existing || existing.paid === true) {
    console.log('[Paddle Webhook] Skipping: paid or not found');
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // 6. Update Database
  const { error: updateError } = await supabaseAdmin
    .from('audits')
    .update({ paid: true, email: email ?? null })
    .eq('id', auditId);

  if (updateError) {
    console.error('[Paddle Webhook] DB error:', updateError);
    return NextResponse.json({ error: 'DB failure' }, { status: 500 });
  }
  console.log('[Paddle Webhook] DB updated to PAID');

  // 7. Processing Delivery
  try {
    if (email) {
      const auditData = { ...existing, paid: true, email: email ?? null } as AuditRow;
      let pdfBuffer: Buffer | undefined;
      let timeoutId: any;

      try {
        console.log('[Paddle Webhook] PDF generation start (5s limit)...');
        const timeoutPromise = new Promise<undefined>((_, reject) => {
          timeoutId = setTimeout(() => reject(new Error('TIMEOUT')), 5000);
        });

        pdfBuffer = await Promise.race([
          generatePdfBuffer(auditData),
          timeoutPromise
        ]);
        if (timeoutId) clearTimeout(timeoutId);
      } catch (err) {
        if (timeoutId) clearTimeout(timeoutId);
        console.warn('[Paddle Webhook] PDF skipped (timed out or failed)');
      }

      await sendReportEmail(email, auditData, pdfBuffer);
    }
  } catch (err) {
    console.error('[Paddle Webhook] Internal delivery error:', err);
  }

  console.log('[Paddle Webhook] FINISHED');
  return NextResponse.json({ received: true, paid: true }, { status: 200 });
}