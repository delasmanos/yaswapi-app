interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanetDetailPage(props: PageProps) {
  const params = await props.params;
  const { id } = params;

  return (
    <main className="container mx-auto py-10 px-4">
      <section className="bg-card text-card-foreground rounded-lg border shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-6 border-b pb-4">
          PLANET {id} DETAIL PAGE coming soon
        </h1>
      </section>
    </main>
  );
}
