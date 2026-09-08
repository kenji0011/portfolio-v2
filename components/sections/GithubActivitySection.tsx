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
      <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
        <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
          CHAPTER 04 // ACTIVITY LOG
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
            GitHub Activity
          </h3>
          <div className="h-[2px] bg-current opacity-30 flex-grow" />
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        style={{ background: "var(--bg-card)", color: "var(--text-base)" }}
        className="rounded-xl border-[2.5px] border-current p-4 sm:p-6 lg:p-8 shadow-[6px_6px_0px_currentColor] flex flex-col"
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
                light: ["#ebebeb", "#c6c6c6", "#8e8e8e", "#4f4f4f", "#111111"],
                dark: ["#181818", "#383838", "#6a6a6a", "#b5b5b5", "#ffffff"],
              }}
              style={{ color: "currentColor", fontFamily: "inherit" }}
              blockSize={13}
            />
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="mt-3 pt-3 border-t-2 border-current/15 flex items-center justify-between text-[11px] font-mono font-bold uppercase sm:hidden">
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer ${
              isDark
                ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[3px_3px_0px_#ffffff]"
                : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[3px_3px_0px_#111111]"
            }`}
          >
            <span>◂ 1 Year Ago</span>
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 transition-all cursor-pointer font-black ${
              isDark
                ? "bg-[#141414] text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black hover:shadow-[3px_3px_0px_#ffffff]"
                : "bg-white text-[#111111] border-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#111111] hover:text-white hover:shadow-[3px_3px_0px_#111111]"
            }`}
          >
            <span>Recent (Now) ▸</span>
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};
