/**
 * @file StatusEyebrow.tsx
 * @description A reusable eyebrow/badge component with a pulsing status orb.
 */

import { cn } from "@/lib/utils";

interface StatusEyebrowProps {
  text: string;
  className?: string;
}

/**
 * StatusEyebrow component.
 * Features a pulsing orb and monospaced uppercase text.
 */
export default function StatusEyebrow({ text, className }: StatusEyebrowProps) {
  return (
    <div className={cn("hero-badge", className)}>
      <span className="badge-dot" />
      <span className="uppercase tracking-[0.1em]">{text}</span>
    </div>
  );
}
