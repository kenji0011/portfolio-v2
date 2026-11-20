"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false }
);

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GithubActivitySectionProps = {
  isDark: boolean;
};

const GITHUB_USERNAME = "kenji0011";

export const GithubActivitySection: React.FC<GithubActivitySectionProps> = ({
  isDark,
}) => {
  const githubScrollRef = useRef<HTMLDivElement>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadContributions = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        `/api/github-contributions?username=${GITHUB_USERNAME}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as { contributions?: ContributionDay[] };
      if (!Array.isArray(json.contributions) || json.contributions.length === 0) {
        throw new Error("Empty contributions");
      }
      setContributions(json.contributions);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  // Auto-scroll GitHub calendar to latest activity once loaded
  useEffect(() => {
    const el = githubScrollRef.current;
    if (!el || contributions.length === 0) return;

    const scrollToRecent = () => {
      if (el && el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth - el.clientWidth;
      }
    };

    const t1 = setTimeout(scrollToRecent, 150);
    const t2 = setTimeout(scrollToRecent, 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [contributions]);

  return (
    <motion.section
      id="github-stats"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      className="scroll-mt-28"
    >
      <motion.div
        variants={fadeUp}
        className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3"
      >
        <div className="space-y-1.5">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Open Source
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
            GitHub Activity
          </h3>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
            isDark
              ? "border-zinc-800 bg-[#111113] text-zinc-300 hover:bg-zinc-900 hover:text-white"
              : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950"
          }`}
        >
          <span>@{GITHUB_USERNAME}</span>
          <ExternalLink size={12} />
        </a>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={`rounded-xl border p-5 sm:p-7 flex flex-col ${
          isDark
            ? "bg-[#111113] border-zinc-800"
            : "bg-white border-zinc-200"
        }`}
      >
        {error ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Unable to load GitHub contributions right now.
            </p>
            <button
              type="button"
              onClick={loadContributions}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isDark
                  ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                  : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              <RefreshCw size={13} />
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable calendar view */}
            <div
              ref={githubScrollRef}
              className="w-full overflow-x-auto no-scrollbar py-1"
            >
              <div className="w-max min-w-full flex justify-center px-1">
                <ActivityCalendar
                  data={contributions}
                  loading={loading}
                  colorScheme={isDark ? "dark" : "light"}
                  maxLevel={4}
                  labels={{
                    totalCount: "{{count}} contributions in the last year",
                  }}
                  theme={{
                    light: [
                      "#f4f4f5",
                      "#d4d4d8",
                      "#a1a1aa",
                      "#52525b",
                      "#18181b",
                    ],
                    dark: [
                      "#18181b",
                      "#27272a",
                      "#52525b",
                      "#a1a1aa",
                      "#fafafa",
                    ],
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
          </>
        )}
      </motion.div>
    </motion.section>
  );
};
