import { z } from "zod";
export interface VehiclesDTO {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export const vehiclesSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.float32(),
  max_atmosphering_speed: z.float32(),
  crewCount: z.int(),
  passengersCount: z.int(),
  cargo_capacity: z.int(),
  consumables: z.string(),
  vehicle_class: z.string(),
  pilots: z.array(z.url()),
  films: z.array(z.url()),
});

export type Vehicle = z.infer<typeof vehiclesSchema>;
