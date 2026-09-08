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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.08, x: -2, y: -2 }}
          whileTap={{ scale: 0.95, x: 2, y: 2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={`fixed bottom-24 right-6 z-40 p-3 rounded-xl border-[2.5px] cursor-pointer transition-all ${
            isDark
              ? "bg-black text-white border-white shadow-[4px_4px_0px_#ffffff] hover:bg-white hover:text-black"
              : "bg-white text-[#111111] border-[#111111] shadow-[4px_4px_0px_#111111] hover:bg-[#111111] hover:text-white"
          }`}
        >
          <ChevronUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
