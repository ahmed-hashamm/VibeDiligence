/**
 * @file results/[auditId]/page.tsx
 * @description Server component that fetches audit data and renders paywall or unlocked report.
 * Validates UUID before querying. Shows notFound() for invalid/missing audits.
 */

import { notFound } from "next/navigation";
import GridBackground from "@/animations/svgs/GridBackground";
import ResultsContent from "@/components/results/ResultsContent";
import UnlockedReport from "@/components/results/UnlockedReport";
import { supabaseAdmin } from "@/lib/supabase";
import { isValidUUID } from "@/lib/validation";
import type { AuditRow } from "@/types/audit";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * ResultsPage — server component.
 * 1. Validates auditId as UUID → notFound() if invalid
 * 2. Fetches from Supabase → notFound() if not found
 * 3. If paid === false → show paywall overlay
 * 4. If paid === true → show full report
 */
export default async function ResultsPage({ params }: { params: { auditId: string } }) {
  const { auditId } = params;

  // 1. Validate UUID
  if (!isValidUUID(auditId)) {
    notFound();
  }

  // 2. Fetch audit from Supabase
  const { data: audit } = await supabaseAdmin
    .from("audits")
    .select("*")
    .eq("id", auditId)
    .single();

  if (!audit) {
    notFound();
  }

  const auditData = audit as AuditRow;

  // 3. Render based on payment status
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative">
      <GridBackground />
      {auditData.paid ? (
        <UnlockedReport audit={auditData} />
      ) : (
        <ResultsContent audit={auditData} />
      )}
    </main>
  );
}
