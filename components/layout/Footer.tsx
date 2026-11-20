"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "@/lib/animations";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{ borderColor: "var(--border-color)" }}
      className="relative z-10 py-10 border-t"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400"
      >
        <span className="font-medium text-current">Kean Gabriel Salvahan</span>
        <motion.p variants={fadeIn}>
          © 2026 Kean Gabriel Salvahan. All rights reserved.
        </motion.p>
      </motion.div>
    </footer>
  );
};
