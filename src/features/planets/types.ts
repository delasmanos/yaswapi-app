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
  diameter: z.number(),
  climate: z.string(),
  gravity: z.union([z.number(), z.null()]),
  terrain: z.string(),
  surfaceWater: z.number().nullable(),
  population: z.number().nullable(),
  residents: z.array(z.url()),
  filmUrls: z.array(z.url()),
  filmCount: z.number(),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export type Planet = z.infer<typeof planetsSchema>;
