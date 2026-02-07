import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CrawlWindow } from "@/components/ui/crawl-window";
import { Section } from "@/components/ui/section";
import { SkeletonCardList } from "@/components/ui/SkeletonCardList";
import { getFilm } from "@/features/films/api";
import { mapFilm } from "@/features/films/mappers";
import { swapiClient } from "@/lib/api/swapi-client";
import { Suspense } from "react";
import RelatedCharacters from "./related-characters";
import RelatedPlanets from "./related-planets";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FilmDetailPage(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  const filmDto = await getFilm(swapiClient, id);
  const film = mapFilm(filmDto);

  return (
    <main className="container mx-auto py-10 px-4 space-y-12">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/films" aria-label="Back to films list">
          ← Back to List
        </Link>
      </Button>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Episode {film.episodeId}: {film.title}
        </h1>
        <p className="text-muted-foreground text-lg">
          Released: {film.releaseDate.getFullYear()}
        </p>
      </section>

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
        <section className="bg-card text-card-foreground rounded-lg border shadow-sm p-8">
          <h3 className="text-2xl font-bold mb-6 border-b pb-4">
            Production Details
          </h3>
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
        </section>
        {film.characterUrls.length > 0 && (
          <Section title="Characters">
            <Suspense fallback={<SkeletonCardList />}>
              <RelatedCharacters urls={film.characterUrls} />
            </Suspense>
          </Section>
        )}
        {film.planetUrls.length > 0 && (
          <Section title="Planets">
            <Suspense fallback={<SkeletonCardList />}>
              <RelatedPlanets urls={film.planetUrls} />
            </Suspense>
          </Section>
        )}
      </article>
    </main>
  );
}
