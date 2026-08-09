"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useActiveSection } from "@/lib/useActiveSection";
import CommandPalette from "./CommandPalette";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "terminal", label: "Terminal" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "services", label: "Services", mobileOnly: true },
  { id: "faq", label: "FAQ", mobileOnly: true },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(id: string) {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  }

  return (
    <header
      className={`fixed top-[3px] inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-bone/80 dark:bg-void/70 border-b border-bone-border dark:border-void-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-content flex items-center justify-between h-16 md:h-[72px]">
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center shrink-0 hover:scale-105 transition-transform cursor-pointer"
        >
          <span className="font-display font-semibold text-lg tracking-tight">
            Mattie<span className="text-signal">Tech</span>
          </span>
        </a>

        {/* Terminal breadcrumb */}
        <div className="hidden md:flex items-center font-mono text-sm">
          <span className="text-signal">matthew@mattietech</span>
          <span className="text-ink dark:text-paper">:~/{active || "about"}</span>
          <span className="text-signal">$</span>
          <span className="ml-0.5 w-[0.5em] h-[1em] bg-signal animate-blink inline-block" aria-hidden="true" />
        </div>

        <div className="hidden lg:flex items-center gap-7">
          {SECTIONS.filter((s) => !s.mobileOnly).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(s.id);
              }}
              className={`text-sm font-medium transition-all hover:scale-105 active:scale-95 relative py-1 cursor-pointer ${
                active === s.id
                  ? "text-signal"
                  : "text-ink-muted hover:text-ink dark:text-paper-muted dark:hover:text-paper"
              }`}
            >
              {s.label}
              {active === s.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute left-0 right-0 -bottom-1 h-px bg-signal"
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden lg:grid w-9 h-9 place-items-center rounded-full border border-bone-border dark:border-void-border hover:border-signal btn-hover-effect hover:shadow-md hover:shadow-signal/20"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="hidden sm:inline-flex btn-primary px-5 py-2.5 text-sm font-medium"
          >
            Let&apos;s talk
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-bone-border dark:border-void-border btn-hover-effect hover:border-signal"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-bone-border dark:border-void-border bg-bone dark:bg-void"
          >
            <div className="container-content py-4 flex flex-col gap-4">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(s.id);
                  }}
                  className={`text-base font-medium transition-colors py-1 ${
                    active === s.id ? "text-signal" : "text-ink dark:text-paper"
                  }`}
                >
                  {s.label}
                </a>
              ))}

              <div className="flex items-center justify-between pt-3 border-t border-bone-border dark:border-void-border">
                <span className="text-sm font-medium text-ink-muted dark:text-paper-muted">Appearance</span>
                <button
                  onClick={toggle}
                  className="inline-flex items-center gap-2 rounded-full border border-bone-border dark:border-void-border px-3.5 py-2 text-xs font-medium text-ink dark:text-paper hover:border-signal transition-colors"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={15} className="text-amber-400" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={15} className="text-signal" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
                className="inline-flex w-full justify-center items-center rounded-full bg-gradient-to-r from-signal to-sky-400 text-white px-5 py-2.5 text-sm font-medium mt-1"
              >
                Let&apos;s talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
