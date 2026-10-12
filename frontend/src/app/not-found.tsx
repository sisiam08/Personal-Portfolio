import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="mono-label text-accent">Error 404</span>
      <h1 className="font-display text-5xl font-semibold text-ink">
        Page not found.
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>
    </main>
  );
}
