"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  LayoutDashboard,
  Layers,
  LogOut,
  Mail,
  Menu,
  User,
} from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/src/components/shared/ModeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", Icon: User },
  { href: "/admin/projects", label: "Projects", Icon: FolderGit2 },
  { href: "/admin/skills", label: "Skills", Icon: Layers },
  { href: "/admin/experiences", label: "Experiences", Icon: Briefcase },
  { href: "/admin/educations", label: "Educations", Icon: GraduationCap },
  { href: "/admin/messages", label: "Messages", Icon: Mail },
];

export default function AdminShell({
  user,
  children,
}: {
  user: { name?: string | null; email?: string | null };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // ignore — redirect regardless
    }
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebar = (
    <div className="flex h-full flex-col gap-2 p-4">
      <Link href="/admin" className="mb-4 flex items-center gap-2 px-2">
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

        <span className="font-display text-sm font-semibold text-ink">
          Admin
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-surface-2 text-ink"
                  : "text-muted hover:bg-surface-2/60 hover:text-ink",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-2 flex flex-col gap-1 border-t border-line pt-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2/60 hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted transition-colors hover:bg-surface-2/60 hover:text-ink disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? "Signing out…" : "Logout"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-svh bg-canvas">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-surface/50 lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-canvas/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative h-full w-64 border-r border-line bg-surface"
            >
              {sidebar}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-ink">
                {user?.name || "Admin"}
              </span>
              <span className="text-xs text-faint">{user?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <button
              type="button"
              onClick={logout}
              aria-label="Logout"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-surface-2"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
