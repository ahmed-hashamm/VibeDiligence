/**
 * @file route.ts
 * @description GET /api/audit/[auditId]/status — lightweight endpoint to check payment status.
 * Used by the frontend to poll after Paddle checkout completes.
 */

import { NextRequest, NextResponse } from 'next/server';
import { isValidUUID } from '@/lib/validation';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { auditId: string } }
): Promise<NextResponse> {
  const { auditId } = params;

  if (!isValidUUID(auditId)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const { data } = await supabaseAdmin
    .from('audits')
    .select('paid')
    .eq('id', auditId)
    .single();

  if (!data) {
    return NextResponse.json({ paid: false });
  }

  return NextResponse.json({ paid: data.paid === true });
}
