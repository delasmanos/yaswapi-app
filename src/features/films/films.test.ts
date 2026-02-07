import { describe, expect, it } from "vitest";

import { swapiClient } from "@/lib/api/swapi-client";

import { getFilms } from "./api";
import { mapFilm } from "./mappers";
import type { FilmDto } from "./types";

// Mock server is handling network, but we can also mock client for unit test
// Integration test uses MSW interception.

describe("Film Mappers", () => {
  it("should correctly map DTO to Domain model", () => {
    const dto: FilmDto = {
      title: "A New Hope",
      episode_id: 4,
      opening_crawl: "Crawling...",
      director: "George Lucas",
      producer: "Gary Kurtz",
      release_date: "1977-05-25",
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: "2014-12-10T14:23:31.880000Z",
      edited: "2014-12-20T19:49:45.256000Z",
      url: "https://swapi.dev/api/films/1/",
    };

    const result = mapFilm(dto);

    expect(result).toEqual({
      id: "1",
      title: "A New Hope",
      episodeId: 4,
      director: "George Lucas",
      producer: "Gary Kurtz",
      releaseDate: new Date("1977-05-25T00:00:00.000Z"), // quick dirty
      openingCrawl: "Crawling...",
      characterUrls: [],
      planetUrls: [],
      starshipUrls: [],
      vehicleUrls: [],
      speciesUrls: [],
    });
  });
});

describe("Film API", () => {
  it("should fetch films using client", async () => {
    // We rely on MSW handler setup in setup.ts
    const films = await getFilms(swapiClient);

    expect(films).toHaveLength(1);
    expect(films[0]?.title).toBe("A New Hope");
  });
});
