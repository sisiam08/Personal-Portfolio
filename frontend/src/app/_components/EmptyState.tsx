import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: ReactNode;
  compact?: boolean;
}

export default function EmptyState({
  icon,
  title,
  message,
  action,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-line-2 bg-surface/50 text-center ${
        compact ? "gap-2 p-8" : "gap-4 p-12 md:p-16"
      }`}
    >
      {icon ? (
        <div className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface-2 text-accent">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      {message ? (
        <p className="max-w-md text-sm leading-relaxed text-muted">{message}</p>
      ) : null}
      {action}
    </div>
  );
}
