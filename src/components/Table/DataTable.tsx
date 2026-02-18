import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CSSProperties,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

import { Spinner } from "../Spinner";

import { DataTablePagination } from "./DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  HeaderProps,
  Header,
} from "./Table";

const DEFAULT_TABLE_COLUMN_WIDTH = 150;

type PaginationProps =
  | false
  | {
      pagination: PaginationState;
      onPaginationChange: Dispatch<SetStateAction<PaginationState>>;
      rowCount: number;
    };

interface DataTableProps<TData, TValue> extends HeaderProps {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  additionalInfo?: ReactNode;
  emptyState?: ReactNode;
  footer?: ReactNode;
  navigateTo?: string;
  className?: string;
  isStriped?: boolean;
  isLoading?: boolean;
  pagination?: PaginationProps;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  navigateTo,
  pagination = false,
  additionalInfo,
  emptyState,
  footer,
  className,
  isStriped,
  title,
  description,
  extra,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const navigate = useNavigate();

  const paginationProps = pagination !== false ? pagination : undefined;

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      pagination: {
        pageIndex: paginationProps?.pagination.pageIndex ?? 0,
        pageSize: paginationProps?.pagination.pageSize ?? data.length,
      },
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    manualPagination: true,
    rowCount: paginationProps?.rowCount ?? data.length,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: paginationProps?.onPaginationChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div
      className={cn(
        "space-y-4 overflow-hidden rounded-md border pb-4",
        className,
      )}
    >
      {(title || description || extra) && (
        <Header title={title} description={description} extra={extra} />
      )}
      <Table>
        <TableHeader
          className={cn("sticky top-0", {
            "border-t": title || description || extra,
          })}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const styles: CSSProperties =
                  header.getSize() !== DEFAULT_TABLE_COLUMN_WIDTH
                    ? { width: `${header.getSize()}px` }
                    : {};
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={styles}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn({ "odd:bg-bg-secondary": isStriped })}
                onClick={() => navigateTo && navigate(navigateTo)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyState || "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {isLoading && (
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white opacity-75">
            <Spinner />
          </div>
        )}
      </Table>
      {footer}
      {pagination && (
        <DataTablePagination table={table} additionalInfo={additionalInfo} />
      )}
    </div>
  );
}
