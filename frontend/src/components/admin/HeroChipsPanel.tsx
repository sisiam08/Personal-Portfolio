"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { ArrowDown, ArrowUp, Plus, Search, X } from "lucide-react";
import { adminApi } from "@/lib/adminApi";
import { revalidatePublic } from "@/src/action/admin.action";
import { AdminButton, TextInput } from "./ui";
import type { Skill } from "./types";

export default function HeroChipsPanel({
  skills,
  onAddSkill,
  onSaved,
}: {
  skills: Skill[];
  onAddSkill: () => void;
  onSaved: () => void;
}) {
  const [heroIds, setHeroIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");

  const skillById = useMemo(
    () => new Map(skills.map((s) => [s.id, s])),
    [skills],
  );

  // Sync local selection from the server list whenever it (re)loads.
  useEffect(() => {
    const selected = skills
      .filter((s) => s.heroOrder !== null && s.heroOrder !== undefined)
      .sort((a, b) => (a.heroOrder as number) - (b.heroOrder as number))
      .map((s) => s.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeroIds(selected);
    setSavedIds(selected);
  }, [skills]);

  const dirty = heroIds.join("|") !== savedIds.join("|");
  const atMax = heroIds.length >= 5;

  const add = (id: string) => {
    if (atMax || heroIds.includes(id)) return;
    setHeroIds((prev) => [...prev, id]);
    setQuery("");
  };

  const remove = (id: string) =>
    setHeroIds((prev) => prev.filter((x) => x !== id));

  const move = (from: number, to: number) => {
    if (to < 0 || to >= heroIds.length) return;
    setHeroIds((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const reset = () => setHeroIds(savedIds);

  const save = async () => {
    setSaving(true);
    const res = await adminApi("/skills/hero", {
      method: "PUT",
      body: { ids: heroIds },
    });
    setSaving(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    setSavedIds(heroIds);
    toast.success("Hero chips saved");
    await revalidatePublic();
    onSaved();
  };

  const available = skills
    .filter((s) => !heroIds.includes(s.id))
    .filter((s) => s.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <section className="mb-8 rounded-3xl border border-line bg-surface/50 p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-semibold text-ink">
            Hero stack chips
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted">
            These skills appear as chips next to your photo in the Hero. Choose
            up to 5. If none are selected, no chips are shown.
          </p>
        </div>
        <span className="mono-label rounded-full border border-line px-2.5 py-1 text-faint">
          {heroIds.length} / 5
        </span>
      </div>

      {heroIds.length === 0 ? (
        <p className="mt-5 rounded-2xl border border-dashed border-line-2 px-4 py-6 text-center text-sm text-muted">
          No chips selected — the Hero shows none.
        </p>
      ) : (
        <ul className="mt-5 flex flex-col gap-2">
          {heroIds.map((id, index) => {
            const skill = skillById.get(id);
            if (!skill) return null;
            return (
              <li
                key={id}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-2.5"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface-2">
                  {skill.icon ? (
                    <Image
                      src={skill.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                  {skill.name}
                </span>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    aria-label={`Move ${skill.name} up`}
                    className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, index + 1)}
                    disabled={index === heroIds.length - 1}
                    aria-label={`Move ${skill.name} down`}
                    className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-surface-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(id)}
                    aria-label={`Remove ${skill.name}`}
                    className="grid h-11 w-11 place-items-center rounded-full lg:h-9 lg:w-9 text-muted transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <AdminButton
          variant="outline"
          size="sm"
          onClick={() => setPickerOpen((v) => !v)}
          disabled={atMax || skills.length === 0}
        >
          <Plus className="h-3.5 w-3.5" /> Add skill
        </AdminButton>
        {atMax ? (
          <span className="text-xs text-faint">Maximum 5 chips</span>
        ) : null}
        {skills.length === 0 ? (
          <button
            type="button"
            onClick={onAddSkill}
            className="text-xs font-medium text-accent hover:underline"
          >
            Add a skill first
          </button>
        ) : null}
      </div>

      {pickerOpen && !atMax ? (
        <div className="mt-3 rounded-2xl border border-line bg-surface p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <TextInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills…"
              className="pl-9"
            />
          </div>
          <ul className="mt-2 max-h-56 overflow-y-auto">
            {available.length === 0 ? (
              <li className="px-2 py-3 text-center text-sm text-muted">
                No skills available.
              </li>
            ) : (
              available.map((skill) => (
                <li key={skill.id}>
                  <button
                    type="button"
                    onClick={() => add(skill.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left text-sm text-ink transition-colors hover:bg-surface-2"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-surface-2">
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt=""
                          width={18}
                          height={18}
                          className="h-4 w-4 object-contain"
                        />
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{skill.name}</span>
                    <Plus className="h-4 w-4 text-faint" />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-end gap-3 border-t border-line pt-4">
        {dirty ? (
          <span className="mr-auto text-xs font-medium text-accent-2">
            Unsaved changes
          </span>
        ) : null}
        <AdminButton
          variant="ghost"
          size="sm"
          onClick={reset}
          disabled={!dirty || saving}
        >
          Reset
        </AdminButton>
        <AdminButton size="sm" onClick={save} loading={saving} disabled={!dirty || saving}>
          Save chips
        </AdminButton>
      </div>
    </section>
  );
}
