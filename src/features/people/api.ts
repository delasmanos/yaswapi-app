import type { ApiClient, ListResponse } from "@/lib/api/types";
import { API_CONFIG } from "@/lib/config";

import type { PersonDto } from "./types";

export const getPeople = async (
  client: ApiClient,
  page: number = 1,
  search?: string,
) => {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
    // intentionally no page param when searching because SWAPI api throws 404 error otherwise
  } else {
    params.set("page", String(page));
  }

  const data = await client.get<ListResponse<PersonDto>>(
    `${API_CONFIG.ENDPOINTS.PEOPLE}?${params.toString()}`,
  );
  return {
    results: data.results,
    count: data.count,
  };
};

export const getPerson = (client: ApiClient, id: string) =>
  client.get<PersonDto>(`${API_CONFIG.ENDPOINTS.PEOPLE}/${id}/`);

export const getPeopleByUrls = (client: ApiClient, urls: string[]) =>
  client.getAll<PersonDto>(urls);
