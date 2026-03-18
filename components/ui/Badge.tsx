import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "pink" | "success" | "warning" | "danger" | "outline";
}

/**
 * Reusable Badge component.
 */
export const Badge = ({ className, variant = "outline", ...props }: BadgeProps) => {
  const variantClasses = {
    pink: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    outline: "border-border text-text-secondary bg-surface",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-mono tracking-wider transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};
