/**
 * @file AuditForm.tsx
 * @description The main repository intake form for beginning an audit.
 */

"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Github, Globe, Database, Shield, ArrowRight } from "lucide-react";
import { FRAMEWORK_OPTIONS, DATABASE_OPTIONS } from "@/data/form-options";

/**
 * AuditForm component.
 * Rule: Handles form UI and layout. Business logic belongs in hooks/lib.
 */
export default function AuditForm() {
  return (
    <Card className="max-w-2xl mx-auto p-8 md:p-12">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
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
          />
          <p className="text-[10px] text-muted">
            Supports public repositories and private access via token.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Framework */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-muted uppercase tracking-widest flex items-center gap-2">
              <Globe size={14} className="text-pink-500" />
              Primary Framework
            </label>
            <select className="input appearance-none bg-surface">
              {FRAMEWORK_OPTIONS.map((opt) => (
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
            <select className="input appearance-none bg-surface">
              {DATABASE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-border mt-10">
          <Button className="w-full py-5 text-xl h-auto group">
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
    </Card>
  );
}
