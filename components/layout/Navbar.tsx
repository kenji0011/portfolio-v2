"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { NavLink } from "@/types/portfolio";

type NavbarProps = {
  isDark: boolean;
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const navLinks: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#techstack" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <nav
      style={{ background: "var(--bg-nav)", borderColor: "var(--border-color)" }}
      className="fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-200"
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-base font-semibold tracking-tight text-current hover:opacity-70 transition-opacity"
        >
          Kean Salvahan
        </a>

        {/* Desktop Navigation Links */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? "border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className={`p-2 rounded-lg border sm:hidden transition-colors cursor-pointer ${
              isDark
                ? "border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
                : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
            }`}
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`sm:hidden border-t px-6 py-4 flex flex-col gap-1 ${
              isDark
                ? "bg-[#09090b] border-zinc-800"
                : "bg-[#fafafa] border-zinc-200"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
