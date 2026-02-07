import { z } from "zod";
export interface PlanetDTO {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export const planetsSchema = z.object({
  id: z.string(),
  name: z.string(),
  rotationPeriod: z.string(),
  orbitalPeriod: z.string(),
  diameter: z.string(),
  climate: z.string(),
  gravity: z.union([z.number(), z.null()]),
  terrain: z.string(),
  surfaceWater: z.string(),
  population: z.string(),
  residents: z.array(z.url()),
  filmUrls: z.array(z.url()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export type Planet = z.infer<typeof planetsSchema>;
