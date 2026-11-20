"use client";

import React from "react";
import Image from "next/image";
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
  <div
    onClick={onClick}
    className={`group flex flex-col shrink-0 border rounded-xl overflow-hidden transition-colors duration-200 cursor-pointer ${
      isDark
        ? "bg-[#111113] border-zinc-800 hover:border-zinc-600"
        : "bg-white border-zinc-200 hover:border-zinc-400"
    } ${className}`}
  >
    {/* Project image banner */}
    {project.image ? (
      <div
        className={`relative w-full h-44 overflow-hidden shrink-0 border-b ${
          isDark
            ? "bg-zinc-900 border-zinc-800"
            : "bg-zinc-100 border-zinc-200"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
    ) : (
      <div
        className={`w-full h-40 shrink-0 flex items-center justify-center border-b ${
          isDark
            ? "bg-zinc-900/50 border-zinc-800"
            : "bg-zinc-50 border-zinc-200"
        }`}
      >
        <div
          className={`p-3.5 rounded-lg border ${
            isDark
              ? "border-zinc-800 bg-zinc-900 text-zinc-300"
              : "border-zinc-200 bg-white text-zinc-700"
          }`}
        >
          {project.icon}
        </div>
      </div>
    )}

    <div className="flex flex-col flex-1 p-5">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h4 className="text-base font-semibold tracking-tight leading-snug text-current">
          {project.title}
        </h4>
        {project.github !== "#" && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`p-1.5 border rounded-lg shrink-0 transition-colors ${
              isDark
                ? "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900"
                : "border-zinc-200 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100"
            }`}
            aria-label="GitHub Repository"
          >
            <Github size={15} />
          </a>
        )}
      </div>

      <p className="text-xs mb-4 leading-relaxed flex-1 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
              isDark
                ? "bg-zinc-900 text-zinc-400 border border-zinc-800"
                : "bg-zinc-100 text-zinc-600"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);
