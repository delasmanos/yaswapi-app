import type { ApiClient, ListResponse } from "@/lib/api/types";
import { API_CONFIG } from "@/lib/config";

import type { PlanetDTO } from "./types";

export const getPlanets = async (
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

  const data = await client.get<ListResponse<PlanetDTO>>(
    `${API_CONFIG.ENDPOINTS.PLANETS}?${params.toString()}`,
  );
  return data;
};

export const getPlanet = (client: ApiClient, id: string) =>
  client.get<PlanetDTO>(`${API_CONFIG.ENDPOINTS.PLANETS}/${id}/`);

export const getPlanetsByUrls = (client: ApiClient, urls: string[]) =>
  client.getAll<PlanetDTO>(urls);
