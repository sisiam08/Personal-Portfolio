export default function Page() {
  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 rounded-full mt-4 max-w-[1200px] mx-auto border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] font-inter tracking-tight">
        <div className="text-xl font-bold tracking-tighter text-white">DevPortfolio</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-1 architectural-tracking" href="#">Home</a>
          <a className="text-slate-400 hover:text-white transition-colors architectural-tracking hover:scale-105 hover:bg-white/5 duration-300" href="#">About</a>
          <a className="text-slate-400 hover:text-white transition-colors architectural-tracking hover:scale-105 hover:bg-white/5 duration-300" href="#">Skills</a>
          <a className="text-slate-400 hover:text-white transition-colors architectural-tracking hover:scale-105 hover:bg-white/5 duration-300" href="#">Experience</a>
          <a className="text-slate-400 hover:text-white transition-colors architectural-tracking hover:scale-105 hover:bg-white/5 duration-300" href="#">Projects</a>
          <a className="text-slate-400 hover:text-white transition-colors architectural-tracking hover:scale-105 hover:bg-white/5 duration-300" href="#">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-white cursor-pointer hover:scale-110 transition-transform" data-icon="terminal">terminal</span>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-semibold shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:brightness-110 transition-all active:scale-95 duration-200 architectural-tracking">Resume</button>
        </div>
      </nav>
      <main className="relative pt-32 px-margin-page max-w-container-max mx-auto">
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
            <h1 className="font-h1 text-h1 text-white leading-none">
              Architecting <br />
              <span className="text-primary-container">Digital Precision.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl architectural-tracking">
              Senior Full Stack Engineer specializing in high-performance cloud architectures and ethereal glassmorphic interfaces for the next generation of web applications.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-[0_0_20px_rgba(192,193,255,0.3)] hover:scale-105 transition-transform duration-300 architectural-tracking">Start a Project</button>
              <button className="glass-panel text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300 architectural-tracking">View Case Studies</button>
            </div>
          </div>
          <div className="md:col-span-5 relative">
            <div className="glass-panel-high rounded-[3rem] p-4 overflow-hidden relative group">
              <img alt="Senior Developer Portrait" className="w-full h-[500px] object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-700" data-alt="A professional portrait of a confident male developer with a short beard and stylish glasses, posed against a dark, technologically focused environment. The lighting is dramatic and cinematic, with soft indigo and cyan highlights reflecting off his features. He is wearing a dark, textured minimalist sweater. The overall mood is sophisticated, technical, and visionary, perfectly aligning with a high-end glassmorphic UI aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt0YpYnbrDb3WhZQz1tGsX9xb7ikbL4LIENPmY7Y7xt0WiBw70Ld3IfgePrvlwpfRD2U1eimMPSOgzAKsxGKjKGGJMNhTipiiO_ItDmjBxO3ghexuqBppKXg34it4JHrHRiHYO0gPIqqFw9RpIKebLt4QPR9Iq_P-wrOwiqZuscURKgpVeAFEVowtkos1W7Ox6Ld6WnvqfjAFQSvP7yGQMlQivf389Cq7bSWUQX2dayIw6V9Ro0fA5MeK0YRClIWZeUpACajhDR86m" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-6 glass-panel-high rounded-2xl">
                <p className="text-white font-bold architectural-tracking">Alex Rivera</p>
                <p className="text-on-surface-variant text-sm architectural-tracking">12+ Years Excellence</p>
              </div>
            </div>
          </div>
        </section>
        {/* Bento Grid Projects */}
        <section className="mb-section-gap">
          <div className="flex justify-between items-end mb-stack-lg">
            <div>
              <p className="text-primary font-label-caps architectural-tracking mb-2">Curated Works</p>
              <h2 className="font-h2 text-h2 text-white">Project Showcase</h2>
            </div>
            <div className="hidden md:block">
              <span className="text-on-surface-variant architectural-tracking cursor-pointer hover:text-primary transition-colors">Browse all 24+ projects →</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter h-auto md:h-[800px]">
            {/* Featured Large */}
            <div className="md:col-span-2 md:row-span-2 glass-panel rounded-3xl p-8 group overflow-hidden relative flex flex-col justify-end hover:scale-[1.01] transition-transform duration-500">
              <img alt="Financial Dashboard Project" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBufZ-U_PF2fibKOvs0QdkcYP_7qZ8D_nSgUuokFFGMqTJBt4WZKriMZAUvAuTcp-BRBVzQLAMmtgO7xg1BSq0VsRXBKPi2DG7dRJM7dqHh332_rKn9IdhWEu1C91pNg6kZYrqjhz9cPNf-lRBgGMXlh0mB-b66yLX14-YvHf9XwkyF2svhU6CL9c_TFOXXKuaukPfuMtA_eJcAt87-cr4fdxVQA9wEGLZM_CMt5kLcdfNcQIjiFhuFmf6OpjGEHie0HUKVNv5Egf6w" />
              <div className="relative z-10 space-y-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full glass-panel text-[10px] text-white font-label-caps">NEXT.JS</span>
                  <span className="px-3 py-1 rounded-full glass-panel text-[10px] text-white font-label-caps">WEBGL</span>
                </div>
                <h3 className="font-h3 text-h3 text-white architectural-tracking">Lumina Analytics v2</h3>
                <p className="text-on-surface-variant architectural-tracking">Real-time market forecasting engine with 99.9% uptime and microsecond latency.</p>
                <button className="text-primary font-bold architectural-tracking flex items-center gap-2 group/btn">
                  Explore Project
                  <span className="material-symbols-outlined group-hover/btn:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
                </button>
              </div>
            </div>
            {/* Bento Medium Top */}
            <div className="md:col-span-2 glass-panel rounded-3xl p-8 group overflow-hidden relative flex items-center hover:scale-[1.01] transition-transform duration-500">
              <img alt="Cloud Infrastructure" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACSPtNBzj1wHSk0Xj4sC0KqWp-lXvqlNgo9EMaN09zbKb2TDdoAc1-kDd7kCAClCIUnsysFfnt4dfQs8Lf2OsOz2COFRrdOATAO0fpP67fl8B6qAqg9Jy8e_MTuXu6KoX62lbW5Y2x_-wmwYwBDOe9oexoKjdCH7QK49SBQ5WUOXnZR2043ef_42uKiQZTcZjC4gMnweDgProV4JyyXkFbxA87EUZVaE0YQLqDY3EGzCJobY2QRy4oSdwfRuu7vOKNtHWIX2QUtIWt" />
              <div className="relative z-10 w-2/3">
                <h3 className="font-h3 text-h3 text-white architectural-tracking">SkyNode Core</h3>
                <p className="text-on-surface-variant architectural-tracking mb-4">Distributed edge computing platform for global scale.</p>
                <span className="px-3 py-1 rounded-full glass-panel text-[10px] text-white font-label-caps">RUST</span>
              </div>
              <div className="relative z-10 w-1/3 flex justify-end">
                <span className="material-symbols-outlined text-6xl text-primary/30 group-hover:text-primary transition-colors" data-icon="cloud_done">cloud_done</span>
              </div>
            </div>
            {/* Bento Small 1 */}
            <div className="glass-panel rounded-3xl p-6 group flex flex-col justify-between hover:scale-[1.01] transition-transform duration-500">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary mb-4">
                <span className="material-symbols-outlined" data-icon="shield">shield</span>
              </div>
              <div>
                <h4 className="font-bold text-white architectural-tracking">AuthGuard SDK</h4>
                <p className="text-xs text-on-surface-variant architectural-tracking mt-1">Biometric-first security layer for mobile apps.</p>
              </div>
            </div>
            {/* Bento Small 2 */}
            <div className="glass-panel rounded-3xl p-6 group flex flex-col justify-between hover:scale-[1.01] transition-transform duration-500">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary-container mb-4">
                <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
              </div>
              <div>
                <h4 className="font-bold text-white architectural-tracking">GenAI Studio</h4>
                <p className="text-xs text-on-surface-variant architectural-tracking mt-1">Intuitive prompt engineering workspace.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Career Milestone Section */}
        <section className="mb-section-gap">
          <div className="text-center mb-stack-lg">
            <p className="text-primary font-label-caps architectural-tracking mb-2">Evolution</p>
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
                    <span className="text-primary font-label-caps text-[10px] architectural-tracking">2021 — PRESENT</span>
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">Principal Architect</h3>
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">Leading the architectural vision for multi-region cloud infrastructures serving millions of users at Stellar Dynamic.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(192,193,255,0.8)] z-10"></div>
                <div className="md:w-[45%]"></div>
              </div>
              {/* Milestone 2 */}
              <div className="relative flex flex-col md:flex-row-reverse items-center justify-between group">
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="glass-panel-high p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl">
                    <span className="text-secondary font-label-caps text-[10px] architectural-tracking">2018 — 2021</span>
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">Senior Full Stack Lead</h3>
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">Pioneered the transition to serverless microservices, reducing operational costs by 40% for the Veridian fintech platform.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-4 h-4 rounded-full bg-secondary shadow-[0_0_15px_rgba(68,226,205,0.8)] z-10"></div>
                <div className="md:w-[45%]"></div>
              </div>
              {/* Milestone 3 */}
              <div className="relative flex flex-col md:flex-row items-center justify-between group">
                <div className="md:w-[45%] mb-4 md:mb-0">
                  <div className="glass-panel-high p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 shadow-xl">
                    <span className="text-primary-container font-label-caps text-[10px] architectural-tracking">2015 — 2018</span>
                    <h3 className="text-white font-bold text-lg mt-1 architectural-tracking">Open Source Contributor</h3>
                    <p className="text-on-surface-variant text-sm mt-2 architectural-tracking">Recognized Top Contributor for major React-based frameworks and WebGL visualization libraries.</p>
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
            <p className="text-primary font-label-caps architectural-tracking mb-2">Capabilities</p>
            <h2 className="font-h2 text-h2 text-white">Full Stack Mastery</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="data_object">data_object</span> TypeScript
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="layers">layers</span> React &amp; Next.js
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="terminal">terminal</span> Node.js
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="database">database</span> PostgreSQL
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="architecture">architecture</span> AWS Cloud
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="code">code</span> GraphQL
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="monitoring">monitoring</span> Prometheus
            </div>
            <div className="px-6 py-3 rounded-full glass-panel hover:bg-primary-container/20 transition-all cursor-default architectural-tracking flex items-center gap-3">
              <span className="material-symbols-outlined text-sm" data-icon="palette">palette</span> Tailwind CSS
            </div>
          </div>
        </section>
        {/* Testimonial Slider Mock */}
        <section className="mb-section-gap relative">
          <div className="absolute -left-20 top-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="glass-panel-high rounded-[3rem] p-12 md:p-20 text-center max-w-5xl mx-auto relative">
            <span className="material-symbols-outlined text-primary text-6xl opacity-20 mb-8" data-icon="format_quote" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <p className="font-h3 text-h3 text-white leading-relaxed mb-10 architectural-tracking">
              "The architectural precision Alex brings to every project is unparalleled. He doesn't just build features; he engineers scalable ecosystems that are as beautiful as they are robust."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full glass-panel p-1">
                <img alt="Client CEO" className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEihNRptbcmJgMRNDC8qiHpjXLBQ52szPCHFA5cHfWJUHP0r9DThbDFk0bvEaWJccdHvjN4br_HYE3oo6460ovtZSjh6FyzqMAypOhbhw3jt9iuCm5ZgWu1wZoqmNlCZQJXYBMLRlkPak7w2cCVEhaftdg0h5GPIVUrUm5P5ca7ipI_filOsuEOcJLGwUEA5UmIF1R4SS6QXLh-PX_RNKOX7u1OZRBbXLzdtZp35HIsCv_kP27h5kXqmImHVxSTPfUK5UC-qf7p0Nj" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold architectural-tracking">James Sterling</p>
                <p className="text-on-surface-variant text-sm architectural-tracking">CTO, Veridian Systems</p>
              </div>
            </div>
          </div>
        </section>
        {/* Final CTA */}
        <section className="py-20 text-center">
          <h2 className="font-h1 text-h2 md:text-h1 text-white mb-8">Ready to Build <br />the Future?</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 architectural-tracking">
            I'm currently accepting new high-impact collaborations. Let's discuss how we can elevate your platform's technical architecture.
          </p>
          <div className="flex justify-center gap-6">
            <button className="bg-primary text-on-primary px-10 py-5 rounded-full font-extrabold text-lg architectural-tracking shadow-[0_0_30px_rgba(192,193,255,0.4)] hover:scale-105 transition-transform duration-300">Book a Consultation</button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-12 mt-20 border-t border-white/5 bg-transparent max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6 font-inter text-sm text-slate-500">
        <div className="text-lg font-semibold text-slate-300 architectural-tracking">DevPortfolio</div>
        <div className="flex gap-8">
          <a className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100" href="#">GitHub</a>
          <a className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100" href="#">LinkedIn</a>
          <a className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100" href="#">Twitter</a>
          <a className="text-slate-500 hover:text-indigo-400 transition-colors architectural-tracking opacity-80 hover:opacity-100" href="#">Email</a>
        </div>
        <div className="text-center md:text-right architectural-tracking">
          © 2024 Full Stack Developer. Built with Next.js &amp; Lumina Glass.
        </div>
      </footer>
    </>
  );
}