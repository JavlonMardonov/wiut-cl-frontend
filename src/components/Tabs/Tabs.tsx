import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "flex gap-1 data-[orientation=vertical]:flex-col data-[orientation=horizontal]:items-center relative",
  {
    variants: {
      color: {
        brand: "",
        gray: "",
        underline:
          "before:absolute before:bottom-0 before:right-0 before:left-0 before:w-full before:h-[1px] before:bg-border-secondary",
        border:
          "bg-bg-secondary-alt border border-solid border-border-secondary",
      },
      fullWidth: {
        true: "[&>*]:grow",
        false: "",
      },
      size: {
        sm: "",
        md: "",
      },
    },
    compoundVariants: [
      {
        color: "border",
        size: "sm",
        class: "rounded-lg p-1",
      },
      {
        color: "border",
        size: "md",
        class: "rounded-xl p-1.5",
      },
    ],
    defaultVariants: {
      color: "brand",
      fullWidth: false,
      size: "sm",
    },
  },
);

interface TabsListProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
      "color"
    >,
    VariantProps<typeof tabsListVariants> {}
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, color, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ color, size, fullWidth }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;
// Colors/Text/text-brand-secondary (700)
const tabsTriggerVariants = cva(
  "relative whitespace-nowrap text-sm text-center text-text-quaternary data-[orientation=vertical]:text-left font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: {
        brand:
          "rounded-sm data-[state=active]:bg-bg-brand-primary-alt data-[state=active]:text-text-brand-secondary hover:bg-bg-brand-primary-alt hover:text-text-brand-secondary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        gray: "rounded-sm data-[state=active]:bg-bg-active data-[state=active]:text-text-secondary hover:bg-bg-active hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        underline:
          "border-b-2 border-solid border-transparent data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-l-2 data-[state=active]:border-fg-brand-primary-alt data-[state=active]:text-text-brand-secondary hover:border-fg-brand-primary-alt hover:text-text-brand-secondary",
        border:
          "rounded-sm data-[state=active]:bg-bg-primary-alt data-[state=active]:shadow-sm data-[state=active]:text-text-secondary hover:bg-bg-primary-alt hover:shadow-sm hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      },
      size: {
        sm: "py-2 px-3",
        md: "py-2.5 px-3",
      },
    },
    compoundVariants: [
      {
        color: "underline",
        size: "sm",
        class:
          "pt-0 pb-2.5 px-1 data-[orientation=vertical]:py-2 data-[orientation=vertical]:px-3",
      },
      {
        color: "underline",
        size: "md",
        class:
          "pt-0 pb-2.5 px-1 data-[orientation=vertical]:py-2.5 data-[orientation=vertical]:px-3.5",
      },
    ],
    defaultVariants: {
      color: "brand",
      size: "sm",
    },
  },
);
interface TabsTriggerProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
      "color" | "size"
    >,
    VariantProps<typeof tabsTriggerVariants> {}
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, color, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ color, size }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
