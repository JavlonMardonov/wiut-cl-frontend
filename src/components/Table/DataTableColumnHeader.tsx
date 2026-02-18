import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  extra?: ReactNode;
  className?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  extra,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isSorted =
    column.getIsSorted() === "desc" || column.getIsSorted() === false;

  return (
    <button
      type="button"
      className={cn("flex cursor-pointer items-center gap-1", className)}
      onClick={() => column.toggleSorting(!isSorted)}
    >
      <span className="flex items-center gap-1">
        {title}
        {extra && <span className="text-fg-quinary">{extra}</span>}
      </span>
      {isSorted ? (
        <ArrowDown className="size-4 select-none" />
      ) : (
        <ArrowUp className="size-4 select-none" />
      )}
    </button>
  );
}
