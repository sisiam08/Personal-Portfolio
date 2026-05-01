const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 rounded-full mt-4 max-w-[1200px] mx-auto border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] font-inter tracking-tight">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tighter text-white">
        DevPortfolio
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href, active }) =>
          active ? (
            <a
              key={label}
              href={href}
              className="text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-1 architectural-tracking"
            >
              {label}
            </a>
          ) : (
            <a
              key={label}
              href={href}
              className="text-slate-400 hover:text-white transition-colors duration-300 architectural-tracking hover:scale-105 hover:bg-white/5"
            >
              {label}
            </a>
          )
        )}
      </div>
    </nav>
  );
}
