interface Skill {
  name: string;
  category: string;
  level: string;
  projectExperience: number;
  lastUsedYear: number;
  icon?: string;
}

interface SkillsSectionProps {
  skills: Skill[] | null | undefined;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="pt-section-gap">
      <div className="text-center mb-stack-lg">
        <p className="text-primary font-label-caps architectural-tracking mb-2">
          Capabilities
        </p>
        <h2 className="font-h1 text-xl text-white">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
        {skills?.map((skill) => (
          <div
            key={skill.name}
            className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl glass-panel hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 cursor-default"
          >
            {/* Tooltip Info Box */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 p-4 rounded-xl glass-panel-high opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[5000] pointer-events-none translate-y-2 group-hover:translate-y-0">
              <div className="flex flex-col gap-2 text-[11px] text-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-[13px]">{skill.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] tracking-wider uppercase font-bold">
                    {skill.category}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-white/60">Proficiency</span>
                  <span className="font-semibold">{skill.level}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1.5">
                  <span className="text-white/60">Experience</span>
                  <span className="font-semibold">
                    {skill.projectExperience}{" "}
                    {skill.projectExperience === 1 ? "project" : "projects"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Last Used</span>
                  <span className="font-semibold">{skill.lastUsedYear}</span>
                </div>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-[calc(100%-8px)] left-1/2 -translate-x-1/2 w-4 h-4 bg-white/[0.03] border-r border-b border-white/10 rotate-45 backdrop-blur-xl -z-10"></div>
            </div>

            <div className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] relative z-10">
              {skill.icon && (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110 aspect-square"
                />
              )}
            </div>
            <span className="text-[11px] text-center text-on-surface-variant group-hover:text-white transition-colors duration-300 architectural-tracking font-medium leading-tight mt-1 relative z-10">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
