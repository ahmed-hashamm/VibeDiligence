/**
 * @file AuditForm.tsx
 * @description The main repository intake form for beginning an audit.
 * Rule: Handles form UI and layout. Business logic lives in hooks/useAuditForm.ts.
 */

"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Github, Globe, Database, Shield, ArrowRight, Server, Lock } from "lucide-react";
import { FRAMEWORK_OPTIONS, AUTH_OPTIONS, DATABASE_OPTIONS, DEPLOYMENT_OPTIONS } from "@/data/form-options";
import { useAuditForm } from "@/hooks/useAuditForm";
import LoadingSteps from "@/components/LoadingSteps";

/**
 * AuditForm component.
 * Renders the intake form or loading steps depending on submission state.
 */
export default function AuditForm() {
  const { values, loading, error, currentStep, updateField, handleSubmit } = useAuditForm();

  return (
    <Card className="max-w-2xl mx-auto p-8 md:p-12">
      {loading ? (
        <LoadingSteps currentStep={currentStep} />
      ) : (
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {/* Error display */}
          {error && (
            <div className="p-4 rounded-xl bg-[#FF4444]/10 border border-[#FF4444]/30 text-[#FF4444] text-sm font-medium">
              {error}
            </div>
          )}

          {/* Repo URL */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
              <Github size={14} className="text-pink-500" />
              GitHub Repository URL
            </label>
            <input
              type="text"
              placeholder="https://github.com/org/repo"
              className="input"
              value={values.repo_url}
              onChange={(e) => updateField("repo_url", e.target.value)}
            />
            <p className="text-[10px] text-muted">
              Public repositories only. We never store your source code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Framework */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Globe size={14} className="text-pink-500" />
                Primary Framework
              </label>
              <select
                className="input appearance-none bg-surface"
                value={values.framework}
                onChange={(e) => updateField("framework", e.target.value)}
              >
                {FRAMEWORK_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Auth */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} className="text-pink-500" />
                Authentication
              </label>
              <select
                className="input appearance-none bg-surface"
                value={values.auth}
                onChange={(e) => updateField("auth", e.target.value)}
              >
                {AUTH_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Database */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Database size={14} className="text-pink-500" />
                Primary Database
              </label>
              <select
                className="input appearance-none bg-surface"
                value={values.database}
                onChange={(e) => updateField("database", e.target.value)}
              >
                {DATABASE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Deployment */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                <Server size={14} className="text-pink-500" />
                Deployment Platform
              </label>
              <select
                className="input appearance-none bg-surface"
                value={values.deployment}
                onChange={(e) => updateField("deployment", e.target.value)}
              >
                {DEPLOYMENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 border-t border-border mt-10">
            <Button type="submit" className="w-full py-5 text-xl h-auto group">
              Begin Agentic Audit
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="mt-6 flex items-center justify-center gap-6 text-[10px] font-mono text-muted uppercase tracking-tighter">
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-success" /> Encrypted Transfer
              </span>
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-success" /> SOC2 Compliant AI
              </span>
            </div>
          </div>
        </form>
      )}
    </Card>
  );
}
