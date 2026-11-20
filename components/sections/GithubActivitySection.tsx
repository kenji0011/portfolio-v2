"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

type GithubActivitySectionProps = {
  isDark: boolean;
};

export const GithubActivitySection: React.FC<GithubActivitySectionProps> = ({
  isDark,
}) => {
  const githubScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll GitHub calendar to latest activity on initial render & load
  useEffect(() => {
    const el = githubScrollRef.current;
    if (!el) return;

    const scrollToRecent = () => {
      if (el && el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth - el.clientWidth;
      }
    };

    const t1 = setTimeout(scrollToRecent, 200);
    const t2 = setTimeout(scrollToRecent, 600);
    const t3 = setTimeout(scrollToRecent, 1200);
    const t4 = setTimeout(scrollToRecent, 2500);

    const observer = new MutationObserver(() => {
      scrollToRecent();
    });
    observer.observe(el, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.section
      id="github-stats"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="scroll-mt-28"
    >
      <motion.div variants={fadeUp} className="mb-8 space-y-1.5">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Open Source
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
          GitHub Activity
        </h3>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={`rounded-xl border p-5 sm:p-7 flex flex-col ${
          isDark
            ? "bg-[#111113] border-zinc-800"
            : "bg-white border-zinc-200"
        }`}
      >
        {/* Scrollable calendar view */}
        <div
          ref={githubScrollRef}
          className="w-full overflow-x-auto no-scrollbar py-1"
        >
          <div className="w-max min-w-full flex justify-center px-1">
            <GitHubCalendar
              username="kenji0011"
              colorScheme={isDark ? "dark" : "light"}
              theme={{
                light: ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"],
                dark: ["#18181b", "#27272a", "#52525b", "#a1a1aa", "#fafafa"],
              }}
              style={{ color: "currentColor", fontFamily: "inherit" }}
              blockSize={12}
            />
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs font-medium sm:hidden">
          <button
            type="button"
            onClick={() => {
              if (githubScrollRef.current) {
                githubScrollRef.current.scrollTo({
                  left: 0,
                  behavior: "smooth",
                });
              }
            }}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? "border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            ← 1 Year Ago
          </button>
          <button
            type="button"
            onClick={() => {
              if (githubScrollRef.current) {
                githubScrollRef.current.scrollTo({
                  left: githubScrollRef.current.scrollWidth,
                  behavior: "smooth",
                });
              }
            }}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? "border-zinc-800 text-zinc-300 hover:bg-zinc-900"
                : "border-zinc-200 text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            Recent →
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};
