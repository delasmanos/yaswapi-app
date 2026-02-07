"use client";

export default function FilmsError({ error }: { error: Error }) {
  return <p role="alert">Failed to load films: {error.message}</p>;
}
