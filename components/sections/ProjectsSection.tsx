"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, cardHover } from "@/lib/animations";
import { ProjectCardItem } from "@/components/ui/ProjectCardItem";
import { projects } from "@/data/projects";
import { Project } from "@/types/portfolio";

type ProjectsSectionProps = {
  isDark: boolean;
  showAllProjects: boolean;
  setShowAllProjects: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectProject: (project: Project) => void;
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  isDark,
  showAllProjects,
  setShowAllProjects,
  onSelectProject,
}) => {
  return (
    <section id="projects" className="scroll-mt-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
      >
        <div className="flex flex-col gap-2 flex-grow">
          <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
            CHAPTER 05 // CASE FILES
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
              Featured Projects
            </h3>
            <div className="h-[2px] bg-current opacity-30 flex-grow" />
          </div>
        </div>

        <button
          onClick={() => setShowAllProjects(!showAllProjects)}
          className={`comic-btn-secondary text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 px-4 py-2.5 rounded-lg self-start sm:self-auto shrink-0 transition-all cursor-pointer ${
            isDark
              ? "bg-[#141414] text-white hover:bg-white hover:text-black"
              : "bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
          }`}
        >
          {showAllProjects ? "Show Marquee" : "All Projects"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${
              !showAllProjects ? "group-hover:translate-x-1" : ""
            }`}
          >
            {showAllProjects ? (
              <path d="M3 12h18M3 6h18M3 18h18" />
            ) : (
              <polyline points="9 18 15 12 9 6"></polyline>
            )}
          </svg>
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {showAllProjects ? (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
          >
            {projects.map((project, idx) => (
              <ProjectCardItem
                key={`grid-${idx}`}
                project={project}
                cardHover={cardHover}
                isDark={isDark}
                className="w-full"
                onClick={() => onSelectProject(project)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="marquee-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex w-max pt-4 pb-12"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((copyIdx) => (
                <div key={copyIdx} className="flex gap-6 pr-6 shrink-0">
                  {projects.map((project, idx) => (
                    <ProjectCardItem
                      key={`${project.title}-${copyIdx}-${idx}`}
                      project={project}
                      cardHover={cardHover}
                      isDark={isDark}
                      className="w-[85vw] max-w-[350px]"
                      onClick={() => onSelectProject(project)}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
