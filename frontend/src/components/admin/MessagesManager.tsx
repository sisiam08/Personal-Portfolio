"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Copy, Mail, Reply, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import {
  AdminButton,
  ConfirmDialog,
  EmptyBlock,
  ErrorBlock,
  Modal,
  PageHeader,
  SkeletonRows,
  useAdminList,
} from "./ui";
import type { Message } from "./types";

export default function MessagesManager() {
  const { items, loading, error, reload } = useAdminList<Message>("/messages");
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
  const [deleting, setDeleting] = useState(false);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied");
    } catch {
      toast.error("Could not copy email");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await adminApi(`/messages/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Message deleted");
    if (selected?.id === deleteTarget.id) setSelected(null);
    setDeleteTarget(null);
    reload();
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        description="Enquiries submitted through the contact form."
      />

      {loading ? (
        <SkeletonRows rows={5} />
      ) : error ? (
        <ErrorBlock message={error} onRetry={reload} />
      ) : items && items.length === 0 ? (
        <EmptyBlock
          title="No messages yet"
          message="Messages sent through the contact form will appear here."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {items?.map((msg) => (
            <li
              key={msg.id}
              className="flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-4"
            >
              <button
                type="button"
                onClick={() => setSelected(msg)}
                className="flex min-w-0 flex-1 flex-col gap-1 text-left"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">
                    {msg.name}
                  </span>
                  <span className="text-xs text-faint">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-muted">{msg.email}</span>
                <span className="line-clamp-2 text-sm text-muted">
                  {msg.message}
                </span>
              </button>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => copyEmail(msg.email)}
                  aria-label={`Copy email from ${msg.name}`}
                  className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(msg)}
                  aria-label={`Delete message from ${msg.name}`}
                  className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Message"}
        footer={
          selected ? (
            <>
              <AdminButton
                variant="outline"
                onClick={() => copyEmail(selected.email)}
              >
                <Copy className="h-4 w-4" /> Copy email
              </AdminButton>
              <a
                href={`mailto:${selected.email}?subject=Re:%20Your%20enquiry`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                <Reply className="h-4 w-4" /> Reply by email
              </a>
            </>
          ) : null
        }
      >
        {selected ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-sm">
              <span className="flex items-center gap-2 text-ink">
                <Mail className="h-4 w-4 text-accent" />
                <a
                  href={`mailto:${selected.email}`}
                  className="hover:underline"
                >
                  {selected.email}
                </a>
              </span>
              <span className="text-xs text-faint">
                {new Date(selected.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="whitespace-pre-wrap rounded-2xl border border-line bg-canvas/60 p-4 text-sm leading-relaxed text-muted">
              {selected.message}
            </p>
          </div>
        ) : null}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete message"
        message={`Delete the message from "${deleteTarget?.name}"? This cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
