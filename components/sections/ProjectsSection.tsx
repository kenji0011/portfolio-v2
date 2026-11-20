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
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div className="space-y-1.5">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Selected Work
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
            Featured Projects
          </h3>
        </div>

        <button
          onClick={() => setShowAllProjects(!showAllProjects)}
          className={`text-xs font-medium flex items-center gap-2 px-4 py-2 rounded-lg border self-start sm:self-auto shrink-0 transition-colors cursor-pointer ${
            isDark
              ? "border-zinc-800 bg-[#111113] text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300"
          }`}
        >
          {showAllProjects ? "Show Carousel" : "View All Projects"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {showAllProjects ? (
              <path d="M3 12h18M3 6h18M3 18h18" />
            ) : (
              <polyline points="9 18 15 12 9 6" />
            )}
          </svg>
        </button>
      </motion.div>

      <AnimatePresence mode="wait">
        {showAllProjects ? (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6"
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
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden w-full"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex w-max pt-2 pb-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((copyIdx) => (
                <div key={copyIdx} className="flex gap-5 pr-5 shrink-0">
                  {projects.map((project, idx) => (
                    <ProjectCardItem
                      key={`${project.title}-${copyIdx}-${idx}`}
                      project={project}
                      cardHover={cardHover}
                      isDark={isDark}
                      className="w-[85vw] max-w-[340px]"
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
