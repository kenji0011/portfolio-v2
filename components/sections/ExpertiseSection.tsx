"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { coreSkills, softSkills } from "@/data/skills";

type ExpertiseSectionProps = {
  isDark: boolean;
};

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ isDark }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="scroll-mt-28"
    >
      <motion.div variants={fadeUp} className="mb-8 space-y-1.5">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Capabilities
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
          Skills & Interests
        </h3>
      </motion.div>

      <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
        {/* Left — Skills & Interests */}
        <div
          className={`rounded-xl border p-6 sm:p-7 ${
            isDark
              ? "bg-[#111113] border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <h4 className="text-sm font-semibold tracking-tight text-current mb-5">
            Focus Areas
          </h4>
          <div className="space-y-3.5">
            {coreSkills.map((item) => (
              <div
                key={item.title}
                className={`flex gap-3.5 items-start p-4 rounded-lg border ${
                  isDark
                    ? "border-zinc-800/80 bg-zinc-900/40"
                    : "border-zinc-200/80 bg-zinc-50/70"
                }`}
              >
                <div
                  className={`p-2 rounded-lg border shrink-0 mt-0.5 ${
                    isDark
                      ? "border-zinc-800 bg-zinc-900 text-zinc-200"
                      : "border-zinc-200 bg-white text-zinc-800"
                  }`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h5 className="text-sm font-semibold text-current">
                      {item.title}
                    </h5>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                          item.badge === "Core Skill"
                            ? isDark
                              ? "bg-zinc-100 text-zinc-950"
                              : "bg-zinc-900 text-white"
                            : isDark
                            ? "bg-zinc-800 text-zinc-300"
                            : "bg-zinc-200/80 text-zinc-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed mt-1.5 text-zinc-600 dark:text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Soft Skills */}
        <div
          className={`rounded-xl border p-6 sm:p-7 ${
            isDark
              ? "bg-[#111113] border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <h4 className="text-sm font-semibold tracking-tight text-current mb-5">
            Soft Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  isDark
                    ? "bg-zinc-900/50 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:text-zinc-950"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
