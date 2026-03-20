/**
 * @file route.ts
 * @description Development only API route to bypass the paywall.
 * DO NOT USE IN PRODUCTION. Requires process.env.NODE_ENV === 'development'.
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { isValidUUID } from '@/lib/validation';

export const dynamic = 'force-dynamic';

/**
 * POST /api/dev/unlock
 * Updates the 'paid' status of an audit for local testing.
 */
export async function POST(req: NextRequest) {
  // 1. Security Check: Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    const { auditId } = await req.json();

    if (!auditId || !isValidUUID(auditId)) {
      return NextResponse.json({ error: 'Invalid audit ID' }, { status: 400 });
    }

    // 2. Update Supabase
    const { error } = await supabaseAdmin
      .from('audits')
      .update({ paid: true })
      .eq('id', auditId);

    if (error) {
      console.error('[DEV UNLOCK] Error:', error);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DEV UNLOCK] Crash:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
