/**
 * @file useAuditForm.ts
 * @description Custom hook encapsulating all audit intake form state and submission logic.
 * Rule: All form logic lives here — not in components.
 */

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

/** Error code to user-friendly message mapping. */
const ERROR_MESSAGES: Record<string, string> = {
  INVALID_URL: "Please enter a valid public GitHub repository URL.",
  REPO_NOT_FOUND: "Repository not found. Check the URL and make sure it is public.",
  REPO_PRIVATE: "This repository is private. Make it public to use VibeDiligence.",
  REPO_EMPTY: "This repository does not have enough code to analyze.",
  AUDIT_FAILED: "Analysis failed. Please try again in a moment.",
  RATE_LIMITED: "Too many requests. Please wait a moment and try again.",
  BODY_TOO_LARGE: "Request body too large.",
  VALIDATION_ERROR: "Please check your form inputs and try again.",
  INTERNAL_ERROR: "Something went wrong. Please try again.",
};

/** Form field values managed by the hook. */
export interface AuditFormValues {
  repo_url: string;
  framework: string;
  auth: string;
  database: string;
  deployment: string;
}

/** Return type of the useAuditForm hook. */
export interface UseAuditFormReturn {
  values: AuditFormValues;
  loading: boolean;
  error: string | null;
  currentStep: number;
  updateField: (field: keyof AuditFormValues, value: string) => void;
  handleSubmit: () => Promise<void>;
}

/** Default initial form values. */
const DEFAULT_VALUES: AuditFormValues = {
  repo_url: "",
  framework: "Next.js",
  auth: "None",
  database: "Supabase",
  deployment: "Vercel",
};

/**
 * useAuditForm hook.
 * Manages form state, client-side URL pre-validation, API submission,
 * loading step progression, and redirect on success.
 */
export function useAuditForm(): UseAuditFormReturn {
  const router = useRouter();
  const [values, setValues] = useState<AuditFormValues>(DEFAULT_VALUES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const updateField = useCallback((field: keyof AuditFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setError(null);

    // Client-side URL pre-check
    const urlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]{1,100}\/[a-zA-Z0-9_.-]{1,100}\/?$/;
    if (!urlPattern.test(values.repo_url.trim())) {
      setError("Please enter a valid public GitHub repository URL (e.g., https://github.com/org/repo).");
      return;
    }

    setLoading(true);
    setCurrentStep(0);

    // Auto-advance loading steps every 3 seconds across 10 steps
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 9) return prev + 1;
        return prev;
      });
    }, 3000);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json() as Record<string, unknown>;

      if (!res.ok) {
        const code = (data.code as string) || "INTERNAL_ERROR";
        setError(ERROR_MESSAGES[code] || ERROR_MESSAGES.INTERNAL_ERROR);
        return;
      }

      const auditId = data.auditId as string;
      if (auditId) {
        router.push(`/results/${auditId}`);
      }
    } catch {
      setError(ERROR_MESSAGES.INTERNAL_ERROR);
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  }, [values, router]);

  return { values, loading, error, currentStep, updateField, handleSubmit };
}
