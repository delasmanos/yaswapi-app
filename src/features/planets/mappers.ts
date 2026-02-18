import { extractId } from "@/lib/utils/ids";

import type { Planet, PlanetDTO } from "./types";

export const mapPlanet = (dto: PlanetDTO): Planet => ({
  id: extractId(dto.url),
  name: dto.name,
  rotationPeriod: dto.rotation_period,
  orbitalPeriod: dto.orbital_period,
  diameter: Number(dto.diameter.replaceAll(",", "")),
  climate: dto.climate,
  gravity: isNaN(Number(dto.gravity)) ? null : Number(dto.gravity),
  terrain: dto.terrain,
  surfaceWater: isNaN(Number(dto.surface_water))
    ? null
    : Number(dto.surface_water),
  population: isNaN(Number(dto.population)) ? null : Number(dto.population),
  residents: dto.residents,
  filmUrls: dto.films,
  filmCount: dto.films.length,
  created: dto.created,
  edited: dto.edited,
  url: dto.url,
});
