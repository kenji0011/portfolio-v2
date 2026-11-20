"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  User,
  AtSign,
  MessageSquare,
  Send,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

type ContactSectionProps = {
  isDark: boolean;
};

export const ContactSection: React.FC<ContactSectionProps> = ({ isDark }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("https://formspree.io/f/mlgwvglr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setSendError(true);
        setTimeout(() => setSendError(false), 4000);
      }
    } catch {
      setSendError(true);
      setTimeout(() => setSendError(false), 4000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-8 space-y-1.5 text-center"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Contact
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
          Get in Touch
        </h3>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          variants={fadeUp}
          className={`rounded-2xl border p-6 sm:p-8 ${
            isDark
              ? "bg-[#111113] border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 text-center">
            I&apos;m currently open to On-the-Job Training (OJT), internship
            opportunities, and projects in Data Analytics, Quality Assurance
            (QA), and Automation. Send me a message and I&apos;ll get back to
            you!
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {[
              {
                icon: <Github size={15} />,
                href: "https://github.com/kenji0011",
                label: "GitHub",
              },
              {
                icon: <Linkedin size={15} />,
                href: "https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b",
                label: "LinkedIn",
              },
              {
                icon: <Mail size={15} />,
                href: "mailto:keangabriel101@gmail.com",
                label: "keangabriel101@gmail.com",
              },
              {
                icon: <Phone size={15} />,
                href: "tel:+639205815366",
                label: "+63 920 581 5366",
              },
              {
                icon: <MapPin size={15} />,
                href: "#",
                label: "Laguna, Philippines",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href === "#" ? undefined : "_blank"}
                rel={item.href === "#" ? undefined : "noopener noreferrer"}
                aria-label={item.label}
                className={`flex items-center gap-2 text-xs font-medium border px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  isDark
                    ? "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline-block">{item.label}</span>
              </a>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="relative">
              <User
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className={`w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none transition-colors ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white"
                }`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <AtSign
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className={`w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none transition-colors ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white"
                }`}
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare
                size={15}
                className="absolute left-3.5 top-3.5 text-zinc-400"
              />
              <textarea
                placeholder="Your message..."
                required
                rows={4}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className={`w-full border rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none transition-colors resize-none ${
                  isDark
                    ? "bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500"
                    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white"
                }`}
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={sending}
                className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  submitted
                    ? "bg-emerald-600 text-white"
                    : sendError
                    ? "bg-red-600 text-white"
                    : isDark
                    ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-300"
                    : "bg-zinc-900 text-white hover:bg-zinc-700"
                }`}
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : submitted ? (
                  <span>✓ Message Sent</span>
                ) : sendError ? (
                  <span>Failed — Please Retry</span>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
};
