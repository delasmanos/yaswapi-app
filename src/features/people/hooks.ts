import { useQuery } from "@tanstack/react-query";

import { swapiClient } from "@/lib/api/swapi-client";

import { getPeople } from "./api";
import { mapPerson } from "./mappers";
export type PeopleQueryParams = {
  page?: number;
  search?: string;
};
export const usePeopleQuery = ({ page, search }: PeopleQueryParams) =>
  useQuery({
    queryKey: ["people", page, search],
    queryFn: async () => {
      const { results, count } = await getPeople(swapiClient, page, search);
      return {
        people: results.map(mapPerson),
        count,
      };
    },
    placeholderData: (prev) => prev, // show current data until new one is ready
  });
