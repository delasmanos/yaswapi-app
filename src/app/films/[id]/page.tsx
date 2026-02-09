import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { CrawlWindow } from "@/components/ui/crawl-window";
import { Section } from "@/components/ui/section";
import { SkeletonCardList } from "@/components/ui/SkeletonCardList";
import { getFilm } from "@/features/films/api";
import { mapFilm } from "@/features/films/mappers";
import { swapiClient } from "@/lib/api/swapi-client";

import { JumpMenu } from "./components/JumpMenu";
import RelatedCharactersPartial from "./RelatedCharactersPartial";
import RelatedPlanetsPartial from "./RelatedPlanetsPartial";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * TODO: move the data fetching and mapping into api/common so the page does not depend on the swapi client or the mappers directly. The page should only know about a Film type, not FilmDTO or how to fetch it.
 */
export default async function FilmDetailPage(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  const filmDto = await getFilm(swapiClient, id);
  const film = mapFilm(filmDto);
  const sections = [
    { id: "characters", label: "Characters" },
    { id: "planets", label: "Planets" },
  ];

  return (
    <main className="container mx-auto py-10 px-4 space-y-12 ">
      <div className="sticky top-4 z-10 w-fit mx-auto">
        <div className="flex flex-row justify-center gap-2 bg-background/70 rounded-md p-1 border-accent/50 border shadow-sm">
          <Button variant="ghost" asChild className="">
            <Link href="/films" aria-label="Back to films list">
              ← Back to List
            </Link>
          </Button>

          <JumpMenu sections={sections} variant={"row"} />
        </div>
      </div>
      <Section
        className="text-center space-y-4"
        title={`Episode ${film.episodeId}: ${film.title}`}
        tag="h1"
        headingClassName="text-4xl font-bold tracking-tight"
      >
        <p className="text-muted-foreground text-lg">
          Released: {film.releaseDate.getFullYear()}
        </p>
      </Section>

      <section
        className="max-w-4xl mx-auto motion-reduce:hidden"
        aria-label="Opening Crawl"
      >
        <CrawlWindow
          title={`Episode ${film.episodeId}\n${film.title}`}
          text={film.openingCrawl}
        />
      </section>

      <article className="max-w-4xl mx-auto space-y-12">
        <Section
          className="bg-card text-card-foreground rounded-lg border shadow-sm p-8"
          title="Production Details"
          tag="h3"
          headingClassName="text-2xl font-bold mb-6 border-b pb-4"
        >
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Intro
              </dt>
              <dd className="text-lg">{film.openingCrawl}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Director
              </dt>
              <dd className="text-lg">{film.director}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Producer
              </dt>
              <dd className="text-lg">{film.producer}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-sm font-medium text-muted-foreground">
                Release Date
              </dt>
              <dd className="text-lg">{film.releaseDate.getFullYear()}</dd>
            </div>
          </dl>
        </Section>
        {film.characterUrls.length > 0 && (
          <Suspense fallback={<SkeletonCardList />}>
            <Section title="Characters">
              <RelatedCharactersPartial urls={film.characterUrls} />
            </Section>
          </Suspense>
        )}
        {film.planetUrls.length > 0 && (
          <Suspense fallback={<SkeletonCardList />}>
            <Section title="Planets">
              <RelatedPlanetsPartial urls={film.planetUrls} />
            </Section>
          </Suspense>
        )}
      </article>
    </main>
  );
}
