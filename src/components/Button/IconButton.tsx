import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
    variants: {
      isCircled: {
        true: "!rounded-full",
      },
      size: {
        default: "h-10 min-w-10 px-1.5 [&>svg]:w-5 [&>svg]:h-5",
        lg: "h-11 min-w-11 px-2 [&>svg]:w-5 [&>svg]:h-5",
        sm: "h-9 min-w-9 px-1 rounded-sm [&>svg]:w-5 [&>svg]:h-5",
      },
      variant: {
        error:
          "bg-fg-error-primary text-white focus-visible:ring-error hover:bg-error-700",
        "error-ghost":
          "text-text-error-primary hover:text-error-700 hover:bg-bg-error-primary focus-visible:ring-error",
        "error-outline":
          "border border-error-300 text-error-700 hover:text-error-800 hover:bg-bg-error-primary focus-visible:ring-error",
        ghost:
          "text-fg-tertiary hover:text-fg-tertiary-hover hover:bg-bg-primary-hover",
        outline:
          "border border-border-primary bg-bg-secondary text-fg-quaternary hover:bg-bg-secondary-hover hover:text-fg-quaternary-hover",
        primary: "bg-bg-brand-solid text-white hover:bg-bg-brand-solid-hover",
        "primary-ghost":
          "bg-bg-primary text-primary-700 hover:bg-bg-brand-primary-alt hover:text-primary-800",
        "primary-outline":
          "border border-primary-300 bg-bg-primary text-primary-700 hover:bg-bg-brand-primary-alt hover:text-primary-800",
      },
    },
  },
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  isCircled?: boolean;
  isLoading?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "primary",
      size,
      asChild = false,
      isCircled = false,
      isLoading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          iconButtonVariants({ className, isCircled, size, variant }),
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {isLoading === true ? <Loader2 className="animate-spin" /> : children}
      </Comp>
    );
  },
);
IconButton.displayName = "Button";

export { IconButton, iconButtonVariants };
