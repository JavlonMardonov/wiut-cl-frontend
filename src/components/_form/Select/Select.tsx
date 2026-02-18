import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import React, { ReactNode } from "react";

import { IconButton } from "@/components/Button/IconButton";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  "focus:none flex w-full items-center justify-between rounded-md border px-4 py-3 text-sm ring-offset-background focus:outline-none focus:outline-2 disabled:cursor-not-allowed disabled:bg-bg-disabled-subtle disabled:text-text-disabled data-[placeholder]:text-text-placeholder [&>span]:line-clamp-1 [&>svg]:data-[state=open]:rotate-180",
  {
    variants: {
      variant: {
        default:
          "border-border-primary bg-bg-primary text-text-primary focus:outline-border-brand data-[state=open]:border-border-brand",
        error:
          "border-border-error-subtle bg-bg-error text-text-error-primary focus:outline-border-error data-[state=open]:border-border-error",
      },
      size: {
        sm: "h-10",
        md: "h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  clearable?: boolean;
  onClear?: () => void;
  iconLeft?: React.ReactNode;
  helperText?: string;
  helperTextClassName?: string;
}
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      children,
      clearable = false,
      onClear,
      variant = "default",
      size = "sm",
      helperText,
      helperTextClassName,
      iconLeft,
      ...props
    },
    ref,
  ) => (
    <div>
      <div className={cn("relative", { "pb-1": !!helperText })}>
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(selectTriggerVariants({ variant, size }), className)}
          {...props}
        >
          {iconLeft && (
            <span className="absolute left-4 top-1/2 size-6 -translate-y-1/2 text-fg-quaternary">
              {iconLeft}
            </span>
          )}
          <span className={cn({ "ml-6": !!iconLeft })}>{children}</span>
          {!clearable && (
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="size-4 opacity-50" />
            </SelectPrimitive.Icon>
          )}
        </SelectPrimitive.Trigger>
        {clearable && (
          <IconButton
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 size-6 -translate-y-1/2 text-fg-quinary"
            variant="ghost"
          >
            <X size={18} />
          </IconButton>
        )}
      </div>
      {!!helperText && (
        <span className={cn("text-xs text-text-tertiary", helperTextClassName)}>
          {helperText}
        </span>
      )}
    </div>
  ),
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectScrollUpButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollUpButton
  > {}
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUp className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

interface SelectScrollDownButtonProps
  extends React.ComponentPropsWithoutRef<
    typeof SelectPrimitive.ScrollDownButton
  > {}
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  SelectScrollDownButtonProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDown className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border-secondary bg-bg-primary text-text-primary shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  iconLeft?: ReactNode;
}
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, iconLeft, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-bg-active focus:text-text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
    {iconLeft && (
      <span className="absolute left-2.5 top-1/2 size-6 -translate-y-1/2 text-fg-quaternary">
        {iconLeft}
      </span>
    )}

    <SelectPrimitive.ItemText>
      <span className={cn("", { "ml-2": iconLeft!! })}>{children}</span>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border-secondary", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  selectTriggerVariants,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
