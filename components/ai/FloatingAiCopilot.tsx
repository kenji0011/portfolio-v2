"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, Send, X } from "lucide-react";

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
        "Kean has built several projects including Tempo (an offline-first Flutter + Rust + SQLite fitness tracker), Berong E-Learning (SafeScape 2.0), Medical Center Bank (Monte Carlo inventory optimization), Kasangkap-Hunt Chefbot, GetGoods, and Rockies. Check them out in the Featured Projects section!";
    } else if (
      /(skill|tech|stack|expertise|language|framework|code|know|qa|test|analytics|automation)/.test(
        lowerQuery
      )
    ) {
      answer =
        "His core strength is in Data Analytics (SQL, PostgreSQL, Pandas, Power BI), and he has a strong interest and learning focus in Quality Assurance (QA) and Automation for his upcoming OJT.";
    } else if (
      /(education|school|study|university|college|degree|student)/.test(
        lowerQuery
      )
    ) {
      answer =
        "He is currently a BS Computer Science student (Major in Intelligent Systems) at Laguna State Polytechnic University.";
    } else if (/(contact|email|phone|hire|reach|message|ojt|intern)/.test(lowerQuery)) {
      answer =
        "You can reach Kean via email at keangabriel101@gmail.com or use the contact form at the bottom of the page. He is currently open to OJT / internship opportunities in QA, Data Analytics, and Automation!";
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
        "Kean is a Computer Science student based in Laguna, Philippines, specializing in Data Analytics with an active interest in Quality Assurance (QA) and Process Automation.";
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
      {/* Flat Minimal Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-medium transition-colors cursor-pointer ${
                isDark
                  ? "bg-[#111113] border-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:border-zinc-700"
                  : "bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300"
              }`}
              aria-label="Ask KenjiAI"
            >
              <MessageSquare size={14} className="shrink-0" />
              <span>Ask KenjiAI</span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Flat Minimal Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[400px] h-[540px] max-h-[85vh] rounded-2xl border flex flex-col overflow-hidden ${
              isDark
                ? "bg-[#111113] border-zinc-800 text-zinc-100"
                : "bg-white border-zinc-200 text-zinc-950"
            }`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b select-none ${
                isDark
                  ? "bg-[#0d0d0f] border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-zinc-500 dark:text-zinc-400" />
                <span className="font-semibold text-xs tracking-tight">
                  KenjiAI Assistant
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? "border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    : "border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                }`}
                aria-label="Close AI Chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {messages.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col p-5 overflow-y-auto no-scrollbar"
                  >
                    <p className="text-xs leading-relaxed mb-5 text-zinc-600 dark:text-zinc-400">
                      Ask me anything about Kean&apos;s background, skills,
                      projects, or OJT availability. Try a prompt below:
                    </p>

                    <div className="flex flex-col gap-2 w-full">
                      {prompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => handlePromptClick(p)}
                          className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border text-left transition-colors text-xs font-medium cursor-pointer ${
                            isDark
                              ? "bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
                              : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300"
                          }`}
                        >
                          <MessageSquare size={13} className="shrink-0 opacity-60" />
                          <span>{p}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar"
                  >
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-3.5 py-2.5 rounded-xl max-w-[85%] text-xs leading-relaxed ${
                            m.role === "user"
                              ? isDark
                                ? "bg-zinc-100 text-zinc-950 font-medium"
                                : "bg-zinc-900 text-white font-medium"
                              : isDark
                              ? "bg-zinc-900 text-zinc-200 border border-zinc-800"
                              : "bg-zinc-100 text-zinc-800"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div
                          className={`px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 ${
                            isDark
                              ? "bg-zinc-900 border border-zinc-800"
                              : "bg-zinc-100"
                          }`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-bounce bg-zinc-400"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-bounce bg-zinc-400"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full animate-bounce bg-zinc-400"
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
              className={`p-3 border-t ${
                isDark
                  ? "bg-[#0d0d0f] border-zinc-800"
                  : "bg-zinc-50 border-zinc-200"
              }`}
            >
              <form
                onSubmit={handleInputSubmit}
                className={`relative flex items-center border rounded-lg overflow-hidden transition-colors ${
                  isDark
                    ? "bg-zinc-900/60 border-zinc-800 focus-within:border-zinc-600"
                    : "bg-white border-zinc-200 focus-within:border-zinc-900"
                }`}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder="Ask a question..."
                  className="w-full !bg-transparent !border-none focus:ring-0 text-xs outline-none pl-3 pr-20 py-2.5"
                />
                <div className="absolute right-2 flex items-center gap-1.5">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setMessages([])}
                      className={`px-2 py-1 rounded text-[10px] font-medium transition-colors cursor-pointer ${
                        isDark
                          ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                          : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100"
                      }`}
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={`p-1.5 rounded-md transition-colors disabled:opacity-30 cursor-pointer ${
                      isDark
                        ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-300"
                        : "bg-zinc-900 text-white hover:bg-zinc-700"
                    }`}
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
};
