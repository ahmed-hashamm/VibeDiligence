/**
 * @file route.ts
 * @description POST /api/webhooks/paddle — handles Paddle payment webhooks.
 * Verifies HMAC-SHA256 signature with timing-safe comparison,
 * handles transaction.completed events, sets paid=true, and sends confirmation email.
 * Raw body must be read FIRST before any JSON parsing.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isValidUUID } from '@/lib/validation';
import { supabaseAdmin } from '@/lib/supabase';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const getResend = () => new Resend(process.env.RESEND_API_KEY);

/**
 * Verifies the Paddle webhook signature using HMAC-SHA256 with timing-safe comparison.
 * Paddle-Signature header format: "ts=1234567890;h1=abc123def456..."
 * Signed payload format: "timestamp:rawBody"
 * @returns true if the signature is valid.
 */
function verifyPaddleSignature(rawBody: string, signatureHeader: string): boolean {
  const secret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!secret) return false;

  // Parse "ts=...;h1=..." format from Paddle-Signature header
  const parts: Record<string, string> = {};
  for (const segment of signatureHeader.split(';')) {
    const eqIndex = segment.indexOf('=');
    if (eqIndex === -1) continue;
    parts[segment.slice(0, eqIndex)] = segment.slice(eqIndex + 1);
  }

  const ts = parts['ts'];
  const h1 = parts['h1'];
  if (!ts || !h1) return false;

  // Signed payload = "timestamp:rawBody"
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
 * Sends the audit report delivery email via Resend.
 */
async function sendReportEmail(email: string, auditId: string, repoUrl: string): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vibediligence.tech';

  try {
    await getResend().emails.send({
      from: 'VibeDiligence <audit@vibediligence.tech>',
      to: email,
      subject: 'Your VibeDiligence Audit Report is Ready',
      html: `
        <div style="background:#08080F;color:#F0F0FF;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;">
          <h1 style="color:#FF2D6B;">VibeDiligence</h1>
          <p>Your audit report for <strong>${repoUrl}</strong> is ready.</p>
          <a href="${appUrl}/results/${auditId}"
             style="display:inline-block;background:#FF2D6B;color:#fff;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:600;margin-top:16px;">
            View &amp; Download Report
          </a>
          <p style="color:#4A4A6A;font-size:12px;margin-top:40px;">
            AI-generated review. Not a professional security audit.
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[Paddle Webhook] Failed to send email');
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Read raw body FIRST — body stream is consumed after first read
  const rawBody = await req.text();

  // 2. Get and verify signature
  const signature = req.headers.get('paddle-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
  }

  if (!verifyPaddleSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // 3. Parse JSON from raw body
  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // 4. Only handle transaction.completed
  const eventType = event.event_type as string | undefined;
  if (eventType !== 'transaction.completed') {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  // 5. Extract audit_id from custom_data
  const data = event.data as Record<string, unknown> | undefined;
  const customData = data?.custom_data as Record<string, unknown> | undefined;
  const auditId = customData?.audit_id as string | undefined;

  if (!auditId || !isValidUUID(auditId)) {
    return NextResponse.json({ error: 'Invalid audit ID' }, { status: 400 });
  }

  // 6. Extract email
  const email = (data?.customer as Record<string, unknown> | undefined)?.email as string | undefined;

  // 7. Idempotency: check if already paid
  const { data: existing } = await supabaseAdmin
    .from('audits')
    .select('paid, repo_url')
    .eq('id', auditId)
    .single();

  if (existing?.paid === true) {
    return NextResponse.json({ received: true, already_paid: true }, { status: 200 });
  }

  // 8. Update Supabase: paid=true, save email
  const { error: updateError } = await supabaseAdmin
    .from('audits')
    .update({ paid: true, email: email ?? null })
    .eq('id', auditId);

  if (updateError) {
    console.error('[POST /api/webhooks/paddle] Supabase update error');
    return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
  }

  // 9. Send confirmation email
  if (email && existing?.repo_url) {
    await sendReportEmail(email, auditId, existing.repo_url as string);
  }

  // 10. Always return 200 for valid signatures
  return NextResponse.json({ received: true, paid: true }, { status: 200 });
}
