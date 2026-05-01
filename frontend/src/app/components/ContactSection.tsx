"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import MagneticButton from "./MagneticButton";
import { createMessage } from "@/src/action/message.action";

export default function ContactSection({ user }: { user?: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await createMessage(formData);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Message sent successfully");
      setFormData({ name: "", email: "", message: "" });
    }
    setIsSubmitting(false);
  };

  return (
    <section className="mb-section-gap">
      <div className="text-center mb-stack-lg">
        <p className="text-primary font-label-caps architectural-tracking mb-2">
          Contact
        </p>
        <h2 className="font-h1 text-xl text-white">Get in Touch</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-gutter max-w-6xl mx-auto items-start">
        {/* Contact Form */}
        <div className="glass-panel-high rounded-[2.5rem] p-8 md:p-12 animate-reveal-left">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-on-surface-variant text-sm font-label-caps architectural-tracking mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-md"
                id="name"
                placeholder="Enter your name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-on-surface-variant text-sm font-label-caps architectural-tracking mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-md"
                id="email"
                placeholder="name@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                className="block text-on-surface-variant text-sm font-label-caps architectural-tracking mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all backdrop-blur-md resize-none"
                id="message"
                placeholder="How can I help you?"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <MagneticButton
              hideBorder
              containerClassName="w-full rounded-xl"
              className={`w-full glass-panel text-white py-4 rounded-xl font-bold architectural-tracking transition-all duration-300 shadow-md hover:shadow-lg ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
              }`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </MagneticButton>
          </form>
        </div>
        {/* Contact Details */}
        <div className="flex flex-col justify-center h-full space-y-10 md:pl-10 animate-reveal-right">
          <div className="space-y-4">
            <h3 className="text-h3 text-white architectural-tracking">
              Let's talk about your project.
            </h3>
            <p className="text-on-surface-variant body-lg architectural-tracking">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>
          </div>
          <div className="space-y-6">
            {user?.email && (
              <a
                className="flex items-center gap-4 group cursor-pointer"
                href={`mailto:${user.email}`}
              >
                <MagneticButton
                  asDiv
                  containerClassName="rounded-2xl shrink-0"
                  className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-500"
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    data-icon="mail"
                  >
                    mail
                  </span>
                </MagneticButton>
                <div>
                  <p className="text-on-surface-variant text-xs font-label-caps architectural-tracking">
                    Email
                  </p>
                  <p className="text-white font-bold architectural-tracking">
                    {user.email}
                  </p>
                </div>
              </a>
            )}

            {user?.phone && (
              <a
                className="flex items-center gap-4 group cursor-pointer"
                href={`tel:${user.phone}`}
              >
                <MagneticButton
                  asDiv
                  containerClassName="rounded-2xl shrink-0"
                  className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500"
                >
                  <span
                    className="material-symbols-outlined text-2xl"
                    data-icon="call"
                  >
                    call
                  </span>
                </MagneticButton>
                <div>
                  <p className="text-on-surface-variant text-xs font-label-caps architectural-tracking">
                    Call
                  </p>
                  <p className="text-white font-bold architectural-tracking">
                    {user.phone}
                  </p>
                </div>
              </a>
            )}

            {user?.whatsapp && (
              <a
                className="flex items-center gap-4 group cursor-pointer"
                href={`https://wa.me/${user.whatsapp}`}
              >
                <MagneticButton
                  asDiv
                  containerClassName="rounded-2xl shrink-0"
                  className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.463 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.005-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </MagneticButton>
                <div>
                  <p className="text-on-surface-variant text-xs font-label-caps architectural-tracking">
                    WhatsApp
                  </p>
                  <p className="text-white font-bold architectural-tracking">
                    {user.whatsapp}
                  </p>
                </div>
              </a>
            )}
          </div>
          <div className="p-6 glass-panel rounded-2xl border-l-4 border-primary">
            <p className="text-sm text-on-surface-variant italic architectural-tracking">
              "Usually responds within 24 hours for project inquiries."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
