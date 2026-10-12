export const RESUME_DOWNLOAD_NAME = "Md_Shahariar_Islam_Siam_Resume";

/**
 * Forces Cloudinary-served PDFs to download instead of opening in a tab.
 * The HTML `download` attribute is ignored for cross-origin URLs, so for
 * Cloudinary links we inject the `fl_attachment` delivery flag, which makes
 * the server respond with Content-Disposition: attachment (no auth needed).
 * Used as the fallback path and by the admin panel's "view current resume" link.
 */
export function resumeDownloadHref(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (/res\.cloudinary\.com/.test(url) && !url.includes("fl_attachment")) {
    return url.replace(/\/upload\//, `/upload/fl_attachment:${RESUME_DOWNLOAD_NAME}/`);
  }
  return url;
}

/**
 * Downloads the resume in the background: fetches the PDF as a Blob, creates a
 * temporary object-URL anchor, triggers a programmatic click and cleans up.
 * No tab is opened or navigated, so there is no blank-tab flash. Falls back to
 * opening the attachment-delivery URL if the fetch is blocked or fails.
 */
export async function downloadResume(url?: string | null): Promise<void> {
  if (!url || typeof window === "undefined") return;

  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error(`Resume download failed (${res.status})`);

    const blob = await res.blob();
    const objectUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = `${RESUME_DOWNLOAD_NAME}.pdf`;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Give the browser a moment to start the download before revoking.
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
  } catch {
    const fallback = resumeDownloadHref(url);
    if (fallback) {
      window.open(fallback, "_blank", "noopener,noreferrer");
    }
  }
}

