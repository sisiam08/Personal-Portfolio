export interface AdminResult<T> {
  data: T | null;
  error: string | null;
  status: number;
  fieldErrors: Record<string, string>;
}

interface AdminRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  formData?: FormData;
}

/**
 * Same-origin client for the admin panel. Requests go to `/api/v1/*`, which is
 * rewritten to the backend by next.config.ts, so the httpOnly Better Auth
 * cookie is sent automatically. Never throws: always returns { data, error }.
 */
export async function adminApi<T = unknown>(
  path: string,
  options: AdminRequestOptions = {},
): Promise<AdminResult<T>> {
  const { method = "GET", body, formData } = options;

  try {
    const res = await fetch(`/api/v1${path}`, {
      method,
      credentials: "include",
      headers: formData ? undefined : { "Content-Type": "application/json" },
      body: formData ? formData : body !== undefined ? JSON.stringify(body) : undefined,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      // Session expired / not authorized: send the user back to login.
      if ((res.status === 401 || res.status === 403) && typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
      const fieldErrors: Record<string, string> = {};
      if (Array.isArray(json?.errors)) {
        for (const issue of json.errors) {
          if (issue?.field) fieldErrors[issue.field] = issue.message;
        }
      }
      return {
        data: null,
        error: json?.message || `Request failed (${res.status})`,
        status: res.status,
        fieldErrors,
      };
    }

    return {
      data: (json?.data ?? json) as T,
      error: null,
      status: res.status,
      fieldErrors: {},
    };
  } catch {
    return {
      data: null,
      error: "Network error. Please check your connection.",
      status: 0,
      fieldErrors: {},
    };
  }
}

/** Unwraps a paginated list payload ({ meta, data }) or a plain array. */
export function unwrapList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === "object" && "data" in payload) {
    const inner = (payload as { data?: unknown }).data;
    if (Array.isArray(inner)) return inner as T[];
  }
  return [];
}

/** Builds a FormData from a record, skipping undefined/null and appending File values. */
export function toFormData(record: Record<string, unknown>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(record)) {
    if (value === undefined || value === null) continue;
    if (value instanceof File) {
      fd.append(key, value);
    } else if (typeof value === "boolean") {
      fd.append(key, String(value));
    } else if (Array.isArray(value)) {
      fd.append(key, JSON.stringify(value));
    } else {
      fd.append(key, String(value));
    }
  }
  return fd;
}
