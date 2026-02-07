import type { ApiClient } from "@/lib/api/types";

export const getRelatedByUrls = <DTO>(client: ApiClient, urls: string[]) =>
  client.getAll<DTO>(urls);
