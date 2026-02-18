import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm text-text-secondary font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

interface IProps extends VariantProps<typeof labelVariants> {
  extraLabel?: React.ReactNode;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & IProps
>(({ className, extraLabel, ...props }, ref) => (
  <div className="flex items-center justify-between">
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
    {extraLabel && <div className="text-sm">{extraLabel}</div>}
  </div>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
