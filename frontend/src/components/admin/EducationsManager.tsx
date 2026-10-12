"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { educationSchema, zodFieldErrors } from "@/lib/adminSchemas";
import { revalidatePublic } from "@/src/action/admin.action";
import {
  AdminButton,
  Badge,
  ConfirmDialog,
  EmptyBlock,
  ErrorBlock,
  Field,
  Modal,
  PageHeader,
  SkeletonRows,
  TextInput,
  useAdminList,
} from "./ui";
import type { Education } from "./types";

const emptyForm = {
  institute: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
};

export default function EducationsManager() {
  const { items, loading, error, reload } =
    useAdminList<Education>("/educations");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Education | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFieldErrors({});
    setOpen(true);
  };

  const openEdit = (edu: Education) => {
    setEditing(edu);
    setForm({
      institute: edu.institute,
      degree: edu.degree,
      field: edu.field,
      startYear: String(edu.startYear),
      endYear: edu.endYear != null ? String(edu.endYear) : "",
    });
    setFieldErrors({});
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const parsed = educationSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(zodFieldErrors(parsed.error));
      toast.error("Please fix the highlighted fields.");
      return;
    }

    const payload = {
      institute: form.institute,
      degree: form.degree,
      field: form.field,
      startYear: Number(form.startYear),
      endYear: form.endYear === "" ? null : Number(form.endYear),
    };

    setSaving(true);
    const res = await adminApi(
      editing ? `/educations/${editing.id}` : "/educations",
      { method: editing ? "PATCH" : "POST", body: payload },
    );
    setSaving(false);

    if (res.error) {
      setFieldErrors(res.fieldErrors);
      toast.error(res.error);
      return;
    }

    toast.success(editing ? "Education updated" : "Education created");
    setOpen(false);
    await revalidatePublic();
    reload();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await adminApi(`/educations/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Education deleted");
    setDeleteTarget(null);
    await revalidatePublic();
    reload();
  };

  return (
    <div>
      <PageHeader
        title="Educations"
        description="Degrees and courses shown in the public section."
        action={
          <AdminButton onClick={openCreate}>
            <Plus className="h-4 w-4" /> New education
          </AdminButton>
        }
      />

      {loading ? (
        <SkeletonRows rows={3} />
      ) : error ? (
        <ErrorBlock message={error} onRetry={reload} />
      ) : items && items.length === 0 ? (
        <EmptyBlock
          title="No education yet"
          message="Add your first degree or course."
          action={
            <AdminButton onClick={openCreate}>
              <Plus className="h-4 w-4" /> New education
            </AdminButton>
          }
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {items?.map((edu) => (
            <li
              key={edu.id}
              className="flex items-start gap-4 rounded-2xl border border-line bg-surface/50 p-4"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="text-sm font-semibold text-ink">
                  {edu.degree}
                </span>
                <span className="text-sm text-accent">{edu.field}</span>
                <span className="text-xs text-muted">{edu.institute}</span>
                <div className="mt-1">
                  <Badge>
                    {edu.startYear} — {edu.endYear ?? "Present"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => openEdit(edu)}
                  aria-label={`Edit ${edu.degree}`}
                  className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(edu)}
                  aria-label={`Delete ${edu.degree}`}
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
        title={editing ? "Edit education" : "New education"}
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
              {editing ? "Save changes" : "Create education"}
            </AdminButton>
          </>
        }
      >
        <form onSubmit={submit} className="flex flex-col gap-5">
          <Field
            label="Institute"
            htmlFor="ed-institute"
            error={fieldErrors.institute}
          >
            <TextInput
              id="ed-institute"
              value={form.institute}
              onChange={(e) =>
                setForm({ ...form, institute: e.target.value })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Degree" htmlFor="ed-degree" error={fieldErrors.degree}>
              <TextInput
                id="ed-degree"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
              />
            </Field>
            <Field label="Field" htmlFor="ed-field" error={fieldErrors.field}>
              <TextInput
                id="ed-field"
                value={form.field}
                onChange={(e) => setForm({ ...form, field: e.target.value })}
              />
            </Field>
            <Field
              label="Start year"
              htmlFor="ed-start"
              error={fieldErrors.startYear}
            >
              <TextInput
                id="ed-start"
                type="number"
                value={form.startYear}
                onChange={(e) => setForm({ ...form, startYear: e.target.value })}
              />
            </Field>
            <Field
              label="End year"
              htmlFor="ed-end"
              error={fieldErrors.endYear}
              hint="Leave empty for ongoing."
            >
              <TextInput
                id="ed-end"
                type="number"
                value={form.endYear}
                onChange={(e) => setForm({ ...form, endYear: e.target.value })}
              />
            </Field>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete education"
        message={`Delete "${deleteTarget?.degree}" at ${deleteTarget?.institute}? This cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
