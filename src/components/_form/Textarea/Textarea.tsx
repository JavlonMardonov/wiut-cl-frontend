import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

export const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-border-primary bg-bg-primary px-3 py-2 text-sm ring-offset-border-brand placeholder:text-text-placeholder focus-within:ring-[0px] focus-within:ring-offset-2 focus:placeholder:text-text-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-bg-disabled-subtle disabled:text-text-disabled disabled:border-border-disabled disabled:opacity-50",
  {
    variants: {
      variant: {
        error: "border-border-error-subtle ring-offset-border-error",
      },
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  textareaClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaClassName,
      helperText,
      helperTextClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(className)}>
        <textarea
          className={cn(textareaVariants({ variant }), textareaClassName)}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={cn(
              "mt-2 text-xs text-text-tertiary",
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
Textarea.displayName = "Textarea";

export { Textarea };
