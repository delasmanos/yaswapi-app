"use client";
import { z } from "zod";

import { type PaginationState, type SortingState } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useDebounce } from "@/lib/hooks/use-debounce";
import { SORTED_ROW_MODEL } from "@/lib/hooks/use-table-state";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePlanetsQuery } from "./hooks";

const PAGE_SIZE = 10;
const MIN_TERM_LENGTH = 2;
const searchSchema = z
  .string()
  .min(MIN_TERM_LENGTH, {
    error: `please provide at least ${MIN_TERM_LENGTH} characters`,
  })
  .trim();

const checkSearch = (term: string) => {
  try {
    searchSchema.parse(term);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.issues.map((e) => e.message).join();
    }
  }
  return null;
};

/** Read a 1-based page number from the URL and convert to 0-based index. */
const readPageIndex = (params: URLSearchParams): number =>
  Math.max(0, (Number(params.get("page")) || 1) - 1);

//TODO: make composable like usePaginateableSortableTableOptions so any useQuery for lists can be combined
export const usePlanetTableQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Search ────────────────────────────────────────────────────────────────
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [searchError, setSearchError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  // ── Sorting ───────────────────────────────────────────────────────────────
  const [sorting, setSorting] = useState<SortingState>([]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: readPageIndex(searchParams),
    pageSize: PAGE_SIZE,
  });

  // ── URL sync ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams();
    if (!searchError && debouncedSearch.length >= 2)
      params.set("search", debouncedSearch);
    if (pagination.pageIndex > 0)
      params.set("page", String(pagination.pageIndex + 1));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, searchError, pagination.pageIndex]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const onSearch = useCallback((term: string) => {
    const error = term.length ? checkSearch(term) : null;
    setSearch(term);
    setSearchError(error);
    //reset pagination
    setPagination({ pageIndex: 0, pageSize: PAGE_SIZE });
  }, []);

  const onPaginationChange = useCallback(
    (
      updater: PaginationState | ((prev: PaginationState) => PaginationState),
    ) => {
      setPagination((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        return next;
      });
    },
    [],
  );

  // ── Query ─────────────────────────────────────────────────────────────────
  const isValidSearch = !searchError && debouncedSearch.length >= 2;
  const query = usePlanetsQuery({
    page: pagination.pageIndex + 1,
    ...(isValidSearch && { search: debouncedSearch }),
  });
  const tableOptions = useMemo(
    () => ({
      state: { sorting, pagination },
      onSortingChange: setSorting,
      onPaginationChange,
      getSortedRowModel: SORTED_ROW_MODEL,
      manualPagination: true as const,
      rowCount: query.data?.count ?? 0,
      pageCount: query.data ? Math.ceil(query.data.count / PAGE_SIZE) : -1,
    }),
    [sorting, pagination, onPaginationChange, query.data],
  );
  return {
    ...query,
    tableOptions: tableOptions,
    // tableOptions: {
    //   state: { sorting, pagination },
    //   onSortingChange: setSorting,
    //   onPaginationChange,
    //   getSortedRowModel: getSortedRowModel(),
    //   rowCount: query.data?.count ?? 0,
    //   manualPagination: true,
    //   pageCount: query.data ? Math.ceil(query.data.count / PAGE_SIZE) : -1,
    // },
    search,
    setSearch: onSearch,
    searchError,
  };
};
