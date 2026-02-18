"use client";
import { swapiClient } from "@/lib/api/swapi-client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { getSortedRowModel, type SortingState } from "@tanstack/react-table";
import { useDeferredValue, useEffect, useState } from "react";
import { getPlanets } from "./api";

import { useTableState } from "@/lib/hooks/use-table-state";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mapPlanet } from "./mappers";

export type PlanetsQueryParams = {
  page?: number;
  search?: string;
};
export const usePlanetsQuery = ({ page, search }: PlanetsQueryParams) => {
  console.log("usePlanetsQuery", page, search);
  return useQuery({
    queryKey: ["planets", page, search],
    queryFn: async () => {
      const { results, count, next, previous } = await getPlanets(
        swapiClient,
        page,
        search,
      );
      return {
        results: results.map(mapPlanet),
        count,
        next,
        previous,
      };
    },
    placeholderData: (prev) => prev, // show current data until new one is ready
  });
};

const searchSchema = z
  .string()
  .min(2, { error: "please provide at least 2 characters" })
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

//TODO: make composable like usePaginateableSortableTableOptions so any useQuery for lists can be combined

export const usePlanetTableQuery = () => {
  const tableState = useTableState({
    searchValidator: checkSearch,
    minSearchLength: 2,
  });

  const { pagination, debouncedSearch, isValidSearch } = tableState;

  const query = usePlanetsQuery({
    page: pagination.pageIndex + 1,
    ...(isValidSearch && { search: debouncedSearch }),
  });

  return {
    ...query,
    ...tableState,
    tableOptions: {
      ...tableState.tableOptions,
      rowCount: query.data?.count ?? 0,
      pageCount: query.data
        ? Math.ceil(query.data.count / pagination.pageSize)
        : -1,
    },
  };
};

export const usePaginateableSortableTableOptions = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial values from URL
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [searchError, setSearchError] = useState<string | null>(null);
  // Defer the search value so typing doesn't feel laggy
  const deferredSearch = useDeferredValue(search);

  const onSearch = (term: string) => {
    setSearch(term);
    if (term.length) {
      setSearchError(checkSearch(term));
    }
  };

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: Number(searchParams.get("page")) ?? 0,
    pageSize: 10,
  });
  // Sync state → URL
  useEffect(() => {
    const params = new URLSearchParams();
    console.log(searchError, !searchError);
    if (deferredSearch && !searchError) params.set("search", deferredSearch);
    if (pagination.pageIndex > 0)
      params.set("page", String(pagination.pageIndex + 1));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [deferredSearch, pagination, searchError]); // intentionally too short dependancy list. Pathname only needed on first render. router must not change

  return {
    // ...query,
    // table state — passed straight into tableOptions
    tableOptions: {
      state: { sorting, pagination },
      onSortingChange: setSorting,
      //index based so always add 1 to the page number from URL
      onPaginationChange: setPagination,
      getSortedRowModel: getSortedRowModel(),
      manualPagination: true,
    },
    pagination,
    search,
    setSearch: onSearch,
    searchError,
    deferredSearch,
  };
};

export const useComposedQuery = () => {
  const {
    tableOptions,
    pagination,
    searchError,
    deferredSearch,
    setSearch,
    search,
  } = usePaginateableSortableTableOptions();
  const query = usePlanetsQuery({
    page: pagination.pageIndex + 1,
    ...(!searchError && { search: deferredSearch }),
  });
  return {
    ...query,
    tableOptions: {
      ...tableOptions,
      rowCount: query?.data?.count ?? 0,
      manualPagination: true,
      pageCount: query.data
        ? Math.ceil(query.data.count / pagination.pageSize)
        : -1,
    },
    pagination,
    search,
    setSearch,
    searchError,
    deferredSearch,
  };
};
