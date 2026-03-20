/**
 * @file LoadingSteps.tsx
 * @description Animated loading step indicator shown while the audit is in progress.
 * Displays 5 steps auto-advancing every 4s with active/done/pending states.
 */

"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Circle, BrainCircuit } from "lucide-react";
import { AUDIT_STEPS, AGENT_THOUGHTS } from "@/data/loading-messages";

/** Threshold in seconds before showing the "taking longer" message. */
const SLOW_THRESHOLD_MS = 60_000;

interface LoadingStepsProps {
  currentStep: number;
}

/**
 * LoadingSteps component.
 * Shows a vertically stacked step list with animated state indicators.
 * Includes a dynamic "Agentic Thoughts" ticker.
 */
export default function LoadingSteps({ currentStep }: LoadingStepsProps) {
  const [showSlow, setShowSlow] = useState(false);
  const [thoughtIndex, setThoughtIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlow(true), SLOW_THRESHOLD_MS);
    const thoughtTimer = setInterval(() => {
      setThoughtIndex(prev => (prev + 1) % AGENT_THOUGHTS.length);
    }, 2500);
    return () => {
      clearTimeout(timer);
      clearInterval(thoughtTimer);
    };
  }, []);

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        {AUDIT_STEPS.map((label, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;

          return (
            <div
              key={label}
              className={`flex items-center gap-4 transition-all duration-300 ${
                isDone ? "opacity-40" : isActive ? "opacity-100" : "opacity-20"
              }`}
            >
              {/* Status icon */}
              {isDone ? (
                <CheckCircle size={14} className="text-success flex-shrink-0" />
              ) : isActive ? (
                <Loader2 size={14} className="text-pink-500 animate-spin flex-shrink-0" />
              ) : (
                <Circle size={14} className="text-muted flex-shrink-0" />
              )}

              {/* Step label */}
              <span
                className={`text-xs font-mono tracking-wide ${
                  isDone
                    ? "text-secondary line-through"
                    : isActive
                    ? "text-primary font-semibold"
                    : "text-muted"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-white/5">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 min-h-[80px]">
          <BrainCircuit size={18} className="text-pink-500 flex-shrink-0 mt-1" />
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-pink-500/60 uppercase tracking-widest font-bold">Agentic Thoughts</p>
            <p className="text-xs text-secondary leading-relaxed transition-all duration-500 animate-in fade-in slide-in-from-bottom-1">
              {AGENT_THOUGHTS[thoughtIndex]}
            </p>
          </div>
        </div>
      </div>

      {showSlow && (
        <p className="text-center text-[10px] text-warning/60 font-mono mt-4 animate-pulse">
          Analyzing a large codebase — this institutional audit takes time...
        </p>
      )}
    </div>
  );
}
