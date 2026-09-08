"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-10 text-center border-t-2 border-current">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="flex flex-col items-center gap-3"
      >
        <div className="font-mono font-black text-sm uppercase tracking-widest text-current">
          [ KS. ] KEAN SALVAHAN
        </div>
        <motion.p
          variants={fadeIn}
          className="text-xs font-mono text-current/60 uppercase tracking-wider"
        >
          © 2026 Kean Gabriel Salvahan. Inked & Coded in Intelligent Systems.
        </motion.p>
      </motion.div>
    </footer>
  );
};
