import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-bg-secondary text-primary-foreground border border-border-secondary text-gray-700",
        outline:
          "bg-transparent text-primary-foreground border border-border-secondary text-gray-700",
        "outline-error": "bg-transparent border border-border-error text-error",
        "outline-primary":
          "bg-transparent border border-border-brand text-primary",
        "outline-warning":
          "bg-transparent border border-border-warning text-warning",
        "outline-success":
          "bg-transparent border border-border-success text-success",
        primary:
          "bg-bg-brand-primary border border-border-brand text-text-brand-secondary",
        error:
          "bg-bg-error-primary border border-border-error-subtle text-text-error-secondary",
        warning:
          "bg-bg-warning-primary border border-border-warning text-text-warning-secondary",
        success:
          "bg-bg-success-primary border border-border-success text-text-success-secondary",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-md",
      },
      tag: {
        true: "rounded-md",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      tag: false,
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  asChild?: boolean;
}

function Badge({
  className,
  variant,
  size = "sm",
  tag = false,
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "flex items-center justify-between",
        badgeVariants({ variant, size, tag }),
        className,
      )}
      {...props}
    >
      {iconLeft && <span className="mr-2">{iconLeft}</span>}
      <Slottable>{children}</Slottable>
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </Comp>
  );
}

export { Badge, badgeVariants };
