"use client";

import { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = btnRef.current;
    const light = lightRef.current;
    const border = borderRef.current;
    if (!btn || !light || !border) return;

    const rect = btn.getBoundingClientRect();

    // --- Magnetic pull (React state — smooth spring-back on leave) ---
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTranslate({ x: relX * 10, y: relY * 8 });

    // --- Light & border highlight (direct DOM — zero-lag tracking) ---
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;

    // Soft radial glow that follows the cursor
    light.style.background = `radial-gradient(circle 90px at ${pctX}% ${pctY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;

    // Border spotlight — a conic highlight on the border closest to the cursor
    border.style.background = `radial-gradient(circle 120px at ${pctX}% ${pctY}%, rgba(192,193,255,0.65) 0%, rgba(192,193,255,0.15) 40%, transparent 65%)`;
  }

  function handleMouseEnter() {
    setHovered(true);
    if (lightRef.current) lightRef.current.style.opacity = "1";
    if (borderRef.current) borderRef.current.style.opacity = "1";
  }

  function handleMouseLeave() {
    setHovered(false);
    setTranslate({ x: 0, y: 0 });
    if (lightRef.current) lightRef.current.style.opacity = "0";
    if (borderRef.current) borderRef.current.style.opacity = "0";
  }

  return (
    /* Outer wrapper holds the animated border layer */
    <span
      className="relative inline-block rounded-full p-[1.5px]"
      style={{
        /* Border glow ring — box-shadow fades in on hover */
        boxShadow: hovered
          ? "0 0 0 1px rgba(192,193,255,0.35), 0 0 20px rgba(192,193,255,0.2)"
          : "0 0 0 1px transparent",
        transition: "box-shadow 0.4s ease",
        background: "transparent",
      }}
    >
      {/* Moving border spotlight (the gradient border that follows the cursor) */}
      <span
        ref={borderRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-0"
        style={{
          transition: "opacity 0.35s ease",
          /* background is set inline via direct DOM in handleMouseMove */
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1.5px",
          zIndex: 0,
        }}
      />

      <button
        ref={btnRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-full ${className}`}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px)`,
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Glass light spot — direct DOM update, no React lag */}
        <span
          ref={lightRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
          style={{
            transition: "opacity 0.4s ease",
            /* background is set inline via direct DOM in handleMouseMove */
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    </span>
  );
}
