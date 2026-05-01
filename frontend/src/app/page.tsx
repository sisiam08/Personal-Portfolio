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
        <section className="grid md:grid-cols-12 gap-gutter items-center min-h-[716px] mb-section-gap">
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
                  {projects?.data?.data?.length || projects?.data?.length || 0}+
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
                <p className="text-xs text-on-surface-variant">Technologies</p>
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
        </section>
        {/* Projects */}
        <section className="mb-section-gap">
          {/* Header */}
          <div className="flex justify-between items-end mb-stack-lg">
            <div>
              <p className="text-primary font-label-caps architectural-tracking mb-2">
                Curated Works
              </p>
              <h2 className="font-h2 text-h2 text-white">Project Showcase</h2>
            </div>
          </div>

          <ProjectShowcase projects={projects} />
        </section>
        {/* Career Milestone Section */}
        <section className="mb-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Evolution
            </p>
            <h2 className="font-h2 text-h2 text-white">Career Milestone</h2>
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
        {/* Testimonial Slider Mock */}
        <section className="mb-section-gap relative">
          <div className="absolute -left-20 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="glass-panel-high rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto relative">
            <span
              className="material-symbols-outlined text-primary text-6xl opacity-20 mb-8"
              data-icon="format_quote"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
            <p className="font-h3 text-h3 text-white leading-relaxed mb-10 architectural-tracking">
              "The architectural precision Alex brings to every project is
              unparalleled. He doesn't just build features; he engineers
              scalable ecosystems that are as beautiful as they are robust."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full glass-panel p-1">
                <img
                  alt="Client CEO"
                  className="w-full h-full object-cover rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEihNRptbcmJgMRNDC8qiHpjXLBQ52szPCHFA5cHfWJUHP0r9DThbDFk0bvEaWJccdHvjN4br_HYE3oo6460ovtZSjh6FyzqMAypOhbhw3jt9iuCm5ZgWu1wZoqmNlCZQJXYBMLRlkPak7w2cCVEhaftdg0h5GPIVUrUm5P5ca7ipI_filOsuEOcJLGwUEA5UmIF1R4SS6QXLh-PX_RNKOX7u1OZRBbXLzdtZp35HIsCv_kP27h5kXqmImHVxSTPfUK5UC-qf7p0Nj"
                />
              </div>
              <div className="text-left">
                <p className="text-white font-bold architectural-tracking">
                  James Sterling
                </p>
                <p className="text-on-surface-variant text-sm architectural-tracking">
                  CTO, Veridian Systems
                </p>
              </div>
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
