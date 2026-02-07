"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
type ErrorProps = {
  error: Error;
  relativeHref: string;
  messagePrefix: string;
  ariaLabel: string;
};
export const ErrorDisplay = ({
  error,
  relativeHref,
  messagePrefix,
  ariaLabel,
}: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-100">
      <p className="text-red-500 text-2xl" role="alert">
        {messagePrefix}: {error.message}
      </p>
      <Button variant="outline" asChild className="my-4 ">
        <Link href={relativeHref} aria-label={ariaLabel}>
          ← {ariaLabel}
        </Link>
      </Button>
    </div>
  );
};
