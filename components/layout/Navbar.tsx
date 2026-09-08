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
      style={{ background: "var(--bg-nav)" }}
      className="fixed top-0 w-full z-50 border-b-[2.5px] border-current backdrop-blur-md transition-colors duration-200"
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-lg font-black tracking-widest font-mono px-2.5 py-1 border-2 transition-all cursor-pointer ${
            isDark
              ? "bg-black text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black"
              : "bg-white text-black border-black shadow-[2px_2px_0px_#000000] hover:bg-black hover:text-white"
          }`}
        >
          KS.
        </motion.a>

        {/* Desktop Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          <div className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:underline underline-offset-4 decoration-2 transition-all opacity-80 hover:opacity-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 border-2 transition-all cursor-pointer ${
              isDark
                ? "bg-black text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black"
                : "bg-white text-black border-black shadow-[2px_2px_0px_#000000] hover:bg-black hover:text-white"
            }`}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className={`p-2 border-2 sm:hidden transition-all cursor-pointer ${
              isDark
                ? "bg-black text-white border-white shadow-[2px_2px_0px_#ffffff] hover:bg-white hover:text-black"
                : "bg-white text-black border-black shadow-[2px_2px_0px_#000000] hover:bg-black hover:text-white"
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
            className={`sm:hidden border-t-[2.5px] border-current px-6 py-4 flex flex-col gap-2 ${
              isDark ? "bg-black" : "bg-white"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm font-bold uppercase tracking-wider hover:underline underline-offset-4"
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
