interface Education {
  degree: string;
  institute: string;
  field: string;
  startYear: number;
  endYear?: number | null;
}

interface EducationSectionProps {
  educations: Education[] | null | undefined;
}

export default function EducationSection({ educations }: EducationSectionProps) {
  return (
    <section id="education" className="pt-section-gap">
      <div className="text-center mb-stack-lg">
        <p className="text-primary font-label-caps architectural-tracking mb-2">
          Evolution
        </p>
        <h2 className="font-h1 text-xl text-white">Learning &amp; Growth</h2>
      </div>

      <div className="max-w-4xl mx-auto relative px-gutter">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-connector -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-12">
          {educations?.map((edu, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } items-center justify-between group`}
              >
                {/* Card */}
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="glass-panel-high p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl">
                    {/* Year */}
                    <span className="text-primary font-label-caps text-[10px] architectural-tracking">
                      {edu.startYear} — {edu.endYear ?? "Present"}
                    </span>

                    {/* Title */}
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">
                      {edu.degree}
                    </h3>

                    {/* Institute */}
                    <p className="text-primary text-sm mt-1">{edu.institute}</p>

                    {/* Field */}
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">
                      {edu.field}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(192,193,255,0.8)] z-10"></div>

                {/* Empty Side */}
                <div className="md:w-[45%]"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
