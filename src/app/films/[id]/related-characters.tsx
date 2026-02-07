import { getRelatedByUrls } from "@/features/common/api";
import { mapPerson } from "@/features/people/mappers";
import { PersonDto } from "@/features/people/types";
import { swapiClient } from "@/lib/api/swapi-client";
import { DataCardList } from "./components/card-list";

export default async function RelatedCharacters({ urls }: { urls: string[] }) {
  const films = await getRelatedByUrls<PersonDto>(swapiClient, urls);
  const mappedPeople = films.map(mapPerson);

  return (
    <DataCardList
      hrefPattern={"/people/:id"}
      items={mappedPeople}
      keyField={"id"}
      titleField={"name"}
      fields={[
        { label: "Height", field: "height" },
        { label: "Mass", field: "mass" },
        { label: "Hair Color", field: "hairColor" },
        { label: "Skin Color", field: "skinColor" },
        { label: "Eye Color", field: "eyeColor" },
        { label: "Birth Year", field: "birthYear" },
        { label: "Gender", field: "gender" },
      ]}
    />
  );
}
