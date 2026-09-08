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
      <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
        <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
          CHAPTER 03 // TOOLKIT
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
            Tech Stack
          </h3>
          <div className="h-[2px] bg-current opacity-30 flex-grow" />
        </div>
      </motion.div>

      {/* Marquee – 2 rows, comic inventory boxes */}
      {techStackRows.map((row) => (
        <motion.div key={row.id} variants={fadeUp} className="mb-6 last:mb-0">
          {/* Outer mask — fade edges */}
          <div
            className="relative overflow-hidden py-2"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex gap-4 w-max"
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
                    color: "var(--text-base)",
                  }}
                  className="group flex flex-col items-center justify-center gap-2 cursor-default shrink-0 w-24 h-24 p-2.5 rounded-xl border-2 border-current shadow-[3px_3px_0px_currentColor] hover:-translate-y-1 hover:shadow-[5px_5px_0px_currentColor] transition-all duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                    alt={tech.name}
                    width={36}
                    height={36}
                    loading="lazy"
                    className="filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-200"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                    }}
                  />
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-current text-center leading-tight truncate w-full">
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
