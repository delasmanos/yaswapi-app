"use client";

import { SearchInput } from "@/components/data-display/SearchInput";
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
import { usePeopleQuery } from "@/features/people/hooks";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useState } from "react";
import { columns } from "./people-column-definition";

export function PeopleList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);

  // Read initial values from URL
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
  // Defer the search value so typing doesn't feel laggy
  const deferredSearch = useDeferredValue(search);

  // Sync state → URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (deferredSearch) params.set("search", deferredSearch);
    if (page > 1) params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [deferredSearch, page]);

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setPage(1);
  }, [deferredSearch]);

  const { data, isLoading, isFetching } = usePeopleQuery({
    page,
    search: deferredSearch,
  });

  const pageCount = data?.count ? Math.ceil(data?.count / 10) : 0;

  const table = useReactTable({
    data: data?.people ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: data?.count ?? 0,
    state: {
      sorting,
      pagination: {
        pageIndex: page - 1,
        pageSize: 10,
      },
    },
  });
  return (
    <div>
      <div role="status" aria-live="polite" className="sr-only">
        {isFetching ? "Loading…" : ""}
      </div>
      <div className="flex items-start ">
        <search className="mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            suffix={
              <>
                <Button
                  variant={"outline"}
                  size="icon-xs"
                  aria-label="clear"
                  onClick={() => setSearch("")}
                  aria-controls="people-tbody"
                >
                  <X />
                </Button>
              </>
            }
          />

          <div className="mt-2 text-sm text-muted-foreground flex gap-4">
            Results: {data?.count ?? 0}{" "}
            {isLoading ||
              (isFetching && <Spinner className="self-center size-4" />)}
          </div>
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
        <Table aria-label="Star Wars characters" aria-rowcount={data?.count}>
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
                  {columns.map((_, j) => (
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
                  colSpan={columns.length}
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
        {!deferredSearch && (
          <Pagination className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                // href={`?page=${currentPage - 1}`}
                aria-label="Go to previous page"
                aria-disabled={page <= 1 || isFetching}
                {...(!table.getCanPreviousPage() && { disabled: true })}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page - 1);
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => p + 1)}
                disabled={!table.getCanNextPage() || isFetching}
                aria-label="Next page"
              >
                {isFetching ? "Loading…" : "Next"}
              </PaginationNext>
            </PaginationItem>
          </Pagination>
        )}
        <p className="self-start" aria-current="page">
          Page {page} of {pageCount}
        </p>
      </div>
    </div>
  );
}
