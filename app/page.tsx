"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Award,
  ShieldCheck,
  BadgeCheck,
  Star,
  Send,
  User,
  AtSign,
  MessageSquare,
  Brain,
  Cpu,
} from "lucide-react";
import { useState } from "react";

// ── Animation variants ──────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardHover = { y: -8, scale: 1.02 };

// ── Floating orb component ──────────────────────────────────────────────
function Orb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`}
      animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ── Data ────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "Shuey's Kamote Chips",
    description:
      "My 1st project in my college years. I used C# and Windows Forms to create a simple inventory management system for a small business. The system allows the user to add, edit, delete, and search for products in the inventory. ",
    tags: ["C#", "Windows Forms", "Inventory Management"],
    icon: <Cpu size={24} />,
    image: "/shueyschips.jpg",
    github: "#",
    live: "#",
  },
  {
    title: "GetGoods — E-Commerce App",
    description:
      "GetGoods is a full-featured e-commerce website application that allows users to browse, add to cart, and purchase goods.",
    tags: ["Web Application", "E-Commerce", "UI/UX"],
    icon: <Brain size={24} />,
    image: "/getgoodsapp.jpg",
    github: "https://github.com/kenji0011/Projects.git",
    live: "#",
  },
  {
    title: "GetGoods — Mobile Shopping App",
    description:
      "An alternate design variant of the GetGoods application featuring a refined purple/dark theme with updated UI components and improved user experience flow.",
    tags: ["Mobile", "E-Commerce", "UI/UX"],
    icon: <Terminal size={24} />,
    image: "/getgoodsapp.jpg",
    github: "#",
    live: "#",
  },
];

type Certification = {
  title: string;
  issuer: string;
  icon: React.ReactNode;
  year: string;
  description: string;
  image: string | null;
  credential: string;
};

const certifications: Certification[] = [
  {
    title: "THE ROLE OF CLOUD IN AI AND BIG DATA",
    issuer: "Computer Programming Services",
    icon: <BadgeCheck size={28} />,
    year: "2025",
    description: "Introduction to Cloud Computing and its role in AI and Big Data.",
    image: "/images/cert1.jpg",   // Add: "/certs/tensorflow.jpg"
    credential: "#", // Add your credential URL
  },
  {
    title: "HANDS ON FIGMA UI/UX DESIGN WORKSHOP",
    issuer: "Computer Programming Services",
    icon: <Award size={28} />,
    year: "2025",
    description: "Hands-on workshop on Figma UI/UX design.",
    image: "/images/cert2.jpg",   // Add: "/certs/aws-ml.jpg"
    credential: "#",
  },
  {
    title: "Java Software Engineering 1",
    issuer: "CODECHUM",
    icon: <Star size={28} />,
    year: "2025",
    description: "Introduction to Java and its role in software engineering.",
    image: "/images/cert3.jpg",   // Add: "/certs/deeplearning.jpg"
    credential: "#",
  },
  {
    title: "Critical Thinking in the AI Era",
    issuer: "HP LIFE",
    icon: <ShieldCheck size={28} />,
    year: "2026",
    description: "HP LIFE Online Course on Critical Thinking in the AI Era to make better decisions.",
    image: "/images/cert4.jpg",
    credential: "#",
  },
  // ── Add your next certifications below ──
  {
    title: "AI for Beginners",
    issuer: "HP LIFE",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "AN online course on basic understanding of the impact AI on the technological landscape",
    image: "/images/cert5.jpg",
    credential: "#",
  },
  {
    title: "Your Certificate 6",
    issuer: "Issuer Name",
    icon: <Award size={28} />,
    year: "2025",
    description: "Short description of what this certification covers.",
    image: null,
    credential: "#",
  },
  {
    title: "Your Certificate 7",
    issuer: "Issuer Name",
    icon: <Star size={28} />,
    year: "2024",
    description: "Short description of what this certification covers.",
    image: null,
    credential: "#",
  },
  {
    title: "Your Certificate 8",
    issuer: "Issuer Name",
    icon: <Cpu size={28} />,
    year: "2024",
    description: "Short description of what this certification covers.",
    image: null,
    credential: "#",
  },
];

// ── Main Component ──────────────────────────────────────────────────────
export default function Portfolio() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#050816] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">

      {/* ── Animated Background ─────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,179,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Orbs */}
        <Orb className="w-[600px] h-[600px] bg-cyan-500 top-[-10%] left-[-10%]" delay={0} />
        <Orb className="w-[500px] h-[500px] bg-violet-600 top-[40%] right-[-10%]" delay={3} />
        <Orb className="w-[400px] h-[400px] bg-blue-600 bottom-[-5%] left-[30%]" delay={6} />
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-[#050816]/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"
          >
            KS.
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-8 text-sm font-medium text-slate-400"
          >
            {["about", "projects", "certifications", "contact"].map((link) => (
              <motion.a
                key={link}
                href={`#${link}`}
                className="capitalize hover:text-cyan-400 transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-40">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="min-h-[80vh] flex flex-col justify-center pt-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text side */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex-1 space-y-6"
            >
              <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-lg">
                Hi, my name is
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold text-slate-100 tracking-tight leading-none"
              >
                Kean Salvahan.
              </motion.h1>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-5xl font-bold text-slate-500"
              >
                I build{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  AI/ML
                </span>{" "}
                solutions.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="max-w-xl text-lg text-slate-400 leading-relaxed"
              >
                I&apos;m an AI/ML Engineer specializing in building intelligent systems,
                optimizing machine learning models, and turning complex data into scalable applications.
              </motion.p>
              <motion.div variants={fadeUp} className="pt-4 flex gap-4 flex-wrap">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold rounded-lg transition-all shadow-lg shadow-cyan-500/20"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 rounded-lg transition-all"
                >
                  Contact Me
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Photo side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex-shrink-0 relative"
            >
              {/* Glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-violet-500 to-transparent p-[2px] blur-sm scale-105"
              />
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/10 bg-slate-800 shadow-2xl shadow-cyan-500/20"
              >
                {/* Photo placeholder — replace src with your actual image path when ready */}
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                  <User size={64} className="opacity-30" />
                  <span className="text-xs font-mono opacity-50">photo coming soon</span>
                </div>
                {/* Once you have the photo: uncomment below and remove the div above */}
                {<Image src="/pogiko.jpg" alt="Kean Salvahan" fill className="object-cover" />}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT & SKILLS ───────────────────────────────────────── */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-28"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">About Me</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>
          <div className="max-w-2xl">
            <motion.div variants={fadeUp} className="text-slate-400 space-y-4 leading-relaxed text-base">
              <p>
                Hello! I am Kean a.k.a Kenji. I enjoy creating things that live on the intersection of data and software engineering.
                My interest in AI started back when I was exploring data visualization and quickly evolved
                into building complex neural networks.
              </p>
              <p>
                Fast-forward to today, I&apos;ve had the privilege of working on various machine learning
                projects, from natural language processing to computer vision.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* ── TECH STACK ───────────────────────────────────────────── */}
        <motion.section
          id="techstack"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="scroll-mt-28"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">Tech Stack</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>

          {/* Marquee – 2 rows, no labels */}
          {[
            {
              id: "row1",
              dir: -1,
              speed: 32,
              items: [
                { name: "Python", icon: "python" },
                { name: "Java", icon: "java" },
                { name: "C#", icon: "csharp" },
                { name: "JavaScript", icon: "javascript" },
                { name: "TypeScript", icon: "typescript" },
                { name: "HTML5", icon: "html5" },
                { name: "CSS3", icon: "css3" },
                { name: "SQL", icon: "mysql" },
                { name: "React", icon: "react" },
                { name: "Next.js", icon: "nextjs" },
                { name: "Tailwind", icon: "tailwindcss" },
                { name: "FastAPI", icon: "fastapi" },
              ],
            },
            {
              id: "row2",
              dir: 1,
              speed: 36,
              items: [
                { name: "TensorFlow", icon: "tensorflow" },
                { name: "PyTorch", icon: "pytorch" },
                { name: "NumPy", icon: "numpy" },
                { name: "Pandas", icon: "pandas" },
                { name: "Docker", icon: "docker" },
                { name: "Git", icon: "git" },
                { name: "GitHub", icon: "github" },
                { name: "VS Code", icon: "vscode" },
                { name: "Linux", icon: "linux" },
                { name: "Firebase", icon: "firebase" },
                { name: "PostgreSQL", icon: "postgresql" },
                { name: "Figma", icon: "figma" },
              ],
            },
          ].map((row) => (
            <motion.div key={row.id} variants={fadeUp} className="mb-6 last:mb-0">
              {/* Outer mask — fade edges */}
              <div
                className="relative overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <motion.div
                  className="flex gap-4 w-max"
                  animate={{ x: row.dir === -1 ? ["-0%", "-50%"] : ["-50%", "-0%"] }}
                  transition={{ duration: row.speed, repeat: Infinity, ease: "linear" }}
                >
                  {[...row.items, ...row.items].map((tech, i) => (
                    <motion.div
                      key={`${tech.name}-${i}`}
                      whileHover={{ y: -6, scale: 1.12 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all cursor-default shrink-0 w-20"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        width={36}
                        height={36}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                        }}
                      />
                      <span className="text-[10px] font-mono text-slate-400 text-center leading-tight">{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* ── FEATURED PROJECTS ────────────────────────────────────── */}
        <section id="projects" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex items-center gap-4 mb-12"
          >
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">Featured Projects</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover={cardHover}
                className="group flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-cyan-500/40 hover:bg-white/[0.06] transition-colors"
              >
                {/* Project image banner */}
                {project.image ? (
                  <div className="relative w-full h-40 overflow-hidden bg-slate-800">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-36 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-white/5">
                    <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity">
                      {project.icon}
                    </div>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-base font-bold text-slate-200 group-hover:text-cyan-400 transition-colors leading-snug">
                      {project.title}
                    </h4>
                    <div className="flex gap-2 text-slate-500 ml-2 shrink-0">
                      <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#22d3ee" }} className="transition-colors">
                        <Github size={17} />
                      </motion.a>
                      <motion.a href={project.live} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, color: "#22d3ee" }} className="transition-colors">
                        <ExternalLink size={17} />
                      </motion.a>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs font-mono rounded-full border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CERTIFICATIONS & BADGES ──────────────────────────────── */}
        <section id="certifications" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex items-center gap-4 mb-12"
          >
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">Certifications & Badges</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-5"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.03 }}
                onClick={() => setSelectedCert(cert)}
                className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-violet-500/40 hover:bg-white/[0.06] transition-all cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-400 group-hover:text-violet-300 transition-colors">
                  {cert.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-200 text-sm leading-snug">{cert.title}</p>
                  <p className="text-slate-500 text-xs mt-1">{cert.issuer}</p>
                  <p className="text-violet-400 text-xs font-mono mt-2">{cert.year}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-600 group-hover:text-cyan-500 transition-colors">
                  Click to view ↗
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Certification Modal ─────────────────────────── */}
          <AnimatePresence>
            {selectedCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 30 }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0d1224] shadow-2xl shadow-violet-500/10"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="sticky top-4 left-full z-10 mr-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors float-right"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>

                  {/* Certificate image — full visible, no cropping */}
                  {selectedCert.image ? (
                    <div className="relative w-full bg-slate-900 flex items-center justify-center p-4">
                      <Image
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        width={900}
                        height={700}
                        className="w-full h-auto object-contain rounded-xl"
                        style={{ maxHeight: "60vh" }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-violet-900/40 to-cyan-900/20 flex items-center justify-center">
                      <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-400">
                        {selectedCert.icon}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-violet-400 text-xs font-mono mb-1">{selectedCert.year} · {selectedCert.issuer}</p>
                      <h4 className="text-xl font-bold text-slate-100">{selectedCert.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{selectedCert.description}</p>
                    {selectedCert.credential !== "#" && (
                      <a
                        href={selectedCert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/10 hover:from-violet-500/30 hover:to-cyan-500/20 border border-violet-500/30 hover:border-violet-500/60 text-violet-300 text-sm font-medium rounded-xl transition-all"
                      >
                        <ExternalLink size={14} /> View Credential
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── CONTACT CARD ─────────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex items-center gap-4 mb-12"
          >
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">Contact Me</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10 shadow-2xl shadow-cyan-500/5"
            >
              {/* Card glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-2 mb-8">
                <p className="text-cyan-400 font-mono text-sm">What&apos;s Next?</p>
                <h4 className="text-2xl font-bold text-slate-100">Get In Touch</h4>
                <p className="text-slate-400 text-sm">
                  I&apos;m currently open to new opportunities. Send me a message and I&apos;ll get back to you!
                </p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="relative z-10 space-y-4"
              >
                {/* Name */}
                <motion.div variants={fadeUp} className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/60 focus:bg-white/[0.07] rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 text-sm outline-none transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp} className="relative group">
                  <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/60 focus:bg-white/[0.07] rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 text-sm outline-none transition-all"
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp} className="relative group">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                  <textarea
                    placeholder="Your message..."
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/60 focus:bg-white/[0.07] rounded-xl pl-11 pr-4 py-3 text-slate-200 placeholder-slate-600 text-sm outline-none transition-all resize-none"
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp}>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                  >
                    {submitted ? (
                      <span className="flex items-center gap-2">✓ Message Sent!</span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-10 text-center border-t border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center gap-4"
        >
          <motion.div variants={fadeIn} className="flex gap-6">
            {[
              { icon: <Github size={20} />, href: "#" },
              { icon: <Linkedin size={20} />, href: "#" },
              { icon: <Mail size={20} />, href: "#" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                whileHover={{ scale: 1.2, color: "#22d3ee", y: -3 }}
                className="text-slate-500 transition-colors"
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
          <motion.p variants={fadeIn} className="text-xs font-mono text-slate-600">
            Built with Next.js, Tailwind &amp; Framer Motion
          </motion.p>
        </motion.div>
      </footer>
    </div>
  );
}