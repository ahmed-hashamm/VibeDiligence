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
  subheading?: string;
  center?: boolean;
}

/**
 * SectionHeader component.
 * Standardized header with eyebrow label, heading, and optional subheading.
 */
export const SectionHeader = ({
  eyebrow,
  heading,
  subheading,
  center = true,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <span className="eyebrow-label block mb-4">{eyebrow}</span>}
      <h2 className="section-heading mb-6" dangerouslySetInnerHTML={{ __html: heading }} />
      {subheading && <p className="section-subheading">{subheading}</p>}
    </div>
  );
};
