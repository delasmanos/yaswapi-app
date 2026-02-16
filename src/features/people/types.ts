import { z } from "zod";

export interface PersonDto {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export const PersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  height: z.float32(),
  mass: z.number().nullable(),
  hairColor: z.string(),
  skinColor: z.string(),
  eyeColor: z.string(),
  birthYear: z.string(),
  gender: z.string(),
  homewolrdUrl: z.url(),
  filmUrls: z.array(z.url()),
  speciesUrls: z.array(z.url()),
  vehicleUrls: z.array(z.url()),
  starshipUrls: z.array(z.url()),
  filmCount: z.number(),
  specieCount: z.number(),
  vehicleCount: z.number(),
  starshipCount: z.number(),
});

export type Person = z.infer<typeof PersonSchema>;
