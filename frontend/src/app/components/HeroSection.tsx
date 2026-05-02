import HeroTextGroup from "./HeroTextGroup";
import MagneticButton from "./MagneticButton";

interface HeroSectionProps {
  user: any;
  projectCount: number;
  skillCount: number;
}

export default function HeroSection({
  user,
  projectCount,
  skillCount,
}: HeroSectionProps) {
  return (
    <section className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center pt-section-gap">
      {/* Vertical Social Links Sidebar */}
      <div className="hidden md:flex flex-col items-center gap-6 shrink-0 mt-12 animate-fade-in">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-white/20"></div>

        {user?.github && (
          <a
            href={user.github}
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

        {user?.linkedin && (
          <a
            href={user.linkedin}
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

        {user?.x && (
          <a
            href={user.x}
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
            name={user?.name || "Developer"}
            bio={user?.bio || "Loading profile..."}
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
                src={
                  user?.image ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m"
                }
              />

              {/* Bottom fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

              {/* Side fade (right) */}
              <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent" />

              {/* Side fade (left) */}
              <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
            </div>

            {/* Projects bubble */}
            <div className="absolute -top-4 -right-2 md:-right-8 glass-panel px-4 py-3 rounded-xl text-white text-sm shadow-lg backdrop-blur-md transition-transform hover:scale-105">
              <p className="font-bold text-lg">{projectCount}+</p>
              <p className="text-xs text-on-surface-variant">Projects Built</p>
            </div>

            {/* Technologies bubble */}
            <div className="absolute top-1/2 -left-4 md:-left-8 -translate-y-1/2 glass-panel px-4 py-3 rounded-xl text-white text-sm shadow-lg backdrop-blur-md transition-transform hover:scale-105 z-10">
              <p className="font-bold text-lg">{skillCount}+</p>
              <p className="text-xs text-on-surface-variant">Technologies</p>
            </div>

            {/* Learning Years bubble */}
            <div className="absolute bottom-8 -right-2 md:-right-8 glass-panel px-4 py-3 rounded-xl text-white text-sm shadow-lg backdrop-blur-md transition-transform hover:scale-105">
              <p className="font-bold text-lg">
                {new Date().getFullYear() - 2025}+
              </p>
              <p className="text-xs text-on-surface-variant">Years Learning</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
