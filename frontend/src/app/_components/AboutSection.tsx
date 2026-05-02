interface AboutSectionProps {
  user: any;
}

export default function AboutSection({ user }: AboutSectionProps) {
  const fallbackImage =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m";

  return (
    <section id="about" className="pt-section-gap relative">
      <div className="text-center mb-stack-lg">
        <p className="text-primary font-label-caps architectural-tracking mb-2">
          Identity
        </p>
        <h2 className="font-h1 text-xl text-on-surface">About me</h2>
      </div>

      {/* Background Glow */}
      <div className="absolute -left-20 top-20 w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Animated border wrapper */}
      <div className="relative p-[1.5px] rounded-[3rem] overflow-hidden max-w-5xl mx-auto">
        {/* Rotating light beam — always on */}
        <div className="about-border-beam" />

        {/* Inner card */}
        <div className="glass-panel-high rounded-[calc(3rem_-_1.5px)] p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-12 items-stretch bg-surface border-none">
          {/* Desktop Identity */}
          <div className="md:w-2/5 mt-12 items-center gap-4 hidden md:flex mb-2">
            <div className="w-16 h-16 rounded-full glass-panel p-1 shrink-0 relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur group-hover:bg-primary/40 transition-all duration-500" />
              <img
                alt={user?.name || "Siam"}
                className="w-full h-full object-cover rounded-full relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
                src={user?.image || fallbackImage}
              />
            </div>
            <div>
              <p className="text-on-surface font-bold tracking-wide">
                {user?.name || "Md. Shahariar Islam Siam"}
              </p>
              <p className="text-primary text-xs tracking-widest font-mono uppercase mt-1">
                {user?.designation}
                <span className="text-[10px] text-on-surface-variant">
                  <br />
                  Builder • Learner • Thinker
                </span>
              </p>
            </div>
          </div>

          {/* Structural Divider */}
          <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-outline-variant/40 to-transparent"></div>
          <div className="md:hidden h-[1px] w-full bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent my-2"></div>

          {/* Right: Content */}
          <div className="md:w-3/5 flex flex-col justify-center space-y-6 md:space-y-8">
            <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500"></div>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                {user?.about}
              </p>
            </div>

            {/* Mobile Identity */}
            <div className="flex md:hidden items-center gap-4 pt-4">
              <div className="w-14 h-14 rounded-full glass-panel p-1 shrink-0 relative">
                <img
                  alt={user?.name || "Siam"}
                  className="w-full h-full object-cover rounded-full relative z-10"
                  src={user?.image || fallbackImage}
                />
              </div>
              <div>
                <p className="text-on-surface font-bold tracking-wide text-sm">
                  {user?.name || "Md. Shahariar Islam Siam"}
                </p>
                <p className="text-primary text-[10px] tracking-widest font-mono uppercase mt-1">
                  {user?.designation}
                  <span className="text-[10px] text-on-surface-variant">
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
  );
}
