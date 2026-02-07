/**
 * This file defines the ApiClient interface and related types for interacting with the SWAPI api.
 */
export interface ApiClient {
  get<T>(url: string): Promise<T>;
  getAll<T>(
    urls: string[],
    options?: {
      timeout?: number;
      retries?: number;
      config: NextFetchRequestConfig;
    },
  ): Promise<T[]>;
}

export type ListResponse<TDTO> = {
  results: TDTO[];
  count: number;
  next: string | null;
  previous: string | null;
};
