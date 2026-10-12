import { GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import EmptyState from "./EmptyState";
import type { Education } from "./types";

export default function EducationSection({
  educations,
}: {
  educations: Education[];
}) {
  return (
    <section
      id="education"
      className="mx-auto w-full max-w-[var(--container-page)] px-[var(--spacing-page)] pt-[var(--spacing-section)]"
    >
      <SectionHeading
        index="04"
        eyebrow="Foundations"
        title="Learning, formalised."
      />

      {educations.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={<GraduationCap className="h-5 w-5" />}
            title="No education listed yet"
            message="Education records added through the API will appear here."
          />
        </div>
      ) : (
        <div className="mt-14 flex flex-col">
          {educations.map((edu, i) => {
            const end = edu.endYear ?? "Present";
            return (
              <Reveal as="article" key={edu.id ?? i} delay={i * 0.06}>
                <div className="group grid grid-cols-1 gap-4 border-t border-line py-8 transition-colors hover:bg-surface-2/40 md:grid-cols-[160px_1fr] md:gap-8 md:px-4">
                  <div className="font-display text-3xl font-semibold text-faint transition-colors group-hover:text-accent">
                    {edu.startYear}
                    <span className="text-line-2">–</span>
                    {end}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium text-accent">
                      {edu.field}
                    </p>
                    <p className="text-sm text-muted">{edu.institute}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-line" />
        </div>
      )}
    </section>
  );
}
