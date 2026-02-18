"use client";
import { queryClient } from "@/components/provider/PersistentQueryProvider";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListResponse } from "@/lib/api/types";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type TableOptions,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { SearchInput } from "../SearchInput";

type ListDataTableProps<T extends Record<string, unknown>> = {
  result: ListResponse<T> | undefined;
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  // allow caller to forward any extra table options (sorting state, pagination, etc.)
  tableOptions?: Partial<
    Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">
  >;
  search?: string;
  onSearch: (search: string) => void;
  searchError: string | null;
};
export function ListDataTable<TDoimainModel extends Record<string, unknown>>({
  columns,
  onSearch,
  result,
  isFetching,
  isError,
  isLoading,
  search = "",
  tableOptions,
  searchError = null,
}: ListDataTableProps<TDoimainModel>) {
  const table = useReactTable({
    data: result?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  return (
    <div>
      <div role="status" aria-live="polite" className="sr-only">
        {isFetching ? "Loading…" : ""}
      </div>
      <div className="flex items-start ">
        <search className="mb-4">
          <SearchInput
            name="search"
            search={search}
            setSearch={onSearch}
            suffix={
              <>
                <Button
                  variant={"outline"}
                  size="icon-xs"
                  aria-label="clear"
                  onClick={() => onSearch("")}
                  aria-controls="people-tbody"
                >
                  <X />
                </Button>
              </>
            }
          />

          <div className="mt-2 text-sm text-muted-foreground flex gap-4">
            Results: {result?.count ?? 0}
            {isLoading ||
              (isFetching && <Spinner className="self-center size-4" />)}
          </div>
          <p className="text-red-500">{searchError}</p>
          {isError && (
            <span className="text-destructive">Error fetching data</span>
          )}
        </search>
        <div className="ml-auto gap-2 flex center">
          {table.getState().sorting.length > 0 && (
            <Button
              onClick={() => table.resetSorting()}
              variant="outline"
              size="sm"
            >
              reset sorting
            </Button>
          )}
          <Button
            onClick={() => queryClient.clear()}
            variant="outline"
            size="sm"
          >
            clear cache
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table aria-label="Star Wars characters" aria-rowcount={result?.count}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
          <TableBody id="people-tbody" aria-busy={isFetching}>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} aria-hidden="true">
                  {columns?.map((_, j) => (
                    <TableCell key={j}>—</TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length ?? 0}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {!search && (
          <Pagination className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                aria-label="Go to previous page"
                aria-disabled={!table.getCanPreviousPage() || isFetching}
                disabled={!table.getCanPreviousPage() || isFetching}
                onClick={(e) => {
                  e.preventDefault();
                  table.previousPage();
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage() || isFetching}
                aria-label="Next page"
              >
                {isFetching ? "Loading…" : "Next"}
              </PaginationNext>
            </PaginationItem>
          </Pagination>
        )}
        <p className="self-start" aria-current="page">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
      </div>
    </div>
  );
}
