/**
 * @file Button.tsx
 * @description Standardized button component for the VibeDiligence design system.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ButtonProps interface.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

/**
 * Button component.
 * Supports primary and ghost variants with optimized hover/active states.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          variant === "primary" ? "btn-primary" : "btn-ghost",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
