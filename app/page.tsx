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
type Project = {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  icon: React.ReactNode;
  image: string | null;
  gallery?: string[];
  github: string;
  live: string;
  date?: string;
};

const projects: Project[] = [
  {
    title: "Shuey's Kamote Chips",
    description:
      "My 1st project in my college years. I used C# and Windows Forms to create a simple inventory management system for a small business. The system allows the user to add, edit, delete, and search for products in the inventory. ",
    longDescription:
      "This was my very first software project during college. Built with C# and Windows Forms, it served as a practical introduction to desktop application development. The system provided full CRUD functionality — allowing the business owner to manage product listings, track stock levels, and search the inventory quickly. It laid the foundation for my understanding of data persistence, UI layout, and event-driven programming.",
    tags: ["C#", "Windows Forms", "Inventory Management"],
    icon: <Cpu size={24} />,
    image: "/images/shueyschips.jpg",
    gallery: ["/images/shueyschips.jpg"],
    github: "#",
    live: "#",
    date: "2023",
  },
  {
    title: "GetGoods — E-Commerce App",
    description:
      "GetGoods is a full-featured e-commerce website application that allows users to browse, add to cart, and purchase goods.",
    longDescription:
      "GetGoods is a full-featured e-commerce web application designed to simulate a real-world online shopping experience. Users can browse a product catalog, add items to their cart, and go through a checkout flow. The project emphasized clean UI/UX, state management for the cart, and responsive layout design across device sizes.",
    tags: ["Web Application", "E-Commerce", "UI/UX"],
    icon: <Brain size={24} />,
    image: "/images/getgoodsapp.jpg",
    gallery: ["/images/getgoodsapp.jpg"],
    github: "https://github.com/kenji0011/Projects.git",
    live: "#",
    date: "2024",
  },
  {
    title: "GetGoods — Mobile Shopping App",
    description:
      "An alternate design variant of the GetGoods application featuring a refined purple/dark theme with updated UI components and improved user experience flow.",
    longDescription:
      "A mobile-focused redesign of the GetGoods platform, featuring a dark purple aesthetic and revised UI components tailored for smaller screens. This variant explored mobile-first design principles, touch-friendly interactions, and a refined visual hierarchy to improve the overall shopping experience on handheld devices.",
    tags: ["Mobile", "E-Commerce", "UI/UX"],
    icon: <Terminal size={24} />,
    image: "/images/getgoodsapp.jpg",
    gallery: ["/images/getgoodsapp.jpg"],
    github: "#",
    live: "#",
    date: "2024",
  },
  {
    title: "Kasangkap-Hunt Chefbot",
    description:
      "A chatbot that helps users find Philippine recipes and ingredients for their meals.",
    longDescription:
      "Kasangkap-Hunt is an AI-powered recipe chatbot focused on Filipino cuisine. Users can type natural language queries like 'What can I cook with pork and ginger?' and the bot responds with matching recipes and required ingredients. The project introduced me to NLP pipelines, intent classification, and conversational UI design.",
    tags: ["Chatbot", "Machine Learning", "UI/UX"],
    icon: <Terminal size={24} />,
    image: null,
    gallery: [],
    github: "https://github.com/kenji0011/Chefbot_KasangKap-Hunt.git",
    live: "#",
    date: "2025",
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
  category: "Certification" | "Badge";
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
    category: "Certification",
  },
  {
    title: "HANDS ON FIGMA UI/UX DESIGN WORKSHOP",
    issuer: "Computer Programming Services",
    icon: <BadgeCheck size={28} />,
    year: "2025",
    description: "Hands-on workshop on Figma UI/UX design.",
    image: "/images/cert2.jpg",   // Add: "/certs/aws-ml.jpg"
    credential: "#",
    category: "Certification",
  },
  {
    title: "Java Software Engineering 1",
    issuer: "CODECHUM",
    icon: <BadgeCheck size={28} />,
    year: "2025",
    description: "Introduction to Java and its role in software engineering.",
    image: "/images/cert3.jpg",   // Add: "/certs/deeplearning.jpg"
    credential: "#",
    category: "Certification",
  },
  {
    title: "Critical Thinking in the AI Era",
    issuer: "HP LIFE",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "HP LIFE Online Course on Critical Thinking in the AI Era to make better decisions.",
    image: "/images/cert4.jpg",
    credential: "#",
    category: "Certification",
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
    category: "Certification",
  },
  {
    title: "AI for Business Professionals",
    issuer: "HP LIFE",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "AI's role in the workplace and how it can be used to improve business processes.",
    image: "/images/cert6.jpg",
    credential: "#",
    category: "Certification",
  },
  {
    title: "Data Science & Analytics",
    issuer: "HP LIFE",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "HP LIFE Online Course on Data Science & Analytics to make better decisions.",
    image: "/images/cert7.jpg",
    credential: "#",
    category: "Certification",
  },
  {
    title: "Professional Machine Learning Engineer Guide Study",
    issuer: "Google",
    icon: <Star size={28} />,
    year: "2026",
    description: "",
    image: "/images/badge1.jpg",
    credential: "https://www.skills.google/public_profiles/b1f37c59-8b3b-49db-8249-d692905fa6d9/badges/20606343",
    category: "Badge",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    icon: <Star size={28} />,
    year: "2026",
    description: "An online course on basic understanding of the impact AI on the technological landscape",
    image: "/images/badge2.jpg",
    credential: "https://www.skills.google/public_profiles/b1f37c59-8b3b-49db-8249-d692905fa6d9/badges/22684019",
    category: "Badge",
  },
];

// ── Main Component ──────────────────────────────────────────────────────
export default function Portfolio() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendError(false);
    try {
      const res = await fetch("https://formspree.io/f/mlgwvglr", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setSendError(true);
        setTimeout(() => setSendError(false), 4000);
      }
    } catch {
      setSendError(true);
      setTimeout(() => setSendError(false), 4000);
    } finally {
      setSending(false);
    }
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
                {<Image src="/images/pogiko.jpg" alt="Kean Salvahan" fill className="object-cover" />}
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
                      whileHover={{ scale: 1.25 }}
                      className="group flex flex-col items-center gap-2 cursor-default shrink-0 w-20 py-3 px-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        width={44}
                        height={44}
                        className="drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.45)] transition-all duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                        }}
                      />
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 text-center leading-tight transition-colors duration-300">{tech.name}</span>
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
                      <motion.button
                        onClick={() => { setSelectedProject(project); setGalleryIndex(0); }}
                        whileHover={{ scale: 1.2, color: "#22d3ee" }}
                        className="transition-colors"
                        aria-label="View project details"
                      >
                        <ExternalLink size={17} />
                      </motion.button>
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

          {/* ── Project Detail Modal ─────────────────────────────── */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-3xl border border-white/10 bg-[#0a0f1e] shadow-2xl shadow-cyan-500/10"
                >
                  {/* Ambient glows */}
                  <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>

                  {/* ── Two-column body ── */}
                  <div className="grid lg:grid-cols-2 gap-0">

                    {/* ── LEFT: Image gallery ── */}
                    <div className="relative flex flex-col bg-slate-950/60 rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
                      {/* Main image */}
                      <div className="relative flex-1" style={{ minHeight: "320px" }}>
                        {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={galleryIndex}
                              initial={{ opacity: 0, x: 30 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -30 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={selectedProject.gallery[galleryIndex]}
                                alt={`${selectedProject.title} screenshot ${galleryIndex + 1}`}
                                fill
                                className="object-cover"
                              />
                              {/* Subtle gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0a0f1e]/60" />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <div className="p-8 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                              {selectedProject.icon}
                            </div>
                          </div>
                        )}

                        {/* Arrow nav — only when multiple images */}
                        {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                          <>
                            <button
                              onClick={() => setGalleryIndex((i) => (i - 1 + selectedProject.gallery!.length) % selectedProject.gallery!.length)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white transition-all hover:scale-110"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <button
                              onClick={() => setGalleryIndex((i) => (i + 1) % selectedProject.gallery!.length)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-white transition-all hover:scale-110"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Dot indicators */}
                      {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                        <div className="flex justify-center gap-2 py-4 bg-slate-950/80 border-t border-white/5">
                          {selectedProject.gallery.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setGalleryIndex(idx)}
                              className={`rounded-full transition-all duration-300 ${idx === galleryIndex
                                ? "w-6 h-2 bg-cyan-400"
                                : "w-2 h-2 bg-white/25 hover:bg-white/50"
                                }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ── RIGHT: Info + description ── */}
                    <div className="flex flex-col gap-5 p-7 lg:p-9">

                      {/* Project Info card */}
                      <div className="rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm divide-y divide-white/8 overflow-hidden">
                        <div className="px-5 py-3.5">
                          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Project information</p>
                        </div>
                        <div className="px-5 py-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-mono">Category</span>
                          <span className="text-xs font-semibold text-cyan-400 font-mono">{selectedProject.tags[0]}</span>
                        </div>
                        <div className="px-5 py-3 flex items-center justify-between">
                          <span className="text-xs text-slate-500 font-mono">Project date</span>
                          <span className="text-xs font-semibold text-slate-300 font-mono">{selectedProject.date ?? "—"}</span>
                        </div>
                        <div className="px-5 py-3 flex items-center justify-between gap-4">
                          <span className="text-xs text-slate-500 font-mono shrink-0">Project URL</span>
                          {selectedProject.live !== "#" ? (
                            <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 truncate transition-colors font-mono underline underline-offset-2">
                              {selectedProject.live}
                            </a>
                          ) : (
                            <span className="text-xs text-slate-600 font-mono">—</span>
                          )}
                        </div>
                      </div>

                      {/* Title + tags */}
                      <div>
                        <h4 className="text-2xl font-bold text-slate-100 leading-tight mb-3">{selectedProject.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[11px] font-mono rounded-full border border-cyan-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed flex-1">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>

                      {/* Action buttons */}
                      <div className="flex gap-3 pt-1">
                        {selectedProject.github !== "#" && (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 text-sm font-medium rounded-xl transition-all"
                          >
                            <Github size={15} /> GitHub
                          </a>
                        )}
                        {selectedProject.live !== "#" && (
                          <a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-violet-500/10 hover:from-cyan-500/30 hover:to-violet-500/20 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 text-sm font-medium rounded-xl transition-all"
                          >
                            <ExternalLink size={15} /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ── CERTIFICATIONS & BADGES ──────────────────────────────── */}
        <section id="certifications" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-10"
          >
            <h3 className="text-3xl font-bold text-slate-100 mb-2">
              Certifications & Badges ({certifications.length})
            </h3>
            <p className="text-slate-400 text-sm">
              Here are some of my certifications and badges that I have earned through various courses and programs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {certifications.map((cert) => {
              const isBadge = cert.category === "Badge";
              return (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedCert(cert)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 transition-all cursor-pointer hover:bg-white/[0.04] ${isBadge ? "hover:border-violet-500/30" : "hover:border-cyan-500/30"
                    }`}
                >
                  {/* Icon Box */}
                  <div
                    className={`shrink-0 p-3 rounded-xl transition-colors ${isBadge
                      ? "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20"
                      : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"
                      }`}
                  >
                    {/* Keep original icon size but force it into the smaller box visually using scale if needed, or just let lucide handle it since they are size={28} */}
                    <div className="scale-90">{cert.icon}</div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <p className="font-semibold text-slate-200 text-sm truncate">{cert.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5 truncate">{cert.issuer}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-slate-500 text-[10px]">{cert.year}</p>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${isBadge
                          ? "text-violet-400 bg-violet-500/10 border-violet-500/20"
                          : "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                          }`}
                      >
                        {cert.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
                    {selectedCert.credential !== "#" && selectedCert.category === "Badge" && (
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

              <div className="relative z-10 space-y-2 mb-6">
                <p className="text-cyan-400 font-mono text-sm">What&apos;s Next?</p>
                <h4 className="text-2xl font-bold text-slate-100">Get In Touch</h4>
                <p className="text-slate-400 text-sm">
                  I&apos;m currently open to new opportunities. Send me a message and I&apos;ll get back to you!
                </p>
              </div>

              {/* Social links */}
              <div className="relative z-10 flex gap-5 mb-8">
                {[
                  { icon: <Github size={22} />, href: "https://github.com/kenji0011", label: "GitHub" },
                  { icon: <Linkedin size={22} />, href: "https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b", label: "LinkedIn" },
                  { icon: <Mail size={22} />, href: "mailto:[EMAIL_ADDRESS]", label: "Email" },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    whileHover={{ scale: 1.2, y: -3, color: "#22d3ee" }}
                    className="text-slate-500 transition-colors"
                  >
                    {item.icon}
                  </motion.a>
                ))}
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
                    disabled={sending}
                    whileHover={sending ? {} : { scale: 1.03 }}
                    whileTap={sending ? {} : { scale: 0.97 }}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 font-semibold rounded-xl transition-all shadow-lg ${submitted
                      ? "bg-emerald-500/80 text-white shadow-emerald-500/20"
                      : sendError
                        ? "bg-red-500/80 text-white shadow-red-500/20"
                        : "bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white shadow-cyan-500/20"
                      } disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                        Sending…
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center gap-2">✓ Message Sent!</span>
                    ) : sendError ? (
                      <span className="flex items-center gap-2">✗ Failed — try again</span>
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

          <motion.p variants={fadeIn} className="text-xs font-mono text-slate-600">
            Built with Next.js, Tailwind &amp; Framer Motion
          </motion.p>
        </motion.div>
      </footer>
    </div>
  );
}