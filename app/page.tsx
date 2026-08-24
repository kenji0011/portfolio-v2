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
    image: "/images/shueyschips.jpg",
    gallery: ["/images/shueyschips.jpg", "/images/previews/dashboardshuey.png", "/images/previews/kamote.png"],
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
    image: "/images/getgoodsapp.jpg",
    gallery: ["/images/getgoodsapp.jpg", "/images/previews/ggdashboard.png", "/images/previews/ggorders.png", "/images/previews/ggproducts.png", "/images/previews/ggsales.png", "/images/previews/ggusers.png"],
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
    image: "/images/getgoodsapp.jpg",
    gallery: ["/images/getgoodsapp.jpg", "/images/previews/ggmdash.jpg", "/images/previews/ggmcategories.jpg", "/images/previews/ggmcart.jpg",  "/images/previews/ggmorder.jpg", "/images/previews/ggmproducts.jpg", "/images/previews/ggmbusiness.jpg", "/images/previews/ggmseller.jpg", "/images/previews/ggmsellerprod.jpg"],
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
    image: "/images/chatbot.png",
    gallery: ["/images/chatbot.png", "/images/previews/chefbotui.png"],
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
    image: "/images/rockies.jpg",
    gallery: ["/images/rockies.jpg", "/images/previews/rockiesload.jpg", "/images/previews/rockiessign.jpg", "/images/previews/rockiesdash.jpg", "/images/previews/rockiesprof.jpg"],
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
    image: "/images/mcbmain.jpg",
    gallery: [
      "/images/medicalbank.jpg",
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
    techIcons: ["laravel", "blade", "tailwindcss", "postgresql"],
    icon: <GraduationCap size={24} />,
    image: "/images/berong-official-logo.webp",
    gallery: ["/images/berong-official-logo.webp", "images/berong-login.jpg", "/images/berong-dash.jpg", "/images/berong-kids.jpg", "/images/berong-kids-2.jpg", "/images/berong-adult.jpg", "/images/berong-prof.jpg"],
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
  {
    title: "Placeholder Certificate D",
    issuer: "Issuer Name",
    icon: <ShieldCheck size={28} />,
    year: "2026",
    description: "Placeholder description.",
    image: null,
    credential: "#",
    category: "Certification",
  },
  {
    title: "Placeholder Badge E",
    issuer: "Issuer Name",
    icon: <Cpu size={28} />,
    year: "2026",
    description: "Placeholder description.",
    image: null,
    credential: "#",
    category: "Badge",
  },
];

function AiInteractiveDemo({ isDark }: { isDark: boolean }) {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

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
    let answer = "That's an interesting question! While I'm just a simulated AI, you can find most details about Kean by exploring this portfolio, or by sending him a direct message in the contact section!";
    
    if (/(project|work|built|experience|portfolio|made|did he do)/.test(lowerQuery)) {
      answer = "Kean has built several cool projects including an E-Commerce App (GetGoods), a Machine Learning Filipino Recipe Chatbot (Kasangkap-Hunt), a Fitness Tracker (Rockies), and the Berong E-Learning platform. You can check them out in the Featured Projects section below!";
    } else if (/(skill|tech|stack|expertise|language|framework|code|know)/.test(lowerQuery)) {
      answer = "His core skills revolve around Generative AI, Machine Learning, and Data Science. He primarily works with Python, React, Next.js, and frameworks like TensorFlow and PyTorch.";
    } else if (/(education|school|study|university|college|degree|student)/.test(lowerQuery)) {
      answer = "He is currently a 3rd Year BS Computer Science student at Laguna State Polytechnic University.";
    } else if (/(contact|email|phone|hire|reach|message)/.test(lowerQuery)) {
      answer = "You can reach Kean via email at keangabriel101@email.com or use the contact form at the bottom of the page. He is currently open to new opportunities!";
    } else if (/(name|call him)/.test(lowerQuery)) {
      answer = "His full name is Kean Gabriel Salvahan. But you can just call him Kean!";
    } else if (/(where|location|from|live|based)/.test(lowerQuery)) {
      answer = "Kean is based in Laguna, Philippines.";
    } else if (/(hi|hello|hey|yo|greetings)/.test(lowerQuery)) {
      answer = "Hello there! I'm an AI simulation of Kean. You can ask me about his skills, projects, education, or how to contact him!";
    } else if (/(help|command|what can you do)/.test(lowerQuery)) {
      answer = "You can ask me questions like 'What are your skills?', 'Where did you go to school?', 'What is your name?' or 'What projects have you built?'";
    } else if (/(about|who|background|age|birthday|old)/.test(lowerQuery)) {
      answer = "Kean is a 21-year-old AI/ML Engineer based in Laguna, Philippines. He's passionate about building intelligent systems and intuitive UI designs.";
    }

    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: answer }]);
      setIsTyping(false);
    }, 1200);
  };

  const prompts = [
    "Who are you?",
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?"
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] py-10 relative z-10 max-w-3xl mx-auto px-4 md:px-0">
      <motion.div 
        layout
        className={`w-full backdrop-blur-2xl border rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${
          isDark 
            ? "bg-slate-950/60 border-white/10 shadow-cyan-500/10" 
            : "bg-white/80 border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        }`}
        style={{ minHeight: messages.length === 0 ? "auto" : "500px", maxHeight: "75vh" }}
      >
        {/* Top Header/Status Bar */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          isDark ? "bg-white/[0.03] border-white/5" : "bg-slate-50/60 border-slate-200 shadow-sm"
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-black/20" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-black/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-black/20" />
          </div>
          <div className={`flex items-center gap-2 text-[11px] font-mono ml-4 pointer-events-none ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}>
            <Terminal size={12} className="text-cyan-400" /> kean_agent.sh
          </div>
          <div className={`flex items-center gap-2 text-[10px] font-mono ${
            isDark ? "text-slate-500" : "text-slate-400"
          }`}>
            {messages.length > 0 && <span className="animate-pulse text-cyan-400">●</span>}
            {messages.length > 0 ? "ACTIVE" : "IDLE"}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col px-6 py-10 md:px-10 md:py-14"
              >
                <div className="flex flex-col items-start w-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${
                    isDark 
                      ? "bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]" 
                      : "bg-gradient-to-br from-cyan-50 to-violet-50 border border-cyan-200/50 shadow-cyan-500/10"
                  }`}>
                    <Brain size={24} className={isDark ? "text-cyan-400" : "text-cyan-500"} />
                  </div>
                  <h1 className={`text-3xl md:text-5xl font-bold tracking-tight mb-3 ${
                    isDark ? "text-slate-100" : "text-slate-800"
                  }`}>
                    Agent Initialize.
                  </h1>
                  <p className={`text-sm md:text-base leading-relaxed mb-10 max-w-xl ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}>
                    I am an interactive AI replica of Kean. You can run commands or ask questions 
                    regarding his background, tech stack, and portfolio projects.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {prompts.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => handlePromptClick(p)}
                        className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all group ${
                          isDark 
                            ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.06] hover:border-cyan-500/30" 
                            : "bg-white border-slate-200/80 hover:bg-slate-50 hover:border-cyan-400/40 shadow-sm"
                        }`}
                      >
                        <div className={`p-2 rounded-lg font-mono transition-colors group-hover:text-cyan-400 ${
                          isDark ? "bg-white/5 text-slate-500" : "bg-slate-100 text-slate-400"
                        }`}>
                          <MessageSquare size={16} />
                        </div>
                        <span className={`text-sm font-medium ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}>{p}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto no-scrollbar p-6"
              >
                <div ref={scrollRef} className="space-y-6">
                  {messages.map((m, i) => (
                     <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'ai' && (
                        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mr-3 mt-1 shadow-md shadow-cyan-500/20">
                          <Brain size={14} className="text-white" />
                        </div>
                      )}
                      <div className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                        m.role === 'user' 
                          ? (isDark ? 'bg-white/10 text-slate-100 rounded-tr-sm' : 'bg-[#1e293b] text-white rounded-tr-sm shadow-sm')
                          : (isDark ? 'bg-transparent text-slate-300 border border-white/5' : 'bg-white text-slate-700 border border-slate-200 shadow-sm')
                        }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mr-3 mt-1 shadow-md shadow-cyan-500/20">
                        <Brain size={14} className="text-white" />
                      </div>
                      <div className={`px-5 py-4 rounded-2xl flex items-center gap-1.5 h-10 border ${
                        isDark ? "bg-transparent border-white/5" : "bg-white border-slate-200 shadow-sm"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ animationDelay: '0ms' }} />
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ animationDelay: '150ms' }} />
                        <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Input Bar */}
        <div className={`p-3 md:p-4 border-t backdrop-blur-md z-20 ${
          isDark ? "bg-slate-950/80 border-white/10" : "bg-slate-50/90 border-slate-200"
        }`}>
          <form onSubmit={handleInputSubmit} className={`relative flex items-center border rounded-xl transition-all focus-within:border-cyan-500/40 ${
            isDark ? "bg-white/[0.03] border-white/5 focus-within:bg-white/[0.05]" : "bg-white border-slate-200 shadow-sm focus-within:shadow-md"
          }`}>
            <span className="pl-4 text-cyan-400 font-bold font-mono text-sm">{">"}</span>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              placeholder="Enter a command..." 
              className={`w-full !bg-transparent !border-none focus:ring-0 text-sm outline-none pl-3 pr-24 py-3.5 font-mono ${
                isDark ? "text-slate-200 placeholder-slate-600" : "text-slate-800 placeholder-slate-400"
              }`}
            />
            <div className="absolute right-2 flex items-center gap-2">
              {messages.length > 0 && (
                <button 
                  type="button" 
                  onClick={() => setMessages([])} 
                  className={`px-2 py-1 rounded text-[10px] transition-colors tracking-widest font-mono uppercase ${
                    isDark ? "hover:bg-white/10 text-slate-500 hover:text-red-400" : "hover:bg-slate-100 text-slate-400 hover:text-red-500"
                  }`}
                >
                  Clear
                </button>
              )}
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping} 
                className={`p-1.5 rounded-md disabled:opacity-30 transition-colors ${
                  isDark 
                    ? "bg-white/5 text-slate-400 hover:text-cyan-400 disabled:hover:text-slate-500" 
                    : "bg-slate-100 text-slate-500 hover:text-cyan-600 disabled:hover:text-slate-400"
                }`}
                aria-label="Send"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
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

  // Persist theme preference
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) setIsDark(saved === "dark");
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
            className="flex items-center gap-6 text-sm font-medium text-slate-400"
          >
            {["about", "projects", "certifications", "contact"].map((link) => (
              <motion.a
                key={link}
                href={`#${link}`}
                className="capitalize hover:text-cyan-400 transition-colors hidden sm:block"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
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
          </motion.div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-40">

        {/* ── AI SEARCH HERO (NEW) ─────────────────────────────────── */}
        <section className="min-h-[70vh] flex flex-col justify-center pt-4 md:pt-10">
          <AiInteractiveDemo isDark={isDark} />
        </section>

        {/* ── PERSONAL DETAILS (OLD HERO) ──────────────────────────── */}
        <section id="about" className="scroll-mt-28 flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="flex-1 space-y-6"
            >
              <motion.p variants={fadeUp} className="text-cyan-400 font-mono text-lg">
                Hi, my name is
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-5xl md:text-6xl font-bold text-slate-100 tracking-tight leading-none"
              >
                Kean Salvahan.
              </motion.h2>
              <motion.h3
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold text-slate-500"
              >
                I build{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                  AI/ML
                </span>{" "}
                solutions.
              </motion.h3>
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
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 flex items-center gap-2 border border-slate-700 bg-white/5 hover:bg-white/10 hover:border-violet-400 hover:text-violet-400 rounded-lg transition-all"
                >
                  <Download size={18} />
                  Download CV
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Photo side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex-shrink-0 relative"
            >
              {/* Glow ring — CSS-only spin for GPU-compositor efficiency */}
              <div className="animate-spin-slow absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-violet-500 to-transparent p-[2px] blur-sm scale-105" />
              {/* Profile photo — CSS-only float for GPU-compositor efficiency */}
              <div className="animate-float relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 bg-slate-800 shadow-2xl shadow-cyan-500/20">
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
                      className="object-cover scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
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
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ background: "var(--bg-modal)" }}
                  className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-cyan-500/10"
                >
                  {/* Ambient glows */}
                  <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>

                  <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar">
                    {/* ── Two-column body ── */}
                    <div className="grid lg:grid-cols-2 gap-0 min-h-full">

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
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain p-2 cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]"
                                onClick={() => setIsZoomed(true)}
                              />
                              {/* Subtle gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0a0f1e]/60 pointer-events-none" />
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

                      {/* Image previews / Thumbnails */}
                      {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                        <div className="flex p-2 md:p-3 gap-2 md:gap-3 bg-slate-950/90 border-t border-white/5 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                          {/* Inner container to center on desktop if few images */}
                          <div className="flex gap-2 md:gap-3 mx-auto px-2 md:px-0">
                            {selectedProject.gallery.map((imgSrc, idx) => (
                              <button
                                key={idx}
                                id={`thumbnail-${idx}`}
                                onClick={() => setGalleryIndex(idx)}
                                className={`relative shrink-0 w-14 h-10 md:w-16 md:h-12 rounded-md overflow-hidden outline outline-1 md:outline-2 outline-offset-1 md:outline-offset-2 transition-all duration-300 snap-center ${
                                  idx === galleryIndex 
                                    ? "outline-cyan-500 opacity-100" 
                                    : "outline-transparent opacity-50 hover:opacity-100"
                                }`}
                              >
                                <Image 
                                  src={imgSrc} 
                                  alt={`Thumbnail ${idx + 1}`} 
                                  fill
                                  sizes="80px"
                                  className="object-cover" 
                                />
                              </button>
                            ))}
                          </div>
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
                  { icon: <Github size={20} />, href: "https://github.com/kenji0011", label: "GitHub" },
                  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b", label: "LinkedIn" },
                  { icon: <Mail size={20} />, href: "mailto:keangabriel101@email.com", label: "keangabriel101@email.com" },
                  { icon: <span className="font-bold text-lg leading-none"></span>, href: "tel:+639205815366", label: "+63 920 581 5366" },
                  { icon: <span className="font-bold text-lg leading-none"></span>, href: "#", label: "Laguna, Philippines" },
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