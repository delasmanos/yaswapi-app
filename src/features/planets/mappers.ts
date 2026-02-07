import { extractId } from "@/lib/utils/ids";

import type { Planet, PlanetDTO } from "./types";

export const mapPlanet = (dto: PlanetDTO): Planet => ({
  id: extractId(dto.url),
  name: dto.name,
  rotationPeriod: dto.rotation_period,
  orbitalPeriod: dto.orbital_period,
  diameter: dto.diameter,
  climate: dto.climate,
  gravity: isNaN(Number(dto.gravity)) ? null : Number(dto.gravity),
  terrain: dto.terrain,
  surfaceWater: dto.surface_water,
  population: dto.population,
  residents: dto.residents,
  filmUrls: dto.films,
  created: dto.created,
  edited: dto.edited,
  url: dto.url,
});
