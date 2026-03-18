"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import GridBackground from "@/animations/svgs/GridBackground";
import { Github, Globe, Database, Shield, ArrowRight } from "lucide-react";

/**
 * AuditPage: The repository intake form.
 */
export default function AuditPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-bg relative overflow-hidden">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader
          eyebrow="Intake Form"
          heading="Initialize your scan."
          subheading="Paste your repository details below. Our agentic AI will begin the audit immediately."
        />

        <Card className="max-w-2xl mx-auto p-8 md:p-12">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Repo URL */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                <Github size={14} className="text-pink-500" />
                GitHub Repository URL
              </label>
              <input
                type="text"
                placeholder="https://github.com/org/repo"
                className="input"
              />
              <p className="text-[10px] text-text-muted">Supports public repositories and private access via token.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Framework */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                  <Globe size={14} className="text-pink-500" />
                  Primary Framework
                </label>
                <select className="input appearance-none bg-surface">
                  <option>Next.js / React</option>
                  <option>Vue / Nuxt</option>
                  <option>Node.js / Express</option>
                  <option>Python / Django</option>
                  <option>Rust / Actix</option>
                </select>
              </div>

              {/* Database */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold text-text-muted uppercase tracking-widest flex items-center gap-2">
                  <Database size={14} className="text-pink-500" />
                  Primary Database
                </label>
                <select className="input appearance-none bg-surface">
                  <option>PostgreSQL</option>
                  <option>MongoDB</option>
                  <option>Redis</option>
                  <option>MySQL</option>
                  <option>DynamoDB</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-border mt-10">
              <Button className="w-full py-5 text-xl h-auto group">
                Begin Agentic Audit
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="mt-6 flex items-center justify-center gap-6 text-[10px] font-mono text-text-muted uppercase tracking-tighter">
                <span className="flex items-center gap-1"><Shield size={12} className="text-success" /> Encrypted Transfer</span>
                <span className="flex items-center gap-1"><Shield size={12} className="text-success" /> SOC2 Compliant AI</span>
              </div>
            </div>
          </form>
        </Card>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
    </main>
  );
}
