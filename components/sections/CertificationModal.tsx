"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Certification } from "@/types/portfolio";

type CertificationModalProps = {
  selectedCert: Certification | null;
  onClose: () => void;
  isDark: boolean;
};

export const CertificationModal: React.FC<CertificationModalProps> = ({
  selectedCert,
  onClose,
  isDark,
}) => {
  return (
    <AnimatePresence>
      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.45)",
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border ${
              isDark
                ? "bg-[#111113] text-zinc-100 border-zinc-800"
                : "bg-white text-zinc-950 border-zinc-200"
            }`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={`absolute top-4 right-4 z-20 p-2 rounded-lg border transition-colors cursor-pointer ${
                isDark
                  ? "bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white"
                  : "bg-white/90 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              <X size={16} strokeWidth={2} />
            </button>

            {/* Certificate image — full visible, no cropping */}
            {selectedCert.image ? (
              <div
                className={`relative w-full border-b flex items-center justify-center p-5 sm:p-6 ${
                  isDark
                    ? "bg-zinc-950/60 border-zinc-800"
                    : "bg-zinc-50 border-zinc-200"
                }`}
              >
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  width={900}
                  height={700}
                  className={`w-full h-auto object-contain rounded-lg border ${
                    isDark ? "border-zinc-800" : "border-zinc-200"
                  }`}
                  style={{ maxHeight: "55vh" }}
                />
              </div>
            ) : (
              <div
                className={`w-full h-44 border-b flex items-center justify-center ${
                  isDark
                    ? "bg-zinc-950/60 border-zinc-800"
                    : "bg-zinc-50 border-zinc-200"
                }`}
              >
                <div
                  className={`p-5 rounded-xl border ${
                    isDark
                      ? "bg-zinc-900 text-zinc-200 border-zinc-800"
                      : "bg-white text-zinc-800 border-zinc-200"
                  }`}
                >
                  {selectedCert.icon}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1.5">
                  {selectedCert.year} · {selectedCert.issuer}
                </p>
                <h4 className="text-lg sm:text-xl font-semibold tracking-tight">
                  {selectedCert.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {selectedCert.description}
              </p>
              {selectedCert.credential &&
                selectedCert.credential !== "#" &&
                selectedCert.credential !== "" && (
                  <a
                    href={selectedCert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isDark
                        ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-300"
                        : "bg-zinc-900 text-white hover:bg-zinc-700"
                    }`}
                  >
                    <ExternalLink size={14} /> Verify Credential
                  </a>
                )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
