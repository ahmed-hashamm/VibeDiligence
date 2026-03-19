/**
 * @file SectionHeader.tsx
 * @description Shared header component for landing page sections.
 */

import { cn } from "@/lib/utils";

/**
 * SectionHeaderProps interface.
 */
import StatusEyebrow from "./StatusEyebrow";

/**
 * SectionHeaderProps interface.
 */
interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  heading: string;
  subheading?: string;
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
  subheading,
  lastUpdated,
  center = true,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-12 max-w-2xl", center && "mx-auto text-center", className)}>
      {eyebrow && <StatusEyebrow text={eyebrow} className="mb-10 mx-auto" />}
      <h2 className="section-heading mb-6" dangerouslySetInnerHTML={{ __html: heading }} />
      {subheading && <p className="section-subheading mb-4">{subheading}</p>}
      {lastUpdated && <p className="section-subheading">{lastUpdated}</p>}
    </div>
  );
};
