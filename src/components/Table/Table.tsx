import { Slot, Slottable } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-bg-primary [&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

interface HeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
}
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, title, description, extra, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between px-2 pt-3", className)}
      {...props}
    >
      <div className="flex flex-col space-x-0.5">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm text-text-tertiary">{description}</div>
      </div>
      {extra}
    </div>
  ),
);
Header.displayName = "Header";

interface TableTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
const TableTitle = React.forwardRef<HTMLDivElement, TableTitleProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn("text-lg font-semibold text-text-primary", className)}
        {...props}
      >
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);
TableTitle.displayName = "TableTitle";

interface TableDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
const TableDescription = React.forwardRef<
  HTMLDivElement,
  TableDescriptionProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={cn("text-sm text-text-tertiary", className)}
      {...props}
    >
      <Slottable>{children}</Slottable>
    </Comp>
  );
});
TableDescription.displayName = "TableDescription";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors hover:bg-bg-secondary",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-text-quaternary [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-text-quaternary", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  type HeaderProps,
  Header,
  TableTitle,
  TableDescription,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
