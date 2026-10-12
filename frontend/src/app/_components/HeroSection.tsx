import { ArrowRight, Download, Mail } from "lucide-react";
import HeroVisual from "./HeroVisual";
import { GithubIcon, LinkedinIcon, XIcon, WhatsappIcon } from "./BrandIcons";
import ResumeDownloadButton from "./ResumeDownloadButton";
import type { ProfileUser, Skill } from "./types";

interface HeroSectionProps {
  user?: ProfileUser | null;
  skills: Skill[];
  projectCount: number;
  skillCount: number;
}

export default function HeroSection({
  user,
  skills,
  projectCount,
  skillCount,
}: HeroSectionProps) {
  const name = user?.name || "Shahariar Siam";
  const socials = [
    { key: "github", href: user?.github, Icon: GithubIcon, label: "GitHub" },
    { key: "linkedin", href: user?.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { key: "x", href: user?.x, Icon: XIcon, label: "X" },
    {
      key: "whatsapp",
      href: user?.whatsapp ? `https://wa.me/${user.whatsapp}` : null,
      Icon: WhatsappIcon,
      label: "WhatsApp",
    },
  ].filter((s) => Boolean(s.href));

  return (
    <section
      id="top"
      className="relative mx-auto grid w-full max-w-(--container-page) grid-cols-1 items-center gap-14 px-page pb-0 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pt-40"
    >
      <div className="flex flex-col items-start gap-7">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-3 animate-pulse-dot" />
          <span className="mono-label text-muted">
            {user?.designation || "Full Stack Developer"}
          </span>
        </span>

        <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.98] tracking-tight text-ink wrap-break-word lg:text-[clamp(2.75rem,7.1vw,5rem)]">
          {name}
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted">
          {user?.bio ||
            "I design and build fast, scalable products end to end — from interface to infrastructure."}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            View Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
          {user?.resumeUrl ? (
            <ResumeDownloadButton
              url={user.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-muted transition-colors hover:text-ink"
            >
              <Download className="h-4 w-4" />
              Resume
            </ResumeDownloadButton>
          ) : null}
        </div>

        {socials.length > 0 && (
          <div className="mt-2 flex items-center gap-3">
            {socials.map(({ key, href, Icon, label }) => (
              <a
                key={key}
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-line-2 hover:text-ink"
              >
                <Icon className="h-[1.05rem] w-[1.05rem]" />
              </a>
            ))}
          </div>
        )}

        <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
          {[
            { value: projectCount, label: "Projects shipped" },
            { value: skillCount, label: "Technologies" },
            { value: "∞", label: "Curiosity" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="font-display text-3xl font-semibold text-ink">
                {stat.value}
              </dt>
              <dd className="mono-label mt-1 text-faint">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <HeroVisual
        name={name}
        designation={user?.designation}
        image={user?.image}
        skills={skills}
      />
    </section>
  );
}
