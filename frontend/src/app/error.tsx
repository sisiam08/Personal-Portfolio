"use client";

import { useEffect } from "react";
import { CircleAlert, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-surface-2 text-accent-2">
        <CircleAlert className="h-6 w-6" />
      </span>
      <h1 className="font-display text-3xl font-semibold text-ink">
        Something broke on the way.
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        An unexpected error occurred while loading this page. You can try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
      >
        <RotateCcw className="h-4 w-4" />
        Try again
      </button>
    </main>
  );
}
