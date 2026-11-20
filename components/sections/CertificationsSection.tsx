"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  fadeUp,
  certSlideVariants,
  certCardItemVariants,
} from "@/lib/animations";
import { certifications } from "@/data/certifications";
import { Certification } from "@/types/portfolio";

type CertificationsSectionProps = {
  isDark: boolean;
  isMobile: boolean;
  certPage: number;
  certDirection: number;
  goToCertPage: (page: number) => void;
  onSelectCert: (cert: Certification) => void;
};

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  isDark,
  isMobile,
  certPage,
  certDirection,
  goToCertPage,
  onSelectCert,
}) => {
  const certsPerPage = isMobile ? 5 : 12;
  const totalPages = Math.ceil(certifications.length / certsPerPage);
  const currentCertPage = Math.min(certPage, Math.max(0, totalPages - 1));
  const visible = certifications.slice(
    currentCertPage * certsPerPage,
    (currentCertPage + 1) * certsPerPage
  );

  return (
    <section id="certifications" className="scroll-mt-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="mb-8 space-y-1.5"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Credentials
        </p>
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-current">
          Certifications & Badges{" "}
          <span className="text-zinc-400 dark:text-zinc-500 font-normal text-xl">
            ({certifications.length})
          </span>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
          Official certifications, program completions, and professional badges
          earned across data analytics, computer science, and intelligent
          systems.
        </p>
      </motion.div>

      {/* Paginated grid */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={certDirection}>
          <motion.div
            key={`${isMobile ? "m" : "d"}-${currentCertPage}`}
            custom={certDirection}
            variants={certSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          >
            {visible.map((cert) => {
              const isBadge = cert.category === "Badge";
              return (
                <motion.div
                  key={cert.title}
                  variants={certCardItemVariants}
                  onClick={() => onSelectCert(cert)}
                  className={`group flex items-center gap-3.5 p-4 rounded-xl border transition-colors cursor-pointer ${
                    isDark
                      ? "bg-[#111113] border-zinc-800 hover:border-zinc-600"
                      : "bg-white border-zinc-200 hover:border-zinc-400"
                  }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`p-2.5 rounded-lg border shrink-0 transition-colors ${
                      isDark
                        ? "bg-zinc-900 border-zinc-800 text-zinc-300 group-hover:text-white"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700 group-hover:text-zinc-950"
                    }`}
                  >
                    {cert.icon}
                  </div>

                  {/* Text Content */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs leading-snug truncate text-current">
                      {cert.title}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-between mt-2 gap-2">
                      <p className="font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
                        {cert.year}
                      </p>
                      <span
                        className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          isBadge
                            ? isDark
                              ? "bg-zinc-800 text-zinc-200"
                              : "bg-zinc-200/80 text-zinc-800"
                            : isDark
                            ? "bg-zinc-900 text-zinc-400 border border-zinc-800"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        {isBadge ? "Badge" : "Certificate"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            {/* Prev */}
            <button
              onClick={() => goToCertPage(Math.max(currentCertPage - 1, 0))}
              disabled={currentCertPage === 0}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer ${
                isDark
                  ? "bg-[#111113] text-zinc-200 border-zinc-800 hover:bg-zinc-900"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              <ChevronLeft size={14} strokeWidth={2} />
              Prev
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToCertPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  className={`rounded-full transition-all duration-200 cursor-pointer ${
                    idx === currentCertPage
                      ? isDark
                        ? "w-5 h-2 bg-zinc-100"
                        : "w-5 h-2 bg-zinc-900"
                      : isDark
                      ? "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                      : "w-2 h-2 bg-zinc-300 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() =>
                goToCertPage(Math.min(currentCertPage + 1, totalPages - 1))
              }
              disabled={currentCertPage >= totalPages - 1}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer ${
                isDark
                  ? "bg-[#111113] text-zinc-200 border-zinc-800 hover:bg-zinc-900"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              Next
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
