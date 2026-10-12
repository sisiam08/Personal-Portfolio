"use client";

import { useState, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { downloadResume } from "./resume";

export default function ResumeDownloadButton({
  url,
  className,
  children,
}: {
  url: string;
  className?: string;
  children: ReactNode;
}) {
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      className={className}
      onClick={() => {
        setBusy(true);
        void downloadResume(url).finally(() => setBusy(false));
      }}
    >
      {busy ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : null}
      <span className={busy ? "hidden" : "contents"}>{children}</span>
    </button>
  );
}
