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
   
    image: "/images/cert12.jpg",
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
      {/* Comic Speech Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.04, x: -2, y: -2 }}
              whileTap={{ scale: 0.96, x: 2, y: 2 }}
              onClick={() => setIsOpen(true)}
              className={`comic-bubble-tail flex items-center gap-2.5 px-5 py-3 rounded-2xl border-[2.5px] ${
                isDark
                  ? "bg-black border-white text-white shadow-[4px_4px_0px_#ffffff]"
                  : "bg-white border-black text-black shadow-[4px_4px_0px_#000000]"
              } transition-all cursor-pointer font-bold tracking-tight text-xs`}
              aria-label="Ask KenjiAI"
            >
              <MessageSquare size={15} className="shrink-0" />
              <span>Need help? Ask KenjiAI</span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Comic Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[430px] h-[580px] max-h-[85vh] rounded-2xl border-[3px] flex flex-col overflow-hidden ${
              isDark
                ? "bg-[#0f0f0f] border-white shadow-[8px_8px_0px_#ffffff] text-white"
                : "bg-white border-black shadow-[8px_8px_0px_#000000] text-black"
            }`}
          >
            {/* Comic Window Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b-[2.5px] select-none ${
                isDark ? "bg-black border-white" : "bg-[#f4f4f0] border-black"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-xs uppercase tracking-widest px-2 py-0.5 border-2 border-current">
                  KENJIAI // CO-PILOT
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 border-2 border-current hover:bg-current hover:text-white dark:hover:text-black transition-colors"
                aria-label="Close AI Chat"
              >
                <X size={15} />
              </button>
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
                      <div className="w-10 h-10 rounded-xl border-2 border-current flex items-center justify-center shadow-[2px_2px_0px_currentColor]">
                        <Brain size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-tight">KenjiAI Assistant</h4>
                        <p className="text-[11px] font-mono opacity-70">Ask me about Kean</p>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed mb-6 opacity-80">
                      I&apos;m programmed with details about Kean&apos;s background, tech stack, machine learning projects, and education. Try a prompt:
                    </p>

                    <div className="flex flex-col gap-2.5 w-full">
                      {prompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => handlePromptClick(p)}
                          className={`comic-btn-secondary flex items-center gap-3 p-3 rounded-xl text-left transition-all group font-bold text-xs ${
                            isDark ? "bg-black text-white hover:bg-white hover:text-black" : "bg-white text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          <MessageSquare size={13} className="shrink-0" />
                          <span>{p}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`px-4 py-2.5 rounded-xl max-w-[85%] text-xs leading-relaxed font-medium ${
                            m.role === "user"
                              ? isDark
                                ? "bg-white text-black border-2 border-white font-bold shadow-[2px_2px_0px_#ffffff]"
                                : "bg-black text-white border-2 border-black font-bold shadow-[2px_2px_0px_#000000]"
                              : isDark
                                ? "bg-[#181818] text-white border-2 border-white/60 shadow-[2px_2px_0px_rgba(255,255,255,0.3)]"
                                : "bg-[#fcfcfc] text-black border-2 border-black/60 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="px-4 py-2.5 rounded-xl border-2 border-current flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-current" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-current" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce bg-current" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Bar */}
            <div
              className={`p-3 border-t-[2.5px] ${
                isDark ? "bg-black border-white" : "bg-[#f4f4f0] border-black"
              }`}
            >
              <form
                onSubmit={handleInputSubmit}
                className="relative flex items-center border-2 border-current rounded-xl overflow-hidden"
              >
                <span className="pl-3 font-bold font-mono text-xs">{">"}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder="Ask a question..."
                  className="w-full !bg-transparent !border-none focus:ring-0 text-xs outline-none pl-2.5 pr-20 py-2.5 font-mono"
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setMessages([])}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase opacity-60 hover:opacity-100"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-1.5 border border-current hover:bg-current hover:text-white dark:hover:text-black disabled:opacity-30 transition-colors"
                    aria-label="Send"
                  >
                    <Send size={11} />
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

const ProjectCardItem = ({ project, cardHover, className, onClick, isDark }: any) => (
  <motion.div
    onClick={onClick}
    whileHover={{ x: -2, y: -2 }}
    className={`group flex flex-col shrink-0 border-[2.5px] border-current rounded-2xl overflow-hidden shadow-[5px_5px_0px_currentColor] hover:shadow-[8px_8px_0px_currentColor] transition-all cursor-pointer ${
      isDark ? "bg-[#141414]" : "bg-white"
    } ${className}`}
  >
    {/* Project image banner */}
    {project.image ? (
      <div className="relative w-full h-44 overflow-hidden bg-black/10 shrink-0 border-b-[2.5px] border-current">
        <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
    ) : (
      <div className="w-full h-40 shrink-0 bg-black/5 dark:bg-white/5 flex items-center justify-center border-b-[2.5px] border-current">
        <div className="p-4 border-2 border-current shadow-[2px_2px_0px_currentColor]">
          {project.icon}
        </div>
      </div>
    )}

    <div className="flex flex-col flex-1 p-5">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-base font-black uppercase tracking-tight group-hover:underline underline-offset-4 decoration-2 leading-snug">
          {project.title}
        </h4>
        <div className="flex gap-2 ml-2 shrink-0">
          <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1 border border-current hover:bg-current hover:text-white dark:hover:text-black transition-colors">
            <Github size={15} />
          </a>
        </div>
      </div>
      <p className="text-xs mb-4 leading-relaxed flex-1 opacity-80">{project.description}</p>
      
      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-0.5 border border-current text-[10px] font-mono font-bold uppercase"
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
      className="relative min-h-screen font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden"
    >

      {/* ── Comic Halftone Background ────────────────────────────────── */}
      <div className={`fixed inset-0 z-0 pointer-events-none ${isDark ? "comic-dots-dark" : "comic-dots-light"}`} />

      {/* ── Comic Navigation ───────────────────────────────────────── */}
      <nav
        style={{ background: "var(--bg-nav)" }}
        className="fixed top-0 w-full z-50 border-b-[2.5px] border-current backdrop-blur-md transition-colors duration-200"
      >
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg font-black tracking-widest font-mono px-2.5 py-1 border-2 border-current shadow-[2px_2px_0px_currentColor]"
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
              className="p-2 border-2 border-current shadow-[2px_2px_0px_currentColor] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="p-2 border-2 border-current shadow-[2px_2px_0px_currentColor] sm:hidden cursor-pointer"
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

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24 space-y-36">

        {/* ── HERO / ABOUT SECTION (CHAPTER 01) ─────────────────────── */}
        <section
          id="about"
          className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 pt-6 pb-8"
        >
          {/* Text side */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex-1 space-y-6 max-w-2xl"
          >
            {/* Comic Chapter Label Stamp */}
            <motion.div variants={fadeUp}>
              <div className="inline-block border-2 border-current px-3 py-1 text-[11px] font-mono font-black uppercase tracking-widest shadow-[2px_2px_0px_currentColor]">
                CHAPTER 01 // ORIGIN
              </div>
            </motion.div>

            {/* Main Greeting & Headings */}
            <div className="space-y-2">
              <motion.p variants={fadeUp} className="font-mono text-sm font-bold tracking-wider uppercase opacity-70">
                Hi, my name is
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05]"
              >
                Kean Salvahan.
              </motion.h1>
              <motion.h2
                variants={fadeUp}
                className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight border-l-4 border-current pl-3 my-2 opacity-90"
              >
                I build AI/ML solutions & intelligent web apps.
              </motion.h2>
            </div>

            {/* Bio Paragraph */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed font-medium opacity-85"
            >
              I&apos;m an AI/ML Engineer and 4th Year BS Computer Science student Major in Intelligent Systems at Laguna State Polytechnic University. Passionate about designing neural models, agentic workflows, and turning complex ideas into performant applications.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={fadeUp} className="pt-2 flex gap-3.5 flex-wrap items-center">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`comic-btn-primary px-6 py-3.5 font-black text-xs uppercase tracking-widest ${
                  isDark ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="comic-btn-secondary px-6 py-3.5 font-black text-xs uppercase tracking-widest bg-transparent text-current"
              >
                Contact Me
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="comic-btn-secondary px-5 py-3.5 font-black text-xs uppercase tracking-widest flex items-center gap-2 bg-transparent text-current"
              >
                <Download size={15} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social Links Row */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/kenji0011"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border-2 border-current shadow-[2px_2px_0px_currentColor] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                aria-label="GitHub Profile"
              >
                <Github size={17} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 border-2 border-current shadow-[2px_2px_0px_currentColor] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={17} />
              </a>
              <a
                href="mailto:keangabriel101@gmail.com"
                className="p-2.5 border-2 border-current shadow-[2px_2px_0px_currentColor] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                aria-label="Email Kean"
              >
                <Mail size={17} />
              </a>
            </motion.div>
          </motion.div>

          {/* Photo side — Inked Comic Panel Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-shrink-0 relative my-6 lg:my-0"
          >
            {/* Comic Panel Corner Stamp */}
            <div className="absolute -top-3 -right-3 z-10 border-2 border-current bg-current text-white dark:text-black px-2.5 py-0.5 font-mono font-black text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_currentColor]">
              CREATOR // 01
            </div>

            {/* Inked Profile Frame */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl border-[3.5px] border-current shadow-[8px_8px_0px_currentColor] overflow-hidden bg-black/5 dark:bg-white/5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark-photo" : "light-photo"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={isDark ? "/images/pogiko.jpg" : "/images/pogiko2.jpg"}
                    alt="Kean Salvahan"
                    fill
                    priority
                    className="object-cover"
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
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
            <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
              CHAPTER 02 // ARSENAL
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
                My Expertise
              </h3>
              <div className="h-[2px] bg-current opacity-30 flex-grow" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-6">
            {/* Left — Core Skills */}
            <div className="rounded-xl border-[2.5px] border-current bg-white dark:bg-[#111111] p-6 sm:p-8 shadow-[6px_6px_0px_currentColor] relative">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-current inline-block"></span>
                <h4 className="text-lg font-black uppercase tracking-wider text-current">Core Skills</h4>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Generative AI",
                    icon: <Brain size={20} />,
                    desc: "Developing advanced RAG pipelines, fine-tuning LLMs, and building creative AI applications.",
                  },
                  {
                    title: "Machine Learning",
                    icon: <Cpu size={20} />,
                    desc: "Building predictive models and intelligent agents using Deep Learning and Reinforcement Learning techniques.",
                  },
                  {
                    title: "Data Science",
                    icon: <Terminal size={20} />,
                    desc: "Extracting actionable insights from complex datasets through cleaning, visualization, and statistical analysis.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start p-3.5 rounded-lg border-2 border-current bg-black/5 dark:bg-white/5">
                    <div className="p-2 rounded-md border-2 border-current bg-black text-white dark:bg-white dark:text-black shrink-0 mt-0.5 shadow-[2px_2px_0px_currentColor]">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-black uppercase tracking-wider text-current">{item.title}</h5>
                      <p className="text-xs leading-relaxed mt-1 text-current/80 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Soft Skills */}
            <div className="rounded-xl border-[2.5px] border-current bg-white dark:bg-[#111111] p-6 sm:p-8 shadow-[6px_6px_0px_currentColor] relative">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 bg-current inline-block"></span>
                <h4 className="text-lg font-black uppercase tracking-wider text-current">Soft Skills</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Leadership", "Critical Thinking", "Problem Solving",
                  "Creativity", "Communication", "Adaptability",
                  "Continuous Learning", "Time Management", "Teamwork",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-lg border-2 border-current bg-black/5 dark:bg-white/5 text-current text-xs font-mono font-bold uppercase tracking-wider hover:bg-current hover:text-white dark:hover:text-black hover:shadow-[3px_3px_0px_currentColor] hover:-translate-y-0.5 transition-all duration-150 cursor-default"
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
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
            <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
              CHAPTER 03 // TOOLKIT
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
                Tech Stack
              </h3>
              <div className="h-[2px] bg-current opacity-30 flex-grow" />
            </div>
          </motion.div>

          {/* Marquee – 2 rows, comic inventory boxes */}
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
                className="relative overflow-hidden py-2"
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
                    <div
                      key={`${tech.name}-${i}`}
                      className="group flex flex-col items-center justify-center gap-2 cursor-default shrink-0 w-24 h-24 p-2.5 rounded-xl border-2 border-current bg-white dark:bg-[#111111] shadow-[3px_3px_0px_currentColor] hover:-translate-y-1 hover:shadow-[5px_5px_0px_currentColor] transition-all duration-200"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                        alt={tech.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        className="filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-200"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-plain.svg`;
                        }}
                      />
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-current text-center leading-tight truncate w-full">{tech.name}</span>
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
          <motion.div variants={fadeUp} className="flex flex-col gap-2 mb-10">
            <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
              CHAPTER 04 // ACTIVITY LOG
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
                GitHub Activity
              </h3>
              <div className="h-[2px] bg-current opacity-30 flex-grow" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="rounded-xl border-[2.5px] border-current bg-white dark:bg-[#111111] p-6 lg:p-8 flex items-center justify-center overflow-x-auto no-scrollbar shadow-[6px_6px_0px_currentColor] min-h-[170px]">
            <GitHubCalendar 
              username="kenji0011" 
              colorScheme={isDark ? "dark" : "light"}
              theme={{
                light: ['#ebebeb', '#c6c6c6', '#8e8e8e', '#4f4f4f', '#111111'],
                dark: ['#181818', '#383838', '#6a6a6a', '#b5b5b5', '#ffffff'],
              }}
              style={{ color: "currentColor", fontFamily: "inherit" }}
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
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div className="flex flex-col gap-2 flex-grow">
              <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
                CHAPTER 05 // CASE FILES
              </div>
              <div className="flex items-center gap-4">
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
                  Featured Projects
                </h3>
                <div className="h-[2px] bg-current opacity-30 flex-grow" />
              </div>
            </div>
            
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="comic-btn-secondary text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 px-4 py-2.5 rounded-lg self-start sm:self-auto shrink-0"
            >
              {showAllProjects ? "Show Marquee" : "All Projects"}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${!showAllProjects ? 'group-hover:translate-x-1' : ''}`}>
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
                className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-2xl border-[3.5px] border-current bg-white dark:bg-[#111111] text-current shadow-[12px_12px_0px_currentColor] overflow-hidden"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project modal"
                    className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 p-2 sm:p-2.5 rounded-lg border-2 border-current bg-white dark:bg-black text-current hover:bg-current hover:text-white dark:hover:text-black shadow-[3px_3px_0px_currentColor] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>

                  <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {/* ── Two-column body ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-full">

                    {/* ── LEFT: Image gallery ── */}
                    <div className="relative flex flex-col bg-black/5 dark:bg-white/5 border-b-2 lg:border-b-0 lg:border-r-2 border-current overflow-hidden">
                      {/* Main image */}
                      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[420px] bg-black/5 dark:bg-white/5 flex items-center justify-center p-3 sm:p-4">
                        {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={galleryIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeOut" }}
                              className="relative w-full h-full p-2 flex items-center justify-center"
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
                          <div className="w-full h-full flex items-center justify-center p-8 bg-black/5 dark:bg-white/5">
                            <div className="p-8 rounded-2xl border-2 border-current bg-black text-white dark:bg-white dark:text-black">
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
                              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-lg border-2 border-current bg-white dark:bg-black text-current shadow-[3px_3px_0px_currentColor] hover:bg-current hover:text-white dark:hover:text-black transition-all active:translate-x-[2px] active:translate-y-[2px]"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                            </button>
                            <button
                              onClick={() => setGalleryIndex((i) => (i + 1) % selectedProject.gallery!.length)}
                              aria-label="Next image"
                              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 rounded-lg border-2 border-current bg-white dark:bg-black text-current shadow-[3px_3px_0px_currentColor] hover:bg-current hover:text-white dark:hover:text-black transition-all active:translate-x-[2px] active:translate-y-[2px]"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Image previews / Thumbnails */}
                      {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                        <div className="flex p-2.5 sm:p-3 gap-2 bg-black/10 dark:bg-white/10 border-t-2 border-current overflow-x-auto no-scrollbar">
                          <div className="flex gap-2 mx-auto px-1">
                            {selectedProject.gallery.map((imgSrc, idx) => (
                              <button
                                key={idx}
                                id={`thumbnail-${idx}`}
                                onClick={() => setGalleryIndex(idx)}
                                className={`relative shrink-0 w-12 h-9 sm:w-16 sm:h-12 rounded-md overflow-hidden border-2 border-current transition-all duration-200 ${
                                  idx === galleryIndex 
                                    ? "shadow-[3px_3px_0px_currentColor] opacity-100 scale-105" 
                                    : "opacity-60 hover:opacity-100"
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

                      {/* Project Info Dossier */}
                      <div className="rounded-xl border-2 border-current bg-white dark:bg-black text-current divide-y-2 divide-current overflow-hidden text-xs shadow-[4px_4px_0px_currentColor]">
                        <div className="px-4 py-2.5 bg-black text-white dark:bg-white dark:text-black flex items-center justify-between">
                          <p className="text-[10px] font-mono font-black uppercase tracking-widest">FILE DOSSIER</p>
                          <span className="text-[10px] font-mono font-bold">{selectedProject.date ?? "CLASSIFIED"}</span>
                        </div>
                        <div className="px-4 py-2.5 flex items-center justify-between">
                          <span className="font-mono text-current/70 font-bold uppercase text-[11px]">Category</span>
                          <span className="font-mono font-black uppercase text-[11px] text-current">{selectedProject.tags[0]}</span>
                        </div>
                        <div className="px-4 py-2.5 flex items-center justify-between">
                          <span className="font-mono text-current/70 font-bold uppercase text-[11px]">Project Date</span>
                          <span className="font-mono font-bold text-current">{selectedProject.date ?? "—"}</span>
                        </div>
                        <div className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                          <span className="font-mono text-current/70 font-bold uppercase text-[11px] shrink-0">Source / Live URL</span>
                          {selectedProject.live !== "#" ? (
                            <a
                              href={selectedProject.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono font-bold text-current underline underline-offset-2 break-all hover:opacity-75 transition-opacity"
                            >
                              {selectedProject.live}
                            </a>
                          ) : (
                            <span className="font-mono text-current/50">—</span>
                          )}
                        </div>
                      </div>

                      {/* Title + tags */}
                      <div>
                        <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-current leading-tight mb-3">{selectedProject.title}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-0.5 border-2 border-current bg-black/5 dark:bg-white/10 text-current text-[11px] font-mono font-black uppercase tracking-wider rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-current/80 text-xs sm:text-sm leading-relaxed font-medium flex-1">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>

                      {/* Action buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {selectedProject.github !== "#" ? (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="comic-btn-secondary text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2"
                          >
                            <Github size={15} /> GitHub Repo
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-current/30 text-current/40 text-xs sm:text-sm font-mono font-bold uppercase rounded-xl cursor-not-allowed">
                            <Github size={15} /> Private Archive
                          </span>
                        )}
                        {selectedProject.live !== "#" ? (
                          <a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="comic-btn-primary text-xs sm:text-sm py-2.5 rounded-xl flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={15} /> Launch Live Demo
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
                  className="absolute top-5 right-5 z-20 p-2.5 rounded-xl border-2 border-white bg-black text-white hover:bg-white hover:text-black shadow-[4px_4px_0px_white] transition-all cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
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
            className="flex flex-col gap-2 mb-10"
          >
            <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
              CHAPTER 06 // CREDENTIALS
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
                Certifications & Badges ({certifications.length})
              </h3>
              <div className="h-[2px] bg-current opacity-30 flex-grow" />
            </div>
            <p className="text-current/70 text-xs sm:text-sm font-medium">
              Official certifications, program completions, and professional badges earned across computer science and intelligent systems.
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
                  >
                    {visible.map((cert) => {
                      const isBadge = cert.category === "Badge";
                      return (
                        <motion.div
                          key={cert.title}
                          whileHover={{ scale: 1.02, y: -2 }}
                          onClick={() => setSelectedCert(cert)}
                          className="group flex items-center gap-3.5 p-3.5 rounded-xl border-2 border-current bg-white dark:bg-[#111111] shadow-[4px_4px_0px_currentColor] hover:shadow-[6px_6px_0px_currentColor] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                        >
                          {/* Icon Box */}
                          <div className="shrink-0 p-2.5 rounded-lg border-2 border-current bg-black/5 dark:bg-white/5 text-current group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors shadow-[2px_2px_0px_currentColor]">
                            <div className="scale-90">{cert.icon}</div>
                          </div>
                          {/* Content */}
                          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                            <p className="font-black text-current text-xs truncate uppercase tracking-tight">{cert.title}</p>
                            <p className="text-current/70 text-[10px] font-mono mt-0.5 truncate">{cert.issuer}</p>
                            <div className="flex items-center justify-between mt-1.5 gap-2">
                              <p className="text-current/60 font-mono text-[9px] font-bold">{cert.year}</p>
                              <span className="shrink-0 text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-md border-2 border-current bg-black text-white dark:bg-white dark:text-black">
                                {isBadge ? "BADGE" : "CERT"}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-8">
                    {/* Prev */}
                    <button
                      onClick={() => setCertPage((p) => Math.max(p - 1, 0))}
                      disabled={certPage === 0}
                      className="comic-btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed"
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
                          className={`border-2 border-current rounded-full transition-all duration-200 ${idx === certPage
                            ? "w-6 h-2.5 bg-current"
                            : "w-2.5 h-2.5 bg-transparent hover:bg-current/40"
                            }`}
                        />
                      ))}
                    </div>

                    {/* Next */}
                    <button
                      onClick={() => setCertPage((p) => Math.min(p + 1, totalPages - 1))}
                      disabled={certPage === totalPages - 1}
                      className="comic-btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase disabled:opacity-30 disabled:cursor-not-allowed"
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
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border-[3.5px] border-current bg-white dark:bg-[#111111] text-current shadow-[12px_12px_0px_currentColor]"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedCert(null)}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 z-20 p-2 rounded-lg border-2 border-current bg-white dark:bg-black text-current hover:bg-current hover:text-white dark:hover:text-black shadow-[3px_3px_0px_currentColor] active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>

                  {/* Certificate image — full visible, no cropping */}
                  {selectedCert.image ? (
                    <div className="relative w-full bg-black/5 dark:bg-white/5 border-b-2 border-current flex items-center justify-center p-4">
                      <Image
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        width={900}
                        height={700}
                        className="w-full h-auto object-contain rounded-lg border-2 border-current shadow-[4px_4px_0px_currentColor]"
                        style={{ maxHeight: "55vh" }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-44 bg-black/5 dark:bg-white/5 border-b-2 border-current flex items-center justify-center">
                      <div className="p-6 rounded-2xl border-2 border-current bg-black text-white dark:bg-white dark:text-black shadow-[4px_4px_0px_currentColor]">
                        {selectedCert.icon}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <div className="inline-flex items-center gap-2 border border-current px-2 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider mb-2">
                        {selectedCert.year} · {selectedCert.issuer}
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tight text-current">{selectedCert.title}</h4>
                    </div>
                    <p className="text-current/80 text-xs sm:text-sm leading-relaxed font-medium">{selectedCert.description}</p>
                    {selectedCert.credential !== "#" && selectedCert.category === "Badge" && (
                      <a
                        href={selectedCert.credential}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="comic-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider"
                      >
                        <ExternalLink size={14} /> Verify Credential
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
            className="flex flex-col gap-2 mb-12"
          >
            <div className="inline-flex items-center gap-2 self-start border-2 border-current px-2.5 py-0.5 font-mono text-[11px] font-black tracking-widest uppercase bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_currentColor]">
              CHAPTER 07 // TRANSMISSION
            </div>
            <div className="flex items-center gap-4">
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-current whitespace-nowrap">
                Contact Me
              </h3>
              <div className="h-[2px] bg-current opacity-30 flex-grow" />
            </div>
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
              className="relative rounded-2xl border-[3.5px] border-current bg-white dark:bg-[#111111] text-current p-6 sm:p-10 shadow-[10px_10px_0px_currentColor]"
            >
              <div className="space-y-2 mb-6">
                <p className="font-mono text-xs font-black uppercase tracking-widest text-current/80">// WHAT&apos;S NEXT?</p>
                <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-current">Get In Touch</h4>
                <p className="text-current/75 text-xs sm:text-sm leading-relaxed font-medium">
                  I&apos;m currently open to new opportunities, collaborations, or intelligent systems projects. Send me a message and I&apos;ll get back to you!
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: <Github size={16} />, href: "https://github.com/kenji0011", label: "GitHub" },
                  { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/salvahan-kean-gabriel-e-06760537b", label: "LinkedIn" },
                  { icon: <Mail size={16} />, href: "mailto:keangabriel101@email.com", label: "keangabriel101@email.com" },
                  { icon: <Phone size={16} />, href: "tel:+639205815366", label: "+63 920 581 5366" },
                  { icon: <MapPin size={16} />, href: "#", label: "Laguna, Philippines" },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-current bg-black/5 dark:bg-white/5 border-2 border-current px-3 py-2 rounded-lg shadow-[2px_2px_0px_currentColor] hover:bg-current hover:text-white dark:hover:text-black transition-all"
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
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-current/60 transition-colors" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border-2 border-current rounded-xl pl-11 pr-4 py-3 text-current placeholder:text-current/50 font-mono text-xs sm:text-sm outline-none focus:bg-transparent focus:shadow-[4px_4px_0px_currentColor] transition-all"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeUp} className="relative group">
                  <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-current/60 transition-colors" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border-2 border-current rounded-xl pl-11 pr-4 py-3 text-current placeholder:text-current/50 font-mono text-xs sm:text-sm outline-none focus:bg-transparent focus:shadow-[4px_4px_0px_currentColor] transition-all"
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeUp} className="relative group">
                  <MessageSquare size={16} className="absolute left-4 top-4 text-current/60 transition-colors" />
                  <textarea
                    placeholder="Your message..."
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border-2 border-current rounded-xl pl-11 pr-4 py-3 text-current placeholder:text-current/50 font-mono text-xs sm:text-sm outline-none focus:bg-transparent focus:shadow-[4px_4px_0px_currentColor] transition-all resize-none"
                  />
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp}>
                  <button
                    type="submit"
                    disabled={sending}
                    className={`comic-btn-primary w-full flex items-center justify-center gap-2 px-6 py-3.5 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                      submitted
                        ? "bg-emerald-600 text-white"
                        : sendError
                          ? "bg-red-600 text-white"
                          : ""
                    }`}
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
                        TRANSMITTING…
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center gap-2">✓ TRANSMISSION SENT!</span>
                    ) : sendError ? (
                      <span className="flex items-center gap-2">✗ FAILED — RETRY</span>
                    ) : (
                      <>
                        <Send size={16} />
                        SEND TRANSMISSION
                      </>
                    )}
                  </button>
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
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className="comic-btn-secondary fixed bottom-24 right-6 z-40 p-3 rounded-xl border-2 border-current shadow-[4px_4px_0px_currentColor] cursor-pointer"
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
          <motion.p variants={fadeIn} className="text-xs font-mono text-current/60 uppercase tracking-wider">
            © 2026 Kean Gabriel Salvahan. Inked & Coded in Intelligent Systems.
          </motion.p>
        </motion.div>
      </footer>
    </div>
  );
}