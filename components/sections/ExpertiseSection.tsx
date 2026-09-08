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
      <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
        <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
          CHAPTER 02 // ARSENAL
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
            My Expertise
          </h3>
          <div className="h-[2px] bg-current opacity-30 flex-grow" />
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
        {/* Left — Core Skills */}
        <div
          style={{ background: "var(--bg-card)", color: "var(--text-base)" }}
          className="rounded-xl border-[2.5px] border-current p-6 sm:p-8 shadow-[6px_6px_0px_currentColor] relative"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 bg-current inline-block"></span>
            <h4 className="text-lg font-black uppercase tracking-wider text-current">
              Core Skills
            </h4>
          </div>
          <div className="space-y-4">
            {coreSkills.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 items-start p-3.5 rounded-lg border-2 border-current bg-black/5 dark:bg-white/5"
              >
                <div className="p-2 rounded-md border-2 border-current bg-black text-white dark:bg-white dark:text-black shrink-0 mt-0.5 shadow-[2px_2px_0px_currentColor]">
                  {item.icon}
                </div>
                <div>
                  <h5 className="text-sm font-black uppercase tracking-wider text-current">
                    {item.title}
                  </h5>
                  <p className="text-xs leading-relaxed mt-1 text-current/80 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Soft Skills */}
        <div
          style={{ background: "var(--bg-card)", color: "var(--text-base)" }}
          className="rounded-xl border-[2.5px] border-current p-6 sm:p-8 shadow-[6px_6px_0px_currentColor] relative"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 bg-current inline-block"></span>
            <h4 className="text-lg font-black uppercase tracking-wider text-current">
              Soft Skills
            </h4>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {softSkills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3.5 py-1.5 rounded-lg border-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isDark
                    ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                    : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
