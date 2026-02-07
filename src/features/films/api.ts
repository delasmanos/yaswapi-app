import type { ApiClient, ListResponse } from "@/lib/api/types";
import { API_CONFIG } from "@/lib/config";

import type { FilmDto } from "./types";

export const getFilms = (client: ApiClient) =>
  client
    .get<ListResponse<FilmDto>>(API_CONFIG.ENDPOINTS.FILMS)
    .then((res) => res.results);

export const getFilm = (client: ApiClient, id: string) => {
  return client.get<FilmDto>(`${API_CONFIG.ENDPOINTS.FILMS}/${id}/`);
};
