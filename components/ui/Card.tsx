/**
 * @file Card.tsx
 * @description Standardized card component with themed hover effects.
 */

import { cn } from "@/lib/utils";

/**
 * CardProps interface.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isHighlighted?: boolean;
}

/**
 * Card component.
 * Base container for content sections with optional highlight styling.
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
