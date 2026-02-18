"use client";
import { useDebounce } from "@/lib/hooks/use-debounce";

import {
  getSortedRowModel,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
export const SORTED_ROW_MODEL = getSortedRowModel();
const PAGE_SIZE = 10;

const readPageIndex = (params: URLSearchParams): number =>
  Math.max(0, (Number(params.get("page")) || 1) - 1);

interface UseTableStateOptions {
  pageSize?: number;
  searchValidator?: (term: string) => string | null;
  minSearchLength?: number;
}

export interface TableStateResult {
  search: string;
  setSearch: (term: string) => void;
  searchError: string | null;
  isValidSearch: boolean;
  debouncedSearch: string;
  pagination: PaginationState;
  tableOptions: {
    state: { sorting: SortingState; pagination: PaginationState };
    onSortingChange: (
      updater: SortingState | ((prev: SortingState) => SortingState),
    ) => void;
    onPaginationChange: (
      updater: PaginationState | ((prev: PaginationState) => PaginationState),
    ) => void;
    getSortedRowModel: ReturnType<typeof getSortedRowModel>;
    manualPagination: true;
  };
}

export const useTableState = ({
  pageSize = PAGE_SIZE,
  searchValidator,
  minSearchLength = 2,
}: UseTableStateOptions = {}): TableStateResult => {
  const isMounted = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Search ────────────────────────────────────────────────────────────────
  const [search, setSearchRaw] = useState(searchParams.get("search") ?? "");
  const deferredSearch = useDeferredValue(search); // keep input responsive
  const debouncedSearch = useDebounce(deferredSearch, 300); // gates the API call
  //   const debouncedSearch = useDebounce(search, 300);
  const [searchError, setSearchError] = useState<string | null>(null);
  const isValidSearch =
    !searchError && debouncedSearch.length >= minSearchLength;

  // ── Sorting ───────────────────────────────────────────────────────────────
  const [sorting, setSorting] = useState<SortingState>([]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: readPageIndex(searchParams),
    pageSize,
  });

  // ── URL sync ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const params = new URLSearchParams();
    if (isValidSearch) params.set("search", debouncedSearch);
    if (pagination.pageIndex > 0)
      params.set("page", String(pagination.pageIndex + 1));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    //router is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, searchError, pagination.pageIndex]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const setSearch = useCallback(
    (term: string) => {
      const error = term.length ? (searchValidator?.(term) ?? null) : null;
      setSearchRaw(term);
      setSearchError(error);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
    [searchValidator],
  );

  const onPaginationChange = useCallback(
    (
      updater: PaginationState | ((prev: PaginationState) => PaginationState),
    ) => {
      setPagination((prev) =>
        typeof updater === "function" ? updater(prev) : updater,
      );
    },
    [],
  );

  return {
    search,
    setSearch,
    searchError,
    isValidSearch,
    debouncedSearch,
    pagination,
    tableOptions: {
      state: { sorting, pagination },
      onSortingChange: setSorting,
      onPaginationChange,
      getSortedRowModel: SORTED_ROW_MODEL,
      manualPagination: true,
    },
  };
};
