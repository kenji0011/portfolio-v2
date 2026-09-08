"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { GithubActivitySection } from "@/components/sections/GithubActivitySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProjectModal } from "@/components/sections/ProjectModal";
import { ImageZoomModal } from "@/components/sections/ImageZoomModal";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { CertificationModal } from "@/components/sections/CertificationModal";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingAiCopilot } from "@/components/ai/FloatingAiCopilot";
import { BackToTop } from "@/components/ui/BackToTop";
import { Project, Certification } from "@/types/portfolio";

export default function Portfolio() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [certPage, setCertPage] = useState(0);
  const [certDirection, setCertDirection] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  // Responsive mobile screen check (< 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      requestAnimationFrame(() => setIsDark(saved === "dark"));
    }
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  };

  const goToCertPage = (newPage: number) => {
    setCertDirection(newPage >= certPage ? 1 : -1);
    setCertPage(newPage);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setGalleryIndex(0);
  };

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      style={{ background: "var(--bg-page)", color: "var(--text-base)" }}
      className={`relative min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden ${
        isDark ? "dark" : ""
      }`}
    >
      {/* Comic Halftone Background */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none ${
          isDark ? "comic-dots-dark" : "comic-dots-light"
        }`}
      />

      {/* Comic Navigation */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-36">
        {/* CHAPTER 01: HERO / ORIGIN */}
        <HeroSection isDark={isDark} />

        {/* CHAPTER 02: ARSENAL / EXPERTISE */}
        <ExpertiseSection isDark={isDark} />

        {/* CHAPTER 03: TOOLKIT / TECH STACK */}
        <TechStackSection />

        {/* CHAPTER 04: ACTIVITY LOG / GITHUB */}
        <GithubActivitySection isDark={isDark} />

        {/* CHAPTER 05: CASE FILES / FEATURED PROJECTS */}
        <ProjectsSection
          isDark={isDark}
          showAllProjects={showAllProjects}
          setShowAllProjects={setShowAllProjects}
          onSelectProject={handleSelectProject}
        />

        {/* CHAPTER 06: CREDENTIALS / CERTIFICATIONS */}
        <CertificationsSection
          isDark={isDark}
          isMobile={isMobile}
          certPage={certPage}
          certDirection={certDirection}
          goToCertPage={goToCertPage}
          onSelectCert={setSelectedCert}
        />

        {/* CHAPTER 07: TRANSMISSION / CONTACT */}
        <ContactSection isDark={isDark} />
      </main>

      {/* Project Detail Modal */}
      <ProjectModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
        galleryIndex={galleryIndex}
        setGalleryIndex={setGalleryIndex}
        setIsZoomed={setIsZoomed}
        isDark={isDark}
      />

      {/* Fullscreen Image Zoom Overlay */}
      <ImageZoomModal
        isZoomed={isZoomed}
        onClose={() => setIsZoomed(false)}
        project={selectedProject}
        galleryIndex={galleryIndex}
      />

      {/* Certification Modal */}
      <CertificationModal
        selectedCert={selectedCert}
        onClose={() => setSelectedCert(null)}
        isDark={isDark}
      />

      {/* Floating Back to Top Button */}
      <BackToTop
        show={
          showBackToTop &&
          !selectedProject &&
          !selectedCert &&
          !isZoomed &&
          !aiChatOpen
        }
        isDark={isDark}
      />

      {/* Floating AI Copilot */}
      <FloatingAiCopilot
        isDark={isDark}
        isOpen={aiChatOpen}
        setIsOpen={setAiChatOpen}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}