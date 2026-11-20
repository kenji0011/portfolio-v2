"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink, Play, Download } from "lucide-react";
import { Project } from "@/types/portfolio";
import { projects } from "@/data/projects";

const isVideoFile = (src: string) => /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(src);

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
            backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.45)",
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl border overflow-hidden ${
              isDark
                ? "bg-[#111113] text-zinc-100 border-zinc-800"
                : "bg-white text-zinc-950 border-zinc-200"
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white"
                  : "bg-white/90 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <X size={16} strokeWidth={2} />
            </button>

            <div
              ref={contentScrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar"
            >
              {/* Two-column body */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-full">
                {/* LEFT: Image gallery */}
                <div
                  className={`relative flex flex-col border-b lg:border-b-0 lg:border-r overflow-hidden ${
                    isDark
                      ? "bg-zinc-950/60 border-zinc-800"
                      : "bg-zinc-50 border-zinc-200"
                  }`}
                >
                  {/* Main image */}
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] flex items-center justify-center p-4">
                    {selectedProject.gallery &&
                    selectedProject.gallery.length > 0 ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={galleryIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="relative w-full h-full p-2 flex items-center justify-center"
                        >
                          {isVideoFile(selectedProject.gallery[galleryIndex]) ? (
                            <video
                              src={selectedProject.gallery[galleryIndex]}
                              controls
                              playsInline
                              preload="metadata"
                              className="w-full h-full max-h-full object-contain rounded-lg bg-black"
                            />
                          ) : (
                            <Image
                              src={selectedProject.gallery[galleryIndex]}
                              alt={`${selectedProject.title} screenshot ${
                                galleryIndex + 1
                              }`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                              onClick={() => setIsZoomed(true)}
                              priority
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <div
                          className={`p-6 rounded-xl border ${
                            isDark
                              ? "bg-zinc-900 text-zinc-200 border-zinc-800"
                              : "bg-white text-zinc-800 border-zinc-200"
                          }`}
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
                            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg border transition-colors cursor-pointer ${
                              isDark
                                ? "bg-zinc-900/90 text-zinc-200 border-zinc-700 hover:bg-zinc-800"
                                : "bg-white/90 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                            }`}
                          >
                            <ChevronLeft size={16} strokeWidth={2} />
                          </button>
                          <button
                            onClick={() =>
                              setGalleryIndex(
                                (i) =>
                                  (i + 1) % selectedProject.gallery!.length
                              )
                            }
                            aria-label="Next image"
                            className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg border transition-colors cursor-pointer ${
                              isDark
                                ? "bg-zinc-900/90 text-zinc-200 border-zinc-700 hover:bg-zinc-800"
                                : "bg-white/90 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                            }`}
                          >
                            <ChevronRight size={16} strokeWidth={2} />
                          </button>
                        </>
                      )}
                  </div>

                  {/* Image previews / Thumbnails */}
                  {selectedProject.gallery &&
                    selectedProject.gallery.length > 1 && (
                      <div
                        className={`flex p-3 gap-2 border-t overflow-x-auto no-scrollbar ${
                          isDark
                            ? "bg-zinc-900/50 border-zinc-800"
                            : "bg-zinc-100/70 border-zinc-200"
                        }`}
                      >
                        <div className="flex gap-2 mx-auto px-1">
                          {selectedProject.gallery.map((imgSrc, idx) => (
                            <button
                              key={idx}
                              id={`thumbnail-${idx}`}
                              onClick={() => setGalleryIndex(idx)}
                              className={`relative shrink-0 w-12 h-9 sm:w-16 sm:h-11 rounded-md overflow-hidden border transition-all duration-150 cursor-pointer ${
                                idx === galleryIndex
                                  ? isDark
                                    ? "border-zinc-100 opacity-100"
                                    : "border-zinc-900 opacity-100"
                                  : isDark
                                  ? "border-zinc-800 opacity-50 hover:opacity-85"
                                  : "border-zinc-200 opacity-55 hover:opacity-90"
                              }`}
                            >
                              {isVideoFile(imgSrc) ? (
                                <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center">
                                  <video
                                    src={imgSrc}
                                    muted
                                    playsInline
                                    preload="metadata"
                                    className="w-full h-full object-cover opacity-75"
                                  />
                                  <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                                    <Play size={14} fill="currentColor" />
                                  </span>
                                </div>
                              ) : (
                                <Image
                                  src={imgSrc}
                                  alt={`Thumbnail ${idx + 1}`}
                                  fill
                                  sizes="70px"
                                  className="object-cover"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>

                {/* RIGHT: Info + description */}
                <div className="flex flex-col gap-5 p-6 sm:p-8">
                  {/* Title + tags */}
                  <div className="pr-8">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
                      <span>{selectedProject.tags[0]}</span>
                      {selectedProject.date && (
                        <>
                          <span>·</span>
                          <span>{selectedProject.date}</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-semibold tracking-tight leading-snug mb-3">
                      {selectedProject.title}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-0.5 text-[11px] font-medium rounded-md ${
                            isDark
                              ? "bg-zinc-900 text-zinc-300 border border-zinc-800"
                              : "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata details */}
                  <div
                    className={`rounded-xl border divide-y text-xs ${
                      isDark
                        ? "border-zinc-800 divide-zinc-800 bg-zinc-900/30"
                        : "border-zinc-200 divide-zinc-200 bg-zinc-50/70"
                    }`}
                  >
                    <div className="px-4 py-2.5 flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Category
                      </span>
                      <span className="font-medium">
                        {selectedProject.tags[0]}
                      </span>
                    </div>
                    <div className="px-4 py-2.5 flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Year
                      </span>
                      <span className="font-medium font-mono">
                        {selectedProject.date ?? "—"}
                      </span>
                    </div>
                    {selectedProject.live && selectedProject.live !== "#" && (
                      <div className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                        <span className="text-zinc-500 dark:text-zinc-400 shrink-0">
                          {selectedProject.live.includes("/releases")
                            ? "Release"
                            : "Live URL"}
                        </span>
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs underline underline-offset-2 break-all hover:opacity-75 transition-opacity"
                        >
                          {selectedProject.live}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 flex-1">
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
                        className={`text-xs sm:text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium border transition-colors cursor-pointer ${
                          isDark
                            ? "border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                            : "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100"
                        }`}
                      >
                        <Github size={15} /> GitHub Repo
                      </a>
                    ) : (
                      <span
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 border text-xs sm:text-sm font-medium rounded-lg cursor-not-allowed ${
                          isDark
                            ? "border-zinc-800/60 text-zinc-600"
                            : "border-zinc-200 text-zinc-400"
                        }`}
                      >
                        <Github size={15} /> Private Repository
                      </span>
                    )}
                    {selectedProject.live && selectedProject.live !== "#" ? (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs sm:text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors cursor-pointer ${
                          isDark
                            ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-300"
                            : "bg-zinc-900 text-white hover:bg-zinc-700"
                        }`}
                      >
                        {selectedProject.live.includes("/releases") ? (
                          <>
                            <Download size={15} /> Download APK
                          </>
                        ) : (
                          <>
                            <ExternalLink size={15} /> Visit Website
                          </>
                        )}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Project Navigation Bar */}
            <div
              className={`shrink-0 border-t px-4 sm:px-6 py-3 flex items-center justify-between select-none ${
                isDark
                  ? "bg-[#0d0d0f] border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <button
                type="button"
                onClick={handlePrevProject}
                aria-label="Previous project"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isDark
                    ? "bg-[#111113] text-zinc-200 border-zinc-800 hover:bg-zinc-900"
                    : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                <ChevronLeft size={15} strokeWidth={2} />
                <span>Previous</span>
              </button>

              {currentIndex !== -1 && (
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              )}

              <button
                type="button"
                onClick={handleNextProject}
                aria-label="Next project"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isDark
                    ? "bg-[#111113] text-zinc-200 border-zinc-800 hover:bg-zinc-900"
                    : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                }`}
              >
                <span>Next</span>
                <ChevronRight size={15} strokeWidth={2} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
