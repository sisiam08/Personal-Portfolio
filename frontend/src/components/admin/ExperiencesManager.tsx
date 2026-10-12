"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { experienceSchema, zodFieldErrors } from "@/lib/adminSchemas";
import { revalidatePublic } from "@/src/action/admin.action";
import {
  AdminButton,
  Badge,
  Checkbox,
  ConfirmDialog,
  EmptyBlock,
  ErrorBlock,
  Field,
  Modal,
  PageHeader,
  SkeletonRows,
  TextArea,
  TextInput,
  useAdminList,
} from "./ui";
import type { Experience } from "./types";

const emptyForm = {
  companyName: "",
  role: "",
  description: "",
  startDate: "",
  endDate: "",
  current: false,
};

const toDateInput = (value?: string | null) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";

export default function ExperiencesManager() {
  const { items, loading, error, reload } =
    useAdminList<Experience>("/experiences");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFieldErrors({});
    setOpen(true);
  };

  const openEdit = (exp: Experience) => {
    setEditing(exp);
    setForm({
      companyName: exp.companyName,
      role: exp.role,
      description: exp.description,
      startDate: toDateInput(exp.startDate),
      endDate: toDateInput(exp.endDate),
      current: Boolean(exp.current),
    });
    setFieldErrors({});
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const parsed = experienceSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(zodFieldErrors(parsed.error));
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const payload = {
      companyName: form.companyName,
      role: form.role,
      description: form.description,
      startDate: form.startDate,
      endDate: form.current ? "" : form.endDate,
      current: form.current,
    };

    setSaving(true);
    const res = await adminApi(
      editing ? `/experiences/${editing.id}` : "/experiences",
      { method: editing ? "PATCH" : "POST", body: payload },
    );
    setSaving(false);

    if (res.error) {
      setFieldErrors(res.fieldErrors);
      toast.error(res.error);
      return;
    }

    toast.success(editing ? "Experience updated" : "Experience created");
    setOpen(false);
    await revalidatePublic();
    reload();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await adminApi(`/experiences/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Experience deleted");
    setDeleteTarget(null);
    await revalidatePublic();
    reload();
  };

  return (
    <div>
      <PageHeader
        title="Experiences"
        description="Roles shown in the public timeline."
        action={
          <AdminButton onClick={openCreate}>
            <Plus className="h-4 w-4" /> New experience
          </AdminButton>
        }
      />

      {loading ? (
        <SkeletonRows rows={3} />
      ) : error ? (
        <ErrorBlock message={error} onRetry={reload} />
      ) : items && items.length === 0 ? (
        <EmptyBlock
          title="No experiences yet"
          message="Add your first role to build the timeline."
          action={
            <AdminButton onClick={openCreate}>
              <Plus className="h-4 w-4" /> New experience
            </AdminButton>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {items?.map((exp) => (
            <li
              key={exp.id}
              className="flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-4"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-sm font-semibold text-ink">
                  {exp.role}
                </span>
                <span className="text-sm text-accent">{exp.companyName}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>
                    {toDateInput(exp.startDate)} —{" "}
                    {exp.current ? "Present" : toDateInput(exp.endDate) || "—"}
                  </Badge>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">
                  {exp.description}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(exp)}
                  aria-label={`Edit ${exp.role}`}
                  className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(exp)}
                  aria-label={`Delete ${exp.role}`}
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
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit experience" : "New experience"}
        footer={
          <>
            <AdminButton
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={saving}
            >
              Cancel
            </AdminButton>
            <AdminButton onClick={submit} loading={saving}>
              {editing ? "Save changes" : "Create experience"}
            </AdminButton>
          </>
        }
      >
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Company"
              htmlFor="e-company"
              error={fieldErrors.companyName}
            >
              <TextInput
                id="e-company"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
              />
            </Field>
            <Field label="Role" htmlFor="e-role" error={fieldErrors.role}>
              <TextInput
                id="e-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </Field>
          </div>
          <Field
            label="Description"
            htmlFor="e-desc"
            error={fieldErrors.description}
          >
            <TextArea
              id="e-desc"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Start date"
              htmlFor="e-start"
              error={fieldErrors.startDate}
            >
              <TextInput
                id="e-start"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </Field>
            <Field label="End date" htmlFor="e-end" error={fieldErrors.endDate}>
              <TextInput
                id="e-end"
                type="date"
                value={form.endDate}
                disabled={form.current}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </Field>
          </div>
          <Checkbox
            label="Currently working here"
            checked={form.current}
            onChange={(e) =>
              setForm({
                ...form,
                current: e.target.checked,
                endDate: e.target.checked ? "" : form.endDate,
              })
            }
          />
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete experience"
        message={`Delete "${deleteTarget?.role}" at ${deleteTarget?.companyName}? This cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
