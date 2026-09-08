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
        className="flex flex-col gap-2 mb-12"
      >
        <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
          CHAPTER 07 // TRANSMISSION
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
            Contact Me
          </h3>
          <div className="h-[2px] bg-current opacity-30 flex-grow" />
        </div>
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
          style={{ background: "var(--bg-card)", color: "var(--text-base)" }}
          className="relative rounded-2xl border-[3.5px] border-current text-current p-6 sm:p-10 shadow-[10px_10px_0px_currentColor]"
        >
          <div className="space-y-2 mb-6">
            <p className="font-mono text-xs font-black uppercase tracking-widest text-current/80">
              {"// WHAT'S NEXT?"}
            </p>
            <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-current">
              Get In Touch
            </h4>
            <p className="text-current/75 text-xs sm:text-sm leading-relaxed font-medium">
              I&apos;m currently open to new opportunities, collaborations, or
              intelligent systems projects. Send me a message and I&apos;ll get
              back to you!
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              {
                icon: <Github size={16} />,
                href: "https://github.com/kenji0011",
                label: "GitHub",
              },
              {
                icon: <Linkedin size={16} />,
                href: "https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b",
                label: "LinkedIn",
              },
              {
                icon: <Mail size={16} />,
                href: "mailto:keangabriel101@email.com",
                label: "keangabriel101@email.com",
              },
              {
                icon: <Phone size={16} />,
                href: "tel:+639205815366",
                label: "+63 920 581 5366",
              },
              {
                icon: <MapPin size={16} />,
                href: "#",
                label: "Laguna, Philippines",
              },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider border-2 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                    : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
                }`}
              >
                {item.icon}{" "}
                <span className="hidden sm:inline-block">{item.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-4"
          >
            {/* Name */}
            <motion.div variants={fadeUp} className="relative group">
              <User
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-current/60 transition-colors"
              />
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full bg-black/5 dark:bg-white/5 border-2 border-current rounded-xl pl-11 pr-4 py-3 text-current placeholder:text-current/50 font-mono text-xs sm:text-sm outline-none focus:bg-transparent focus:shadow-[4px_4px_0px_currentColor] transition-all"
              />
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp} className="relative group">
              <AtSign
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-current/60 transition-colors"
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full bg-black/5 dark:bg-white/5 border-2 border-current rounded-xl pl-11 pr-4 py-3 text-current placeholder:text-current/50 font-mono text-xs sm:text-sm outline-none focus:bg-transparent focus:shadow-[4px_4px_0px_currentColor] transition-all"
              />
            </motion.div>

            {/* Message */}
            <motion.div variants={fadeUp} className="relative group">
              <MessageSquare
                size={16}
                className="absolute left-4 top-4 text-current/60 transition-colors"
              />
              <textarea
                placeholder="Your message..."
                required
                rows={5}
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
                className="w-full bg-black/5 dark:bg-white/5 border-2 border-current rounded-xl pl-11 pr-4 py-3 text-current placeholder:text-current/50 font-mono text-xs sm:text-sm outline-none focus:bg-transparent focus:shadow-[4px_4px_0px_currentColor] transition-all resize-none"
              />
            </motion.div>

            {/* Submit */}
            <motion.div variants={fadeUp}>
              <button
                type="submit"
                disabled={sending}
                className={`comic-btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                  submitted
                    ? "bg-emerald-600 text-white"
                    : sendError
                    ? "bg-red-600 text-white"
                    : isDark
                    ? "bg-white text-black hover:bg-black hover:text-white"
                    : "bg-black text-white hover:bg-white hover:text-black"
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
                    TRANSMITTING…
                  </span>
                ) : submitted ? (
                  <span className="flex items-center gap-2">
                    ✓ TRANSMISSION SENT!
                  </span>
                ) : sendError ? (
                  <span className="flex items-center gap-2">
                    ✗ FAILED — RETRY
                  </span>
                ) : (
                  <>
                    <Send size={16} />
                    SEND TRANSMISSION
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </section>
  );
};
