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
  Sun,
  Moon,
  Download,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

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
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardHover = { y: -8, scale: 1.02 };

// ── Floating orb component ──────────────────────────────────────────────
function Orb({ className }: { className: string; delay?: number }) {
  // Disabled Framer Motion infinite animation for performance.
  // Constant repainting of blur-3xl layers causes severe scroll lag on mobile.
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-[0.15] pointer-events-none ${className}`}
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
  techIcons?: string[];
};

const projects: Project[] = [
  {
    title: "Shuey's Kamote Chips",
    description: "My 1st project in my college years. I used C# and Windows Forms to create a simple inventory management system for a small business. The system allows the user to add, edit, delete, and search for products in the inventory. ",
    longDescription: "This was my very first software project during college. Built with C# and Windows Forms, it served as a practical introduction to desktop application development. The system provided full CRUD functionality — allowing the business owner to manage product listings, track stock levels, and search the inventory quickly. It laid the foundation for my understanding of data persistence, UI layout, and event-driven programming.",
    tags: ["C#", "Windows Forms", "Inventory Management"],
    techIcons: ["csharp"],
    icon: <Cpu size={24} />,
    image: "/images/projects/shueys-chips/shueyschips.jpg",
    gallery: [
      "/images/projects/shueys-chips/shueyschips.jpg",
      "/images/projects/shueys-chips/dashboardshuey.png",
      "/images/projects/shueys-chips/kamote.png"
    ],
    github: "#",
    live: "#",
    date: "2023",
  },
  {
    title: "GetGoods — E-Commerce App",
    description: "GetGoods is a full-featured e-commerce website application that allows users to browse, add to cart, and purchase goods.",
    longDescription: "GetGoods is a full-featured e-commerce web application designed to simulate a real-world online shopping experience. Users can browse a product catalog, add items to their cart, and go through a checkout flow. The project emphasized clean UI/UX, state management for the cart, and responsive layout design across device sizes.",
    tags: ["Web Application", "E-Commerce", "UI/UX"],
    techIcons: ["javascript", "html5", "css3"],
    icon: <Brain size={24} />,
    image: "/images/projects/getgoods-web/getgoodsapp.jpg",
    gallery: [
      "/images/projects/getgoods-web/getgoodsapp.jpg",
      "/images/projects/getgoods-web/ggdashboard.png",
      "/images/projects/getgoods-web/ggorders.png",
      "/images/projects/getgoods-web/ggproducts.png",
      "/images/projects/getgoods-web/ggsales.png",
      "/images/projects/getgoods-web/ggusers.png"
    ],
    github: "https://github.com/kenji0011/Projects.git",
    live: "#",
    date: "2024",
  },
  {
    title: "GetGoods — Mobile Shopping App",
    description: "An alternate design variant of the GetGoods application featuring a refined purple/dark theme with updated UI components and improved user experience flow.",
    longDescription: "A mobile-focused redesign of the GetGoods platform, featuring a dark purple aesthetic and revised UI components tailored for smaller screens. This variant explored mobile-first design principles, touch-friendly interactions, and a refined visual hierarchy to improve the overall shopping experience on handheld devices.",
    tags: ["Mobile", "E-Commerce", "UI/UX"],
    techIcons: ["flutter", "javascript"],
    icon: <Terminal size={24} />,
    image: "/images/projects/getgoods-mobile/getgoodsapp.jpg",
    gallery: [
      "/images/projects/getgoods-mobile/getgoodsapp.jpg",
      "/images/projects/getgoods-mobile/ggmdash.jpg",
      "/images/projects/getgoods-mobile/ggmcategories.jpg",
      "/images/projects/getgoods-mobile/ggmcart.jpg",
      "/images/projects/getgoods-mobile/ggmorder.jpg",
      "/images/projects/getgoods-mobile/ggmproducts.jpg",
      "/images/projects/getgoods-mobile/ggmbusiness.jpg",
      "/images/projects/getgoods-mobile/ggmseller.jpg",
      "/images/projects/getgoods-mobile/ggmsellerprod.jpg"
    ],
    github: "#",
    live: "#",
    date: "2024",
  },
  {
    title: "Kasangkap-Hunt Chefbot",
    description: "A chatbot that helps users find Philippine recipes and ingredients for their meals.",
    longDescription: "Kasangkap-Hunt is an AI-powered recipe chatbot focused on Filipino cuisine. Users can type natural language queries like 'What can I cook with pork and ginger?' and the bot responds with matching recipes and required ingredients. The project introduced me to NLP pipelines, intent classification, and conversational UI design.",
    tags: ["Chatbot", "Machine Learning", "UI/UX"],
    techIcons: ["python", "tensorflow", "pandas", "kaggle"],
    icon: <Terminal size={24} />,
    image: "/images/projects/chefbot/chatbot.png",
    gallery: [
      "/images/projects/chefbot/chatbot.png",
      "/images/projects/chefbot/chefbotui.png"
    ],
    github: "https://github.com/kenji0011/Chefbot_KasangKap-Hunt.git",
    live: "#",
    date: "2025",
  },
  {
    title: "Rockies Fitness Tracker App",
    description: "A fitness tracker app that helps users track their workouts and fitness goals.",
    longDescription: "Rockies is a fitness tracker app that helps users track their workouts and fitness goals. It features a clean and modern UI, with a focus on user experience and ease of use. The app allows users to track their workouts, set fitness goals, and monitor their progress over time.",
    tags: ["Mobile", "UI/UX"],
    techIcons: ["flutter", "javascript", "firebase"],
    icon: <Terminal size={24} />,
    image: "/images/projects/rockies/rockies.jpg",
    gallery: [
      "/images/projects/rockies/rockies.jpg",
      "/images/projects/rockies/rockiesload.jpg",
      "/images/projects/rockies/rockiessign.jpg",
      "/images/projects/rockies/rockiesdash.jpg",
      "/images/projects/rockies/rockiesprof.jpg",
      "/images/projects/rockies/rockiesreg.jpg"
    ],
    github: "https://github.com/kenji0011/Fitness-Tracker-app.git",
    live: "#",
    date: "2025",
  },
  {
    title: "Medical Center Bank",
    description: "Monte Carlo Analysis for Inventory Optimization",
    longDescription: "This project is a simulation of a medical center's inventory management system. It uses Monte Carlo Analysis to determine the optimal reorder point for each product in the inventory. The system also includes a dashboard to visualize the inventory levels and reorder points.",
    tags: ["Website", "Inventory Management", "Monte Carlo Analysis"],
    techIcons: ["nextjs", "typescript", "tailwindcss"],
    icon: <Terminal size={24} />,
    image: "/images/projects/medical-center-bank/mcbmain.jpg",
    gallery: [
      "/images/projects/medical-center-bank/mcbmain.jpg",
      "/images/projects/medical-center-bank/medicalbank.jpg"
    ],
    github: "https://github.com/kenji0011/Inventory-System-Project.git",
    live: "#",
    date: "2026",
  },
  {
    title: "Berong E-Learning",
    description: "An interactive e-learning platform designed to enhance online education, student engagement, and digital course access.",
    longDescription: "Berong E-Learning is a modern web-based educational platform designed to streamline online learning. It features interactive learning modules, student progress tracking, course management, and an intuitive user interface tailored for engaging and accessible digital education.",
    tags: ["Web Application", "E-Learning", "Education", "UI/UX"],
    techIcons: ["laravel", "php", "tailwindcss", "postgresql"],
    icon: <GraduationCap size={24} />,
    image: "/images/projects/berong-elearning/berong-official-logo.webp",
    gallery: [
      "/images/projects/berong-elearning/berong-official-logo.webp",
      "/images/projects/berong-elearning/berong-login.jpg",
      "/images/projects/berong-elearning/berong-dash.jpg",
      "/images/projects/berong-elearning/berong-kids.jpg",
      "/images/projects/berong-elearning/berong-kids-2.jpg",
      "/images/projects/berong-elearning/berong-adult.jpg",
      "/images/projects/berong-elearning/berong-prof.jpg"
    ],
    github: "https://github.com/kenji0011/berong-safescape-laravel.git",
    live: "https://drive.google.com/file/d/1fRfpIFKOTnwRhg74Kml0vfaRoxkuubNZ/view?usp=sharing",
    date: "2026",
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
    description: "This course helps learners create a study plan for the PMLE (Professional Machine Learning Engineer) certification exam. Learners explore the breadth and scope of the domains covered in the exam. Learners assess their exam readiness and create their individual study plan.",
    image: "/images/badge1.jpg",
    credential: "https://www.skills.google/public_profiles/b1f37c59-8b3b-49db-8249-d692905fa6d9/badges/20606343",
    category: "Badge",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    icon: <Star size={28} />,
    year: "2026",
    description: "This is an introductory level microlearning course aimed at explaining what Generative AI is, how it is used, and how it differs from traditional machine learning methods. It also covers Google Tools to help you develop your own Gen AI apps.",
    image: "/images/badge2.jpg",
    credential: "https://www.skills.google/public_profiles/b1f37c59-8b3b-49db-8249-d692905fa6d9/badges/22684019",
    category: "Badge",
  },
  {
    title: "Agile Project Management",
    issuer: "HP LIFE",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "HP LIFE Online Course on Agile Project Management to make better decisions.",
    image: "/images/cert8.jpg",
    credential: "#",
    category: "Certification",
  },
  {
    title: "Agent Fundamentals",
    issuer: "Google",
    icon: <Award size={28} />,
    year: "2026",
    description: "This course introduces the fundamentals of AI Agents, how they differ from LLM APIs, and where they add value in the real world. ",
    image: "/images/badge3.jpg",
    credential: "https://www.skills.google/public_profiles/b1f37c59-8b3b-49db-8249-d692905fa6d9/badges/22848932",
    category: "Badge",
  },
  {
    title: "HTML CSS JAVASCRIPT HANDS ON",
    issuer: "Ethel Programming Computer Programming Services",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "This is an introductory level microlearning course aimed at explaining what HTML, CSS, and JavaScript are, how they are used, and how they differ from traditional programming methods.",
    image: "/images/cert9.png",
    credential: "#",
    category: "Certification",
  },
  // ── New Certificate & Badge Slots (Fill in details below) ──
  {
    title: "IITP (TOPCIT)",
    issuer: "IITP",
    icon: <BadgeCheck size={28} />,
    year: "2026",
    description: "IT Professional Competency Test (TOPCIT) is a Korean IT certification program. ",
    image: "/images/cert10.jpg",
    credential: "#", // Add credential or verification link
    category: "Certification", // "Certification" or "Badge"
  },
  {
    title: "Data Analytics 101",
    issuer: "Simplilearn",
    icon: <Award size={28} />,
    year: "2026",
    description: "This course provide fundamentals about Excel, functions, vlookups, data sorting, pivot tables, and data analysis.",
   
    image: null,
    credential: "https://lms.simplilearn.com/courses/5990/Data%20Analyst%20101/certificate/download-skillup",
    category: "Certification",
  },
  {
    title: "Microsoft AI Course: Azure AI Fundamentals",
    issuer: "TESDA ONLINE PROGRAM",
    icon: <ShieldCheck size={28} />,
    year: "2026",
    description: "This course provide fundamentals about Microsoft Azure AI.",
    image: "/images/cert11.jpg",
    credential: "#",
    category: "Certification",
  },
  
];

function FloatingAiCopilot({
  isDark,
  isOpen,
  setIsOpen,
}: {
  isDark: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTeaser, setShowTeaser] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => setShowTeaser(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    const query = inputValue.trim();
    setInputValue("");
    triggerAI(query);
  };

  const handlePromptClick = (query: string) => {
    if (isTyping) return;
    triggerAI(query);
  };

  const triggerAI = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let answer =
      "That's an interesting question! While I'm just a simulated AI, you can find most details about Kean by exploring this portfolio, or by sending him a direct message in the contact section!";

    if (/(project|work|built|experience|portfolio|made|did he do)/.test(lowerQuery)) {
      answer =
        "Kean has built several cool projects including an E-Commerce App (GetGoods), a Machine Learning Filipino Recipe Chatbot (Kasangkap-Hunt), a Fitness Tracker (Rockies), and the Berong E-Learning platform. Check them out in the Featured Projects section!";
    } else if (/(skill|tech|stack|expertise|language|framework|code|know)/.test(lowerQuery)) {
      answer =
        "His core skills revolve around Generative AI, Machine Learning, and Data Science. He primarily works with Python, React, Next.js, and frameworks like TensorFlow and PyTorch.";
    } else if (/(education|school|study|university|college|degree|student)/.test(lowerQuery)) {
      answer =
        "He is currently a 3rd Year BS Computer Science student at Laguna State Polytechnic University.";
    } else if (/(contact|email|phone|hire|reach|message)/.test(lowerQuery)) {
      answer =
        "You can reach Kean via email at keangabriel101@gmail.com or use the contact form at the bottom of the page. He is currently open to new opportunities!";
    } else if (/(name|call him)/.test(lowerQuery)) {
      answer = "His full name is Kean Gabriel Salvahan. But you can just call him Kean!";
    } else if (/(where|location|from|live|based)/.test(lowerQuery)) {
      answer = "Kean is based in Laguna, Philippines.";
    } else if (/(hi|hello|hey|yo|greetings)/.test(lowerQuery)) {
      answer =
        "Hello there! I'm an AI simulation of Kean. You can ask me about his skills, projects, education, or how to contact him!";
    } else if (/(help|command|what can you do)/.test(lowerQuery)) {
      answer =
        "You can ask me questions like 'What are your skills?', 'Where did you go to school?', 'What is your name?' or 'What projects have you built?'";
    } else if (/(about|who|background|age|birthday|old)/.test(lowerQuery)) {
      answer =
        "Kean is a 21-year-old AI/ML Engineer based in Laguna, Philippines. He's passionate about building intelligent systems and intuitive UI designs.";
    }

    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: answer }]);
      setIsTyping(false);
    }, 1100);
  };

  const prompts = [
    "Who are you?",
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
  ];

  return (
    <>
      {/* Floating Trigger Pill */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {showTeaser && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md text-xs text-slate-300 shadow-xl"
              >
                <span>Ask Kean&apos;s AI replica</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTeaser(false);
                  }}
                  className="text-slate-500 hover:text-white ml-1"
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOpen(true);
                setShowTeaser(false);
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-full border border-cyan-400/40 bg-slate-900/95 hover:bg-slate-850 backdrop-blur-xl text-white shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] transition-all cursor-pointer group"
              aria-label="Open Kean AI Assistant"
            >
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-inner">
                <Brain size={16} className="text-white" />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div className="flex flex-col items-start pr-1 text-left">
                <span className="text-xs font-bold tracking-wide text-slate-100 flex items-center gap-1.5">
                  Ask AI Kean
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    BOT
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Online</span>
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[430px] h-[580px] max-h-[85vh] rounded-3xl border shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden ${
              isDark
                ? "bg-slate-950/95 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(34,211,238,0.15)]"
                : "bg-white/95 border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b select-none ${
                isDark ? "bg-white/[0.04] border-white/5" : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-black/20" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-black/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-black/20" />
                <span className="text-[11px] font-mono text-slate-400 ml-2 flex items-center gap-1.5">
                  <Terminal size={12} className="text-cyan-400" /> kean_agent.sh
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close AI Chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {messages.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col p-6 overflow-y-auto no-scrollbar"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                        <Brain size={22} className="text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-100">Kean&apos;s AI Replica</h4>
                        <p className="text-xs text-slate-400 font-mono">Ask anything about Kean</p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      I&apos;m programmed with details about Kean&apos;s background, tech stack, machine learning projects, and education. Try one of the prompts below!
                    </p>

                    <div className="flex flex-col gap-2 w-full">
                      {prompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => handlePromptClick(p)}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all group ${
                            isDark
                              ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-cyan-500/30"
                              : "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-cyan-400/40"
                          }`}
                        >
                          <div className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-cyan-400 transition-colors">
                            <MessageSquare size={13} />
                          </div>
                          <span className="text-xs font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
                            {p}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {m.role === "ai" && (
                          <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mr-2 mt-1 shadow-md shadow-cyan-500/20">
                            <Brain size={12} className="text-white" />
                          </div>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                            m.role === "user"
                              ? isDark
                                ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-slate-100 border border-cyan-500/30 rounded-tr-sm"
                                : "bg-slate-800 text-white rounded-tr-sm"
                              : isDark
                                ? "bg-white/[0.04] text-slate-300 border border-white/5 rounded-tl-sm"
                                : "bg-slate-100 text-slate-700 border border-slate-200 rounded-tl-sm"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mr-2 mt-1">
                          <Brain size={12} className="text-white" />
                        </div>
                        <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5 border border-white/5 bg-white/[0.03]">
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-cyan-400" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div
              className={`p-3 border-t backdrop-blur-md ${
                isDark ? "bg-slate-950/80 border-white/5" : "bg-slate-50 border-slate-200"
              }`}
            >
              <form
                onSubmit={handleInputSubmit}
                className={`relative flex items-center border rounded-xl transition-all focus-within:border-cyan-500/40 ${
                  isDark
                    ? "bg-white/[0.03] border-white/5 focus-within:bg-white/[0.06]"
                    : "bg-white border-slate-200"
                }`}
              >
                <span className="pl-3 text-cyan-400 font-bold font-mono text-xs">{">"}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder="Ask a question or enter a command..."
                  className={`w-full !bg-transparent !border-none focus:ring-0 text-xs outline-none pl-2.5 pr-20 py-2.5 font-mono ${
                    isDark ? "text-slate-200 placeholder-slate-500" : "text-slate-800 placeholder-slate-400"
                  }`}
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setMessages([])}
                      className="px-1.5 py-0.5 rounded text-[9px] transition-colors font-mono uppercase text-slate-500 hover:text-rose-400"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 transition-colors"
                    aria-label="Send"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const ProjectCardItem = ({ project, cardHover, className, onClick }: any) => (
  <motion.div
    onClick={onClick}
    whileHover={cardHover}
    className={`group flex flex-col shrink-0 bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:bg-white/[0.07] transition-colors cursor-pointer shadow-lg shadow-black/20 ${className}`}
  >
    {/* Project image banner */}
    {project.image ? (
      <div className="relative w-full h-40 overflow-hidden bg-slate-800 shrink-0">
        <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
    ) : (
      <div className="w-full h-36 shrink-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-white/5">
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
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} whileHover={{ scale: 1.2, color: "#22d3ee" }} className="transition-colors">
            <Github size={17} />
          </motion.a>
        </div>
      </div>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">{project.description}</p>
      
      {/* Tech stack badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {project.techIcons && project.techIcons.map((tech: string) => (
          <div key={tech} className="p-1.5 rounded-md bg-white/5 border border-white/10" title={tech}>
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-original.svg`}
              alt={tech}
              width={14}
              height={14}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech}/${tech}-plain.svg`;
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono rounded-full border border-cyan-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ── Main Component ──────────────────────────────────────────────────────
export default function Portfolio() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [certPage, setCertPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const CERTS_PER_PAGE = 12;
  const [isDark, setIsDark] = useState(true);

  // Projects view toggle state
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) setIsDark(saved === "dark");
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (selectedProject?.gallery) {
      const activeThumb = document.getElementById(`thumbnail-${galleryIndex}`);
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [galleryIndex, selectedProject]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#techstack" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

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
    <div
      data-theme={isDark ? "dark" : "light"}
      style={{ background: "var(--bg-page)", color: "var(--text-base)" }}
      className="relative min-h-screen font-sans selection:bg-cyan-500/30 overflow-x-hidden"
    >

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
        <div className="absolute inset-0 opacity-[0.03] hidden md:block bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <nav
        style={{ background: "var(--bg-nav)" }}
        className={`fixed top-0 w-full z-50 border-b backdrop-blur-xl transition-shadow duration-300 ${
          isDark 
            ? "border-white/5 shadow-none" 
            : "border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent cursor-pointer"
          >
            KS.
          </motion.a>

          {/* Desktop Navigation Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-6 text-sm font-medium text-slate-400"
          >
            <div className="hidden sm:flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="hover:text-cyan-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              className="relative p-2 rounded-xl border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors overflow-hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, y: 8 }}
                    animate={{ rotate: 0, opacity: 1, y: 0 }}
                    exit={{ rotate: 90, opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Sun size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, y: 8 }}
                    animate={{ rotate: 0, opacity: 1, y: 0 }}
                    exit={{ rotate: -90, opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <Moon size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-400 transition-colors sm:hidden"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="sm:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-2 bg-[var(--bg-nav)] backdrop-blur-xl"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-36">

        {/* ── HERO / ABOUT SECTION ─────────────────────────────────── */}
        <section
          id="about"
          className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-4 pb-8"
        >
          {/* Text side */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex-1 space-y-6 max-w-2xl"
          >
            {/* Status & Location badges */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for AI & Software Projects
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-slate-400 text-xs font-mono">
                <MapPin size={12} className="text-cyan-400" /> Laguna, Philippines
              </div>
            </motion.div>

            {/* Main Greeting & Headings */}
            <div className="space-y-3">
              <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-base md:text-lg tracking-wide">
                Hi, my name is
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 tracking-tight leading-[1.08]"
              >
                Kean Salvahan.
              </motion.h1>
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-4xl font-bold text-slate-400"
              >
                I build{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
                  AI/ML
                </span>{" "}
                solutions & intelligent web apps.
              </motion.h2>
            </div>

            {/* Bio Paragraph */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
            >
              I&apos;m an AI/ML Engineer and 3rd Year BS Computer Science student at Laguna State Polytechnic University. Passionate about designing neural models, agentic workflows, and turning complex ideas into performant applications.
            </motion.p>

            {/* Key Highlight Pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 pt-1">
              <span className="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 text-xs font-mono">
                🎓 BS Computer Science
              </span>
              <span className="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 text-xs font-mono">
                🚀 4+ Featured Projects
              </span>
              <span className="px-3 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 text-xs font-mono">
                📜 12+ Certifications
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="pt-3 flex gap-3 flex-wrap items-center">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20 text-sm"
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 rounded-xl transition-all font-medium text-slate-300 text-sm"
              >
                Contact Me
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-3 flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 hover:border-violet-400 hover:text-violet-400 rounded-xl transition-all font-medium text-slate-300 text-sm"
              >
                <Download size={16} />
                Download CV
              </motion.a>
              <motion.button
                onClick={() => setAiChatOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-3 flex items-center gap-2 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-xl transition-all text-sm font-medium"
              >
                <Brain size={16} />
                Ask AI Agent
              </motion.button>
            </motion.div>

            {/* Social Links Row */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://github.com/kenji0011"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-white/5 transition-all"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-white/5 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:keangabriel101@gmail.com"
                className="p-2.5 rounded-xl border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-white/5 transition-all"
                aria-label="Email Kean"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex-shrink-0 relative my-6 lg:my-0"
          >
            {/* Ambient background glow */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-violet-500/20 to-transparent blur-2xl -z-10" />

            {/* Glow ring — CSS-only spin */}
            <div className="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-violet-500 to-transparent p-[3px] blur-sm scale-105" />

            {/* Profile photo container */}
            <div className="animate-float relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/20 bg-slate-900 shadow-2xl shadow-cyan-500/20">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark-photo" : "light-photo"}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute -inset-1"
                >
                  <Image
                    src={isDark ? "/images/pogiko.jpg" : "/images/pogiko2.jpg"}
                    alt="Kean Salvahan"
                    fill
                    priority
                    className="object-cover scale-105"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Floating Experience / Role Chip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-3 -left-3 sm:bottom-2 sm:left-0 px-4 py-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-xl flex items-center gap-2.5 text-xs text-slate-200"
            >
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Brain size={16} />
              </div>
              <div>
                <p className="font-semibold leading-tight">AI & ML Engineer</p>
                <p className="text-[10px] text-slate-400 font-mono">LSPU CS Student</p>
              </div>
            </motion.div>
          </motion.div>
        </section>



        {/* ── MY EXPERTISE ─────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="scroll-mt-28"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">My Expertise</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
            {/* Left — Core Skills */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 rounded-l-2xl" />
              <h4 className="text-lg font-semibold text-slate-200 mb-5 pl-4">Core Skills</h4>
              <div className="space-y-5 pl-4">
                {[
                  {
                    title: "Generative AI",
                    icon: <Brain size={20} />,
                    desc: "Developing advanced RAG pipelines, fine-tuning LLMs, and building creative AI applications.",
                    color: "text-cyan-400 bg-cyan-500/10",
                  },
                  {
                    title: "Machine Learning",
                    icon: <Cpu size={20} />,
                    desc: "Building predictive models and intelligent agents using Deep Learning and Reinforcement Learning techniques.",
                    color: "text-violet-400 bg-violet-500/10",
                  },
                  {
                    title: "Data Science",
                    icon: <Terminal size={20} />,
                    desc: "Extracting actionable insights from complex datasets through cleaning, visualization, and statistical analysis.",
                    color: "text-blue-400 bg-blue-500/10",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3 items-start">
                    <div className={`p-2 rounded-lg ${item.color} shrink-0 mt-0.5`}>
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold" style={{ color: 'var(--text-base)' }}>{item.title}</h5>
                      <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Soft Skills */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-400 rounded-l-2xl" />
              <h4 className="text-lg font-semibold text-slate-200 mb-5 pl-4">Soft Skills</h4>
              <div className="flex flex-wrap gap-2.5 pl-4">
                {[
                  "Leadership", "Critical Thinking", "Problem Solving",
                  "Creativity", "Communication", "Adaptability",
                  "Continuous Learning", "Time Management", "Teamwork",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-slate-300 text-xs font-medium hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-400 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

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
                { name: "Flutter", icon: "flutter" },
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
                { name: "Kaggle", icon: "kaggle" },
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
                    /* CSS-only hover — removes 48 Framer listener registrations from a moving container */
                    <div
                      key={`${tech.name}-${i}`}
                      className="group flex flex-col items-center gap-2 cursor-default shrink-0 w-20 py-3 px-2 hover:scale-125 transition-transform duration-200"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        width={44}
                        height={44}
                        loading="lazy"
                        className="drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_0_14px_rgba(34,211,238,0.45)] transition-all duration-300"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                        }}
                      />
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 text-center leading-tight transition-colors duration-300">{tech.name}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          id="github-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="scroll-mt-28"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-10">
            <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">GitHub Activity</h3>
            <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:p-8 flex items-center justify-center overflow-x-auto no-scrollbar shadow-lg shadow-cyan-500/5 min-h-[170px]">
            <GitHubCalendar 
              username="kenji0011" 
              colorScheme={isDark ? "dark" : "light"}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              style={{ color: "var(--text-base)", fontFamily: "inherit" }}
              blockSize={13}
            />
          </motion.div>
        </motion.section>

        {/* ── FEATURED PROJECTS ────────────────────────────────────── */}
        <section id="projects" className="scroll-mt-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="flex items-center justify-between gap-4 mb-12"
          >
            <div className="flex items-center gap-4 flex-grow">
              <h3 className="text-3xl font-bold text-slate-100 whitespace-nowrap">Featured Projects</h3>
              <div className="h-px bg-gradient-to-r from-slate-700 to-transparent flex-grow" />
            </div>
            
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="group flex items-center shrink-0 gap-2 px-4 py-2 text-sm font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 rounded-xl transition-all whitespace-nowrap"
            >
              {showAllProjects ? "Show Marquee" : "All Projects"}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${!showAllProjects ? 'group-hover:translate-x-1' : ''}`}>
                {showAllProjects ? <path d="M3 12h18M3 6h18M3 18h18" /> : <polyline points="9 18 15 12 9 6"></polyline>}
              </svg>
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {showAllProjects ? (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12"
              >
                {projects.map((project, idx) => (
                  <ProjectCardItem
                    key={`grid-${idx}`}
                    project={project}
                    cardHover={cardHover}
                    className="w-full"
                    onClick={() => { setSelectedProject(project); setGalleryIndex(0); }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="marquee-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden w-full"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                }}
              >
                <motion.div
                  className="flex w-max pt-4 pb-12"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  {[0, 1].map((copyIdx) => (
                    <div key={copyIdx} className="flex gap-6 pr-6 shrink-0">
                      {projects.map((project, idx) => (
                        <ProjectCardItem
                          key={`${project.title}-${copyIdx}-${idx}`}
                          project={project}
                          cardHover={cardHover}
                          className="w-[85vw] max-w-[350px]"
                          onClick={() => { setSelectedProject(project); setGalleryIndex(0); }}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Project Detail Modal ─────────────────────────────── */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ background: "var(--bg-modal)" }}
                  className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/10 overflow-hidden"
                >
                  {/* Ambient glows */}
                  <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project modal"
                    className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 text-white transition-all hover:scale-105 shadow-lg cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>

                  <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {/* ── Two-column body ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-full">

                    {/* ── LEFT: Image gallery ── */}
                    <div className="relative flex flex-col bg-slate-950/70 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
                      {/* Main image */}
                      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] bg-slate-950 flex items-center justify-center">
                        {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={galleryIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="relative w-full h-full p-3 sm:p-4 flex items-center justify-center"
                            >
                              <Image
                                src={selectedProject.gallery[galleryIndex]}
                                alt={`${selectedProject.title} screenshot ${galleryIndex + 1}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-contain cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                                onClick={() => setIsZoomed(true)}
                                priority
                              />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-950">
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
                              aria-label="Previous image"
                              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-all hover:scale-110 shadow-md"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <button
                              onClick={() => setGalleryIndex((i) => (i + 1) % selectedProject.gallery!.length)}
                              aria-label="Next image"
                              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white transition-all hover:scale-110 shadow-md"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Image previews / Thumbnails */}
                      {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                        <div className="flex p-2.5 sm:p-3 gap-2 bg-slate-950/95 border-t border-white/5 overflow-x-auto no-scrollbar">
                          <div className="flex gap-2 mx-auto px-1">
                            {selectedProject.gallery.map((imgSrc, idx) => (
                              <button
                                key={idx}
                                id={`thumbnail-${idx}`}
                                onClick={() => setGalleryIndex(idx)}
                                className={`relative shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-lg overflow-hidden outline outline-1 sm:outline-2 outline-offset-1 sm:outline-offset-2 transition-all duration-300 ${
                                  idx === galleryIndex 
                                    ? "outline-cyan-500 opacity-100 scale-105" 
                                    : "outline-transparent opacity-50 hover:opacity-100"
                                }`}
                              >
                                <Image 
                                  src={imgSrc} 
                                  alt={`Thumbnail ${idx + 1}`} 
                                  fill
                                  sizes="70px"
                                  className="object-cover" 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ── RIGHT: Info + description ── */}
                    <div className="flex flex-col gap-4 sm:gap-5 p-5 sm:p-7 lg:p-9">

                      {/* Project Info card */}
                      <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm divide-y divide-white/10 overflow-hidden text-xs">
                        <div className="px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/[0.02]">
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Project information</p>
                        </div>
                        <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between">
                          <span className="text-slate-400 font-mono">Category</span>
                          <span className="font-semibold text-cyan-400 font-mono">{selectedProject.tags[0]}</span>
                        </div>
                        <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between">
                          <span className="text-slate-400 font-mono">Project date</span>
                          <span className="font-semibold text-slate-300 font-mono">{selectedProject.date ?? "—"}</span>
                        </div>
                        <div className="px-4 py-2.5 sm:px-5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                          <span className="text-slate-400 font-mono shrink-0">Project URL</span>
                          {selectedProject.live !== "#" ? (
                            <a
                              href={selectedProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 truncate transition-colors font-mono underline underline-offset-2 break-all"
                            >
                              {selectedProject.live}
                            </a>
                          ) : (
                            <span className="text-slate-600 font-mono">—</span>
                          )}
                        </div>
                      </div>

                      {/* Title + tags */}
                      <div>
                        <h4 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight mb-2 sm:mb-3">{selectedProject.title}</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 text-[10px] sm:text-[11px] font-mono rounded-full border border-cyan-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 sm:text-slate-400 text-xs sm:text-sm leading-relaxed flex-1">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>

                      {/* Action buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {selectedProject.github !== "#" ? (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-400 text-xs sm:text-sm font-medium rounded-xl transition-all"
                          >
                            <Github size={15} /> GitHub
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/[0.02] border border-white/5 text-slate-600 text-xs sm:text-sm font-medium rounded-xl cursor-not-allowed">
                            <Github size={15} /> Private Code
                          </span>
                        )}
                        {selectedProject.live !== "#" ? (
                          <a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-violet-500/10 hover:from-cyan-500/30 hover:to-violet-500/20 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 text-xs sm:text-sm font-medium rounded-xl transition-all shadow-sm"
                          >
                            <ExternalLink size={15} /> Live Demo
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Fullscreen Image Zoom Overlay ── */}
          <AnimatePresence>
            {isZoomed && selectedProject && selectedProject.gallery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsZoomed(false)}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl cursor-zoom-out"
              >
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full h-full max-w-[95vw] max-h-[95vh]"
                >
                  <Image
                    src={selectedProject.gallery[galleryIndex]}
                    alt="Zoomed screenshot"
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </motion.div>
                {/* Close Button */}
                <button
                  onClick={() => setIsZoomed(false)}
                  className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
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

          {/* ── Paginated grid + slider arrows ─────────────────── */}
          {(() => {
            const totalPages = Math.ceil(certifications.length / CERTS_PER_PAGE);
            const visible = certifications.slice(
              certPage * CERTS_PER_PAGE,
              (certPage + 1) * CERTS_PER_PAGE
            );
            return (
              <div className="relative">
                {/* Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={certPage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
                  >
                    {visible.map((cert) => {
                      const isBadge = cert.category === "Badge";
                      return (
                        <motion.div
                          key={cert.title}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedCert(cert)}
                          className={`group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 transition-all cursor-pointer hover:bg-white/[0.04] ${isBadge ? "hover:border-violet-500/30" : "hover:border-cyan-500/30"}`}
                        >
                          {/* Icon Box */}
                          <div className={`shrink-0 p-2 rounded-lg transition-colors ${isBadge ? "bg-violet-500/10 text-violet-400 group-hover:bg-violet-500/20" : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20"}`}>
                            <div className="scale-75">{cert.icon}</div>
                          </div>
                          {/* Content */}
                          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                            <p className="font-semibold text-slate-200 text-xs truncate">{cert.title}</p>
                            <p className="text-slate-400 text-[10px] mt-0.5 truncate">{cert.issuer}</p>
                            <div className="flex items-center justify-between mt-1 gap-2">
                              <p className="text-slate-500 text-[9px]">{cert.year}</p>
                              <span className={`shrink-0 text-[8px] font-mono px-1.5 py-px rounded-full border ${isBadge ? "text-violet-400 bg-violet-500/10 border-violet-500/20" : "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"}`}>
                                {isBadge ? "Badge" : "Cert"}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination controls — only when multiple pages */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    {/* Prev */}
                    <button
                      onClick={() => setCertPage((p) => Math.max(p - 1, 0))}
                      disabled={certPage === 0}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                      Prev
                    </button>

                    {/* Page dots */}
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCertPage(idx)}
                          className={`rounded-full transition-all duration-300 ${idx === certPage
                            ? "w-6 h-2 bg-cyan-400"
                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Next */}
                    <button
                      onClick={() => setCertPage((p) => Math.min(p + 1, totalPages - 1))}
                      disabled={certPage === totalPages - 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white hover:border-cyan-500/40 hover:bg-white/[0.06] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono"
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })()}

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

              <div className="relative z-10 flex flex-wrap gap-5 mb-8">
                {[
                  { icon: <Github size={18} />, href: "https://github.com/kenji0011", label: "GitHub" },
                  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b", label: "LinkedIn" },
                  { icon: <Mail size={18} />, href: "mailto:keangabriel101@email.com", label: "keangabriel101@email.com" },
                  { icon: <Phone size={18} />, href: "tel:+639205815366", label: "+63 920 581 5366" },
                  { icon: <MapPin size={18} />, href: "#", label: "Laguna, Philippines" },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    whileHover={{ scale: 1.05, y: -2, color: "#22d3ee" }}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors bg-white/5 border border-white/10 px-3.5 py-2 rounded-full"
                  >
                    {item.icon} <span className="hidden sm:inline-block">{item.label}</span>
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

      {/* ── Floating Back to Top Button ─────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && !selectedProject && !selectedCert && !isZoomed && !aiChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="fixed bottom-24 right-6 z-40 p-3 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-md text-cyan-400 hover:text-cyan-300 hover:border-cyan-400/40 shadow-lg shadow-black/40 transition-all cursor-pointer"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Floating AI Copilot ─────────────────────────────────────── */}
      <FloatingAiCopilot
        isDark={isDark}
        isOpen={aiChatOpen}
        setIsOpen={setAiChatOpen}
      />

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
            @ 2026 Kean Gabriel Salvahan. All rights reserved.
          </motion.p>
        </motion.div>
      </footer>
    </div>
  );
}