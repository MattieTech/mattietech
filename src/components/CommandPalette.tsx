"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const DESTINATIONS = [
  { id: "about", label: "About", hint: "Background & philosophy" },
  { id: "skills", label: "Skills", hint: "Technical competencies" },
  { id: "projects", label: "Projects", hint: "Featured work" },
  { id: "certificates", label: "Certificates", hint: "Verified credentials" },
  { id: "terminal", label: "Terminal", hint: "Interactive CLI" },
  { id: "experience", label: "Journey", hint: "Learning timeline" },
  { id: "services", label: "Services", hint: "How I can help" },
  { id: "opensource", label: "Open Source", hint: "GitHub activity" },
  { id: "faq", label: "FAQ", hint: "Common questions" },
  { id: "contact", label: "Get in touch", hint: "Direct email & WhatsApp" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DESTINATIONS;
    return DESTINATIONS.filter(
      (d) => d.label.toLowerCase().includes(q) || d.hint.toLowerCase().includes(q)
    );
  }, [query]);

  function go(id: string) {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="hidden sm:flex items-center gap-2 rounded-full border border-bone-border dark:border-void-border px-3.5 py-2 text-xs text-ink-muted dark:text-paper-muted hover:border-signal transition-colors"
      >
        <Search size={14} />
        <span className="font-mono">⌘K</span>
      </button>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open search"
        className="sm:hidden w-9 h-9 grid place-items-center rounded-full border border-bone-border dark:border-void-border"
      >
        <Search size={15} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="fixed z-[91] top-16 sm:top-24 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full max-w-lg mx-auto rounded-2xl border border-void-border bg-[#0A0B0F] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-void-border">
                <Search size={16} className="text-paper-muted shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section…"
                  className="flex-1 bg-transparent outline-none text-sm text-paper placeholder:text-paper-muted/50"
                />
                <kbd className="hidden sm:inline-block font-mono text-[10px] text-paper-muted border border-void-border rounded px-1.5 py-0.5">
                  esc
                </kbd>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close search"
                  className="p-1 rounded-md text-paper-muted hover:text-paper hover:bg-void-border transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 && (
                  <p className="px-4 py-6 text-sm text-paper-muted text-center">No matches.</p>
                )}
                {results.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => go(d.id)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-signal/10 transition-colors"
                  >
                    <span className="text-sm text-paper font-medium">{d.label}</span>
                    <span className="text-xs text-paper-muted font-mono">{d.hint}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
