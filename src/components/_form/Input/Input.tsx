import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export const inputVariants = cva(
  "w-full flex items-center rounded-md border border-border-primary shadow-sm bg-bg-primary px-3 text-sm ring-offset-border-brand focus-within:ring-[0px] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        error: "border-border-error-subtle ring-offset-border-error",
      },
      disabled: { true: "bg-bg-disabled", false: "" },
      size: {
        default: "h-10",
        sm: "h-8 rounded-sm px-2",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "disabled"
    >,
    VariantProps<typeof inputVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  suffix?: string;
  prefix?: string;
  helperText?: string;
  helperTextClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputClassName,
      size = "default",
      disabled = false,
      iconLeft,
      iconRight,
      suffix,
      prefix,
      helperText,
      helperTextClassName,
      inputWrapperClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(inputWrapperClassName)}>
        <div
          className={cn(inputVariants({ size, disabled, variant, className }))}
        >
          {iconLeft && (
            <span className="mr-2 inline-flex items-center text-fg-quinary">
              {iconLeft}
            </span>
          )}
          {prefix && (
            <span className="mr-2 border-r-[1px] pr-2 text-sm text-fg-tertiary">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled ?? undefined}
            className={cn(
              "flex-1 bg-transparent outline-none placeholder:text-text-placeholder focus:placeholder:text-text-primary",
              inputClassName,
            )}
            {...props}
          />
          {suffix && (
            <span className="ml-2 text-sm text-fg-tertiary">{suffix}</span>
          )}
          {iconRight && (
            <span
              className={cn("ml-2 inline-flex items-center text-fg-quinary", {
                "text-fg-error-secondary": variant === "error",
              })}
            >
              {iconRight}
            </span>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              "mt-2 text-xs text-text-tertiary",
              { "text-sm": size === "lg" },
              helperTextClassName,
            )}
            role="region"
            aria-live="polite"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
