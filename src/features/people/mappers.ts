import { extractId } from "@/lib/utils/ids";

import type { Person, PersonDto } from "./types";

export const mapPerson = (dto: PersonDto): Person => ({
  id: extractId(dto.url),
  name: dto.name,
  height: Number(dto.height),
  mass: isNaN(Number(dto.mass)) ? null : Number(dto.mass),
  hairColor: dto.hair_color,
  skinColor: dto.skin_color,
  eyeColor: dto.eye_color,
  birthYear: dto.birth_year,
  gender: dto.gender,
  homewolrdUrl: dto.homeworld,
  filmUrls: dto.films,
  speciesUrls: dto.species,
  vehicleUrls: dto.vehicles,
  starshipUrls: dto.starships,
  filmCount: dto.films.length,
  specieCount: dto.species.length,
  vehicleCount: dto.vehicles.length,
  starshipCount: dto.starships.length,
});
