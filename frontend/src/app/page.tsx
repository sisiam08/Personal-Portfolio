import { EducationService } from "../service/education.service";
import { ProjectService } from "../service/project.service";
import { SkillService } from "../service/skill.service";
import { UserService } from "../service/user.service";
import HeroTextGroup from "./components/HeroTextGroup";
import MagneticButton from "./components/MagneticButton";
import Navbar from "./components/Navbar";
import ProjectShowcase from "./components/ProjectShowcase";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default async function Page() {
  const userRes = await UserService.getUserProfile();
  const skillRes = await SkillService.getSkills();
  const projectRes = await ProjectService.getProjects();
  const educationRes = await EducationService.getEducations();

  const user = userRes.data;
  const skills = skillRes.data;
  const projects = projectRes.data;
  const educations = educationRes.data;


  return (
    <>
      <Navbar />
      <main className="relative pt-15 px-margin-page max-w-container-max mx-auto">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-full h-screen overflow-hidden pointer-events-none">
          <div className="absolute top-10 -right-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-20 right-40 w-64 h-64 glass-panel rounded-3xl rotate-12 opacity-40"></div>
          <div className="absolute top-60 right-10 w-48 h-48 glass-panel rounded-full -rotate-12 opacity-30"></div>
          <div className="absolute top-80 right-60 w-32 h-32 glass-panel rounded-lg rotate-45 opacity-50"></div>
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-secondary-container/10 blur-[120px] rounded-full"></div>
        </div>
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center pt-section-gap">
          {/* Vertical Social Links Sidebar */}
          <div className="hidden md:flex flex-col items-center gap-6 shrink-0 mt-12 animate-fade-in">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/20"></div>

            {user?.data?.github && (
              <a
                href={user.data.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20"
                title="GitHub"
              >
                <svg
                  className="w-[18px] h-[18px] fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}

            {user?.data?.linkedin && (
              <a
                href={user.data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-secondary hover:border-secondary/50 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20"
                title="LinkedIn"
              >
                <svg
                  className="w-[16px] h-[16px] fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}

            {user?.data?.x && (
              <a
                href={user.data.x}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white/50 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/20"
                title="X"
              >
                <svg
                  className="w-[15px] h-[15px] fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}

            <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>

          {/* Main Hero Grid */}
          <div className="grid md:grid-cols-12 gap-gutter items-center w-full flex-1">
            <div className="md:col-span-7 space-y-stack-lg">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-panel text-secondary font-label-caps architectural-tracking">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Available for high-stakes projects
              </div>

              <HeroTextGroup
                name={user?.data?.name || "Developer"}
                bio={user?.data?.bio || "Loading profile..."}
              />

              <MagneticButton className="glass-panel text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 architectural-tracking inline-block">
                Resume
              </MagneticButton>
            </div>
            <div className="md:col-span-5 relative overflow-visible flex justify-center md:justify-end mt-12 md:mt-0">
              {/* Inner wrapper shrinks the whole photo section to ~2/3 size */}
              <div className="relative w-full max-w-[340px]">
                <div className="relative group rounded-[3rem] overflow-hidden">
                  <img
                    alt="Senior Developer Portrait"
                    className="w-full h-[400px] object-cover rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m"
                  />

                  {/* Bottom fade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  {/* Side fade (right) */}
                  <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent" />

                  {/* Side fade (left) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
                </div>

                {/* Projects */}
                <div className="absolute -top-4 -right-2 md:-right-8 glass-panel px-4 py-3 rounded-xl text-white text-sm shadow-lg backdrop-blur-md transition-transform hover:scale-105">
                  <p className="font-bold text-lg">
                    {projects?.data?.data?.length ||
                      projects?.data?.length ||
                      0}
                    +
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Projects Built
                  </p>
                </div>

                {/* Technologies */}
                <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 glass-panel px-4 py-3 rounded-xl text-white text-sm shadow-lg backdrop-blur-md transition-transform hover:scale-105 z-10">
                  <p className="font-bold text-lg">
                    {skills?.data?.length || 0}+
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Technologies
                  </p>
                </div>

                {/* Learning Years */}
                <div className="absolute bottom-8 -right-2 md:-right-8 glass-panel px-4 py-3 rounded-xl text-white text-sm shadow-lg backdrop-blur-md transition-transform hover:scale-105">
                  <p className="font-bold text-lg">
                    {new Date().getFullYear() - 2024}+
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Years Learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Curated Works
            </p>
            <h2 className="font-h1 text-xl text-white">Project Showcase</h2>
          </div>

          <ProjectShowcase projects={projects} />
        </section>

        {/* About Section */}
        <section id="about" className="pt-section-gap relative">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Identity
            </p>
            <h2 className="font-h1 text-xl text-white">About me</h2>
          </div>

          {/* Background Glow */}
          <div className="absolute -left-20 top-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

          {/* Animated border wrapper */}
          <div className="relative p-[1.5px] rounded-[3rem] overflow-hidden max-w-5xl mx-auto">
            {/* Rotating light beam — always on */}
            <div className="about-border-beam" />

            {/* Inner card */}
            <div className="glass-panel-high rounded-[calc(3rem_-_1.5px)] p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-12 items-stretch bg-[#0b1326] border-none">
              {/* Desktop Identity */}
              <div className="md:w-2/5 mt-12 items-center gap-4 hidden md:flex mb-2">
                <div className="w-16 h-16 rounded-full glass-panel p-1 shrink-0 relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur group-hover:bg-primary/40 transition-all duration-500" />
                  <img
                    alt={user?.data?.name || "Siam"}
                    className="w-full h-full object-cover rounded-full relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                    src={
                      user?.data?.image ||
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m"
                    }
                  />
                </div>
                <div>
                  <p className="text-white font-bold tracking-wide">
                    {user?.data?.name || "Md. Shahariar Islam Siam"}
                  </p>
                  <p className="text-primary text-xs tracking-widest font-mono uppercase mt-1">
                    {user?.data?.designation}
                    <span className="text-[10px] text-gray-400">
                      <br />
                      Builder • Learner • Thinker
                    </span>
                  </p>
                </div>
              </div>

              {/* Structural Divider */}
              <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
              <div className="md:hidden h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2"></div>

              {/* Right: Content */}
              <div className="md:w-3/5 flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
                  <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                    {user?.data?.about}
                  </p>
                </div>

                {/* Mobile Identity */}
                <div className="flex md:hidden items-center gap-4 pt-4">
                  <div className="w-14 h-14 rounded-full glass-panel p-1 shrink-0 relative">
                    <img
                      alt={user?.data?.name || "Siam"}
                      className="w-full h-full object-cover rounded-full relative z-10"
                      src={
                        user?.data?.image ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m"
                      }
                    />
                  </div>
                  <div>
                    <p className="text-white font-bold tracking-wide text-sm">
                      {user?.data?.name || "Md. Shahariar Islam Siam"}
                    </p>
                    <p className="text-primary text-[10px] tracking-widest font-mono uppercase mt-1">
                      {user?.data?.designation}
                      <span className="text-[10px] text-gray-400">
                        <br />
                        Builder • Learner • Thinker
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="pt-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Capabilities
            </p>
            <h2 className="font-h1 text-xl text-white">Tech Stack</h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
            {skills?.data?.map((skill: any) => (
              <div
                key={skill.name}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl glass-panel hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                {/* TOOLTIP INFO BOX */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-52 p-4 rounded-xl glass-panel-high opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-5000 pointer-events-none translate-y-2 group-hover:translate-y-0">
                  <div className="flex flex-col gap-2 text-[11px] text-white">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[13px]">
                        {skill.name}
                      </span>
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
                      <span className="font-semibold">
                        {skill.lastUsedYear}
                      </span>
                    </div>
                  </div>
                  {/* Tooltip Arrow Layering Fix (Place behind/bottom of tooltip inner items) */}
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

        {/* Education Section */}
        <section id="education" className="pt-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Evolution
            </p>
            <h2 className="font-h1 text-xl text-white">Learning & Growth</h2>
          </div>

          <div className="max-w-4xl mx-auto relative px-gutter">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-connector -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-12">
              {educations?.data?.map((edu: any, index: number) => {
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
                        <p className="text-primary text-sm mt-1">
                          {edu.institute}
                        </p>

                        {/* Description */}
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

        {/* Contact Section */}
        <ContactSection user={user.data} />
      </main>
      <Footer user={user?.data} />
    </>
  );
}
