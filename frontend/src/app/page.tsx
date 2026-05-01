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
        <section className="mb-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">
              Capabilities
            </p>
            <h2 className="font-h1 text-xl text-white">Tech Stack</h2>
          </div>

          {(() => {
            const skills = [
              {
                name: "HTML",
                color: "#E34F26",
                svg: "M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z",
              },
              {
                name: "CSS",
                color: "#1572B6",
                svg: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z",
              },
              {
                name: "Tailwind",
                color: "#06B6D4",
                svg: "M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z",
              },
              {
                name: "React.js",
                color: "#61DAFB",
                svg: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.29zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
              },
              {
                name: "Next.js",
                color: "#ffffff",
                svg: "M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474.0019.9828.0361 1.2661.2536 2.0603.5895 2.2464 2.0228 4.2027 3.9666 5.4663.5387.3465.6573.4049 1.2032.5636.5916.1676 1.0044.2222 1.6386.2222.5437 0 1.1284-.0614 1.6386-.1743l.2296-.0528-.0526-.0435c-.0293-.024-.4047-.3361-.8354-.6937l-.7833-.6501-.2094.019c-.2987.0272-.9016.0346-1.2117.0149-.7028-.044-1.3427-.2074-1.9762-.5205-.9168-.4557-1.6996-1.1626-2.2526-2.0195-.3652-.5641-.6321-1.2069-.7714-1.8918-.0787-.3847-.1011-.5638-.1011-.9765 0-.4126.0224-.5917.1011-.9765.1393-.6849.4062-1.3277.7714-1.8918.553-.8569 1.3358-1.5638 2.2526-2.0195.6335-.3131 1.2734-.4765 1.9762-.5205.3101-.0197.9162-.0123 1.2117.0149l.2094.019.7833-.6501c.4307-.3576.8061-.6697.8354-.6937l.0526-.0435-.2296-.0528C16.9284.0614 16.3437 0 15.8 0c-.6342 0-1.047.0546-1.6386.2222-.5459.1587-.6645.2171-1.2032.5636-1.9438 1.2636-3.3771 3.2199-3.9666 5.4663-.2175.7942-.2517 1.0775-.2536 2.0603 0 .8937.0118 1.0884.108 1.7474.2720 1.8884.9922 3.671 2.0803 5.1836 2.0223 2.8265 5.2152 4.6655 8.624 4.9728.1477.0118.312.0275.3636.0328.0486.0054.1821.0067.3584.0067.1762 0 .3097-.0013.3583-.0067.0516-.0053.2159-.021.3636-.0328 3.4088-.3073 6.6017-2.1463 8.624-4.9728 1.0881-1.5126 1.8083-3.2952 2.0803-5.1836.0962-.659.108-.8537.108-1.7474-.0019-.9828-.0361-1.2661-.2536-2.0603-.5895-2.2464-2.0228-4.2027-3.9666-5.4663C19.1259.4271 19.0073.3687 18.4634.2 17.872.0324 17.4592-.0222 16.8252-.0222h-.0013c-.1763 0-.3098.0013-.3584.0067z",
              },
              {
                name: "Node.js",
                color: "#339933",
                svg: "M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L1.897,18.618c-0.57-0.329-0.922-0.945-0.922-1.605V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082 c0.570,0.329,0.924,0.944,0.924,1.603v10.092c0,0.659-0.354,1.273-0.924,1.605l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z",
              },
              {
                name: "Express.js",
                color: "#ffffff",
                svg: "M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z",
              },
              {
                name: "Prisma",
                color: "#2D3748",
                svg: "M21.807 18.285 13.553.756a1.324 1.324 0 0 0-1.129-.754 1.31 1.31 0 0 0-1.186.63L2.191 15.047a1.31 1.31 0 0 0 .069 1.496l4.818 6.302a1.318 1.318 0 0 0 1.265.49l12.863-2.084a1.31 1.31 0 0 0 .602-2.966zM8.48 20.26l-3.875-5.073 6.872-11.787 4.134 10.08z",
              },
              {
                name: "PostgreSQL",
                color: "#4169E1",
                svg: "M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879.286 1.282.682 2.75 1.164 4.046.482 1.295 1.056 2.405 1.765 3.032.709.626 1.348.743 1.925.604a1.96 1.96 0 0 0 .866-.586 1.342 1.342 0 0 0 .659.16h.004c.486 0 .948-.19 1.378-.464l-.003.004a2.088 2.088 0 0 0 .82 1.543c.24.18.502.295.764.33C8.88 18.898 8.602 19.6 8.166 20c-.57.52-1.174.537-1.536.45-.362-.086-.535-.241-.655-.385-.12-.143-.187-.271-.253-.342-.066-.07-.135-.102-.217-.065l-.66.262c-.1.04-.175.129-.133.277.044.15.178.61.546 1.034.369.424.92.79 1.632.951.715.162 1.648.108 2.593-.513a6.783 6.783 0 0 0 1.717-1.977 5.15 5.15 0 0 0 .453-.92c.154.038.313.063.476.063h.003a2.698 2.698 0 0 0 1.595-.52l.004-.001c.5.5 1.059.792 1.709.736h.003c.649-.048 1.263-.44 1.828-1.256.567-.814 1.007-1.921 1.361-3.07.352-1.148.613-2.322.864-3.268a15.373 15.373 0 0 0 .136-.64l.003.002c.138.031.286.051.44.051.606 0 1.226-.265 1.72-.77.494-.505.83-1.21.97-2.04.141-.83.088-1.81-.2-2.845-.286-1.035-.77-1.956-1.397-2.617-.628-.66-1.346-1-2.047-.98z",
              },
              {
                name: "MongoDB",
                color: "#47A248",
                svg: "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z",
              },
              {
                name: "JavaScript",
                color: "#F7DF1E",
                svg: "M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51.016-.734.148-.311.517-.457.884-.43.36.016.699.196.91.49.293.474.807.609 1.318.39.453-.19.574-.683.322-1.07-.61-.94-1.934-1.386-3.117-1.24-.56.051-1.056.286-1.438.713-.45.503-.577 1.081-.386 1.754.26.87 1.042 1.386 2.134 1.744.987.327 1.19.397 1.38.617.22.27.297.657.197 1.005-.19.63-.882.818-1.677.707-.5-.07-.924-.374-1.208-.873-.38-.674-.963-.723-1.39-.39-.354.268-.4.737-.152 1.123.386.6.993 1.014 1.76 1.234.76.22 1.665.229 2.518-.063.962-.327 1.687-1.06 1.871-1.977zm-6.975 4.028c-.14-.59-.606-.99-1.35-1.163-.476-.11-.979-.19-1.508-.306-.538-.118-1.028-.336-1.295-.739-.262-.397-.357-.879-.252-1.358.183-.84.76-1.293 1.504-1.32.528-.017.982.196 1.243.564.206.286.52.404.866.337.34-.065.573-.3.59-.654.03-.64-.386-1.263-1.006-1.566-.818-.402-1.794-.44-2.673-.104-1.004.381-1.6 1.143-1.704 2.075-.083.74.105 1.46.497 2.007.395.554.963.917 1.708 1.07.53.107 1.04.192 1.605.318.413.092.69.326.692.72.003.28-.12.527-.335.67-.225.15-.53.205-.88.177-.428-.033-.812-.222-1.027-.64-.288-.572-.89-.684-1.35-.374-.375.25-.455.7-.238 1.11.345.668 1.003 1.085 1.875 1.2.803.104 1.67.024 2.37-.427.714-.461 1.15-1.22 1.147-2.022z",
              },
              {
                name: "TypeScript",
                color: "#3178C6",
                svg: "M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z",
              },
              {
                name: "Python",
                color: "#3776AB",
                svg: "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z",
              },
              {
                name: "C",
                color: "#A8B9CC",
                svg: "M16.5 15.5A7.5 7.5 0 1 1 12 4.972V4.95a7.5 7.5 0 0 0 0 14.1v-.022A7.5 7.5 0 0 1 16.5 15.5zM12 2.25A9.75 9.75 0 1 0 19.773 17.5 9.75 9.75 0 0 0 12 2.25z",
              },
              {
                name: "C++",
                color: "#00599C",
                svg: "M22.393 6c-.167-.29-.38-.543-.593-.71L16.1.29c-.214-.167-.48-.29-.747-.29H7.47c-.267 0-.533.123-.747.29L.64 5.43c-.214.167-.427.42-.54.71L.002 6.923c-.107.29-.107.58-.107.87v9.37c0 .29.107.58.214.87.107.29.32.543.534.71l5.7 4.74c.214.167.48.29.747.29h9.19c.267 0 .533-.123.747-.29l5.7-4.74c.214-.167.427-.42.534-.71.107-.29.214-.58.214-.87v-9.37c0-.29 0-.58-.107-.87L22.393 6zM12 16.097c-2.28 0-4.13-1.85-4.13-4.13 0-2.28 1.85-4.13 4.13-4.13 1.143 0 2.177.464 2.928 1.215l-1.465 1.465C13.09 10.16 12.577 9.9 12 9.9c-1.215 0-2.2.985-2.2 2.2 0 1.215.985 2.2 2.2 2.2.577 0 1.09-.26 1.463-.634l1.465 1.465C14.177 15.633 13.143 16.097 12 16.097zM16.97 12.97h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm3 0h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1z",
              },
            ];

            return (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4 max-w-5xl mx-auto">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex flex-col items-center gap-3 p-4 rounded-2xl glass-panel hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 cursor-default"
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 0 8px ${skill.color}40)`,
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-8 h-8 transition-all duration-300 group-hover:scale-110"
                        style={{ fill: skill.color }}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d={skill.svg} />
                      </svg>
                    </div>
                    <span className="text-[11px] text-center text-on-surface-variant group-hover:text-white transition-colors duration-300 architectural-tracking font-medium leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}
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
