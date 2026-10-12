"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CircleAlert,
  LoaderCircle,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { adminApi, unwrapList } from "@/lib/adminApi";

/* ───────────────────────────── Buttons ───────────────────────────── */

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";

export function AdminButton({
  children,
  variant = "primary",
  size = "md",
  className,
  loading,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: "sm" | "md";
  loading?: boolean;
}) {
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-accent text-accent-ink hover:-translate-y-0.5",
    outline: "border border-line-2 text-ink hover:bg-surface-2",
    ghost: "text-muted hover:text-ink hover:bg-surface-2",
    danger: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm",
        variants[variant],
        className,
      )}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

/* ───────────────────────────── Form fields ───────────────────────────── */

export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="mono-label text-muted">
        {label}
      </label>
      {children}
      {error ? (
        <span className="text-xs text-destructive">{error}</span>
      ) : hint ? (
        <span className="text-xs text-faint">{hint}</span>
      ) : null}
    </div>
  );
}

const controlClass =
  "w-full rounded-xl border border-line bg-canvas px-3.5 py-2.5 text-base text-ink placeholder:text-faint outline-none transition-colors focus:border-accent disabled:opacity-60 lg:text-sm";

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(controlClass, className)} />;
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(controlClass, "resize-y", className)}
    />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(controlClass, "cursor-pointer", className)}>
      {children}
    </select>
  );
}

export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-line-2 accent-[var(--accent)]"
      />
      {label}
    </label>
  );
}

/* ───────────────────────────── Image picker ───────────────────────────── */

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function ImagePicker({
  label,
  file,
  onFileChange,
  existingUrl,
  error,
  required,
  hint,
  contain = false,
  maxBytes = MAX_IMAGE_BYTES,
  warnBytes,
  minWidth,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingUrl?: string | null;
  error?: string;
  required?: boolean;
  hint?: ReactNode;
  contain?: boolean;
  maxBytes?: number;
  warnBytes?: number;
  minWidth?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const preview = objectUrl || existingUrl || null;
  const shownError = error || localError;

  const handleFile = (selected: File | null) => {
    setLocalError(null);
    setWarning(null);
    if (!selected) {
      onFileChange(null);
      return;
    }
    if (!IMAGE_TYPES.includes(selected.type)) {
      setLocalError("Use a JPG, PNG, WEBP or GIF image.");
      return;
    }
    if (selected.size > maxBytes) {
      setLocalError(
        `Image must be ${Math.round(maxBytes / (1024 * 1024))}MB or smaller.`,
      );
      return;
    }
    if (warnBytes && selected.size > warnBytes) {
      setWarning(
        `This file is larger than ${Math.round(
          warnBytes / (1024 * 1024),
        )}MB — consider compressing it.`,
      );
    }
    if (minWidth) {
      const url = URL.createObjectURL(selected);
      const img = new window.Image();
      img.onload = () => {
        if (img.naturalWidth < minWidth) {
          setWarning(
            `Image is ${img.naturalWidth}px wide — recommended at least ${minWidth}px.`,
          );
        }
        URL.revokeObjectURL(url);
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    }
    onFileChange(selected);
  };

  return (
    <Field label={label} error={shownError ?? undefined}>
      <div className="flex items-center gap-4">
        <div
          className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line ${
            contain ? "checkerboard" : "bg-surface-2"
          }`}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt=""
              className={`h-full w-full ${
                contain ? "object-contain p-1" : "object-cover"
              }`}
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-faint">
              <Upload className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AdminButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
            >
              {preview ? "Replace" : "Choose image"}
            </AdminButton>
            {preview ? (
              <button
                type="button"
                onClick={() => {
                  handleFile(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
              >
                <X className="h-3.5 w-3.5" /> Remove
              </button>
            ) : null}
          </div>
          <span className="text-xs text-faint">
            {required ? "Required · " : ""}JPG, PNG, WEBP, GIF · max{" "}
            {Math.round(maxBytes / (1024 * 1024))}MB
          </span>
        </div>
      </div>
      {warning ? (
        <span className="text-xs text-accent-2">{warning}</span>
      ) : null}
      {hint ? <span className="text-xs text-faint">{hint}</span> : null}
      <input
        ref={inputRef}
        type="file"
        accept={IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </Field>
  );
}

/* ───────────────────────────── Resume picker ───────────────────────────── */

const RESUME_TYPES = ["application/pdf"];
const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export function ResumePicker({
  label,
  file,
  onFileChange,
  existingUrl,
  error,
  hint,
}: {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  existingUrl?: string | null;
  error?: string;
  hint?: ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const shownError = error || localError;

  const handleFile = (selected: File | null) => {
    setLocalError(null);
    if (!selected) {
      onFileChange(null);
      return;
    }
    if (!RESUME_TYPES.includes(selected.type)) {
      setLocalError("Use a PDF file.");
      return;
    }
    if (selected.size > MAX_RESUME_BYTES) {
      setLocalError("Resume must be 10MB or smaller.");
      return;
    }
    onFileChange(selected);
  };

  return (
    <Field label={label} error={shownError ?? undefined}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <AdminButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-3.5 w-3.5" />
            {file ? "Replace PDF" : existingUrl ? "Upload new PDF" : "Upload PDF"}
          </AdminButton>
          {file ? (
            <button
              type="button"
              onClick={() => {
                handleFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          ) : null}
          {existingUrl ? (
            <a
              href={existingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-accent hover:underline"
            >
              View current resume
            </a>
          ) : null}
        </div>
        {file ? (
          <span className="truncate rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs text-ink">
            {file.name} · {(file.size / (1024 * 1024)).toFixed(2)}MB
          </span>
        ) : existingUrl ? (
          <span className="truncate rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs text-muted">
            {existingUrl}
          </span>
        ) : (
          <span className="rounded-xl border border-dashed border-line-2 px-3 py-2 text-xs text-faint">
            No resume uploaded yet.
          </span>
        )}
      </div>
      {hint ? <span className="text-xs text-faint">{hint}</span> : null}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </Field>
  );
}

/* ───────────────────────────── Modal / confirm ───────────────────────────── */

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className={cn(
              "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl border border-line-2 bg-surface shadow-[var(--shadow)] sm:rounded-3xl",
              wide ? "sm:max-w-3xl" : "sm:max-w-xl",
            )}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <h2 className="font-display text-lg font-semibold text-ink">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 border border-line text-ink transition-colors hover:bg-surface-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">{children}</div>
            {footer ? (
              <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
                {footer}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  loading,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <AdminButton variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </AdminButton>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-muted">{message}</p>
    </Modal>
  );
}

/* ───────────────────────────── States ───────────────────────────── */

export function Spinner() {
  return (
    <div className="grid place-items-center py-20">
      <LoaderCircle className="h-6 w-6 animate-spin text-accent" />
    </div>
  );
}

export function SkeletonRows({ rows = 4 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-16 animate-pulse rounded-2xl border border-line bg-surface/60"
        />
      ))}
    </div>
  );
}

export function EmptyBlock({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line-2 bg-surface/50 px-6 py-14 text-center">
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      <p className="max-w-md text-sm text-muted">{message}</p>
      {action}
    </div>
  );
}

export function ErrorBlock({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-line bg-surface/60 px-6 py-14 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface-2 text-destructive">
        <CircleAlert className="h-5 w-5" />
      </span>
      <p className="max-w-md text-sm text-muted">{message}</p>
      {onRetry ? (
        <AdminButton variant="outline" size="sm" onClick={onRetry}>
          Try again
        </AdminButton>
      ) : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "warning" | "success";
}) {
  const tones = {
    default: "border-line text-muted",
    accent: "border-accent text-accent",
    warning: "border-accent-2 text-accent-2",
    success: "border-accent-3 text-accent-3",
  };
  return (
    <span
      className={cn(
        "mono-label rounded-full border px-2 py-0.5",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink md:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

/* ───────────────────────────── Data hook ───────────────────────────── */

export function useAdminList<T>(path: string) {
  const [items, setItems] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await adminApi<unknown>(path);
    if (res.error) {
      setError(res.error);
      setItems(null);
    } else {
      setError(null);
      setItems(unwrapList<T>(res.data));
    }
    setLoading(false);
  }, [path]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  return { items, loading, error, reload: load, setItems };
}
