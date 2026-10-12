"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CircleCheck,
  LoaderCircle,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { createMessage } from "@/src/action/message.action";
import SectionHeading from "./SectionHeading";
import { WhatsappIcon } from "./BrandIcons";
import type { ProfileUser } from "./types";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-line bg-canvas px-4 py-3 text-base text-ink placeholder:text-faint outline-none transition-colors focus:border-accent lg:text-sm";

export default function ContactSection({
  user,
}: {
  user?: ProfileUser | null;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const res = await createMessage(form);
    if (res.error) {
      setStatus("error");
      toast.error(res.error);
      return;
    }
    setStatus("success");
    toast.success("Message sent successfully");
    setForm({ name: "", email: "", message: "" });
  };

  const details = [
    user?.email && {
      label: "Email",
      value: user.email,
      // mailto: is dead weight for visitors without a configured mail client —
      // open Gmail's compose window instead so the link always does something.
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(user.email)}`,
      Icon: Mail,
    },
    user?.phone && {
      label: "Phone",
      value: user.phone,
      href: `tel:${user.phone}`,
      Icon: Phone,
    },
    user?.whatsapp && {
      label: "WhatsApp",
      value: user.whatsapp,
      href: `https://wa.me/${user.whatsapp}`,
      Icon: WhatsappIcon,
    },
  ].filter(Boolean) as {
    label: string;
    value: string;
    href: string;
    Icon: typeof Mail;
  }[];

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[var(--container-page)] px-[var(--spacing-page)] pt-[var(--spacing-section)]"
    >
      <SectionHeading
        index="06"
        eyebrow="Contact"
        title="Let's build something worth shipping."
        description="Tell me about the problem you're solving. I usually reply within a day."
      />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 rounded-3xl border border-line bg-surface/60 p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="mono-label text-muted">
                Name
              </label>
              <input
                id="name"
                name="name"
                className={inputClass}
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="mono-label text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={inputClass}
                placeholder="you@company.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="mono-label text-muted">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className={`${inputClass} resize-none`}
              placeholder="What are you building?"
              value={form.message}
              onChange={onChange}
              required
            />
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : status === "success" ? (
                <>
                  <CircleCheck className="h-4 w-4" />
                  Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
            <p
              aria-live="polite"
              className="text-xs text-muted"
            >
              {status === "success"
                ? "Thanks — your message is on its way."
                : status === "error"
                  ? "Something went wrong. Try again."
                  : ""}
            </p>
          </div>
        </form>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col divide-y divide-[var(--line)] overflow-hidden rounded-3xl border border-line">
            {details.length > 0 ? (
              details.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface-2/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="mono-label text-faint">{label}</span>
                    <span className="truncate text-sm font-medium text-ink">
                      {value}
                    </span>
                  </span>
                </a>
              ))
            ) : (
              <p className="p-5 text-sm text-muted">
                Contact details will appear here once added.
              </p>
            )}
          </div>

          <div className="rounded-3xl border border-line bg-surface/60 p-6">
            <p className="font-display text-base font-semibold text-ink">
              {user?.name || "Shahariar Siam"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {user?.designation || "Full Stack Developer"} — open to freelance,
              full-time, and collaborative work.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-3 animate-pulse-dot" />
              <span className="mono-label text-muted">Available now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
