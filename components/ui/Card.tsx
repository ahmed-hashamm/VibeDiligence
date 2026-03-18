import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isHighlighted?: boolean;
}

/**
 * Reusable Card component with hover states and optional highlight.
 */
export const Card = ({ className, isHighlighted, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "card p-6",
        isHighlighted && "border-pink-500/35 shadow-[0_0_20px_rgba(255,45,107,0.15)] bg-surface-raised",
        className
      )}
      {...props}
    />
  );
};
