"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "pointer" | "clicking";

const CLICKABLE = "a, button, [role='button'], [tabindex]:not([tabindex='-1']), label, select, input, textarea";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos        = useRef({ x: -100, y: -100 });
  const ringPos    = useRef({ x: -100, y: -100 });
  const rafId      = useRef<number>(0);

  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    // Hide native cursor everywhere
    document.documentElement.style.cursor = "none";

    function onMouseMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseOver(e: MouseEvent) {
      if ((e.target as Element).closest(CLICKABLE)) {
        setState("pointer");
      }
    }

    function onMouseOut(e: MouseEvent) {
      if ((e.target as Element).closest(CLICKABLE)) {
        setState("default");
      }
    }

    function onMouseDown() { setState("clicking"); }
    function onMouseUp()   { setState((s) => s === "clicking" ? "pointer" : "default"); }

    document.addEventListener("mousemove",  onMouseMove,  { passive: true });
    document.addEventListener("mouseover",  onMouseOver,  { passive: true });
    document.addEventListener("mouseout",   onMouseOut,   { passive: true });
    document.addEventListener("mousedown",  onMouseDown);
    document.addEventListener("mouseup",    onMouseUp);

    // rAF loop — dot snaps instantly, ring lerps for silky trailing
    function tick() {
      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot && ring) {
        // Dot: instant
        dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;

        // Ring: smooth lerp (factor 0.12 → gentle trail)
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove",  onMouseMove);
      document.removeEventListener("mouseover",  onMouseOver);
      document.removeEventListener("mouseout",   onMouseOut);
      document.removeEventListener("mousedown",  onMouseDown);
      document.removeEventListener("mouseup",    onMouseUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const isPointer  = state === "pointer";
  const isClicking = state === "clicking";

  return (
    <>
      {/* ── Dot — snaps instantly to cursor ── */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width:  "7px",
          height: "7px",
          borderRadius: "50%",
          background: "rgba(192,193,255,1)",
          boxShadow: "0 0 8px 2px rgba(192,193,255,0.9)",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
          opacity: isClicking ? 0.5 : 1,
          willChange: "transform",
        }}
      />

      {/* ── Ring — trails the cursor smoothly ── */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          width:  isPointer || isClicking ? "42px" : "22px",
          height: isPointer || isClicking ? "42px" : "22px",
          borderRadius: "50%",
          border: isClicking
            ? "1.5px solid rgba(192,193,255,0.9)"
            : isPointer
            ? "1.5px solid rgba(192,193,255,0.75)"
            : "1.5px solid rgba(192,193,255,0.45)",
          boxShadow: isClicking
            ? "0 0 16px 4px rgba(192,193,255,0.55), inset 0 0 10px rgba(192,193,255,0.15)"
            : isPointer
            ? "0 0 14px 3px rgba(192,193,255,0.4),  inset 0 0 8px  rgba(192,193,255,0.1)"
            : "0 0 10px 2px rgba(192,193,255,0.25)",
          background: isClicking
            ? "rgba(192,193,255,0.08)"
            : isPointer
            ? "rgba(192,193,255,0.05)"
            : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isPointer || isClicking ? 0 : 1,
          transition: "width 0.25s ease, height 0.25s ease, border 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, opacity 0.2s ease",
          willChange: "transform",
        }}
      >
        {/* Icon inside ring — only visible on clickable hover */}
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          style={{
            width: "13px",
            height: "13px",
            opacity: 0, /* hidden since the wrapper ring is hidden */
            transition: "opacity 0.2s ease",
          }}
        >
          {/* Hand / pointer icon */}
          <path
            d="M9 11V6a1 1 0 0 1 2 0v5m0 0V5a1 1 0 0 1 2 0v6m0 0V7a1 1 0 0 1 2 0v4m0 0a1 1 0 0 1 2 0v3c0 3.314-2.686 6-6 6H9a6 6 0 0 1-6-6v-1a1 1 0 0 1 2 0"
            stroke="rgba(192,193,255,1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Click ripple */}
        {isClicking && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "rgba(192,193,255,0.2)" }}
          />
        )}
      </div>
    </>
  );
}
