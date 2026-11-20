"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { techStackRows } from "@/data/tech-stack";

export const TechStackSection: React.FC = () => {
  return (
    <motion.section
      id="techstack"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="scroll-mt-28"
    >
      <motion.div variants={fadeUp} className="mb-8 space-y-1.5">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Tools & Technologies
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
          Tech Stack
        </h3>
      </motion.div>

      {/* Marquee – 2 flat minimal rows */}
      {techStackRows.map((row) => (
        <motion.div key={row.id} variants={fadeUp} className="mb-4 last:mb-0">
          {/* Outer mask — fade edges */}
          <div
            className="relative overflow-hidden py-1"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex gap-3 w-max"
              animate={{
                x: row.dir === -1 ? ["-0%", "-50%"] : ["-50%", "-0%"],
              }}
              transition={{
                duration: row.speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...row.items, ...row.items].map((tech, i) => (
                <div
                  key={`${tech.name}-${i}`}
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-base)",
                  }}
                  className="group flex flex-col items-center justify-center gap-2 cursor-default shrink-0 w-24 h-24 p-2.5 rounded-xl border hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                    alt={tech.name}
                    width={32}
                    height={32}
                    loading="lazy"
                    className="opacity-85 group-hover:opacity-100 transition-opacity duration-200"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                    }}
                  />
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-current text-center leading-tight truncate w-full transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};
