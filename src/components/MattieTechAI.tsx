"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  ArrowDownRight,
  Bot,
  User,
} from "lucide-react";
import {
  profile,
  projects,
  skills,
  education,
  services,
  timeline,
  faqs,
  certificates,
  about,
  skillLevels,
} from "@/lib/data";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  action?: string;
};

const SUGGESTED_PROMPTS = [
  { label: "View Projects", query: "Show me Matthew's projects", action: "#projects" },
  { label: "Tech Stack", query: "What technologies does he use?", action: "#skills" },
  { label: "About Matthew", query: "Who is Matthew Aliu?", action: "#about" },
  { label: "Services", query: "What services does Matthew offer?", action: "#services" },
  { label: "Contact Matthew", query: "How can I contact Matthew?", action: "#contact" },
];

// Helper for security check against prompt injection / secret exposure
function isSecurityViolation(query: string): boolean {
  const lower = query.toLowerCase();
  const dangerousPatterns = [
    "api_key",
    "apikey",
    "secret",
    "system prompt",
    "environment variable",
    "process.env",
    "db_pass",
    "private key",
    "ignore previous instructions",
    "bypass safety",
    "reveal key",
    "show key",
  ];
  return dangerousPatterns.some((pattern) => lower.includes(pattern));
}

// Comprehensive, intelligent client-side knowledge engine
function generateAIResponse(message: string): { response: string; action?: string } {
  const query = message.toLowerCase().trim();

  // Security refusal
  if (isSecurityViolation(query)) {
    return {
      response:
        "I am MattieTech AI, the official portfolio assistant for Matthew Aliu. I am designed exclusively to help visitors explore Matthew's projects, skills, services, and background. I cannot expose internal credentials or system configurations.",
    };
  }

  // 1. Identity & Bio / Who is Matthew
  if (
    query.includes("who is matthew") ||
    query.includes("who are you") ||
    query.includes("about matthew") ||
    query.includes("what does matthew do") ||
    query.includes("who is he") ||
    query.includes("mattietech") ||
    query.includes("hello") ||
    query.includes("hi") ||
    query.includes("hey")
  ) {
    return {
      response:
        "I’m **MattieTech AI**, the official AI portfolio assistant for Matthew Aliu!\n\nMatthew is a **100 Level Software Engineering student** at Confluence University of Science and Technology (CUSTECH) with a **4.88 / 5.00 CGPA**.\n\nHe specializes in **Full-Stack Web Development**, **AI Application Development**, and building scalable digital systems.\n\n[NAVIGATE:#about]",
      action: "#about",
    };
  }

  // 2. Specific Project: CampusTutor AI
  if (
    query.includes("campustutor") ||
    query.includes("campus tutor") ||
    query.includes("tell me about campustutor")
  ) {
    const proj = projects.find((p) => p.name === "CampusTutor AI");
    return {
      response: `**CampusTutor AI** is an AI-powered study platform built by Matthew Aliu under the MattieTech brand.\n\n• **What it does**: Allows students to upload lecture documents and generates clean summaries, explanations, and revision questions in seconds.\n• **Problem it solves**: Helps students condense dense lecture PDFs during exam season.\n• **Tech Stack**: Next.js, Supabase, Google Gemini API, TypeScript, Tailwind CSS.\n• **Live Impact**: 91+ active users, 98+ documents processed, 157+ AI generations.\n\n[Live Demo](${proj?.demo}) | [GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  // 3. Specific Project: CodeQuest AI
  if (query.includes("codequest") || query.includes("code quest")) {
    const proj = projects.find((p) => p.name === "CodeQuest AI");
    return {
      response: `**CodeQuest AI** is Matthew's flagship project — a gamified, AI-powered coding education platform.\n\n• **What it does**: Features an in-browser Monaco editor, AI-generated coding challenges, 3D reward scenes, and integrated payment processing.\n• **Architecture**: 113-file production-ready build.\n• **Tech Stack**: Next.js 15, Express, Supabase, Gemini API, Monaco Editor, React Three Fiber, Stripe/Paystack.\n\n[GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  // 4. Specific Project: FCI Student Guide
  if (query.includes("fci student guide") || query.includes("fci guide") || query.includes("fci")) {
    const proj = projects.find((p) => p.name === "FCI Student Guide");
    return {
      response: `**FCI Student Guide** is a multi-page student resource portal built for CUSTECH's Faculty of Computing and Informatics.\n\n• **Purpose**: Gives students a centralized hub for course information, departmental guidance, and academic materials.\n• **Tech Stack**: HTML, CSS, JavaScript.\n\n[GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  // 5. Specific Project: ProGrade
  if (query.includes("prograde")) {
    const proj = projects.find((p) => p.name === "ProGrade");
    return {
      response: `**ProGrade** is an academic productivity tool built by Matthew Aliu.\n\n• **Purpose**: A clean, fast GPA and CGPA calculator built for university students to track their academic performance.\n• **Tech Stack**: JavaScript, HTML, CSS.\n\n[GitHub Repository](${proj?.github})\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  // 6. Projects Overview
  if (
    query.includes("project") ||
    query.includes("built") ||
    query.includes("work") ||
    query.includes("portfolio") ||
    query.includes("show me his projects")
  ) {
    return {
      response: `Matthew has built and shipped several practical applications:\n\n1. **CampusTutor AI**: AI-powered lecture document study assistant for university students.\n2. **CodeQuest AI**: Gamified coding platform with Monaco editor, AI tutor & 3D scenes.\n3. **FCI Student Guide**: Academic portal for CUSTECH Faculty of Computing & Informatics.\n4. **ProGrade**: University GPA/CGPA calculation tool.\n5. **MattieTech Portfolio**: This production-grade Next.js portfolio website.\n\n[NAVIGATE:#projects]`,
      action: "#projects",
    };
  }

  // 7. Tech Stack & Technologies
  if (
    query.includes("skill") ||
    query.includes("tech stack") ||
    query.includes("technology") ||
    query.includes("technologies") ||
    query.includes("react") ||
    query.includes("next") ||
    query.includes("node") ||
    query.includes("supabase") ||
    query.includes("full-stack") ||
    query.includes("full stack") ||
    query.includes("frontend") ||
    query.includes("backend") ||
    query.includes("ai")
  ) {
    return {
      response: `Matthew's technical skills & stack include:\n\n• **Frontend**: HTML, CSS, JavaScript, TypeScript, React, Next.js 15, Tailwind CSS, Framer Motion\n• **Backend**: Node.js, Express, REST APIs, Supabase\n• **Database**: PostgreSQL, Supabase, MongoDB\n• **AI Engineering**: Google Gemini API, AI-powered Web Apps, AI Chatbot Integrations\n• **Tools & Platforms**: Git, GitHub, Vercel, Firebase, Netlify, VS Code, Figma\n\n[NAVIGATE:#skills]`,
      action: "#skills",
    };
  }

  // 8. Services & Freelance / Website Building
  if (
    query.includes("service") ||
    query.includes("freelance") ||
    query.includes("hire") ||
    query.includes("build a website") ||
    query.includes("build website") ||
    query.includes("can i hire him") ||
    query.includes("available for freelance")
  ) {
    return {
      response: `Yes! Matthew is available for freelance projects, custom web development, and internships. His services include:\n\n• **Business & Portfolio Websites**: Custom, responsive landing pages & brand sites.\n• **Full-Stack Web Applications**: Scalable apps built with React, Next.js, and Supabase/Node.js.\n• **AI Integrations & Chatbots**: LLM integrations, document intelligence, and custom AI tools.\n• **Student & Education Portals**: Custom calculators, course guides, and departmental portals.\n• **E-commerce Setup**: Storefront setup for small businesses.\n\n[NAVIGATE:#services]`,
      action: "#services",
    };
  }

  // 9. Pricing Questions (Never invent price!)
  if (query.includes("price") || query.includes("cost") || query.includes("how much") || query.includes("rate")) {
    return {
      response: `Matthew’s pricing depends on the specific project scope and requirements. You can contact him directly to discuss your project and get a custom quote!\n\n[NAVIGATE:#contact]`,
      action: "#contact",
    };
  }

  // 10. Recruiter / Internship / Hiring Evaluation Mode
  if (
    query.includes("recruiter") ||
    query.includes("why hire") ||
    query.includes("internship") ||
    query.includes("job") ||
    query.includes("employ") ||
    query.includes("evaluate")
  ) {
    return {
      response: `Matthew is a high-performing **Software Engineering student (4.88 / 5.00 CGPA)** who focuses on building practical web and AI applications. Rather than learning technologies theoretically, he uses them to build and deploy real products such as **CampusTutor AI** (91+ users) and **CodeQuest AI**.\n\nHis strongest areas include **Frontend Engineering**, **Full-Stack Web Development**, **AI API Integration**, and **Modern UI Systems**.\n\nHe is open to Software Engineering internships, junior roles, and remote freelance opportunities.\n\n[NAVIGATE:#contact]`,
      action: "#contact",
    };
  }

  // 11. Contact & Social Links
  if (
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("reach") ||
    query.includes("whatsapp") ||
    query.includes("message") ||
    query.includes("location")
  ) {
    return {
      response: `You can contact Matthew Aliu directly through:\n\n• **Email**: ${profile.email}\n• **WhatsApp**: ${profile.whatsappNumber} (${profile.whatsapp})\n• **Location**: ${profile.location} (West Africa Time, UTC+1 — comfortable working async)\n• **Social Media**: GitHub (@MattieTech), LinkedIn, X (@mattie_tech), Instagram, TikTok\n\nOr send a message using the portfolio contact form below!\n\n[NAVIGATE:#contact]`,
      action: "#contact",
    };
  }

  // 12. Education & Academic Background
  if (
    query.includes("education") ||
    query.includes("academic") ||
    query.includes("custech") ||
    query.includes("cgpa") ||
    query.includes("school") ||
    query.includes("university") ||
    query.includes("class")
  ) {
    return {
      response: `Matthew is currently a **100 Level Software Engineering student** at **Confluence University of Science and Technology (CUSTECH)** in Osara, Kogi State, Nigeria.\n\n• **CGPA**: 4.88 / 5.00 (Ranked at top of class)\n• **Role**: Course Representative for SWE142 (coordinating 100+ students)\n• **Focus**: Combining rigorous software engineering fundamentals with hands-on product building.\n\n[NAVIGATE:#about]`,
      action: "#about",
    };
  }

  // 13. What is he learning / Journey
  if (query.includes("learning") || query.includes("journey") || query.includes("timeline")) {
    return {
      response: `Matthew is currently expanding his expertise in:\n\n• **System Design & Architecture**\n• **Advanced AI Engineering**\n• **Cybersecurity Fundamentals**\n\nHe documents his progress publicly under **#100DaysOfCode** and **#MattieTech** across social media platforms.\n\n[NAVIGATE:#about]`,
      action: "#about",
    };
  }

  // Fallback for unverified or unknown queries
  return {
    response:
      "I don't have that specific information available right now, but you can contact Matthew directly for more details!\n\nWould you like to explore his projects, tech stack, or services?",
  };
}

export default function MattieTechAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "Hi! I’m MattieTech AI 👋\n\nI can help you explore Matthew’s projects, skills, services, and experience.\n\nWhat would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Handle smooth scroll navigation to page section
  function scrollToSection(target: string) {
    if (!target) return;
    const cleanTarget = target.startsWith("#") ? target.substring(1) : target;
    const element = document.getElementById(cleanTarget);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handleSend(textToSend?: string) {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    // Simulate natural typing delay for realistic interaction
    setTimeout(() => {
      let aiResult: { response: string; action?: string } = { response: "", action: undefined };

      try {
        aiResult = generateAIResponse(messageText);
      } catch (err) {
        aiResult = {
          response:
            "I'm MattieTech AI 👋 You can explore Matthew's projects, tech stack, services, or reach out directly using the contact form!",
          action: undefined,
        };
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResult.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        action: aiResult.action,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);

      if (aiResult.action) {
        scrollToSection(aiResult.action);
      }
    }, 400);
  }

  function handlePromptClick(prompt: { label: string; query: string; action?: string }) {
    if (prompt.action) {
      scrollToSection(prompt.action);
    }
    handleSend(prompt.query);
  }

  function handleCopy(id: string, text: string) {
    const cleanText = text.replace(/\[NAVIGATE:#[a-zA-Z0-9_-]+\]/g, "").trim();
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  function handleClear() {
    setMessages([
      {
        id: "welcome-1",
        role: "assistant",
        content:
          "Hi! I’m MattieTech AI 👋\n\nI can help you explore Matthew’s projects, skills, services, and experience.\n\nWhat would you like to know?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }

  function handleRegenerate() {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (lastUserMessage) {
      handleSend(lastUserMessage.content);
    }
  }

  // Format message text with markdown bold, bullet points, links, and action tags
  function renderFormattedContent(content: string, actionTarget?: string) {
    let text = content;

    const navMatch = text.match(/\[NAVIGATE:(#[a-zA-Z0-9_-]+)\]/);
    const targetSection = navMatch ? navMatch[1] : actionTarget;
    text = text.replace(/\[NAVIGATE:#[a-zA-Z0-9_-]+\]/g, "").trim();

    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);

    return (
      <div className="space-y-2 text-sm leading-relaxed">
        {parts.map((part, idx) => {
          const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (linkMatch) {
            const [, label, url] = linkMatch;
            return (
              <a
                key={idx}
                href={url}
                target={url.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="text-signal underline hover:text-signal-light font-medium transition-colors"
              >
                {label}
              </a>
            );
          }

          const lines = part.split("\n");
          return (
            <div key={idx}>
              {lines.map((line, lineIdx) => {
                if (!line.trim()) return <div key={lineIdx} className="h-1" />;

                const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
                const lineContent = isBullet ? line.trim().replace(/^[-•]\s*/, "") : line;

                const segments = lineContent.split(/(\*\*[^*]+\*\*)/g);

                return (
                  <p key={lineIdx} className={isBullet ? "pl-4 relative my-1" : "my-0.5"}>
                    {isBullet && (
                      <span className="absolute left-0 top-0 text-signal font-bold">•</span>
                    )}
                    {segments.map((seg, segIdx) => {
                      if (seg.startsWith("**") && seg.endsWith("**")) {
                        return (
                          <strong key={segIdx} className="font-semibold text-paper font-display">
                            {seg.slice(2, -2)}
                          </strong>
                        );
                      }
                      return seg;
                    })}
                  </p>
                );
              })}
            </div>
          );
        })}

        {targetSection && (
          <button
            onClick={() => scrollToSection(targetSection)}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-signal/15 text-signal hover:bg-signal/25 border border-signal/30 transition-all cursor-pointer"
          >
            Jump to section <ArrowDownRight size={14} />
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open MattieTech AI Assistant"
            className="fixed bottom-6 right-4 sm:right-7 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full card-surface border border-signal/40 text-paper shadow-[0_0_25px_rgba(79,93,255,0.3)] hover:border-signal transition-all cursor-pointer backdrop-blur-xl bg-void-raised/90 group"
          >
            <div className="relative grid place-items-center">
              <Sparkles className="w-5 h-5 text-signal group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-terminal-green animate-pulse" />
            </div>
            <span className="font-display text-sm font-semibold tracking-wide text-paper group-hover:text-signal transition-colors hidden xs:inline">
              MattieTech AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-7 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[82vh] max-h-[620px] flex flex-col rounded-2xl border border-void-border bg-void-raised/95 backdrop-blur-2xl shadow-2xl text-paper overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-void-border bg-void/80">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-signal/20 border border-signal/40 grid place-items-center text-signal">
                  <Bot size={20} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-terminal-green border-2 border-void-raised" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm tracking-tight text-paper">
                      MattieTech AI
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-terminal-green/15 text-terminal-green border border-terminal-green/30">
                      ● Online
                    </span>
                  </div>
                  <p className="text-[11px] text-paper-muted">Your portfolio assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  title="Clear conversation"
                  aria-label="Clear conversation"
                  className="p-1.5 rounded-lg text-paper-muted hover:text-paper hover:bg-void-border/50 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                  aria-label="Close assistant"
                  className="p-1.5 rounded-lg text-paper-muted hover:text-paper hover:bg-void-border/50 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`flex gap-2.5 max-w-[88%] ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg shrink-0 grid place-items-center text-xs mt-0.5 ${
                        msg.role === "user"
                          ? "bg-signal text-white"
                          : "bg-void-border text-signal"
                      }`}
                    >
                      {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-signal text-white rounded-tr-none"
                          : "bg-void-border/50 border border-void-border text-paper rounded-tl-none"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        renderFormattedContent(msg.content, msg.action)
                      ) : (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-1 px-1 text-[10px] font-mono text-paper-muted">
                    <span>{msg.timestamp}</span>
                    {msg.role === "assistant" && msg.id !== "welcome-1" && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-signal transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={12} className="text-terminal-green" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-start gap-2.5 max-w-[85%]">
                  <div className="w-7 h-7 rounded-lg bg-void-border text-signal shrink-0 grid place-items-center mt-0.5">
                    <Bot size={14} />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-void-border/50 border border-void-border flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-signal animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-signal animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-signal animate-bounce" />
                  </div>
                </div>
              )}

              {/* Suggested Prompt Pills (Show if 1 message) */}
              {messages.length === 1 && (
                <div className="mt-4 pt-2 border-t border-void-border/40">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-paper-muted mb-2">
                    Suggested Prompts:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePromptClick(prompt)}
                        className="px-2.5 py-1.5 rounded-lg bg-void-border/40 hover:bg-signal/20 hover:border-signal/40 border border-void-border text-xs text-paper hover:text-signal font-medium transition-all text-left cursor-pointer"
                      >
                        {prompt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-void-border bg-void/90">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask MattieTech AI..."
                  maxLength={1000}
                  disabled={loading}
                  className="flex-1 bg-void-border/40 border border-void-border rounded-xl px-3.5 py-2.5 text-xs text-paper placeholder:text-paper-muted focus:outline-none focus:border-signal transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="p-2.5 rounded-xl bg-signal text-white hover:bg-signal-dim disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 grid place-items-center cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>

              <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-paper-muted">
                <span>MattieTech AI Portfolio Assistant</span>
                {messages.length > 2 && (
                  <button
                    onClick={handleRegenerate}
                    disabled={loading}
                    className="hover:text-signal transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw size={10} /> Regenerate
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
