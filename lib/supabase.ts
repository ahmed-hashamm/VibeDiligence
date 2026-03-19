/**
 * @file supabase.ts
 * @description Supabase client configuration. Admin client uses service role key
 * to bypass RLS for server-side writes. Never expose service role key to browser.
 */

import { createClient } from '@supabase/supabase-js';

/**
 * Admin client — server only, bypasses RLS.
 * Use this for all server-side reads and writes.
 * NEVER import this in client components.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);
