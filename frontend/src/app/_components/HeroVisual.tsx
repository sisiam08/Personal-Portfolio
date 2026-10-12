"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Skill } from "./types";

interface HeroVisualProps {
  name: string;
  designation?: string | null;
  image?: string | null;
  skills: Skill[];
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

/* Five predefined desktop slot positions (lg and up); the first N are used.
   Below lg the chips are shown as a wrapped row under the photo instead. */
const CHIP_SLOTS = [
  "lg:right-[-6%] lg:top-[16%]",
  "lg:right-[-11%] lg:top-[40%]",
  "lg:right-[-6%] lg:top-[64%]",
  "lg:left-[-8%] lg:top-[30%]",
  "lg:left-[-11%] lg:top-[58%]",
];

export default function HeroVisual({
  name,
  designation,
  image,
  skills,
}: HeroVisualProps) {
  const reduced = useReducedMotion();

  const chips = skills
    .filter((s) => s.heroOrder !== null && s.heroOrder !== undefined)
    .sort((a, b) => (a.heroOrder as number) - (b.heroOrder as number))
    .slice(0, 5);

  const float = (delay: number) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -10, 0] },
          transition: {
            duration: 6,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  // Render function (not a component) so chips are not remounted on every
  // re-render, which would restart their float animation.
  const renderChip = (skill: Skill, delay: number) => (
    <motion.span
      {...float(delay)}
      className="flex items-center gap-1.5 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-md"
    >
      {skill.name}
      {skill.icon ? (
        <Image
          src={skill.icon}
          alt=""
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      ) : null}
    </motion.span>
  );

  return (
    <>
      <div className="relative mx-auto aspect-4/5 w-full max-w-110">
        {/* Rings: scaled down on phones so the big circle never pushes past
            the screen edge (no horizontal scroll); full size from sm up.
            Scale is on the wrapper because the svg itself uses a transform
            for the spin animation. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 scale-[0.85] sm:scale-100"
        >
          <svg
            viewBox="0 0 400 400"
            className="h-full w-full overflow-visible text-line-2"
          >
            <g
              className="animate-spin-slow"
              style={{ transformOrigin: "200px 200px" }}
            >
              <circle
                cx="200"
                cy="200"
                r="225"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2 10"
              />
              <circle
                cx="200"
                cy="200"
                r="181"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="1 8"
              />
            </g>
          </svg>
        </div>

        <div className="absolute inset-[12%] rounded-[2.5rem] bg-accent-soft blur-2xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-[10%] overflow-hidden rounded-[2.25rem] border border-line-2 bg-surface shadow-(--shadow)"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-surface-2 to-surface">
              <span className="noise absolute inset-0 opacity-40" />
              <span className="relative font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl">
                {initials(name) || "SS"}
              </span>
              {designation ? (
                <span className="relative mono-label px-3 text-center text-accent">
                  {designation}
                </span>
              ) : null}
            </div>
          )}
        </motion.div>

        <motion.div
          {...float(0)}
          className="absolute left-0 top-6 flex items-center gap-2 rounded-full border border-line bg-surface/90 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full bg-accent-3 animate-pulse-dot" />
          <span className="mono-label text-ink">Open to work</span>
        </motion.div>

        {/* Admin-selected stack chips: desktop slots (lg and up) */}
        {chips.length > 0 ? (
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {chips.map((skill, i) => (
              <div
                key={skill.id ?? skill.name}
                className={`absolute ${CHIP_SLOTS[i]}`}
              >
                {renderChip(skill, 0.4 + i * 0.4)}
              </div>
            ))}
          </div>
        ) : null}

        <motion.div
          {...float(1.6)}
          className="absolute -bottom-2 left-6 flex items-center gap-2 rounded-2xl border border-line bg-surface/90 px-3 py-2 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-accent-2" />
          <span className="text-xs font-semibold text-ink">Built to scale</span>
        </motion.div>

        <div className="absolute -bottom-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink shadow-(--shadow)">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* Admin-selected stack chips: wrapped row on phones and tablets.
          mt-9 clears the arrow button that hangs below the frame. */}
      {chips.length > 0 ? (
        <div className="mt-9 flex flex-wrap justify-center gap-2 lg:hidden">
          {chips.map((skill, i) => (
            <div key={skill.id ?? skill.name}>{renderChip(skill, i * 0.3)}</div>
          ))}
        </div>
      ) : null}
    </>
  );
}