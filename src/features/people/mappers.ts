import { extractId } from "@/lib/utils/ids";

import type { Person, PersonDto } from "./types";

export const mapPerson = (dto: PersonDto): Person => ({
  id: extractId(dto.url),
  name: dto.name,
  height: Number(dto.height),
  mass: dto.mass,
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
});
