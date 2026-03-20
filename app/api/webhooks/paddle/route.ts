// /**
//  * @file route.ts
//  * @description POST /api/webhooks/paddle — handles Paddle payment webhooks.
//  * Verifies HMAC-SHA256 signature with timing-safe comparison,
//  * handles transaction.completed events, sets paid=true, and sends confirmation email.
//  * Raw body must be read FIRST before any JSON parsing.
//  */

// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import { isValidUUID } from '@/lib/validation';
// import { supabaseAdmin } from '@/lib/supabase';
// import { Resend } from 'resend';

// export const dynamic = 'force-dynamic';

// const getResend = () => new Resend(process.env.RESEND_API_KEY);

// /**
//  * Verifies the Paddle webhook signature using HMAC-SHA256 with timing-safe comparison.
//  * Paddle-Signature header format: "ts=1234567890;h1=abc123def456..."
//  * Signed payload format: "timestamp:rawBody"
//  * @returns true if the signature is valid.
//  */
// function verifyPaddleSignature(rawBody: string, signatureHeader: string): boolean {
//   const secret = process.env.PADDLE_WEBHOOK_SECRET;
//   if (!secret) return false;

//   // Parse "ts=...;h1=..." format from Paddle-Signature header
//   const parts: Record<string, string> = {};
//   for (const segment of signatureHeader.split(';')) {
//     const eqIndex = segment.indexOf('=');
//     if (eqIndex === -1) continue;
//     parts[segment.slice(0, eqIndex)] = segment.slice(eqIndex + 1);
//   }

//   const ts = parts['ts'];
//   const h1 = parts['h1'];
//   if (!ts || !h1) return false;

//   // Signed payload = "timestamp:rawBody"
//   const expected = crypto
//     .createHmac('sha256', secret)
//     .update(`${ts}:${rawBody}`)
//     .digest('hex');

//   const sigBuffer = Buffer.from(h1, 'hex');
//   const expectedBuffer = Buffer.from(expected, 'hex');

//   if (sigBuffer.length !== expectedBuffer.length) return false;

//   return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
// }

// /**
//  * Sends the audit report delivery email via Resend.
//  */
// async function sendReportEmail(email: string, auditId: string, repoUrl: string): Promise<void> {
//   const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vibediligence.tech';

//   try {
//     await getResend().emails.send({
//       from: 'VibeDiligence <audit@vibediligence.tech>',
//       to: email,
//       subject: 'Your VibeDiligence Audit Report is Ready',
//       html: `
//         <div style="background:#08080F;color:#F0F0FF;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
//           <h1 style="color:#FF2D6B;">VibeDiligence</h1>
//           <p>Your audit report for <strong>${repoUrl}</strong> is ready.</p>
//           <a href="${appUrl}/results/${auditId}"
//              style="display:inline-block;background:#FF2D6B;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:600;margin-top:16px;">
//             View &amp; Download Report
//           </a>
//           <p style="color:#4A4A6A;font-size:12px;margin-top:40px;">
//             AI-generated review. Not a professional security audit.
//           </p>
//         </div>
//       `,
//     });
//   } catch (err) {
//     console.error('[Paddle Webhook] Failed to send email');
//   }
// }

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   // 1. Read raw body FIRST — body stream is consumed after first read
//   const rawBody = await req.text();

//   // 2. Get and verify signature
//   const signature = req.headers.get('paddle-signature');
//   if (!signature) {
//     return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
//   }

//   if (!verifyPaddleSignature(rawBody, signature)) {
//     return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
//   }

//   // 3. Parse JSON from raw body
//   let event: Record<string, unknown>;
//   try {
//     event = JSON.parse(rawBody) as Record<string, unknown>;
//   } catch {
//     return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
//   }

//   // 4. Only handle transaction.completed
//   const eventType = event.event_type as string | undefined;
//   if (eventType !== 'transaction.completed') {
//     return NextResponse.json({ received: true }, { status: 200 });
//   }

//   // 5. Extract audit_id from custom_data
//   const data = event.data as Record<string, unknown> | undefined;
//   const customData = data?.custom_data as Record<string, unknown> | undefined;
//   const auditId = customData?.audit_id as string | undefined;

//   if (!auditId || !isValidUUID(auditId)) {
//     return NextResponse.json({ error: 'Invalid audit ID' }, { status: 400 });
//   }

//   // 6. Extract email
//   const email = (data?.customer as Record<string, unknown> | undefined)?.email as string | undefined;

//   // 7. Idempotency: check if already paid
//   const { data: existing } = await supabaseAdmin
//     .from('audits')
//     .select('paid, repo_url')
//     .eq('id', auditId)
//     .single();

//   if (existing?.paid === true) {
//     return NextResponse.json({ received: true, already_paid: true }, { status: 200 });
//   }

//   // 8. Update Supabase: paid=true, save email
//   const { error: updateError } = await supabaseAdmin
//     .from('audits')
//     .update({ paid: true, email: email ?? null })
//     .eq('id', auditId);

//   if (updateError) {
//     console.error('[POST /api/webhooks/paddle] Supabase update error');
//     return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
//   }

//   // 9. Send confirmation email
//   if (email && existing?.repo_url) {
//     await sendReportEmail(email, auditId, existing.repo_url as string);
//   }

//   // 10. Always return 200 for valid signatures
//   return NextResponse.json({ received: true, paid: true }, { status: 200 });
// }
/**
 * @file route.ts
 * @description POST /api/webhooks/paddle — handles Paddle payment webhooks.
 * Verifies HMAC-SHA256 signature with timing-safe comparison,
 * handles transaction.completed events, sets paid=true, and sends confirmation email
 * with PDF report attached and a rich visual HTML summary.
 * Raw body must be read FIRST before any JSON parsing.
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

// ─── Signature verification ───────────────────────────────────────────────

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

// ─── PDF generation ───────────────────────────────────────────────────────

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

// ─── Email HTML builder ───────────────────────────────────────────────────

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

function scoreColor(score: number): string {
  return getScoreColor(score);
}

function buildEmailHtml(audit: AuditRow, appUrl: string): string {
  const scores = audit.scores;
  const repoName = audit.repo_url.replace('https://github.com/', '');
  const verdictCfg = VERDICT_CONFIG[scores.verdict] ?? VERDICT_CONFIG.needs_work;
  const reportUrl = `${appUrl}/results/${audit.id}`;
  const sectionKeys = ['security', 'production_readiness', 'code_quality', 'scalability'] as const;

  // Score bar HTML
  const scoreBar = (score: number) => `
    <div style="background:#1E1E2E;border-radius:4px;height:6px;width:100%;margin-top:8px;">
      <div style="background:${scoreColor(score)};height:6px;border-radius:4px;width:${score}%;"></div>
    </div>`;

  // Section score cards
  const sectionCards = sectionKeys.map((key) => {
    const sec = scores[key];
    const color = scoreColor(sec.score);
    return `
      <div style="background:#111118;border:1px solid #1E1E2E;border-radius:8px;padding:16px;width:calc(50% - 8px);box-sizing:border-box;margin-bottom:12px;">
        <p style="font-size:10px;color:#555570;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px 0;font-family:monospace;">${SECTION_LABELS[key]}</p>
        <p style="font-size:28px;font-weight:900;color:${color};margin:0;font-family:monospace;">${sec.score}</p>
        ${scoreBar(sec.score)}
        ${sec.summary ? `<p style="font-size:11px;color:#9898B0;margin:10px 0 0 0;line-height:1.6;">${sec.summary}</p>` : ''}
      </div>`;
  }).join('');

  // Critical issues summary (top 3 across all sections)
  const allCriticals: string[] = sectionKeys.flatMap((key) => scores[key].critical ?? []).slice(0, 3);
  const criticalsHtml = allCriticals.length > 0 ? `
    <div style="margin-bottom:28px;">
      <p style="font-size:11px;color:#FF4444;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;font-family:monospace;">⚠ Critical Issues</p>
      ${allCriticals.map((c) => `
        <div style="display:flex;align-items:flex-start;margin-bottom:8px;background:#FF444408;border-left:3px solid #FF4444;padding:10px 12px;border-radius:4px;">
          <p style="font-size:12px;color:#9898B0;margin:0;line-height:1.6;">${c}</p>
        </div>`).join('')}
    </div>` : '';

  // Top 5 fixes
  const PRIORITY_COLORS: Record<string, string> = { critical: '#FF4444', high: '#FF7A00', medium: '#F0A500' };
  const fixesHtml = scores.top_5_fixes.map((fix, i) => {
    const pColor = PRIORITY_COLORS[fix.priority] ?? '#9898B0';
    return `
      <div style="background:#111118;border:1px solid #1E1E2E;border-radius:8px;padding:16px;margin-bottom:10px;">
        <p style="font-size:10px;color:#555570;font-family:monospace;margin:0 0 4px 0;">FIX ${String(i + 1).padStart(2, '0')}</p>
        <p style="font-size:13px;font-weight:700;color:#F0F0FF;margin:0 0 8px 0;">${fix.issue}</p>
        <div style="display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="background:${pColor}20;color:${pColor};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:3px 8px;border-radius:4px;font-family:monospace;">${fix.priority}</span>
          <span style="font-size:11px;color:#555570;font-family:monospace;">~${fix.est_hours}h</span>
          ${fix.location ? `<span style="font-size:11px;color:#7C6FFF;font-family:monospace;">📍 ${fix.location}</span>` : ''}
        </div>
        ${fix.impact ? `<p style="font-size:11px;color:#9898B0;margin:10px 0 0 0;line-height:1.6;">${fix.impact}</p>` : ''}
      </div>`;
  }).join('');

  // Strengths
  const strengthsHtml = scores.strengths && scores.strengths.length > 0 ? `
    <div style="margin-bottom:28px;">
      <p style="font-size:11px;color:#16C784;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;font-family:monospace;">✓ Strengths</p>
      ${scores.strengths.map((s) => `
        <div style="display:flex;align-items:flex-start;margin-bottom:8px;">
          <span style="color:#16C784;margin-right:10px;flex-shrink:0;">•</span>
          <p style="font-size:12px;color:#9898B0;margin:0;line-height:1.6;">${s}</p>
        </div>`).join('')}
    </div>` : '';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <div style="max-width:640px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="padding:32px 0 24px 0;border-bottom:1px solid #1E1E2E;margin-bottom:32px;">
      <p style="font-size:11px;color:#7C6FFF;letter-spacing:3px;text-transform:uppercase;margin:0 0 8px 0;font-family:monospace;">VibeDiligence</p>
      <h1 style="font-size:28px;font-weight:900;color:#FFFFFF;margin:0 0 8px 0;line-height:1.2;">Your Audit Report<br>is Ready.</h1>
      <p style="font-size:13px;color:#555570;margin:0;font-family:monospace;">${repoName}</p>
    </div>

    <!-- Overall score + verdict -->
    <div style="background:#111118;border:1px solid ${verdictCfg.color}30;border-radius:12px;padding:28px;margin-bottom:28px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
        <div>
          <p style="font-size:10px;color:#555570;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px 0;font-family:monospace;">Overall Score</p>
          <p style="font-size:64px;font-weight:900;color:${scoreColor(scores.overall_score)};margin:0;font-family:monospace;line-height:1;">${scores.overall_score}</p>
          <p style="font-size:10px;color:#555570;margin:4px 0 0 0;font-family:monospace;">/ 100</p>
        </div>
        <div style="background:${verdictCfg.bg};border:1px solid ${verdictCfg.color}40;border-radius:8px;padding:14px 18px;max-width:260px;">
          <p style="font-size:14px;font-weight:700;color:${verdictCfg.color};margin:0 0 6px 0;">${verdictCfg.label}</p>
          <p style="font-size:11px;color:#9898B0;margin:0;line-height:1.6;">${scores.verdict_reasoning ?? verdictCfg.desc}</p>
        </div>
      </div>
    </div>

    <!-- Executive summary -->
    ${scores.executive_summary ? `
    <div style="background:#111118;border:1px solid #1E1E2E;border-radius:8px;padding:20px;margin-bottom:28px;">
      <p style="font-size:10px;color:#555570;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px 0;font-family:monospace;">Executive Summary</p>
      <p style="font-size:12px;color:#9898B0;margin:0;line-height:1.75;">${scores.executive_summary}</p>
    </div>` : ''}

    <!-- Section scores (2-column grid) -->
    <div style="margin-bottom:28px;">
      <p style="font-size:10px;color:#555570;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px 0;font-family:monospace;">Score Breakdown</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;">${sectionCards}</div>
    </div>

    <!-- Critical issues -->
    ${criticalsHtml}

    <!-- Strengths -->
    ${strengthsHtml}

    <!-- Top 5 Fixes -->
    <div style="margin-bottom:32px;">
      <p style="font-size:10px;color:#555570;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px 0;font-family:monospace;">Top 5 Fixes</p>
      ${fixesHtml}
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:32px 0;border-top:1px solid #1E1E2E;border-bottom:1px solid #1E1E2E;margin-bottom:28px;">
      <p style="font-size:13px;color:#9898B0;margin:0 0 20px 0;">View the full interactive report online or open the PDF attached to this email.</p>
      <a href="${reportUrl}" style="display:inline-block;background:#7C6FFF;color:#FFFFFF;padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:700;font-size:13px;letter-spacing:0.5px;">
        View Full Report →
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:16px;">
      <p style="font-size:11px;color:#555570;margin:0 0 4px 0;">AI-generated review. Not a professional security audit.</p>
      <p style="font-size:11px;color:#2A2A3E;margin:0;">
        <a href="${appUrl}" style="color:#555570;text-decoration:none;">vibediligence.tech</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

// ─── Email sender ─────────────────────────────────────────────────────────

/**
 * Sends the audit report email via Resend.
 * Optionally includes the PDF attachment if provided.
 */
async function sendReportEmail(
  email: string,
  audit: AuditRow,
  pdfBuffer?: Buffer,
): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vibediligence.tech';
  const repoName = audit.repo_url.replace('https://github.com/', '').replace(/\//g, '-');
  const hasAttachment = !!(pdfBuffer && pdfBuffer.length > 0);

  console.log(`[Paddle Webhook] Preparing email for ${email} (Attachment: ${hasAttachment})`);

  try {
    const { data, error } = await getResend().emails.send({
      from: 'VibeDiligence <audit@vibediligence.tech>',
      to: email,
      subject: `Your VibeDiligence Audit is Ready — Score: ${audit.scores.overall_score}/100`,
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
      console.log(`[Paddle Webhook] Email sent successfully: ${data?.id}`);
    }
  } catch (err) {
    console.error('[Paddle Webhook] Failed to send email:', err);
  }
}

// ─── Route handler ────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  console.log('[Paddle Webhook] START PROCESSING');

  // 1. Read raw body FIRST — stream is consumed after first read
  const rawBody = await req.text();

  // 2. Verify signature
  const signature = req.headers.get('paddle-signature');
  if (!signature) {
    console.error('[Paddle Webhook] Missing signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
  }

  if (!verifyPaddleSignature(rawBody, signature)) {
    console.error('[Paddle Webhook] Signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }
  console.log('[Paddle Webhook] Signature verified');

  // 3. Parse JSON
  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    console.error('[Paddle Webhook] JSON parse failed');
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 4. Only handle transaction.completed
  const eventType = event.event_type as string | undefined;
  console.log(`[Paddle Webhook] Event Type: ${eventType}`);

  if (eventType !== 'transaction.completed') {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // 5. Extract audit_id from custom_data
  const data = event.data as Record<string, unknown> | undefined;
  const customData = data?.custom_data as Record<string, unknown> | undefined;
  const auditId = customData?.audit_id as string | undefined;

  console.log(`[Paddle Webhook] Audit ID: ${auditId}`);

  if (!auditId || !isValidUUID(auditId)) {
    console.error('[Paddle Webhook] Invalid or missing Audit ID');
    return NextResponse.json({ error: 'Invalid audit ID' }, { status: 400 });
  }

  // 6. Extract email
  const email = (data?.customer as Record<string, unknown> | undefined)?.email as string | undefined;
  console.log(`[Paddle Webhook] Target Email: ${email}`);

  // 7. Idempotency check
  const { data: existing } = await supabaseAdmin
    .from('audits')
    .select('*')
    .eq('id', auditId)
    .single();

  if (existing?.paid === true) {
    console.log('[Paddle Webhook] Already paid, skipping');
    return NextResponse.json({ received: true, already_paid: true }, { status: 200 });
  }

  if (!existing) {
    console.error(`[Paddle Webhook] Audit record ${auditId} not found`);
    return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
  }

  // 8. Update Supabase: paid=true, save email
  console.log('[Paddle Webhook] Updating Supabase state...');
  const { error: updateError } = await supabaseAdmin
    .from('audits')
    .update({ paid: true, email: email ?? null })
    .eq('id', auditId);

  if (updateError) {
    console.error('[Paddle Webhook] Database update error:', updateError);
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }
  console.log('[Paddle Webhook] Database updated to PAID');

  // 9. PDF Generation (with 5s Timeout) and Email Delivery
  if (email && existing) {
    const auditData = { ...existing, paid: true, email: email ?? null } as AuditRow;
    let pdfBuffer: Buffer | undefined;

    try {
      console.log('[Paddle Webhook] Attempting PDF generation (5s timeout)...');
      // We race the generation vs a 5s timeout to avoid function killing
      pdfBuffer = await Promise.race([
        generatePdfBuffer(auditData),
        new Promise<undefined>((_, reject) =>
          setTimeout(() => reject(new Error('PDF_TIMEOUT')), 5000)
        ),
      ]);
      console.log(`[Paddle Webhook] PDF generated successfully (${pdfBuffer?.length} bytes)`);
    } catch (err) {
      console.warn('[Paddle Webhook] PDF generation failed or timed out. Sending link-only email.', err);
      // pdfBuffer remains undefined
    }

    // Always send the single email (with or without PDF)
    await sendReportEmail(email, auditData, pdfBuffer);
    console.log(`[Paddle Webhook] Webhook processing complete for ${auditId}`);
  }

  // 10. Always return 200 for valid, processed events
  return NextResponse.json({ received: true, paid: true }, { status: 200 });
}