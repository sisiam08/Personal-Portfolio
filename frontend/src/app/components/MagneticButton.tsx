"use client";

import { useRef, useState } from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  hideBorder?: boolean;
  asDiv?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  containerClassName = "rounded-full",
  hideBorder = false,
  asDiv = false,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLSpanElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);

  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const btn = btnRef.current;
    const light = lightRef.current;
    const border = borderRef.current;
    if (!btn || !light || !border) return;

    const rect = btn.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTranslate({ x: relX * 10, y: relY * 8 });

    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;

    light.style.background = `radial-gradient(circle 90px at ${pctX}% ${pctY}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 70%)`;
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

  const Component: any = asDiv ? "div" : "button";

  return (
    <span
      className={`relative inline-block ${hideBorder ? "" : "p-[1.5px]"} ${containerClassName}`}
      style={{
        boxShadow: hovered && !hideBorder
          ? "0 0 0 1px rgba(192,193,255,0.35), 0 0 20px rgba(192,193,255,0.2)"
          : "0 0 0 1px transparent",
        transition: "box-shadow 0.4s ease",
        background: "transparent",
      }}
    >
      {!hideBorder && (
        <span
          ref={borderRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            borderRadius: "inherit",
            transition: "opacity 0.35s ease",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1.5px",
            zIndex: 0,
          }}
        />
      )}

      <Component
        ref={btnRef}
        {...(!asDiv ? props : {})}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden ${className}`}
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px)`,
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <span
          ref={lightRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            borderRadius: "inherit",
            transition: "opacity 0.4s ease",
          }}
        />
        <span className="relative z-10 flex w-full h-full justify-center items-center m-0 p-0">{children}</span>
      </Component>
    </span>
  );
}
