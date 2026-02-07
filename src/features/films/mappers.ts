import { extractId } from "@/lib/utils/ids";

import type { Film, FilmDto } from "./types";

export const mapFilm = (dto: FilmDto): Film => ({
  id: extractId(dto.url),
  title: dto.title,
  episodeId: dto.episode_id,
  openingCrawl: dto.opening_crawl,
  director: dto.director,
  producer: dto.producer,
  releaseDate: new Date(dto.release_date),
  characterUrls: dto.characters,
  planetUrls: dto.planets,
  starshipUrls: dto.starships,
  vehicleUrls: dto.vehicles,
  speciesUrls: dto.species,
});
