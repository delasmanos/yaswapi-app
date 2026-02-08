"use client";

export default function Error({ error }: { error: Error }) {
  return <p role="alert">Failed to load person: {error.message}</p>;
}
