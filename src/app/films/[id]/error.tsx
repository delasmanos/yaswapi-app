"use client";

import { ErrorDisplay } from "@/components/ui/error";

export default function FilmsError({ error }: { error: Error }) {
  return (
    <ErrorDisplay
      ariaLabel="Back to films list"
      error={error}
      messagePrefix="Failed to load Film"
      relativeHref="/films"
    />
  );
}
