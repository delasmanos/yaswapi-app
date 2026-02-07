import { FilmList } from "@/components/data-display/FilmList";
import { getFilms } from "@/features/films/api";
import { mapFilm } from "@/features/films/mappers";
import { swapiClient } from "@/lib/api/swapi-client";

export default async function FilmsPage() {
  // Fetch data on the server
  const filmsData = await getFilms(swapiClient);
  const films = filmsData
    .map(mapFilm)
    .sort((a, b) => a.episodeId - b.episodeId);

  return (
    <div className="container mx-auto py-10 px-4">
      <hgroup
        className="mb-8"
        role="group"
        aria-roledescription="Heading group"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-0">
          All Star Wars Films
        </h1>
        <p
          className="text-muted-foreground text-sm italic"
          aria-roledescription="subtitle"
        >
          ... so far :) (sorted by episode number)
        </p>
      </hgroup>
      <FilmList films={films} />
    </div>
  );
}
