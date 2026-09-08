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
        className="flex flex-col gap-2 mb-10"
      >
        <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
          CHAPTER 06 // CREDENTIALS
        </div>
        <div className="flex items-center gap-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-current">
            Certifications & Badges ({certifications.length})
          </h3>
          <div className="h-[2px] bg-current opacity-30 flex-grow" />
        </div>
        <p className="text-current/70 text-xs sm:text-sm font-medium">
          Official certifications, program completions, and professional badges
          earned across computer science and intelligent systems.
        </p>
      </motion.div>

      {/* Paginated grid + slider arrows */}
      <div className="relative overflow-hidden p-1 -m-1">
        {/* Grid */}
        <AnimatePresence mode="wait" custom={certDirection}>
          <motion.div
            key={`${isMobile ? "m" : "d"}-${currentCertPage}`}
            custom={certDirection}
            variants={certSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {visible.map((cert) => {
              const isBadge = cert.category === "Badge";
              return (
                <motion.div
                  key={cert.title}
                  variants={certCardItemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => onSelectCert(cert)}
                  style={{
                    background: isDark ? "#141414" : "#ffffff",
                    color: isDark ? "#ffffff" : "#111111",
                    borderColor: isDark ? "#ffffff" : "#111111",
                    boxShadow: isDark
                      ? "4px 4px 0px #ffffff"
                      : "4px 4px 0px #111111",
                  }}
                  className="group flex items-center gap-3.5 p-3.5 rounded-xl border-2 active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                >
                  {/* Icon Box */}
                  <div
                    style={{
                      background: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.05)",
                      borderColor: isDark ? "#ffffff" : "#111111",
                      color: isDark ? "#ffffff" : "#111111",
                      boxShadow: isDark
                        ? "2px 2px 0px #ffffff"
                        : "2px 2px 0px #111111",
                    }}
                    className="shrink-0 p-2.5 rounded-lg border-2 text-current"
                  >
                    <div className="scale-90">{cert.icon}</div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <p
                      style={{ color: isDark ? "#ffffff" : "#111111" }}
                      className="font-black text-xs truncate uppercase tracking-tight"
                    >
                      {cert.title}
                    </p>
                    <p
                      style={{ color: isDark ? "#a1a1aa" : "#52525b" }}
                      className="text-[10px] font-mono mt-0.5 truncate font-medium"
                    >
                      {cert.issuer}
                    </p>
                    <div className="flex items-center justify-between mt-1.5 gap-2">
                      <p
                        style={{ color: isDark ? "#a1a1aa" : "#52525b" }}
                        className="font-mono text-[9px] font-bold"
                      >
                        {cert.year}
                      </p>
                      <span
                        style={{
                          background: isDark ? "#ffffff" : "#111111",
                          color: isDark ? "#000000" : "#ffffff",
                          borderColor: isDark ? "#ffffff" : "#111111",
                        }}
                        className="shrink-0 text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md border-2"
                      >
                        {isBadge ? "BADGE" : "CERT"}
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
          <div className="flex items-center justify-between mt-8">
            {/* Prev */}
            <button
              onClick={() => goToCertPage(Math.max(currentCertPage - 1, 0))}
              disabled={currentCertPage === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase border-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer ${
                isDark
                  ? "bg-[#141414] text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                  : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
              }`}
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
              Prev
            </button>

            {/* Page dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToCertPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  style={{
                    borderColor: isDark ? "#ffffff" : "#111111",
                    background:
                      idx === currentCertPage
                        ? isDark
                          ? "#ffffff"
                          : "#111111"
                        : "transparent",
                  }}
                  className={`border-2 rounded-full transition-all duration-200 cursor-pointer ${
                    idx === currentCertPage
                      ? "w-6 h-2.5"
                      : "w-2.5 h-2.5 hover:opacity-60"
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase border-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer ${
                isDark
                  ? "bg-[#141414] text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                  : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
              }`}
            >
              Next
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
