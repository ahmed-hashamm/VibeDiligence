/**
 * @file LoadingSteps.tsx
 * @description Animated loading step indicator shown while the audit is in progress.
 * Displays 5 steps auto-advancing every 4s with active/done/pending states.
 */

"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Circle } from "lucide-react";

/** Loading step labels displayed during audit processing. */
const STEPS = [
  "Connecting to GitHub API...",
  "Fetching repository file tree...",
  "Analyzing code with AI engine...",
  "Scoring security & quality patterns...",
  "Generating audit report...",
];

/** Threshold in seconds before showing the "taking longer" message. */
const SLOW_THRESHOLD_MS = 45_000;

interface LoadingStepsProps {
  currentStep: number;
}

/**
 * LoadingSteps component.
 * Shows a vertically stacked step list with animated state indicators.
 * Active step: pink pulsing dot, white text.
 * Done step: green checkmark.
 * Pending step: muted text.
 */
export default function LoadingSteps({ currentStep }: LoadingStepsProps) {
  const [showSlow, setShowSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSlow(true), SLOW_THRESHOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 py-8">
      {STEPS.map((label, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div
            key={label}
            className={`flex items-center gap-4 transition-all duration-300 ${
              isDone ? "opacity-60" : isActive ? "opacity-100" : "opacity-30"
            }`}
          >
            {/* Status icon */}
            {isDone ? (
              <CheckCircle size={20} className="text-success flex-shrink-0" />
            ) : isActive ? (
              <Loader2 size={20} className="text-pink-500 animate-spin flex-shrink-0" />
            ) : (
              <Circle size={20} className="text-muted flex-shrink-0" />
            )}

            {/* Step label */}
            <span
              className={`text-sm font-mono tracking-wide ${
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

      {showSlow && (
        <p className="text-xs text-warning/80 font-mono mt-4 animate-pulse">
          Taking longer than usual — large repos need more time...
        </p>
      )}
    </div>
  );
}
