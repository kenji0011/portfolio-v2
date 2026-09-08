"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Brain, Send, X } from "lucide-react";

type FloatingAiCopilotProps = {
  isDark: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const FloatingAiCopilot: React.FC<FloatingAiCopilotProps> = ({
  isDark,
  isOpen,
  setIsOpen,
}) => {
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
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
    let answer =
      "That's an interesting question! While I'm just a simulated AI, you can find most details about Kean by exploring this portfolio, or by sending him a direct message in the contact section!";

    if (
      /(project|work|built|experience|portfolio|made|did he do)/.test(
        lowerQuery
      )
    ) {
      answer =
        "Kean has built several cool projects including an E-Commerce App (GetGoods), a Machine Learning Filipino Recipe Chatbot (Kasangkap-Hunt), a Fitness Tracker (Rockies), and the Berong E-Learning platform. Check them out in the Featured Projects section!";
    } else if (
      /(skill|tech|stack|expertise|language|framework|code|know)/.test(
        lowerQuery
      )
    ) {
      answer =
        "His core skills revolve around Generative AI, Machine Learning, and Data Science. He primarily works with Python, React, Next.js, and frameworks like TensorFlow and PyTorch.";
    } else if (
      /(education|school|study|university|college|degree|student)/.test(
        lowerQuery
      )
    ) {
      answer =
        "He is currently a 3rd Year BS Computer Science student at Laguna State Polytechnic University.";
    } else if (/(contact|email|phone|hire|reach|message)/.test(lowerQuery)) {
      answer =
        "You can reach Kean via email at keangabriel101@gmail.com or use the contact form at the bottom of the page. He is currently open to new opportunities!";
    } else if (/(name|call him)/.test(lowerQuery)) {
      answer =
        "His full name is Kean Gabriel Salvahan. But you can just call him Kean!";
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
                  ? "bg-black border-white text-white shadow-[4px_4px_0px_#ffffff] hover:bg-white hover:text-black"
                  : "bg-white border-black text-black shadow-[4px_4px_0px_#000000] hover:bg-black hover:text-white"
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
                className={`p-1 border-2 transition-colors cursor-pointer ${
                  isDark
                    ? "bg-black text-white border-white hover:bg-white hover:text-black"
                    : "bg-white text-black border-black hover:bg-black hover:text-white"
                }`}
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
                        <h4 className="text-sm font-black uppercase tracking-tight">
                          KenjiAI Assistant
                        </h4>
                        <p className="text-[11px] font-mono opacity-70">
                          Ask me about Kean
                        </p>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed mb-6 opacity-80">
                      I&apos;m programmed with details about Kean&apos;s
                      background, tech stack, machine learning projects, and
                      education. Try a prompt:
                    </p>

                    <div className="flex flex-col gap-2.5 w-full">
                      {prompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => handlePromptClick(p)}
                          className={`comic-btn-secondary flex items-center gap-3 p-3 rounded-xl text-left transition-all group font-bold text-xs ${
                            isDark
                              ? "bg-black text-white hover:bg-white hover:text-black"
                              : "bg-white text-black hover:bg-black hover:text-white"
                          }`}
                        >
                          <MessageSquare size={13} className="shrink-0" />
                          <span>{p}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar"
                  >
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
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
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-bounce bg-current"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-bounce bg-current"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-bounce bg-current"
                            style={{ animationDelay: "300ms" }}
                          />
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
                      className={`px-1.5 py-0.5 rounded border text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        isDark
                          ? "border-white/40 bg-black text-white hover:bg-white hover:text-black"
                          : "border-black/40 bg-white text-black hover:bg-black hover:text-white"
                      }`}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={`p-1.5 border transition-colors ${
                      isDark
                        ? "border-white bg-black text-white hover:bg-white hover:text-black"
                        : "border-black bg-white text-black hover:bg-black hover:text-white"
                    } disabled:opacity-30 cursor-pointer`}
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
};
