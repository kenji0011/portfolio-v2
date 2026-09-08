"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { Project } from "@/types/portfolio";
import { projects } from "@/data/projects";

type ProjectModalProps = {
  selectedProject: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  galleryIndex: number;
  setGalleryIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsZoomed: (zoomed: boolean) => void;
  isDark: boolean;
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  selectedProject,
  onClose,
  onSelectProject,
  galleryIndex,
  setGalleryIndex,
  setIsZoomed,
  isDark,
}) => {
  const contentScrollRef = useRef<HTMLDivElement>(null);

  const currentIndex = selectedProject
    ? projects.findIndex((p) => p.title === selectedProject.title)
    : -1;

  const handlePrevProject = () => {
    if (currentIndex === -1 || !onSelectProject) return;
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIndex]);
    setGalleryIndex(0);
  };

  const handleNextProject = () => {
    if (currentIndex === -1 || !onSelectProject) return;
    const nextIndex = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIndex]);
    setGalleryIndex(0);
  };

  // Scroll content to top whenever selected project changes
  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProject?.title]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (selectedProject?.gallery) {
      const activeThumb = document.getElementById(`thumbnail-${galleryIndex}`);
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [galleryIndex, selectedProject]);
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.55)",
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark ? "#141414" : "#ffffff",
              color: isDark ? "#f5f5f5" : "#111111",
              borderColor: isDark ? "#ffffff" : "#111111",
              boxShadow: isDark
                ? "10px 10px 0px #ffffff"
                : "10px 10px 0px #111111",
            }}
            className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl border-[3.5px] overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className={`absolute top-3 right-3 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-lg border-2 active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer ${
                isDark
                  ? "bg-black text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                  : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
              }`}
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div
              ref={contentScrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar"
            >
              {/* Two-column body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-full">
                {/* LEFT: Image gallery */}
                <div
                  style={{
                    background: isDark ? "rgba(255,255,255,0.03)" : "#f6f6f4",
                    borderColor: isDark ? "#ffffff" : "#111111",
                  }}
                  className="relative flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 overflow-hidden"
                >
                  {/* Main image */}
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] flex items-center justify-center p-3 sm:p-4">
                    {selectedProject.gallery &&
                    selectedProject.gallery.length > 0 ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={galleryIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="relative w-full h-full p-2 flex items-center justify-center"
                        >
                          <Image
                            src={selectedProject.gallery[galleryIndex]}
                            alt={`${selectedProject.title} screenshot ${
                              galleryIndex + 1
                            }`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                            onClick={() => setIsZoomed(true)}
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <div
                          style={{
                            background: isDark ? "#ffffff" : "#000000",
                            color: isDark ? "#000000" : "#ffffff",
                            borderColor: isDark ? "#ffffff" : "#000000",
                          }}
                          className="p-8 rounded-2xl border-2"
                        >
                          {selectedProject.icon}
                        </div>
                      </div>
                    )}

                    {/* Arrow nav — only when multiple images */}
                    {selectedProject.gallery &&
                      selectedProject.gallery.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setGalleryIndex(
                                (i) =>
                                  (i - 1 + selectedProject.gallery!.length) %
                                  selectedProject.gallery!.length
                              )
                            }
                            aria-label="Previous image"
                            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-lg border-2 transition-all active:translate-x-[2px] active:translate-y-[2px] cursor-pointer ${
                              isDark
                                ? "bg-black text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                                : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
                            }`}
                          >
                            <ChevronLeft size={16} strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() =>
                              setGalleryIndex(
                                (i) =>
                                  (i + 1) % selectedProject.gallery!.length
                              )
                            }
                            aria-label="Next image"
                            className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-lg border-2 transition-all active:translate-x-[2px] active:translate-y-[2px] cursor-pointer ${
                              isDark
                                ? "bg-black text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                                : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
                            }`}
                          >
                            <ChevronRight size={16} strokeWidth={2.5} />
                          </button>
                        </>
                      )}
                  </div>

                  {/* Image previews / Thumbnails */}
                  {selectedProject.gallery &&
                    selectedProject.gallery.length > 1 && (
                      <div
                        style={{
                          background: isDark
                            ? "rgba(255,255,255,0.06)"
                            : "#eaeae6",
                          borderColor: isDark ? "#ffffff" : "#111111",
                        }}
                        className="flex p-2.5 sm:p-3 gap-2 border-t-2 overflow-x-auto no-scrollbar"
                      >
                        <div className="flex gap-2 mx-auto px-1">
                          {selectedProject.gallery.map((imgSrc, idx) => (
                            <button
                              key={idx}
                              id={`thumbnail-${idx}`}
                              onClick={() => setGalleryIndex(idx)}
                              style={{
                                borderColor: isDark ? "#ffffff" : "#111111",
                              }}
                              className={`relative shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-md overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                                idx === galleryIndex
                                  ? "shadow-[3px_3px_0px_currentColor] opacity-100 scale-105"
                                  : "opacity-60 hover:opacity-100"
                              }`}
                            >
                              <Image
                                src={imgSrc}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                sizes="70px"
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* RIGHT: Info + description */}
                <div
                  className="flex flex-col gap-4 sm:gap-5 p-5 sm:p-7 lg:p-9"
                  style={{ background: isDark ? "#141414" : "#ffffff" }}
                >
                  {/* Project Info Dossier */}
                  <div
                    style={{
                      background: isDark ? "#181818" : "#fbfbfa",
                      borderColor: isDark ? "#ffffff" : "#111111",
                      boxShadow: isDark
                        ? "4px 4px 0px #ffffff"
                        : "4px 4px 0px #111111",
                    }}
                    className="rounded-xl border-2 divide-y-2 divide-current overflow-hidden text-xs"
                  >
                    <div
                      style={{
                        background: isDark ? "#ffffff" : "#111111",
                        color: isDark ? "#000000" : "#ffffff",
                      }}
                      className="px-4 py-2.5 flex items-center justify-between font-mono"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest">
                        FILE DOSSIER
                      </p>
                      <span className="text-[10px] font-bold">
                        {selectedProject.date ?? "CLASSIFIED"}
                      </span>
                    </div>
                    <div className="px-4 py-2.5 flex items-center justify-between">
                      <span
                        style={{ color: isDark ? "#a1a1aa" : "#52525b" }}
                        className="font-mono font-bold uppercase text-[11px]"
                      >
                        Category
                      </span>
                      <span
                        style={{ color: isDark ? "#ffffff" : "#111111" }}
                        className="font-mono font-black uppercase text-[11px]"
                      >
                        {selectedProject.tags[0]}
                      </span>
                    </div>
                    <div className="px-4 py-2.5 flex items-center justify-between">
                      <span
                        style={{ color: isDark ? "#a1a1aa" : "#52525b" }}
                        className="font-mono font-bold uppercase text-[11px]"
                      >
                        Project Date
                      </span>
                      <span
                        style={{ color: isDark ? "#ffffff" : "#111111" }}
                        className="font-mono font-bold"
                      >
                        {selectedProject.date ?? "—"}
                      </span>
                    </div>
                    <div className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <span
                        style={{ color: isDark ? "#a1a1aa" : "#52525b" }}
                        className="font-mono font-bold uppercase text-[11px] shrink-0"
                      >
                        Source / Live URL
                      </span>
                      {selectedProject.live !== "#" ? (
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: isDark ? "#ffffff" : "#111111" }}
                          className="font-mono font-bold underline underline-offset-2 break-all hover:opacity-75 transition-opacity"
                        >
                          {selectedProject.live}
                        </a>
                      ) : (
                        <span
                          style={{ color: isDark ? "#71717a" : "#a1a1aa" }}
                          className="font-mono"
                        >
                          —
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title + tags */}
                  <div>
                    <h4
                      style={{ color: isDark ? "#ffffff" : "#111111" }}
                      className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight mb-3"
                    >
                      {selectedProject.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,0.08)"
                              : "rgba(0,0,0,0.05)",
                            borderColor: isDark ? "#ffffff" : "#111111",
                            color: isDark ? "#ffffff" : "#111111",
                          }}
                          className="px-2.5 py-0.5 border-2 text-[11px] font-mono font-black uppercase tracking-wider rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{ color: isDark ? "#d4d4d8" : "#27272a" }}
                    className="text-xs sm:text-sm leading-relaxed font-medium flex-1"
                  >
                    {selectedProject.longDescription ||
                      selectedProject.description}
                  </p>

                  {/* Action buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {selectedProject.github !== "#" ? (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono font-black uppercase border-2 transition-all cursor-pointer ${
                          isDark
                            ? "bg-[#141414] text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                            : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
                        }`}
                      >
                        <Github size={15} /> GitHub Repo
                      </a>
                    ) : (
                      <span
                        style={{
                          borderColor: isDark
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.2)",
                          color: isDark
                            ? "rgba(255,255,255,0.4)"
                            : "rgba(0,0,0,0.4)",
                        }}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 text-xs sm:text-sm font-mono font-bold uppercase rounded-xl cursor-not-allowed"
                      >
                        <Github size={15} /> Private Archive
                      </span>
                    )}
                    {selectedProject.live !== "#" ? (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 font-mono font-black uppercase border-2 transition-all cursor-pointer ${
                          isDark
                            ? "bg-white text-black border-white shadow-[3px_3px_0px_#ffffff] hover:bg-black hover:text-white"
                            : "bg-[#111111] text-white border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-white hover:text-black"
                        }`}
                      >
                        <ExternalLink size={15} /> Launch Website
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Project Navigation Bar (Back / Next) ── */}
            <div
              style={{
                background: isDark ? "#0f0f0f" : "#f4f4f0",
                borderTopColor: isDark ? "#ffffff" : "#111111",
              }}
              className="shrink-0 border-t-[2.5px] px-4 sm:px-6 py-3.5 flex items-center justify-between select-none"
            >
              <button
                type="button"
                onClick={handlePrevProject}
                aria-label="Previous project"
                className={`comic-btn-secondary flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                    : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
                }`}
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
                <span>Back</span>
              </button>

              {currentIndex !== -1 && (
                <div className="flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-widest text-current">
                  <span className="hidden sm:inline opacity-70">CASE FILE</span>
                  <span className="px-2.5 py-1 border-2 border-current rounded-lg bg-black/5 dark:bg-white/10 font-bold shadow-[2px_2px_0px_currentColor]">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={handleNextProject}
                aria-label="Next project"
                className={`comic-btn-secondary flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl font-mono text-xs font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                  isDark
                    ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#ffffff]"
                    : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[4px_4px_0px_#111111]"
                }`}
              >
                <span>Next</span>
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
