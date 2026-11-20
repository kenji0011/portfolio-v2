"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

type HeroSectionProps = {
  isDark: boolean;
};

export const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
  return (
    <section
      id="about"
      className="min-h-[75vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-6 pb-8"
    >
      {/* Text side */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex-1 space-y-6 max-w-2xl"
      >
        {/* Minimal Eyebrow */}
        <motion.div variants={fadeUp}>
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
              isDark
                ? "border-zinc-800 bg-zinc-900/60 text-zinc-400"
                : "border-zinc-200 bg-white text-zinc-600"
            }`}
          >
          </span>
        </motion.div>

        {/* Main Greeting & Headings */}
        <div className="space-y-3">
          <motion.p
            variants={fadeUp}
            className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
          >
            Hi, my name is
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08]"
          >
            Kean Salvahan
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="text-lg sm:text-2xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400"
          >
            Data Analytics & Aspiring QA / Automation Specialist.
          </motion.h2>
        </div>

        {/* Bio Paragraph */}
        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-xl"
        >
          I&apos;m an Intelligent Systems Computer Science student specializing
          in Data Analytics with an active interest in Quality Assurance and
          Automation. Adept at analyzing system workflows, auditing data
          integrity, and working with SQL, PostgreSQL, and Python, seeking an
          On-the-Job Training (OJT) role to apply my analytical foundation and
          grow in technical testing.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={fadeUp}
          className="pt-2 flex gap-3 flex-wrap items-center"
        >
          <a
            href="#projects"
            className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer ${
              isDark
                ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-300"
                : "bg-zinc-900 text-white hover:bg-zinc-700"
            }`}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className={`px-5 py-2.5 rounded-lg font-medium text-sm border transition-colors cursor-pointer ${
              isDark
                ? "border-zinc-800 bg-transparent text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700"
                : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300"
            }`}
          >
            Contact Me
          </a>
          <a
            href="/Salvahan_Resume.pdf"
            download="Salvahan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2.5 rounded-lg font-medium text-sm border flex items-center gap-2 transition-colors cursor-pointer ${
              isDark
                ? "border-zinc-800 bg-transparent text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700"
                : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300"
            }`}
          >
            <Download size={15} />
            Download CV
          </a>
        </motion.div>

        {/* Social Links Row */}
        <motion.div variants={fadeUp} className="flex items-center gap-2.5 pt-2">
          <a
            href="https://github.com/kenji0011"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 border rounded-lg transition-colors ${
              isDark
                ? "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700"
                : "border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300"
            }`}
            aria-label="GitHub Profile"
          >
            <Github size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 border rounded-lg transition-colors ${
              isDark
                ? "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700"
                : "border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300"
            }`}
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="mailto:keangabriel101@gmail.com"
            className={`p-2.5 border rounded-lg transition-colors ${
              isDark
                ? "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700"
                : "border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300"
            }`}
            aria-label="Email Kean"
          >
            <Mail size={17} />
          </a>
        </motion.div>
      </motion.div>

      {/* Photo side — Flat Minimal Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-shrink-0 relative my-4 lg:my-0"
      >
        <div
          className={`relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl border overflow-hidden ${
            isDark
              ? "border-zinc-800 bg-zinc-900"
              : "border-zinc-200 bg-zinc-100"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? "dark-photo" : "light-photo"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={
                  isDark
                    ? "/images/profile/pogiko.jpg"
                    : "/images/profile/pogiko2.jpg"
                }
                alt="Kean Salvahan"
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
