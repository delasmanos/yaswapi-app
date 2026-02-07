import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Film } from "@/features/films/types";

/**
 * accesible heading and subheading: https://vispero.com/resources/subheadings-subtitles-alternative-titles-and-taglines-in-html/
 */
export function FilmList({ films }: { films: Film[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {films.map((film) => (
        <li key={film.id}>
          {/* Wrapping the whole card is normally not a good idea but in this case only film title and release year will be anounced as a link which is ok i think */}
          <Link href={`/films/${film.id}`} className="block h-full">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg">
                  Episode {film.episodeId}: {film.title}
                </CardTitle>
                <CardDescription>
                  {film.releaseDate.getFullYear()}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
}
