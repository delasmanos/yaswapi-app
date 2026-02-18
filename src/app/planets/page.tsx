import { ClientOnlyListShell } from "@/components/provider/ClientOnlyListShell";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import { ListPage } from "./components/ListPage";

//TODO: check how the persistance of tanstack table works
export default function PlanetsPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <section className="bg-card text-card-foreground rounded-lg border shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          All Planets in the Star Wars Universe
        </h1>
        <section className="mb-4">
          <p className="">
            Example for a purely clientside API consuption. Query results are
            persisted in localStorage and can be cleared by the user.
          </p>
          <p>
            Searching happens on the SWAPI.dev server by calling:{" "}
            <code className="inline">{"planets?search=<name>"}</code>
          </p>
        </section>
        <Suspense
          fallback={
            <Spinner className="my-4 size-60 mx-auto">Loading...</Spinner>
          }
        >
          <ClientOnlyListShell>
            <ListPage />
          </ClientOnlyListShell>
        </Suspense>
      </section>
    </main>
  );
}
