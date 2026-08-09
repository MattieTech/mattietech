"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { TerminalSquare, Trash2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { terminalCommands } from "@/lib/data";

type Line = { type: "input" | "output"; text: string };

const QUICK_RUN = ["whoami", "skills", "education", "projects", "contact", "clear"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `Welcome to matthew@mattietech — type "help" to get started.` },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: "input", text: cmd }]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);

    if (cmd === "clear") {
      setLines([]);
      return;
    }

    const output =
      cmd in terminalCommands
        ? terminalCommands[cmd as keyof typeof terminalCommands]
        : `command not found: ${cmd}\ntype "help" to see available commands`;

    setLines((prev) => [...prev, { type: "output", text: output }]);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(value);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
    }
  }

  function runQuick(cmd: string) {
    run(cmd);
    inputRef.current?.focus();
  }

  return (
    <section id="terminal" className="py-24 md:py-32 scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          icon={TerminalSquare}
          index="03"
          eyebrow="DEVELOPER CONSOLE"
          title="Interactive CLI Terminal"
          description="Type executable commands below to query developer credentials and portfolio metadata."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden border border-void-border bg-[#0A0B0F] shadow-2xl"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#12141B] border-b border-void-border">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-xs text-paper-muted">matthew@mattietech — zsh</span>
            <button
              onClick={() => setLines([])}
              aria-label="Clear terminal"
              className="ml-auto text-paper-muted hover:text-terminal-green transition-all cursor-pointer hover:scale-110 active:scale-95"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-void-border">
            <span className="font-mono text-xs text-paper-muted mr-1">Quick run:</span>
            {QUICK_RUN.map((cmd) => (
              <button
                key={cmd}
                onClick={() => runQuick(cmd)}
                className="font-mono text-xs px-2.5 py-1 rounded-md border border-void-border text-paper-muted hover:border-signal hover:text-signal-light hover:bg-signal/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="h-80 sm:h-96 overflow-y-auto px-5 py-4 font-mono text-[13px] sm:text-sm leading-relaxed cursor-text"
          >
            {lines.map((line, i) =>
              line.type === "input" ? (
                <div key={i} className="flex gap-2 text-paper">
                  <span className="text-terminal-green shrink-0">➜</span>
                  <span className="text-signal-light shrink-0">~$</span>
                  <span>{line.text}</span>
                </div>
              ) : (
                <pre key={i} className="whitespace-pre-wrap text-paper-muted mb-2 mt-0.5">
                  {line.text}
                </pre>
              )
            )}

            <form onSubmit={onSubmit} className="flex gap-2 items-center text-paper mt-1">
              <span className="text-terminal-green shrink-0">➜</span>
              <span className="text-signal-light shrink-0">~$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                className="flex-1 bg-transparent outline-none placeholder:text-paper-muted/40"
                placeholder="type a command…"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
