import { z } from "zod";
export interface FilmDto {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export const filmSchema = z.object({
  id: z.string(),
  title: z.string(),
  episodeId: z.number(),
  openingCrawl: z.string(),
  director: z.string(),
  producer: z.string(),
  releaseDate: z.date(),
  characterUrls: z.array(z.url()),
  planetUrls: z.array(z.url()),
  starshipUrls: z.array(z.url()),
  vehicleUrls: z.array(z.url()),
  speciesUrls: z.array(z.url()),
});

export type Film = z.infer<typeof filmSchema>;
