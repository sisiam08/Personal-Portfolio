"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Reorder,
  useDragControls,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Star,
  Trash2,
} from "lucide-react";
import { adminApi, toFormData } from "@/lib/adminApi";
import {
  PROJECT_STATUSES,
  projectSchema,
  zodFieldErrors,
} from "@/lib/adminSchemas";
import { revalidatePublic } from "@/src/action/admin.action";
import {
  AdminButton,
  Badge,
  Checkbox,
  ConfirmDialog,
  EmptyBlock,
  ErrorBlock,
  Field,
  ImagePicker,
  Modal,
  PageHeader,
  Select,
  SkeletonRows,
  TextArea,
  TextInput,
  useAdminList,
} from "./ui";
import type { Project, Skill } from "./types";

const emptyForm = {
  title: "",
  description: "",
  problem: "",
  solution: "",
  challenges: "",
  futurePlan: "",
  githubUrl: "",
  liveUrl: "",
  status: "ONGOING",
  featured: false,
};

function ProjectRow({
  project,
  index,
  total,
  canReorder,
  reduced,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  project: Project;
  index: number;
  total: number;
  canReorder: boolean;
  reduced: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={project}
      dragListener={false}
      dragControls={controls}
      layout={reduced ? undefined : true}
      whileDrag={{ scale: 1.01, zIndex: 20 }}
      className="flex items-center gap-3 rounded-2xl border border-line bg-surface/70 p-3 md:p-4"
    >
      {canReorder ? (
        <button
          type="button"
          aria-label={`Drag to reorder ${project.title}`}
          onPointerDown={(e) => controls.start(e)}
          style={{ touchAction: "none" }}
          className="grid h-11 w-9 shrink-0 cursor-grab lg:h-9 lg:w-7 place-items-center rounded-lg text-faint transition-colors hover:bg-surface-2 hover:text-ink active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      ) : null}

      <span className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="80px"
            className="object-cover"
            draggable={false}
          />
        ) : null}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-ink">
            {project.title}
          </span>
          {project.featured ? (
            <Star className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" />
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{project.status}</Badge>
          <span className="text-xs text-faint">
            /{project.slug} · {project.skills?.length ?? 0} skills
          </span>
        </div>
      </div>

      <div className="flex items-center gap-0.5">
        {canReorder ? (
          <>
            <button
              type="button"
              onClick={onMoveUp}
              disabled={index === 0}
              aria-label={`Move ${project.title} up`}
              className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onMoveDown}
              disabled={index === total - 1}
              aria-label={`Move ${project.title} down`}
              className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={onEdit}
          aria-label={`Edit ${project.title}`}
          className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${project.title}`}
          className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </Reorder.Item>
  );
}

export default function ProjectsManager() {
  const { items, loading, error, reload } =
    useAdminList<Project>("/projects?limit=100");
  const reduced = useReducedMotion() ?? false;

  const [ordered, setOrdered] = useState<Project[] | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const [skills, setSkills] = useState<Skill[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await adminApi<Skill[]>("/skills");
      if (!res.error && Array.isArray(res.data)) setSkills(res.data);
    })();
  }, []);

  // Sync local order from the server list whenever it (re)loads.
  useEffect(() => {
    if (!items) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrdered(items);
    setSavedIds(items.map((p) => p.id));
  }, [items]);

  const dirty = useMemo(() => {
    if (!ordered) return false;
    return ordered.map((p) => p.id).join("|") !== savedIds.join("|");
  }, [ordered, savedIds]);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const move = (from: number, to: number) => {
    if (!ordered || to < 0 || to >= ordered.length) return;
    const next = [...ordered];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setOrdered(next);
    setAnnouncement(
      `Moved ${item.title} to position ${to + 1} of ${next.length}.`,
    );
  };

  const resetOrder = () => {
    if (!ordered) return;
    const map = new Map(ordered.map((p) => [p.id, p]));
    const restored = savedIds
      .map((id) => map.get(id))
      .filter((p): p is Project => Boolean(p));
    setOrdered(restored);
    setAnnouncement("Order reset to the last saved order.");
  };

  const saveOrder = async () => {
    if (!ordered) return;
    setSaving(true);
    const ids = ordered.map((p) => p.id);
    const res = await adminApi("/projects/reorder", {
      method: "PATCH",
      body: { ids },
    });
    setSaving(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    setSavedIds(ids);
    toast.success("Order saved");
    setAnnouncement("Order saved.");
    await revalidatePublic();
  };

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setSelectedSkills([]);
    setImage(null);
    setFieldErrors({});
    setOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      problem: project.problem,
      solution: project.solution,
      challenges: project.challenges ?? "",
      futurePlan: project.futurePlan ?? "",
      githubUrl: project.githubUrl ?? "",
      liveUrl: project.liveUrl ?? "",
      status: project.status,
      featured: Boolean(project.featured),
    });
    setSelectedSkills((project.skills ?? []).map((s) => s.id));
    setImage(null);
    setFieldErrors({});
    setOpen(true);
  };

  const toggleSkill = (id: string) =>
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    if (!editing && !image) {
      setFieldErrors({ image: "An image is required." });
      toast.error("Please add a cover image.");
      return;
    }

    const parsed = projectSchema.safeParse({ ...form, skills: selectedSkills });
    if (!parsed.success) {
      setFieldErrors(zodFieldErrors(parsed.error));
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    const fd = toFormData({
      ...parsed.data,
      image: image ?? undefined,
    });
    const res = await adminApi(
      editing ? `/projects/${editing.id}` : "/projects",
      { method: editing ? "PATCH" : "POST", formData: fd },
    );
    setSubmitting(false);

    if (res.error) {
      setFieldErrors(res.fieldErrors);
      toast.error(res.error);
      return;
    }

    toast.success(editing ? "Project updated" : "Project created");
    setOpen(false);
    await revalidatePublic();
    reload();
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await adminApi(`/projects/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success("Project deleted");
    setDeleteTarget(null);
    await revalidatePublic();
    reload();
  };

  const canReorder = (ordered?.length ?? 0) > 1;

  return (
    <div className="pb-24">
      <PageHeader
        title="Projects"
        description="Manage the projects shown in the public showcase."
        action={
          <AdminButton onClick={openCreate}>
            <Plus className="h-4 w-4" /> New project
          </AdminButton>
        }
      />

      <p className="mb-5 text-sm text-muted">
        Drag the handle to arrange. This order is the order shown on the public
        portfolio.
      </p>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {loading ? (
        <SkeletonRows rows={4} />
      ) : error ? (
        <ErrorBlock message={error} onRetry={reload} />
      ) : ordered && ordered.length === 0 ? (
        <EmptyBlock
          title="No projects yet"
          message="Create your first project to populate the showcase."
          action={
            <AdminButton onClick={openCreate}>
              <Plus className="h-4 w-4" /> New project
            </AdminButton>
          }
        />
      ) : ordered ? (
        <Reorder.Group
          as="ul"
          axis="y"
          values={ordered}
          onReorder={setOrdered}
          className="flex flex-col gap-3"
        >
          {ordered.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              total={ordered.length}
              canReorder={canReorder}
              reduced={reduced}
              onEdit={() => openEdit(project)}
              onDelete={() => setDeleteTarget(project)}
              onMoveUp={() => move(index, index - 1)}
              onMoveDown={() => move(index, index + 1)}
            />
          ))}
        </Reorder.Group>
      ) : null}

      {dirty ? (
        <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
          <div className="flex items-center gap-3 rounded-full border border-line-2 bg-surface/95 px-4 py-2.5 shadow-[var(--shadow)] backdrop-blur-md">
            <span className="text-sm font-medium text-ink">
              Unsaved order changes
            </span>
            <AdminButton
              variant="ghost"
              size="sm"
              onClick={resetOrder}
              disabled={saving}
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </AdminButton>
            <AdminButton size="sm" onClick={saveOrder} loading={saving}>
              <Save className="h-3.5 w-3.5" /> Save order
            </AdminButton>
          </div>
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? "Edit project" : "New project"}
        wide
        footer={
          <>
            <AdminButton
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              Cancel
            </AdminButton>
            <AdminButton onClick={submit} loading={submitting}>
              {editing ? "Save changes" : "Create project"}
            </AdminButton>
          </>
        }
      >
        <form onSubmit={submit} className="flex flex-col gap-5">
          <ImagePicker
            label="Cover image"
            file={image}
            onFileChange={setImage}
            existingUrl={editing?.image ?? null}
            required={!editing}
            error={fieldErrors.image}
            contain
            maxBytes={50 * 1024 * 1024}
            warnBytes={5 * 1024 * 1024}
            minWidth={1200}
            hint="Upload a mockup image. Recommended: 1600 x 1000 px (16:10), PNG or WebP, transparent background, mockup fully inside the canvas with about 5% empty margin. Keep it under 1 MB."
          />

          <Field label="Title" htmlFor="p-title" error={fieldErrors.title}>
            <TextInput
              id="p-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </Field>

          {editing ? (
            <Field label="Slug (read-only)">
              <TextInput value={editing.slug} disabled />
            </Field>
          ) : null}

          <Field
            label="Description"
            htmlFor="p-desc"
            error={fieldErrors.description}
          >
            <TextArea
              id="p-desc"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Problem"
              htmlFor="p-problem"
              error={fieldErrors.problem}
            >
              <TextArea
                id="p-problem"
                rows={3}
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
              />
            </Field>
            <Field
              label="Solution"
              htmlFor="p-solution"
              error={fieldErrors.solution}
            >
              <TextArea
                id="p-solution"
                rows={3}
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
              />
            </Field>
            <Field label="Challenges (optional)" htmlFor="p-challenges">
              <TextArea
                id="p-challenges"
                rows={3}
                value={form.challenges}
                onChange={(e) => setForm({ ...form, challenges: e.target.value })}
              />
            </Field>
            <Field label="Future plan (optional)" htmlFor="p-future">
              <TextArea
                id="p-future"
                rows={3}
                value={form.futurePlan}
                onChange={(e) => setForm({ ...form, futurePlan: e.target.value })}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="GitHub URL" htmlFor="p-github" error={fieldErrors.githubUrl}>
              <TextInput
                id="p-github"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/…"
              />
            </Field>
            <Field label="Live URL" htmlFor="p-live" error={fieldErrors.liveUrl}>
              <TextInput
                id="p-live"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder="https://…"
              />
            </Field>
          </div>

          <div className="grid items-end gap-4 sm:grid-cols-2">
            <Field label="Status" error={fieldErrors.status}>
              <Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="pb-2">
              <Checkbox
                label="Featured project"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
            </div>
          </div>

          <Field label="Tech stack">
            {skills.length === 0 ? (
              <p className="text-xs text-faint">
                No skills available. Add skills first.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => {
                  const selected = selectedSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      aria-pressed={selected}
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        selected
                          ? "border-accent bg-accent-soft text-ink"
                          : "border-line text-muted hover:border-line-2 hover:text-ink"
                      }`}
                    >
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt=""
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 object-contain"
                        />
                      ) : null}
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            )}
          </Field>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project"
        message={`Delete "${deleteTarget?.title}"? This cannot be undone.`}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
