"use client";

export default function Error({ error }: { error: Error }) {
  return <p role="alert">Failed to load planet: {error.message}</p>;
}
