"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

type BackToTopProps = {
  show: boolean;
  isDark: boolean;
};

export const BackToTop: React.FC<BackToTopProps> = ({ show, isDark }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={`fixed bottom-20 right-6 z-40 p-2.5 rounded-full border cursor-pointer transition-colors ${
            isDark
              ? "bg-[#111113] text-zinc-300 border-zinc-800 hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
              : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300"
          }`}
        >
          <ChevronUp size={18} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
