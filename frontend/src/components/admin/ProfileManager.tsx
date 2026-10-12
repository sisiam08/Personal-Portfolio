"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminApi, toFormData } from "@/lib/adminApi";
import { profileSchema, zodFieldErrors } from "@/lib/adminSchemas";
import { revalidatePublic } from "@/src/action/admin.action";
import {
  AdminButton,
  ErrorBlock,
  Field,
  ImagePicker,
  PageHeader,
  ResumePicker,
  SkeletonRows,
  TextArea,
  TextInput,
} from "./ui";
import type { Profile } from "./types";

const EMPTY = {
  name: "",
  designation: "",
  bio: "",
  about: "",
  phone: "",
  whatsapp: "",
  github: "",
  linkedin: "",
  x: "",
};

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [image, setImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const load = async () => {
    setLoading(true);
    const res = await adminApi<Profile>("/users/me");
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    const p = res.data as Profile;
    setProfile(p);
    setForm({
      name: p?.name ?? "",
      designation: p?.designation ?? "",
      bio: p?.bio ?? "",
      about: p?.about ?? "",
      phone: p?.phone ?? "",
      whatsapp: p?.whatsapp ?? "",
      github: p?.github ?? "",
      linkedin: p?.linkedin ?? "",
      x: p?.x ?? "",
    });
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const set = (key: keyof typeof EMPTY, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const parsed = profileSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(zodFieldErrors(parsed.error));
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSaving(true);
    const fd = toFormData({
      ...parsed.data,
      image: image ?? undefined,
      resume: resume ?? undefined,
    });
    const res = await adminApi("/users/me", { method: "PATCH", formData: fd });
    setSaving(false);

    if (res.error) {
      setFieldErrors(res.fieldErrors);
      toast.error(res.error);
      return;
    }

    toast.success("Profile updated");
    setImage(null);
    setResume(null);
    await revalidatePublic();
    load();
  };

  if (loading) {
    return (
      <div>
        <PageHeader title="Profile" />
        <SkeletonRows rows={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Profile" />
        <ErrorBlock message={error} onRetry={load} />
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <PageHeader
        title="Profile"
        description="Your public identity across the portfolio."
        action={
          <AdminButton type="submit" loading={saving}>
            Save changes
          </AdminButton>
        }
      />

      <div className="flex flex-col gap-8">
        <section className="rounded-3xl border border-line bg-surface/50 p-5 md:p-6">
          <h2 className="mb-5 font-display text-base font-semibold text-ink">
            Identity
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <ImagePicker
              label="Portrait"
              file={image}
              onFileChange={setImage}
              existingUrl={profile?.image ?? null}
            />
            <div className="grid gap-4">
              <Field label="Name" htmlFor="name" error={fieldErrors.name}>
                <TextInput
                  id="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>
              <Field
                label="Designation"
                htmlFor="designation"
                error={fieldErrors.designation}
              >
                <TextInput
                  id="designation"
                  value={form.designation}
                  onChange={(e) => set("designation", e.target.value)}
                  placeholder="Full Stack Developer"
                />
              </Field>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-surface/50 p-5 md:p-6">
          <h2 className="mb-5 font-display text-base font-semibold text-ink">
            Bio &amp; About
          </h2>
          <div className="flex flex-col gap-5">
            <Field label="Short bio" htmlFor="bio" error={fieldErrors.bio}>
              <TextArea
                id="bio"
                rows={2}
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
              />
            </Field>
            <Field label="About" htmlFor="about" error={fieldErrors.about}>
              <TextArea
                id="about"
                rows={5}
                value={form.about}
                onChange={(e) => set("about", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-surface/50 p-5 md:p-6">
          <h2 className="mb-5 font-display text-base font-semibold text-ink">
            Contact
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            <Field label="Email (read-only)">
              <TextInput value={profile?.email ?? ""} disabled />
            </Field>
            <Field label="Phone" htmlFor="phone" error={fieldErrors.phone}>
              <TextInput
                id="phone"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
            <Field
              label="WhatsApp"
              htmlFor="whatsapp"
              error={fieldErrors.whatsapp}
            >
              <TextInput
                id="whatsapp"
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl border border-line bg-surface/50 p-5 md:p-6">
          <h2 className="mb-5 font-display text-base font-semibold text-ink">
            Links
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="GitHub" htmlFor="github" error={fieldErrors.github}>
              <TextInput
                id="github"
                value={form.github}
                onChange={(e) => set("github", e.target.value)}
                placeholder="https://github.com/…"
              />
            </Field>
            <Field
              label="LinkedIn"
              htmlFor="linkedin"
              error={fieldErrors.linkedin}
            >
              <TextInput
                id="linkedin"
                value={form.linkedin}
                onChange={(e) => set("linkedin", e.target.value)}
                placeholder="https://linkedin.com/in/…"
              />
            </Field>
            <Field label="X" htmlFor="x" error={fieldErrors.x}>
              <TextInput
                id="x"
                value={form.x}
                onChange={(e) => set("x", e.target.value)}
                placeholder="https://x.com/…"
              />
            </Field>
          </div>
          <div className="mt-5 border-t border-line pt-5">
            <ResumePicker
              label="Resume (PDF)"
              file={resume}
              onFileChange={setResume}
              existingUrl={profile?.resumeUrl ?? null}
              error={fieldErrors.resume}
              hint="Uploaded to Cloudinary and used by the Resume buttons on the public site."
            />
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end md:hidden">
        <AdminButton type="submit" loading={saving}>
          Save changes
        </AdminButton>
      </div>
    </form>
  );
}
