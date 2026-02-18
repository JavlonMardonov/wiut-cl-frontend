import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_form/Select";
import { fNumber } from "@/lib/formatNumber";

import { IconButton } from "../Button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  additionalInfo?: ReactNode;
}

export function DataTablePagination<TData>({
  table,
  additionalInfo,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-text-tertiary">{additionalInfo}</div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Limit</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {fNumber(table.getState().pagination.pageIndex + 1)} /{" "}
          {fNumber(table.getPageCount())}
        </div>
        <div className="flex items-center space-x-2">
          <IconButton
            variant="outline"
            size="sm"
            className="hidden lg:flex"
            aria-label="Go to first page"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="outline"
            size="sm"
            aria-label="Go to previous page"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="outline"
            size="sm"
            aria-label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </IconButton>
          <IconButton
            variant="outline"
            size="sm"
            className="hidden lg:flex"
            aria-label="Go to last page"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
