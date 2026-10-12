"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      suppressHydrationWarning
      className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-line-2 hover:bg-surface-2 lg:h-10 lg:w-10"
    >
      <Sun className="hidden h-[1.05rem] w-[1.05rem] dark:block" />
      <Moon className="block h-[1.05rem] w-[1.05rem] dark:hidden" />
    </button>
  );
}
