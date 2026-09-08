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
            backgroundColor: isDark ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.55)",
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: isDark ? "#141414" : "#ffffff",
              color: isDark ? "#f5f5f5" : "#111111",
              borderColor: isDark ? "#ffffff" : "#111111",
              boxShadow: isDark
                ? "10px 10px 0px #ffffff"
                : "10px 10px 0px #111111",
            }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border-[3.5px]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={`absolute top-4 right-4 z-20 p-2 rounded-lg border-2 active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer ${
                isDark
                  ? "bg-black text-white border-white shadow-[3px_3px_0px_#ffffff] hover:bg-white hover:text-black"
                  : "bg-white text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#111111] hover:text-white"
              }`}
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Certificate image — full visible, no cropping */}
            {selectedCert.image ? (
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f6f6f4",
                  borderBottomColor: isDark ? "#ffffff" : "#111111",
                }}
                className="relative w-full border-b-[2.5px] flex items-center justify-center p-4 sm:p-6"
              >
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  width={900}
                  height={700}
                  className="w-full h-auto object-contain rounded-lg border-2"
                  style={{
                    maxHeight: "55vh",
                    borderColor: isDark ? "#ffffff" : "#111111",
                    boxShadow: isDark
                      ? "4px 4px 0px #ffffff"
                      : "4px 4px 0px #111111",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  background: isDark ? "rgba(255,255,255,0.03)" : "#f6f6f4",
                  borderBottomColor: isDark ? "#ffffff" : "#111111",
                }}
                className="w-full h-44 border-b-[2.5px] flex items-center justify-center"
              >
                <div
                  style={{
                    background: isDark ? "#ffffff" : "#000000",
                    color: isDark ? "#000000" : "#ffffff",
                    borderColor: isDark ? "#ffffff" : "#000000",
                    boxShadow: isDark
                      ? "4px 4px 0px #ffffff"
                      : "4px 4px 0px #000000",
                  }}
                  className="p-6 rounded-2xl border-2"
                >
                  {selectedCert.icon}
                </div>
              </div>
            )}

            {/* Content */}
            <div
              className="p-6 space-y-4"
              style={{ background: isDark ? "#141414" : "#ffffff" }}
            >
              <div>
                <div
                  style={{
                    background: isDark
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                    borderColor: isDark ? "#ffffff" : "#111111",
                    color: isDark ? "#ffffff" : "#111111",
                  }}
                  className="inline-flex items-center gap-2 border-2 px-2.5 py-1 text-[11px] font-mono font-black uppercase tracking-wider mb-2 rounded-md"
                >
                  {selectedCert.year} · {selectedCert.issuer}
                </div>
                <h4
                  style={{ color: isDark ? "#ffffff" : "#111111" }}
                  className="text-xl sm:text-2xl font-black uppercase tracking-tight"
                >
                  {selectedCert.title}
                </h4>
              </div>
              <p
                style={{ color: isDark ? "#d4d4d8" : "#27272a" }}
                className="text-xs sm:text-sm leading-relaxed font-medium"
              >
                {selectedCert.description}
              </p>
              {selectedCert.credential !== "#" &&
                selectedCert.category === "Badge" && (
                  <a
                    href={selectedCert.credential}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider border-2 transition-all cursor-pointer ${
                      isDark
                        ? "bg-white text-black border-white shadow-[3px_3px_0px_#ffffff] hover:bg-black hover:text-white"
                        : "bg-[#111111] text-white border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-white hover:text-black"
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
