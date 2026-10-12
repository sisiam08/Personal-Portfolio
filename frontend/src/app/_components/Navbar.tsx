"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/src/components/shared/ModeToggle";
import ResumeDownloadButton from "./ResumeDownloadButton";

const LINKS = [
  { label: "Home", href: "#top", id: "top" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Education", href: "#education", id: "education" },
  { label: "About", href: "#about", id: "about" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar({ resumeUrl }: { resumeUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 16));

  // Keep --nav-offset equal to the navbar's real bottom edge (floating pill).
  useLayoutEffect(() => {
    const measure = () => {
      const el = pillRef.current;
      if (!el) return;
      // Use layout height + the nav's top padding so the value is independent
      // of the entrance transform.
      const navEl = el.parentElement;
      const padTop = navEl
        ? parseFloat(getComputedStyle(navEl).paddingTop) || 0
        : 0;
      const bottom = Math.round(padTop + el.offsetHeight);
      document.documentElement.style.setProperty("--nav-offset", `${bottom}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (pillRef.current) ro.observe(pillRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scrolled]);

  // Re-align a direct hash load once the measured offset is available.
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (!el) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const t = setTimeout(() => {
      el.scrollIntoView({ block: "start" });
      html.style.scrollBehavior = prev;
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Scroll-spy: active = the section whose top is at/above the navbar bottom.
  useEffect(() => {
    const update = () => {
      const off =
        (parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-offset",
          ),
        ) || 80) + 8;
      const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
        (el): el is HTMLElement => Boolean(el),
      );
      if (sections.length === 0) return;
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= off) current = el.id;
      }
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      ) {
        current = sections[sections.length - 1].id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[calc(0.75rem+env(safe-area-inset-top))]"
      >
        <div
          ref={pillRef}
          className={`flex w-full max-w-270 items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-300 md:px-4 ${
            scrolled
              ? "border-line bg-surface/80 shadow-(--shadow) backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 pl-1"
            aria-label="Shahariar Siam — home"
          >
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
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ink sm:block">
              Siam
              <span className="text-accent">.</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative rounded-full px-3 py-2 text-[0.8rem] font-medium transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 32,
                      }}
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {resumeUrl ? (
              <ResumeDownloadButton
                url={resumeUrl}
                className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.8rem] font-semibold text-canvas transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                <Download className="h-3.5 w-3.5" />
                Resume
              </ResumeDownloadButton>
            ) : null}
            <ModeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink lg:h-10 lg:w-10 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-70 bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="absolute right-5 top-[calc(1rem+env(safe-area-inset-top))] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex h-full flex-col justify-center gap-1 px-8 pt-24">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className={`group flex items-center justify-between border-b border-line py-4 font-display text-2xl font-medium ${
                    active === link.id ? "text-accent" : "text-ink"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-5 w-5 text-faint transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              ))}
              {resumeUrl ? (
                <ResumeDownloadButton
                  url={resumeUrl}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </ResumeDownloadButton>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
