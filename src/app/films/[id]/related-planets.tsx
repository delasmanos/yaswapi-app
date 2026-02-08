import { getRelatedByUrls } from "@/features/common/api";
import { mapPlanet } from "@/features/planets/mappers";
import type { PlanetDTO } from "@/features/planets/types";
import { swapiClient } from "@/lib/api/swapi-client";

import { DataCardList } from "./components/card-list";

export default async function RelatedPlanets({ urls }: { urls: string[] }) {
  const planets = await getRelatedByUrls<PlanetDTO>(swapiClient, urls);
  const mappedPlanets = planets.map(mapPlanet);

  return (
    <DataCardList
      hrefPattern={"/planets/:id"}
      items={mappedPlanets}
      keyField={"id"}
      titleField={"name"}
      fields={[
        { label: "Climate", field: "climate" },
        { label: "Terrain", field: "terrain" },
        { label: "Population", field: "population" },
        { label: "Diameter", field: "diameter" },
        { label: "Gravity", field: "gravity" },
        { label: "Surface Water", field: "surfaceWater" },
        { label: "Rotation Period", field: "rotationPeriod" },
        { label: "Orbital Period", field: "orbitalPeriod" },
      ]}
    />
  );
}
