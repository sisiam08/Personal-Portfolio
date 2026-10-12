"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  FolderGit2,
  X,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import EmptyState from "./EmptyState";
import type { Project } from "./types";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  COMPLETED: { bg: "var(--accent-3)", color: "var(--bg)" },
  ONGOING: { bg: "var(--accent)", color: "var(--accent-ink)" },
  PLANNED: { bg: "var(--accent-2)", color: "var(--bg)" },
};

const SHELL =
  "mx-auto grid h-full w-full max-w-[var(--container-page)] grid-cols-1 grid-rows-[minmax(0,38%)_minmax(0,1fr)] gap-6 px-[var(--spacing-page)] pb-10 pt-24 lg:grid-cols-[1.02fr_0.98fr] lg:grid-rows-1 lg:gap-12 lg:pb-0 lg:pt-0";

function StatusBadge({ status, featured }: { status?: string; featured?: boolean }) {
  if (!status && !featured) return null;
  const style = STATUS_STYLE[status ?? ""] ?? {
    bg: "var(--surface-2)",
    color: "var(--muted)",
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {status ? (
        <span
          className="mono-label rounded-full px-2.5 py-1"
          style={{ background: style.bg, color: style.color }}
        >
          {status}
        </span>
      ) : null}
      {featured ? (
        <span className="mono-label rounded-full border border-accent px-2.5 py-1 text-accent">
          Featured
        </span>
      ) : null}
    </div>
  );
}

function TechChips({ skills }: { skills: Project["skills"] }) {
  if (!skills || skills.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s, i) => (
        <span
          key={`${s.name}-${i}`}
          className="flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-ink"
        >
          {s.icon ? (
            <Image
              src={s.icon}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 object-contain"
            />
          ) : null}
          {s.name}
        </span>
      ))}
    </div>
  );
}

function ProjectVisual({
  project,
  imageY,
  priority,
}: {
  project: Project;
  imageY?: MotionValue<string>;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(project.image) && !failed;

  return (
    <motion.div
      whileHover={{ rotate: -1, y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="flex h-full w-full items-center justify-center"
    >
      {/* Stage: centers every image so incoming/outgoing line up. Height is
          capped to the slide cell and to the viewport so it never scrolls. */}
      <div className="relative flex h-full max-h-[min(70vh,640px)] w-full items-center justify-center">
        {/* very subtle ambient glow behind the mockup (not a box) */}
        <div className="pointer-events-none absolute inset-[16%] rounded-full bg-accent-soft opacity-40 blur-3xl" />

        <motion.div
          style={{ y: imageY }}
          className="relative flex h-full max-h-full w-full items-center justify-center"
        >
          {showImage ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={1000}
              priority={priority}
              loading="eager"
              quality={85}
              sizes="(max-width: 1024px) 92vw, 720px"
              onError={() => setFailed(true)}
              className="h-auto max-h-full w-auto max-w-full rounded-3xl"
              style={{
                filter: "drop-shadow(0 30px 50px rgba(0, 0, 0, 0.35))",
              }}
            />
          ) : (
            <div className="flex aspect-16/10 w-full max-w-md flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-line-2 bg-surface-2/60">
              <span className="font-display text-4xl font-bold text-faint">
                {project.title.slice(0, 2).toUpperCase()}
              </span>
              <span className="mono-label text-faint">Preview coming soon</span>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
        >
          <ExternalLink className="h-4 w-4" />
          Live demo
        </a>
      ) : null}
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
        >
          <FolderGit2 className="h-4 w-4" />
          Source code
        </a>
      ) : null}
    </div>
  );
}

function ProjectDetails({
  project,
  index,
  total,
  onOpenCase,
}: {
  project: Project;
  index: number;
  total: number;
  onOpenCase: () => void;
}) {
  const hasCaseStudy = Boolean(
    project.problem || project.solution || project.challenges || project.futurePlan,
  );

  return (
    <div className="flex h-full max-h-full flex-col gap-4 overflow-y-auto py-1 no-scrollbar lg:gap-5 lg:justify-center">
      <div className="flex items-center gap-4">
        <span className="font-display text-sm text-faint">
          {String(index + 1).padStart(2, "0")}
          <span className="text-line-2"> / {String(total).padStart(2, "0")}</span>
        </span>
        <StatusBadge status={project.status} featured={project.featured} />
      </div>

      <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-ink">
        {project.title}
      </h3>

      <p className="max-w-xl text-base leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {project.problem ? (
          <div className="rounded-2xl border border-line bg-surface/60 p-4">
            <p className="mono-label mb-1.5 text-accent-2">Problem</p>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted">
              {project.problem}
            </p>
          </div>
        ) : null}
        {project.solution ? (
          <div className="rounded-2xl border border-line bg-surface/60 p-4">
            <p className="mono-label mb-1.5 text-accent-3">Solution</p>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted">
              {project.solution}
            </p>
          </div>
        ) : null}
      </div>

      <TechChips skills={project.skills} />

      <div className="flex flex-wrap items-center gap-3">
        <ProjectLinks project={project} />
        {hasCaseStudy ? (
          <button
            type="button"
            onClick={onOpenCase}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
          >
            Read case study
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function detailsOpacity(index: number, pos: number, total: number) {
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Enter during 40–60% of this project's rise; exit during 35–40% of the
  // next project's rise (so old is fully gone before the new starts).
  const enterStart = isFirst ? Number.NEGATIVE_INFINITY : index - 0.66;
  const enterEnd = isFirst ? Number.NEGATIVE_INFINITY : index - 0.49;
  const exitStart = isLast ? Number.POSITIVE_INFINITY : index + 0.3;
  const exitEnd = isLast ? Number.POSITIVE_INFINITY : index + 0.34;

  let o = 1;
  if (pos <= enterStart) o = 0;
  else if (pos < enterEnd)
    o = lerp(0, 1, (pos - enterStart) / (enterEnd - enterStart));

  if (pos > exitStart) {
    o = Math.min(o, 1 - clamp((pos - exitStart) / (exitEnd - exitStart), 0, 1));
  }
  return clamp(o, 0, 1);
}

function DetailsLayer({
  project,
  index,
  total,
  progress,
  onOpenCase,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpenCase: () => void;
}) {
  const opacity = useTransform(progress, (v) =>
    detailsOpacity(index, v * total, total),
  );
  const [readable, setReadable] = useState(() => opacity.get() > 0.01);

  useMotionValueEvent(opacity, "change", (o) => {
    const next = o > 0.01;
    setReadable((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.div
      aria-hidden={!readable}
      style={{
        opacity,
        visibility: readable ? "visible" : "hidden",
        pointerEvents: readable ? "auto" : "none",
      }}
      className="absolute inset-0"
    >
      <ProjectDetails
        project={project}
        index={index}
        total={total}
        onOpenCase={onOpenCase}
      />
    </motion.div>
  );
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

function VisualSlide({
  project,
  index,
  total,
  progress,
  active,
  horizontal,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  horizontal: boolean;
}) {
  const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // Scroll maps to "pos" over [0, total]; each project owns one unit.
  const y = useTransform(progress, (v) => {
    if (index === 0) return "0%";
    const t = clamp((v * total - (index - 1)) / 0.85, 0, 1);
    return `${lerp(100, 0, t)}%`;
  });
  // Tablet/phone: the image enters from the right instead of the bottom, so it
  // never crosses the details block.
  const x = useTransform(progress, (v) => {
    if (index === 0) return "0%";
    const t = clamp((v * total - (index - 1)) / 0.85, 0, 1);
    return `${lerp(100, 0, t)}%`;
  });
  const opacity = useTransform(progress, (v) => {
    if (index === total - 1) return 1;
    // Fully hidden by the time the next image has settled.
    return 1 - clamp((v * total - index) / 0.85, 0, 1);
  });
  const visibility = useTransform(opacity, (o) =>
    o > 0.01 ? "visible" : "hidden",
  );
  const scale = useTransform(progress, (v) =>
    1 - clamp(v * total - index, 0, 1) * 0.05,
  );
  const imageY = useTransform(progress, (v) => {
    if (index === 0) return "0%";
    const t = clamp((v * total - (index - 1)) / 0.85, 0, 1);
    return `${lerp(16, 0, t)}%`;
  });

  return (
    <motion.div
      aria-hidden={!active}
      style={{
        x: horizontal ? x : "0%",
        y: horizontal ? "0%" : y,
        opacity,
        scale,
        visibility,
        zIndex: index + 1,
      }}
      className="absolute inset-0"
    >
      <div className={SHELL}>
        <div className="col-start-1 row-start-1 flex items-center justify-center lg:col-start-2 lg:row-start-1">
          <ProjectVisual
            project={project}
            imageY={imageY}
            priority={index === 0}
          />
        </div>
      </div>
    </motion.div>
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Lock background scroll without a layout jump (compensate scrollbar width).
  useEffect(() => {
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, []);

  // Esc, focus trap, and restore focus to the trigger on close.
  useEffect(() => {
    const node = dialogRef.current;
    const prevActive = document.activeElement as HTMLElement | null;
    node?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      prevActive?.focus?.();
    };
  }, [onClose]);

  const sections = [
    { label: "The problem", value: project.problem },
    { label: "The solution", value: project.solution },
    { label: "Key challenges", value: project.challenges },
    { label: "Future plan", value: project.futurePlan },
  ].filter((s) => Boolean(s.value));

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-80 flex items-center justify-center p-4"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
    >
      <div
        className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} case study`}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-line-2 bg-surface shadow-(--shadow) outline-none"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line p-6">
          <div className="flex flex-col gap-2">
            <StatusBadge status={project.status} featured={project.featured} />
            <h3 className="font-display text-2xl font-semibold text-ink">
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-surface-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
          {project.image ? (
            <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl border border-line">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 90vw, 720px"
                className="object-cover object-top"
              />
            </div>
          ) : null}

          <p className="text-base leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-6 space-y-6">
            {sections.map((s) => (
              <div key={s.label}>
                <h4 className="mono-label mb-2 text-accent">{s.label}</h4>
                <p className="text-sm leading-relaxed text-muted">{s.value}</p>
              </div>
            ))}
          </div>

          {project.skills && project.skills.length > 0 ? (
            <div className="mt-8">
              <h4 className="mono-label mb-3 text-faint">Tech stack</h4>
              <TechChips skills={project.skills} />
            </div>
          ) : null}

          <div className="mt-8 border-t border-line pt-6">
            <ProjectLinks project={project} />
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function ProjectListCard({
  project,
  index,
  onOpenCase,
}: {
  project: Project;
  index: number;
  onOpenCase: () => void;
}) {
  const hasCaseStudy = Boolean(project.problem || project.challenges);
  return (
    <article className="grid grid-cols-1 gap-8 overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 md:grid-cols-2 md:p-6">
      <div className="order-1 flex items-center justify-center">
        <ProjectVisual project={project} />
      </div>
      <div className="order-2 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <StatusBadge status={project.status} featured={project.featured} />
        </div>
        <h3 className="font-display text-2xl font-semibold text-ink">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">{project.description}</p>
        <TechChips skills={project.skills} />
        <div className="flex flex-wrap items-center gap-3">
          <ProjectLinks project={project} />
          {hasCaseStudy ? (
            <button
              type="button"
              onClick={onOpenCase}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              Read case study
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsStack({ projects }: { projects: Project[] }) {
  const reduced = useReducedMotion();
  const horizontal = useMediaQuery("(max-width: 1023px)");
  const tallRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = projects.length;

  const { scrollYProgress } = useScroll({
    target: tallRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (total < 2) return;
    // Switch the active project (counter/rail) around the midpoint of the
    // incoming image's rise, matching the details threshold.
    const idx = Math.min(
      total - 1,
      Math.max(0, Math.floor(v * total + 0.55)),
    );
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const scrollToProject = (i: number) => {
    const el = tallRef.current;
    if (!el || total < 2) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: start + ((i + 0.5) / total) * scrollable,
      behavior: "smooth",
    });
  };

  const openProject = openIndex !== null ? projects[openIndex] : null;

  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-(--container-page) px-page pt-section"
    >
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Projects that solve a real problem."
        description="Scroll through the stack — each build rises to the stage with the reasoning behind it."
      />

      {total === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<FolderGit2 className="h-5 w-5" />}
            title="No projects published yet"
            message="Projects added through the API will appear here as a stacked, scrollable showcase."
          />
        </div>
      ) : total === 1 || reduced ? (
        <div className="mt-10 flex flex-col gap-8">
          {projects.map((p, i) => (
            <ProjectListCard
              key={p.id}
              project={p}
              index={i}
              onOpenCase={() => setOpenIndex(i)}
            />
          ))}
        </div>
      ) : (
        <div
          ref={tallRef}
          className="relative mt-8"
          style={{ height: `${total * 100}vh` }}
        >
          <div className="sticky top-0 h-dvh overflow-hidden">
            {/* scroll-driven mockups */}
            <div className="absolute inset-0 overflow-x-clip">
              {projects.map((p, i) => (
                <VisualSlide
                  key={p.id}
                  project={p}
                  index={i}
                  total={total}
                  progress={scrollYProgress}
                  active={active === i}
                  horizontal={horizontal}
                />
              ))}
            </div>

            {/* scroll-driven details — switches early; old fully hidden before new */}
            <div className="pointer-events-none absolute inset-0 z-40">
              <div className={SHELL}>
                <div className="relative col-start-1 row-start-2 min-h-0 lg:col-start-1 lg:row-start-1">
                  {projects.map((p, i) => (
                    <DetailsLayer
                      key={p.id}
                      project={p}
                      index={i}
                      total={total}
                      progress={scrollYProgress}
                      onOpenCase={() => setOpenIndex(i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* progress indicator: numbered dots, clickable to jump */}
            <div className="absolute right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:right-6 lg:flex">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToProject(i)}
                  aria-label={`Go to project ${i + 1}: ${p.title}`}
                  aria-current={active === i}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={`text-right text-[0.65rem] font-medium transition-colors ${
                      active === i ? "text-ink" : "text-faint"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      active === i
                        ? "h-6 bg-accent"
                        : "bg-line-2 group-hover:bg-muted"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {openProject ? (
        <CaseStudyModal
          project={openProject}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}
    </section>
  );
}
