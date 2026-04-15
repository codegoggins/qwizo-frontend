"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  pageSize?: number;
  className?: string;
}

function DataTable<T>({ columns, data, pageSize = 5, className }: DataTableProps<T>) {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <div className={cn("overflow-hidden rounded-xl border-2 border-neo-black bg-background shadow-[4px_4px_0px_0px_#1B1B1B]", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-neo-black bg-secondary">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-5 py-3 text-left font-bold">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-5 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between border-t-2 border-neo-black px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {pagination.pageIndex * pagination.pageSize + 1}–{Math.min((pagination.pageIndex + 1) * pagination.pageSize, data.length)} of {data.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted disabled:opacity-40"
            >
              <RiArrowLeftSLine className="size-4" />
            </button>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => table.setPageIndex(i)}
                className={
                  pagination.pageIndex === i
                    ? "flex size-8 items-center justify-center border-2 border-neo-black bg-primary text-xs font-bold text-primary-foreground"
                    : "flex size-8 items-center justify-center border-2 border-neo-black bg-background text-xs font-bold hover:bg-muted"
                }
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className="flex size-8 items-center justify-center border-2 border-neo-black bg-background font-bold hover:bg-muted disabled:opacity-40"
            >
              <RiArrowRightSLine className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { DataTable };
export type { DataTableProps };
