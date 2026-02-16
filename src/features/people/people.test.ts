import { describe, expect, it } from "vitest";

import { swapiClient } from "@/lib/api/swapi-client";

import { getPeople } from "./api";
import { mapPerson } from "./mappers";
import type { PersonDto } from "./types";

describe("People Mappers", () => {
  it("should correctly map DTO to Domain model", () => {
    const dto: PersonDto = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: ["https://swapi.dev/api/films/1/"],
      species: [],
      vehicles: ["https://swapi.dev/api/vehicles/14/"],
      starships: ["https://swapi.dev/api/starships/12/"],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    };

    let result = mapPerson(dto);

    expect(result).toEqual({
      id: "1",
      name: "Luke Skywalker",
      height: 172,
      mass: 77,
      birthYear: "19BBY",
      gender: "male",
      hairColor: "blond",
      skinColor: "fair",
      eyeColor: "blue",
      filmUrls: ["https://swapi.dev/api/films/1/"],
      vehicleUrls: ["https://swapi.dev/api/vehicles/14/"],
      starshipUrls: ["https://swapi.dev/api/starships/12/"],
      speciesUrls: [],
      homewolrdUrl: "https://swapi.dev/api/planets/1/",
      filmCount: 1,
      specieCount: 0,
      vehicleCount: 1,
      starshipCount: 1,
    });
    dto.mass = "unknown";
    result = mapPerson(dto);
    expect(result.mass).toBeNull();
  });
});

describe("People API", () => {
  it("should fetch people using client", async () => {
    const { results, count } = await getPeople(swapiClient);

    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe("Luke Skywalker");
    expect(count).toBeGreaterThan(0);
  });
});
