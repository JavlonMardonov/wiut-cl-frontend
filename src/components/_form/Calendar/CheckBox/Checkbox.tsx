import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const CheckboxVariants = cva(
  "peer shrink-0 border border-border-primary ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:data-[state=checked]:text-fg-white disabled:bg-bg-disabled-subtitle disabled:data-[state=checked]:bg-fg-white data-[state=checked]:text-text-white",
  {
    variants: {
      variant: {
        primary: "rounded-xs data-[state=checked]:bg-bg-brand-solid",
        secondary: "rounded-full data-[state=checked]:bg-bg-brand-solid",
        error:
          "border-border-error rounded-xs data-[state=checked]:bg-fg-error-primary",
      },
      size: {
        default: "h-4 w-4",
        md: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof CheckboxVariants> {
  iconType?: "tick" | "minus";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    { className, variant, size = "default", iconType = "tick", ...props },
    ref,
  ) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(CheckboxVariants({ variant, size, className }))}
      {...props}
    >
      {variant === "secondary" ? (
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <div className="flex h-1.5 w-1.5 items-center justify-center rounded-full bg-fg-white" />
        </CheckboxPrimitive.Indicator>
      ) : (
        <CheckboxPrimitive.Indicator
          className={cn(
            "flex items-center justify-center rounded-md text-current",
          )}
        >
          {iconType === "tick" ? (
            <Check size={size === "md" ? 18 : 14} />
          ) : (
            <Minus size={size === "md" ? 18 : 14} />
          )}
        </CheckboxPrimitive.Indicator>
      )}
    </CheckboxPrimitive.Root>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
