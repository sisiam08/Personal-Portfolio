"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { adminApi, toFormData } from "@/lib/adminApi";
import {
  SKILL_CATEGORIES,
  SKILL_LEVELS,
  skillSchema,
  zodFieldErrors,
} from "@/lib/adminSchemas";
import { revalidatePublic } from "@/src/action/admin.action";
import {
  AdminButton,
  Badge,
  ConfirmDialog,
  EmptyBlock,
  ErrorBlock,
  Field,
  ImagePicker,
  Modal,
  PageHeader,
  Select,
  SkeletonRows,
  TextInput,
  useAdminList,
} from "./ui";
import type { Skill } from "./types";
import HeroChipsPanel from "./HeroChipsPanel";

const emptyForm = {
  name: "",
  category: "FRONTEND",
  level: "INTERMEDIATE",
  projectExperience: "0",
  lastUsedYear: String(new Date().getFullYear()),
};

export default function SkillsManager() {
  const { items, loading, error, reload } = useAdminList<Skill>("/skills");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [icon, setIcon] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Skill | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = useMemo(() => {
    if (!items) return [];
    if (categoryFilter === "ALL") return items;
    return items.filter((s) => s.category === categoryFilter);
  }, [items, categoryFilter]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setIcon(null);
    setFieldErrors({});
    setOpen(true);
  };

  const openEdit = (skill: Skill) => {
    setEditing(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      projectExperience: String(skill.projectExperience),
      lastUsedYear: String(skill.lastUsedYear),
    });
    setIcon(null);
    setFieldErrors({});
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    if (!editing && !icon) {
      setFieldErrors({ icon: "An icon is required." });
      toast.error("Please add an icon.");
      return;
    }

    const parsed = skillSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(zodFieldErrors(parsed.error));
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    const fd = toFormData({
      ...parsed.data,
      icon: icon ?? undefined,
    });
    const res = await adminApi(
      editing ? `/skills/${editing.id}` : "/skills",
      { method: editing ? "PATCH" : "POST", formData: fd },
    );
    setSaving(false);

    if (res.error) {
      setFieldErrors(res.fieldErrors);
      toast.error(res.error);
      return;
    }

    toast.success(editing ? "Skill updated" : "Skill created");
    setOpen(false);
    await revalidatePublic();
    reload();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await adminApi(`/skills/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Skill deleted");
    setDeleteTarget(null);
    await revalidatePublic();
    reload();
  };

  return (
    <div>
      <PageHeader
        title="Skills"
        description="The technologies shown in the public tech-stack tree."
        action={
          <AdminButton onClick={openCreate}>
            <Plus className="h-4 w-4" /> New skill
          </AdminButton>
        }
      />

      {!loading && !error ? (
        <HeroChipsPanel
          skills={items ?? []}
          onAddSkill={openCreate}
          onSaved={reload}
        />
      ) : null}

      {loading ? (
        <SkeletonRows rows={5} />
      ) : error ? (
        <ErrorBlock message={error} onRetry={reload} />
      ) : items && items.length === 0 ? (
        <EmptyBlock
          title="No skills yet"
          message="Add your first skill to populate the tech-stack tree."
          action={
            <AdminButton onClick={openCreate}>
              <Plus className="h-4 w-4" /> New skill
            </AdminButton>
          }
        />
      ) : (
        <>
          <div className="mb-5 max-w-xs">
            <Field label="Filter by category">
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="ALL">All categories</option>
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <ul className="flex flex-col gap-3">
            {filtered.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface/50 p-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface-2">
                  {skill.icon ? (
                    <Image
                      src={skill.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  ) : null}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="truncate text-sm font-semibold text-ink">
                    {skill.name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{skill.category}</Badge>
                    <Badge tone="accent">{skill.level}</Badge>
                    <span className="text-xs text-faint">
                      {skill.projectExperience} projects · last used{" "}
                      {skill.lastUsedYear}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(skill)}
                    aria-label={`Edit ${skill.name}`}
                    className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(skill)}
                    aria-label={`Delete ${skill.name}`}
                    className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit skill" : "New skill"}
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
              {editing ? "Save changes" : "Create skill"}
            </AdminButton>
          </>
        }
      >
        <form onSubmit={submit} className="flex flex-col gap-5">
          <ImagePicker
            label="Icon"
            file={icon}
            onFileChange={setIcon}
            existingUrl={editing?.icon ?? null}
            required={!editing}
            error={fieldErrors.icon}
          />
          <Field label="Name" htmlFor="skill-name" error={fieldErrors.name}>
            <TextInput
              id="skill-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Category" error={fieldErrors.category}>
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Level" error={fieldErrors.level}>
              <Select
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
              >
                {SKILL_LEVELS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Projects used in"
              htmlFor="skill-exp"
              error={fieldErrors.projectExperience}
            >
              <TextInput
                id="skill-exp"
                type="number"
                min={0}
                value={form.projectExperience}
                onChange={(e) =>
                  setForm({ ...form, projectExperience: e.target.value })
                }
              />
            </Field>
            <Field
              label="Last used year"
              htmlFor="skill-year"
              error={fieldErrors.lastUsedYear}
            >
              <TextInput
                id="skill-year"
                type="number"
                value={form.lastUsedYear}
                onChange={(e) =>
                  setForm({ ...form, lastUsedYear: e.target.value })
                }
              />
            </Field>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete skill"
        message={`Delete "${deleteTarget?.name}"? This cannot be undone and will remove it from linked projects.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
