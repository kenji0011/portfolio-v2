"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Project } from "@/types/portfolio";

type ProjectCardItemProps = {
  project: Project;
  cardHover?: { y: number; scale: number };
  className?: string;
  onClick?: () => void;
  isDark: boolean;
};

export const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  project,
  className = "",
  onClick,
  isDark,
}) => (
  <motion.div
    onClick={onClick}
    whileHover={{ x: -2, y: -2 }}
    style={{ background: "var(--bg-card)", color: "var(--text-base)" }}
    className={`group flex flex-col shrink-0 border-[2.5px] border-current rounded-2xl overflow-hidden shadow-[5px_5px_0px_currentColor] hover:shadow-[8px_8px_0px_currentColor] transition-all cursor-pointer ${className}`}
  >
    {/* Project image banner */}
    {project.image ? (
      <div className="relative w-full h-44 overflow-hidden bg-black/10 dark:bg-white/5 shrink-0 border-b-[2.5px] border-current">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ) : (
      <div className="w-full h-40 shrink-0 bg-black/5 dark:bg-white/5 flex items-center justify-center border-b-[2.5px] border-current">
        <div className="p-4 border-2 border-current shadow-[2px_2px_0px_currentColor]">
          {project.icon}
        </div>
      </div>
    )}

    <div className="flex flex-col flex-1 p-5">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-base font-black uppercase tracking-tight group-hover:underline underline-offset-4 decoration-2 leading-snug text-current">
          {project.title}
        </h4>
        <div className="flex gap-2 ml-2 shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`p-1.5 border-2 rounded-md transition-colors ${
              isDark
                ? "bg-[#141414] text-white border-white hover:bg-white hover:text-black"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
            aria-label="GitHub Repository"
          >
            <Github size={15} />
          </a>
        </div>
      </div>
      <p className="text-xs mb-4 leading-relaxed flex-1 text-current/80 font-medium">
        {project.description}
      </p>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 border border-current text-[10px] font-mono font-bold uppercase text-current bg-black/5 dark:bg-white/10"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);
