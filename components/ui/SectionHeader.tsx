/**
 * @file SectionHeader.tsx
 * @description Shared header component for landing page sections.
 */

import { cn } from "@/lib/utils";

/**
 * SectionHeaderProps interface.
 */
interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  lastUpdated?: string;
  center?: boolean;
}

/**
 * SectionHeader component.
 * Standardized header with eyebrow label, heading, and optional subheading.
 */
export const SectionHeader = ({
  eyebrow,
  heading,
  lastUpdated,
  center = true,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-sm font-mono font-bold tracking-[0.2em] uppercase mb-10">{eyebrow}</span>}
      <h2 className="section-heading mb-6" dangerouslySetInnerHTML={{ __html: heading }} />
      {lastUpdated && <p className="section-subheading">{lastUpdated}</p>}
    </div>
  );
};
