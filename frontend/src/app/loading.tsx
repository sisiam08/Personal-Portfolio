export default function Loading() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-[var(--container-page)] flex-col gap-8 px-[var(--spacing-page)] pt-40">
      <div className="h-4 w-40 animate-pulse rounded-full bg-surface-2" />
      <div className="h-24 w-full max-w-2xl animate-pulse rounded-2xl bg-surface-2" />
      <div className="h-5 w-full max-w-xl animate-pulse rounded-full bg-surface-2" />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-3xl border border-line bg-surface/50"
          />
        ))}
      </div>
    </main>
  );
}
