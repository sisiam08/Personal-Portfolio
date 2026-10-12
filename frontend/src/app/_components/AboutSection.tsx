import { ArrowRight, Download } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import ResumeDownloadButton from "./ResumeDownloadButton";
import type { ProfileUser } from "./types";

const PRINCIPLES = [
  { k: "01", t: "End-to-end ownership", d: "From schema and API to pixel and motion — one thread of accountability." },
  { k: "02", t: "Performance is design", d: "Fast is a feature. Interfaces should feel instant on real hardware." },
  { k: "03", t: "Build for the next person", d: "Readable, typed, and documented code that outlives the sprint." },
];

const FACTS = [
  { label: "Focus", value: "Full-stack · Product-minded" },
  { label: "Approach", value: "Clarity first, then speed" },
  { label: "Collaboration", value: "Async & remote-friendly" },
  { label: "Status", value: "Open to work" },
];

export default function AboutSection({ user }: { user?: ProfileUser | null }) {
  const paragraphs = (user?.about || "")
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[var(--container-page)] px-[var(--spacing-page)] pt-[var(--spacing-section)]"
    >
      <SectionHeading
        index="05"
        eyebrow="About"
        title="The person behind the work."
        description="You've seen the projects and the stack — here's the story behind them, and what I care about when I build."
      />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`leading-relaxed text-muted ${
                    i === 0 ? "text-lg text-ink" : "text-base"
                  }`}
                >
                  {p}
                </p>
              ))
            ) : (
              <p className="text-lg leading-relaxed text-muted">
                I craft reliable web products with a bias for clarity, speed,
                and long-term maintainability.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
            <p className="mono-label mb-5 text-faint">At a glance</p>
            <dl className="flex flex-col gap-3 text-sm">
              {FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`flex items-center justify-between gap-4 ${
                    i < FACTS.length - 1 ? "border-b border-line pb-3" : ""
                  }`}
                >
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="flex items-center gap-2 text-right font-medium text-ink">
                    {fact.label === "Status" ? (
                      <span className="h-2 w-2 rounded-full bg-accent-3 animate-pulse-dot" />
                    ) : null}
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <ul className="mt-14 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p.k} className="group">
              <span className="mono-label text-accent">{p.k}</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">
                {p.t}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.d}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-8">
          <p className="mr-auto max-w-md text-base text-muted">
            Want to build something together? I&apos;d love to hear about it.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            Let&apos;s work together
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          {user?.resumeUrl ? (
            <ResumeDownloadButton
              url={user.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
            >
              <Download className="h-4 w-4" />
              Resume
            </ResumeDownloadButton>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}
