import { Slot, Slottable } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
    variants: {
      size: {
        default: "h-10 px-4 py-2 [&>svg]:w-5 [&>svg]:h-5",
        lg: "h-11 px-8 [&>svg]:w-5 [&>svg]:h-5",
        link: "p-0 m-0 [&>svg]:w-5 [&>svg]:h-5",
        sm: "h-9 px-3 [&>svg]:w-5 [&>svg]:h-5",
      },
      variant: {
        error:
          "bg-fg-error-primary text-white focus-visible:ring-error hover:bg-error-700",
        "error-ghost":
          "text-text-error-primary hover:text-error-700 hover:bg-bg-error-primary focus-visible:ring-error",
        "error-link":
          "text-error-700 hover:text-error-800 focus-visible:ring-error",
        "error-outline":
          "border border-error-300 text-error-700 hover:text-error-800 hover:bg-bg-error-primary focus-visible:ring-error",
        ghost:
          "text-fg-tertiary hover:text-fg-tertiary-hover hover:bg-bg-primary-hover",
        input:
          "border-border-primary bg-bg-primary text-text-primary focus:outline-border-brand data-[state=open]:border-border-brand focus:none flex w-full items-center justify-between rounded-md border px-4 py-3 text-sm focus:outline-none focus:outline-2 disabled:cursor-not-allowed disabled:bg-bg-disabled-subtle disabled:text-text-disabled data-[placeholder]:text-text-placeholder [&>span]:line-clamp-1 [&>svg]:data-[state=open]:rotate-180",
        link: "text-fg-quaternary hover:text-fg-quaternary-hover",
        outline:
          "border border-border-primary bg-bg-secondary text-fg-quaternary hover:bg-bg-secondary-hover hover:text-fg-quaternary-hover",
        primary: "bg-bg-brand-solid text-white hover:bg-bg-brand-solid-hover",
        "primary-ghost":
          "bg-bg-primary text-primary-700 hover:bg-bg-brand-primary-alt hover:text-primary-800",
        "primary-link": "text-primary-700 hover:text-primary-800",
        "primary-outline":
          "border border-primary-300 bg-bg-primary text-primary-700 hover:bg-bg-brand-primary-alt hover:text-primary-800",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size = "default",
      asChild = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
      >
        {iconLeft && <span className="mr-2">{iconLeft}</span>}
        <Slottable>{children}</Slottable>
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
