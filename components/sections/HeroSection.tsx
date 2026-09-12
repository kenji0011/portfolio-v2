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
      className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-6 pb-8"
    >
      {/* Text side */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="flex-1 space-y-6 max-w-2xl"
      >
        {/* Comic Chapter Label Stamp */}
        <motion.div variants={fadeUp}>
          <div className="inline-block border-2 border-current px-3 py-1 text-[11px] font-mono font-black uppercase tracking-widest shadow-[2px_2px_0px_currentColor]">
            CHAPTER 01 // ORIGIN
          </div>
        </motion.div>

        {/* Main Greeting & Headings */}
        <div className="space-y-2">
          <motion.p
            variants={fadeUp}
            className="font-mono text-sm font-bold tracking-wider uppercase opacity-70"
          >
            Hi, my name is
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05]"
          >
            Kean Salvahan.
          </motion.h1>
          <motion.h2
            variants={fadeUp}
            className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight border-l-4 border-current pl-3 my-2 opacity-90"
          >
            I build AI/ML solutions & intelligent web apps.
          </motion.h2>
        </div>

        {/* Bio Paragraph */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg leading-relaxed font-medium opacity-85"
        >
          I&apos;m an Intelligent systems specialist with a background in
          developing machine learning models, computer vision systems, and data
          management pipelines. Experienced in building full-stack AI solutions
          and using cloud platforms to deploy and scale data-driven projects that
          solve real-world problems.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={fadeUp} className="pt-2 flex gap-3.5 flex-wrap items-center">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`comic-btn-primary px-6 py-3.5 font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
              isDark
                ? "bg-white text-black hover:bg-black hover:text-white"
                : "bg-black text-white hover:bg-white hover:text-black"
            }`}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`comic-btn-secondary px-6 py-3.5 font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
              isDark
                ? "bg-[#141414] text-white hover:bg-white hover:text-black"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Contact Me
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download="Salvahan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`comic-btn-secondary px-5 py-3.5 font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
              isDark
                ? "bg-[#141414] text-white hover:bg-white hover:text-black"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            <Download size={15} />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links Row */}
        <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
          <a
            href="https://github.com/kenji0011"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 border-2 rounded-lg transition-all ${
              isDark
                ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
            }`}
            aria-label="GitHub Profile"
          >
            <Github size={17} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 border-2 rounded-lg transition-all ${
              isDark
                ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
            }`}
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="mailto:keangabriel101@gmail.com"
            className={`p-2.5 border-2 rounded-lg transition-all ${
              isDark
                ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
            }`}
            aria-label="Email Kean"
          >
            <Mail size={17} />
          </a>
        </motion.div>
      </motion.div>

      {/* Photo side — Inked Comic Panel Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-shrink-0 relative my-6 lg:my-0"
      >
        {/* Comic Panel Corner Stamp */}
        <div
          style={{
            background: isDark ? "#ffffff" : "#111111",
            color: isDark ? "#000000" : "#ffffff",
            borderColor: isDark ? "#ffffff" : "#111111",
            boxShadow: isDark ? "2px 2px 0px #ffffff" : "2px 2px 0px #111111",
          }}
          className="absolute -top-3 -right-3 z-10 border-2 px-2.5 py-0.5 font-mono font-black text-[10px] uppercase tracking-widest"
        >
          CREATOR // 01
        </div>

        {/* Inked Profile Frame */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl border-[3.5px] border-current shadow-[8px_8px_0px_currentColor] overflow-hidden bg-black/5 dark:bg-white/5">
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
                src={isDark ? "/images/profile/pogiko.jpg" : "/images/profile/pogiko2.jpg"}
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
