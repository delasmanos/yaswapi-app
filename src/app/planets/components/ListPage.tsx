"use client";
import { ListDataTable } from "@/components/data-display/table/ListDataTable";
import { usePlanetTableQuery } from "@/features/planets/hooks";
import { columns } from "./planets-column-definition";

export const ListPage = () => {
  const {
    data,
    isLoading,
    isError,
    search,
    setSearch,
    searchError,
    tableOptions,
  } = usePlanetTableQuery();
  return (
    <ListDataTable
      result={data}
      isLoading={isLoading}
      isError={isError}
      search={search}
      onSearch={setSearch}
      tableOptions={tableOptions}
      columns={columns}
      searchError={searchError}
    />
  );
};
