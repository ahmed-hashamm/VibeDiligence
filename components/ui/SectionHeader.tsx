import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string;
  heading: string;
  subheading?: string;
  center?: boolean;
}

/**
 * Standard Header for landing sections.
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
      <span className="eyebrow-label block mb-4">{eyebrow}</span>
      <h2 className="section-heading mb-6">{heading}</h2>
      {subheading && <p className="section-subheading">{subheading}</p>}
    </div>
  );
};
