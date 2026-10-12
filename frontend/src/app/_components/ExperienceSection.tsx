import { Briefcase } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import EmptyState from "./EmptyState";
import type { Experience } from "./types";

function formatDate(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[var(--container-page)] px-[var(--spacing-page)] pt-[var(--spacing-section)]"
    >
      <SectionHeading
        index="03"
        eyebrow="Track record"
        title="Where I've built and shipped."
      />

      {experiences.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={<Briefcase className="h-5 w-5" />}
            title="No experience listed yet"
            message="Roles added through the API will appear here as a timeline."
          />
        </div>
      ) : (
        <div className="mt-14">
          <ol className="relative border-l border-line-2 pl-8 md:pl-12">
            {experiences.map((exp, i) => (
              <Reveal as="li" key={exp.id ?? i} delay={i * 0.06} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[41px] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-accent bg-canvas md:-left-[57px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="mono-label text-faint">
                    {formatDate(exp.startDate)} —{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate) || "Present"}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {exp.companyName}
                  </p>
                  {exp.description ? (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {exp.description}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
