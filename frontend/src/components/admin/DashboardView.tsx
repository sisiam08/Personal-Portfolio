"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Layers,
  Mail,
} from "lucide-react";
import { adminApi, unwrapList } from "@/lib/adminApi";
import { ErrorBlock, PageHeader, SkeletonRows } from "./ui";
import type { Message } from "./types";

interface Stats {
  projects: number;
  skills: number;
  experiences: number;
  educations: number;
  messages: number;
  recent: Message[];
}

export default function DashboardView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    const [projects, skills, experiences, educations, messages] =
      await Promise.all([
        adminApi<{ meta?: { total?: number }; data?: unknown[] }>(
          "/projects?limit=100",
        ),
        adminApi<unknown>("/skills"),
        adminApi<unknown>("/experiences"),
        adminApi<unknown>("/educations"),
        adminApi<unknown>("/messages"),
      ]);

    const err =
      projects.error ||
      skills.error ||
      experiences.error ||
      educations.error ||
      messages.error;

    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    const messageList = unwrapList<Message>(messages.data);
    setStats({
      projects: projects.data?.meta?.total ?? unwrapList(projects.data).length,
      skills: unwrapList(skills.data).length,
      experiences: unwrapList(experiences.data).length,
      educations: unwrapList(educations.data).length,
      messages: messageList.length,
      recent: messageList.slice(0, 5),
    });
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const cards = [
    { href: "/admin/projects", label: "Projects", value: stats?.projects, Icon: FolderGit2 },
    { href: "/admin/skills", label: "Skills", value: stats?.skills, Icon: Layers },
    { href: "/admin/experiences", label: "Experiences", value: stats?.experiences, Icon: Briefcase },
    { href: "/admin/educations", label: "Educations", value: stats?.educations, Icon: GraduationCap },
    { href: "/admin/messages", label: "Messages", value: stats?.messages, Icon: Mail },
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="An overview of your portfolio content."
      />

      {error ? <ErrorBlock message={error} onRetry={load} /> : null}

      {loading && !stats ? (
        <SkeletonRows rows={5} />
      ) : stats ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {cards.map(({ href, label, value, Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-3 rounded-2xl border border-line bg-surface/60 p-5 transition-colors hover:border-line-2 hover:bg-surface-2/60"
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-4 w-4 text-accent" />
                  <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-semibold text-ink">
                    {value ?? 0}
                  </p>
                  <p className="mono-label mt-0.5 text-faint">{label}</p>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Recent messages
              </h2>
              <Link
                href="/admin/messages"
                className="text-sm font-semibold text-accent hover:text-ink"
              >
                View all
              </Link>
            </div>
            {stats.recent.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line-2 bg-surface/50 px-5 py-8 text-center text-sm text-muted">
                No messages yet.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-line">
                {stats.recent.map((m) => (
                  <li key={m.id} className="flex flex-col gap-1 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-ink">
                        {m.name}
                      </span>
                      <span className="text-xs text-faint">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-xs text-muted">{m.email}</span>
                    <span className="line-clamp-1 text-sm text-muted">
                      {m.message}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      ) : null}
    </div>
  );
}
