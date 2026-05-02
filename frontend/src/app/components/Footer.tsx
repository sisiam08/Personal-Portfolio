"use client";

import React from "react";
import { motion } from "framer-motion";

interface FooterProps {
  user: any;
}

export default function Footer({ user }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      label: "GitHub",
      href: user?.github,
      icon: (
        <svg
          className="w-[18px] h-[18px] fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: user?.linkedin,
      icon: (
        <svg
          className="w-[16px] h-[16px] fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "X",
      href: user?.x,
      icon: (
        <svg
          className="w-[15px] h-[15px] fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "Email",
      href: user?.email ? `mailto:${user.email}` : "#",
      icon: (
        <svg
          className="w-[18px] h-[18px] fill-none stroke-current stroke-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
  ].filter((link) => link.href);

  const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
  ];

  return (
    <footer className="relative mt-20 pb-10 px-gutter overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-container-max mx-auto">
        <div className="glass-panel rounded-[2rem] p-8 md:p-12 border-white/5 relative z-10 overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="text-2xl font-bold tracking-tighter text-white">
                DevPortfolio<span className="text-primary">.</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-xs architectural-tracking opacity-80">
                Crafting digital experiences with precision, performance, and
                premium aesthetics. Focused on full-stack excellence.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-bold architectural-tracking text-sm uppercase">
                Navigation
              </h4>
              <ul className="grid grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-on-surface-variant hover:text-primary transition-colors duration-300 text-sm architectural-tracking"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect Section */}
            <div className="space-y-6">
              <h4 className="text-white font-bold architectural-tracking text-sm uppercase">
                Connect
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, translateY: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white/20 transition-all duration-300 group"
                    title={social.label}
                  >
                    <span className="text-xs font-medium opacity-0 group-hover:opacity-100 absolute -top-8 bg-surface-container px-2 py-1 rounded-md transition-all duration-300 pointer-events-none whitespace-nowrap">
                      {social.label}
                    </span>
                    {/* Placeholder for actual icons - using labels for now as requested */}
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-on-surface-variant text-xs architectural-tracking opacity-60">
              © {currentYear} Md. Shahariar Islam Siam. All rights reserved.
            </div>
            <div className="text-on-surface-variant text-xs architectural-tracking opacity-60 flex items-center gap-2">
              Built with <span className="text-primary">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
