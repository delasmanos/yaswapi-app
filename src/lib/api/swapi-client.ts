import { API_CONFIG } from "@/lib/config";

import { fetchWithTimeout } from "./fetch";
import type { ApiClient } from "./types";

export class SwapiClient implements ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    // prepend baseUrl if it's a relative path lik /api/films"
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseUrl}${endpoint}`;

    const res = await fetch(url, {
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // Ideally we'd parse error message but for MVP/SWAPI:
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }
  /**
   * Fetch multiple URLs with timeout and retry logic. Returns an array of successful responses, filtering out any that failed after retries.
   *
   * @param urls
   * @param options
   * @param config
   * @returns
   */
  async getAll<T>(
    urls: string[],
    options?: { timeout?: number; retries?: number },
    config: NextFetchRequestConfig = {},
  ): Promise<T[]> {
    const { timeout = 2000, retries = 2 } = options || {};

    const results = await Promise.allSettled(
      urls.map((url) => fetchWithTimeout(url, timeout, retries, config)),
    );
    return results
      .map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          // Log the error and return null or throw depending on desired behavior
          console.error(`Failed to fetch ${result.reason.url}:`, result.reason);
          return null; // or throw new Error(`Failed to fetch ${url}`);
        }
      })
      .filter((res): res is T => res !== null); // Filter out failed fetches
  }
}

export const swapiClient = new SwapiClient();
