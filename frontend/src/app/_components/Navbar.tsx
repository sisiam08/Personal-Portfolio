"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import { ModeToggle } from "@/src/components/shared/ModeToggle";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeHref, setActiveHref] = useState("#");

  useEffect(() => {
    // Sync with initial hash or hash changes
    const handleHashChange = () => {
      const hash = window.location.hash || "#";
      if (navLinks.some((link) => link.href === hash)) {
        setActiveHref(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 rounded-full mt-4 max-w-[1200px] mx-auto border border-outline-variant/30 bg-surface-container-low/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] font-inter tracking-tight transition-colors duration-300">
      {/* Logo */}
      <div className="text-xl font-bold tracking-tighter text-white">
        <Image src={logo} alt="Siam" width={50} height={50} />
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href }) => {
          const isActive = activeHref === href;
          return (
            <a
              key={label}
              href={href}
              onClick={() => setActiveHref(href)}
              className={`relative py-2 transition-all duration-300 architectural-tracking ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {label}
              {/* Sliding Underline Indicator */}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>

      <ModeToggle />
    </nav>
  );
}
