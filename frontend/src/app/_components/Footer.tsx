import Link from "next/link";
import { ArrowUpRight, LogIn } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon, XIcon } from "./BrandIcons";
import Image from "next/image";
import type { ProfileUser } from "./types";

const LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ user }: { user?: ProfileUser | null }) {
  const year = new Date().getFullYear();
  const socials = [
    { key: "github", href: user?.github, Icon: GithubIcon, label: "GitHub" },
    {
      key: "linkedin",
      href: user?.linkedin,
      Icon: LinkedinIcon,
      label: "LinkedIn",
    },
    { key: "x", href: user?.x, Icon: XIcon, label: "X" },
    {
      key: "whatsapp",
      href: user?.whatsapp ? `https://wa.me/${user.whatsapp}` : null,
      Icon: WhatsappIcon,
      label: "WhatsApp",
    },
  ].filter((s) => Boolean(s.href));

  return (
    <footer className="relative z-10 border-t border-line px-page pb-10 pt-section">
      <div className="mx-auto grid w-full max-w-(--container-page) grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#top" className="flex items-center gap-2">
            <Image
              src="/logo%20-%20black.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 dark:hidden"
            />
            <Image
              src="/logo%20-%20white.png"
              alt=""
              width={32}
              height={32}
              className="hidden h-8 w-8 dark:block"
            />
            <span className="font-display text-base font-semibold text-ink">
              Siam<span className="text-accent">.</span>
            </span>
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            I build products that solve real problems and scale with them — from
            first commit to production.
          </p>
          {socials.length > 0 ? (
            <div className="mt-1 flex items-center gap-3">
              {socials.map(({ key, href, Icon, label }) => (
                <a
                  key={key}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-line-2 hover:text-ink"
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <h3 className="mono-label text-faint">Navigate</h3>
          <ul className="grid grid-cols-2 gap-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="mono-label text-faint">Get in touch</h3>
          {user?.email ? (
            <a
              href={`mailto:${user.email}`}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {user.email}
            </a>
          ) : null}
          <a
            href="#contact"
            className="inline-flex w-max items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-ink"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-(--container-page) flex-col items-center justify-between gap-4 border-t border-line pt-6 md:flex-row">
        <p className="text-xs text-faint">
          © {year} {user?.name || "Md. Shahariar Islam Siam"}. All rights
          reserved.
        </p>
        <Link
          href="/admin/login"
          aria-label="Admin login"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:cursor-none"
        >
          Me
        </Link>
      </div>
    </footer>
  );
}
