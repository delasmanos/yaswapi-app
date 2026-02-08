import { z } from "zod";

export const speciesSchema = z.object({
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.float32(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.url(),
  language: z.string(),
  people: z.array(z.url()),
  films: z.array(z.url()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export type Species = z.infer<typeof speciesSchema>;
