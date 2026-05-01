import { EducationService } from "../service/education.service";
import { ProjectService } from "../service/project.service";
import { SkillService } from "../service/skill.service";
import { UserService } from "../service/user.service";
import HeroTextGroup from "./components/HeroTextGroup";
import MagneticButton from "./components/MagneticButton";
import Navbar from "./components/Navbar";
import ProjectShowcase from "./components/ProjectShowcase";

export default async function Page() {
  const userRes = await UserService.getUserProfile();
  const skillRes = await SkillService.getSkills();
  const projectRes = await ProjectService.getProjects();
  const educationRes = await EducationService.getEducations();

  const user = userRes.data;
  const skills = skillRes.data;
  const projects = projectRes.data;
  const educations = educationRes.data;

  // console.log(projects);

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
        <section className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center pt-20 pb-10 mb-section-gap">
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
        {/* Projects */}
        <section className="mb-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Curated Works
            </p>
            <h2 className="font-h1 text-xl text-white">Project Showcase</h2>
          </div>

          <ProjectShowcase projects={projects} />
        </section>
        {/* About Section */}
        <section className="mb-section-gap relative">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Identity
            </p>
            <h2 className="font-h1 text-xl text-white">About the Builder</h2>
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
            {/* Left: Dramatic Intro & Photo */}
            <div className="md:w-2/5 flex flex-col justify-between relative">
              <div>
                <span className="material-symbols-outlined text-primary text-5xl opacity-40 mb-6 drop-shadow-[0_0_15px_rgba(192,193,255,0.3)] animate-pulse-slow">
                  auto_awesome
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-4 architectural-tracking">
                  I’m Siam — <br className="hidden md:block" />
                  <span className="text-primary italic font-serif">
                    guided by faith
                  </span>
                  ,<br className="hidden md:block" />
                  driven by curiosity.
                </h3>
                <p className="text-on-surface-variant text-sm architectural-tracking uppercase tracking-widest mt-6">
                  Committed to Growth
                </p>
              </div>

              {/* Desktop Identity Footer */}
              <div className="mt-12 items-center gap-4 hidden md:flex mb-2">
                <div className="w-16 h-16 rounded-full glass-panel p-1 shrink-0 relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur group-hover:bg-primary/40 transition-all duration-500" />
                  <img
                    alt="Siam"
                    className="w-full h-full object-cover rounded-full relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m"
                  />
                </div>
                <div>
                  <p className="text-white font-bold tracking-wide">
                    {user?.data?.name || "Md. Shahariar Islam Siam"}
                  </p>
                  <p className="text-primary text-xs tracking-widest font-mono uppercase mt-1">
                    Builder • Thinker
                  </p>
                </div>
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
                  I enjoy exploring ideas, breaking down complex problems, and
                  building meaningful solutions with clarity and purpose. I
                  believe in consistent learning, strong fundamentals, and
                  continuous self-improvement.
                </p>
              </div>

              <div className="glass-panel bg-primary/5 border-primary/10 p-6 md:p-8 rounded-2xl relative overflow-visible group">
                <span className="material-symbols-outlined absolute -top-4 -left-3 md:-left-4 text-4xl text-primary opacity-80 drop-shadow-md bg-background rounded-full p-1 group-hover:rotate-12 transition-transform duration-500">
                  format_quote
                </span>
                <p className="text-white font-medium text-lg md:text-xl italic leading-relaxed pt-2">
                  “For me, it’s not just about creating things — it’s about
                  creating things that matter.”
                </p>
              </div>

              {/* Mobile Identity Footer Fallback */}
              <div className="flex md:hidden items-center gap-4 pt-4">
                <div className="w-14 h-14 rounded-full glass-panel p-1 shrink-0 relative">
                  <img
                    alt="Siam"
                    className="w-full h-full object-cover rounded-full relative z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m"
                  />
                </div>
                <div>
                  <p className="text-white font-bold tracking-wide text-sm">
                    {user?.data?.name || "Md. Shahariar Islam Siam"}
                  </p>
                  <p className="text-primary text-[10px] tracking-widest font-mono uppercase mt-1">
                    Builder • Learner • Thinker
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
        {/* Career Milestone Section */}
        <section className="mb-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Evolution
            </p>
            <h2 className="font-h1 text-xl text-white">Career Milestone</h2>
          </div>
          <div className="max-w-4xl mx-auto relative px-gutter">
            {/* Timeline Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-connector -translate-x-1/2 hidden md:block"></div>
            <div className="space-y-12">
              {/* Milestone 1 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="glass-panel-high p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl">
                    <span className="text-primary font-label-caps text-[10px] architectural-tracking">
                      2021 — PRESENT
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">
                      Principal Architect
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">
                      Leading the architectural vision for multi-region cloud
                      infrastructures serving millions of users at Stellar
                      Dynamic.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(192,193,255,0.8)] z-10"></div>
                <div className="md:w-[45%]"></div>
              </div>
              {/* Milestone 2 */}
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="glass-panel-high p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl">
                    <span className="text-secondary font-label-caps text-[10px] architectural-tracking">
                      2018 — 2021
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">
                      Senior Full Stack Lead
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">
                      Pioneered the transition to serverless microservices,
                      reducing operational costs by 40% for the Veridian fintech
                      platform.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(68,226,205,0.8)] z-10"></div>
                <div className="md:w-[45%]"></div>
              </div>
              {/* Milestone 3 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="glass-panel-high p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl">
                    <span className="text-primary-container font-label-caps text-[10px] architectural-tracking">
                      2015 — 2018
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">
                      Open Source Contributor
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">
                      Recognized Top Contributor for major React-based
                      frameworks and WebGL visualization libraries.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-4 h-4 rounded-full bg-primary-container shadow-[0_0_15px_rgba(128,131,255,0.8)] z-10"></div>
                <div className="md:w-[45%]"></div>
              </div>
            </div>
          </div>
        </section>
        {/* Skill Clouds */}
        <section className="mb-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Capabilities
            </p>
            <h2 className="font-h2 text-h2 text-white">Full Stack Mastery</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="data_object"
              >
                data_object
              </span>{" "}
              TypeScript
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="layers"
              >
                layers
              </span>{" "}
              React &amp; Next.js
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="terminal"
              >
                terminal
              </span>{" "}
              Node.js
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="database"
              >
                database
              </span>{" "}
              PostgreSQL
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="architecture"
              >
                architecture
              </span>{" "}
              AWS Cloud
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="code"
              >
                code
              </span>{" "}
              GraphQL
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="monitoring"
              >
                monitoring
              </span>{" "}
              Prometheus
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span
                className="material-symbols-outlined text-sm"
                data-icon="palette"
              >
                palette
              </span>{" "}
              Tailwind CSS
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 text-center">
          <h2 className="font-h1 text-h2 md:text-h1 text-white mb-8">
            Ready to Build <br />
            the Future?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 architectural-tracking">
            I'm currently accepting new high-impact collaborations. Let's
            discuss how we can elevate your platform's technical architecture.
          </p>
          <div className="flex justify-center gap-6">
            <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-extrabold text-lg architectural-tracking shadow-[0_0_30px_rgba(192,193,255,0.4)] hover:scale-105 transition-transform duration-300">
              Book a Consultation
            </button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-12 mt-20 border-t border-white/5 bg-transparent max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 font-inter text-sm text-slate-500">
        <div className="text-lg font-semibold text-slate-300 architectural-tracking">
          DevPortfolio
        </div>
        <div className="flex gap-8">
          <a
            className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100"
            href="#"
          >
            GitHub
          </a>
          <a
            className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100"
            href="#"
          >
            LinkedIn
          </a>
          <a
            className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100"
            href="#"
          >
            Twitter
          </a>
          <a
            className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100"
            href="#"
          >
            Email
          </a>
        </div>
        <div className="text-center md:text-right architectural-tracking">
          © 2024 Full Stack Developer. Built with Next.js &amp; Lumina Glass.
        </div>
      </footer>
    </>
  );
}
