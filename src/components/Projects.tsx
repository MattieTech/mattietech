"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, FolderGit2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/lib/data";

const ACCENTS: Record<Project["accent"], string> = {
  cyan: "from-cyan-500 to-sky-400",
  indigo: "from-signal to-indigo-400",
  violet: "from-violet-500 to-fuchsia-400",
  teal: "from-teal-500 to-emerald-400",
};

export default function Projects() {
  const [openCase, setOpenCase] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          icon={FolderGit2}
          index="04"
          eyebrow="FEATURED WORK"
          title="Projects built to solve real problems."
          description="A mix of shipped products, learning platforms and tools built for real classmates and users."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const isOpen = openCase === project.name;
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                className="card-surface hover-lift rounded-2xl overflow-hidden flex flex-col"
              >
                {/* Browser-frame preview */}
                {project.preview ? (
                  <div className="relative bg-[#0A0B0F] border-b border-void-border">
                    <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#12141B]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      <span className="ml-2 flex-1 h-5 rounded-md bg-void-raised flex items-center justify-center">
                        <span className="font-mono text-[10px] text-paper-muted truncate px-3">
                          {project.demo || project.name.toLowerCase().replace(/\s+/g, "")}
                        </span>
                      </span>
                    </div>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={project.preview}
                        alt={`${project.name} preview`}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                ) : (
                  <div className={`relative h-32 p-5 bg-gradient-to-br ${ACCENTS[project.accent]}`}>
                    <div className="flex gap-1.5 mb-4">
                      <span className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="w-2 h-2 rounded-full bg-white/60" />
                      <span className="w-2 h-2 rounded-full bg-white/60" />
                    </div>
                    <div className="h-2.5 w-2/3 rounded-full bg-white/50 mb-2" />
                    <div className="h-2.5 w-1/3 rounded-full bg-white/40 mb-4" />
                    <div className="flex gap-2">
                      <div className="h-6 w-16 rounded-md bg-white/25" />
                      <div className="h-6 w-16 rounded-md bg-white/25" />
                      <div className="h-6 w-16 rounded-md bg-white/25" />
                    </div>
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display font-semibold text-xl">{project.name}</h3>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full bg-signal/10 text-signal">
                      {project.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-ink-muted dark:text-paper-muted leading-relaxed">
                    {project.description}
                  </p>

                  <button
                    onClick={() => setOpenCase(isOpen ? null : project.name)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-signal hover:text-signal-light hover:underline transition-colors w-fit cursor-pointer active:scale-95"
                    aria-expanded={isOpen}
                  >
                    Case study
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-sm text-ink-muted dark:text-paper-muted leading-relaxed border-t border-bone-border dark:border-void-border mt-3">
                          {project.caseStudy}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-bone dark:bg-void text-ink-muted dark:text-paper-muted border border-bone-border dark:border-void-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-bone-border dark:border-void-border">
                    {project.demo || project.demoLabel ? (
                      <a
                        href={project.demo ?? "#contact"}
                        target={project.demo ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="btn-primary px-4 py-2 text-sm font-medium"
                      >
                        {project.demo && <ExternalLink size={14} />}
                        {project.demoLabel ?? "Live demo"}
                      </a>
                    ) : null}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary px-4 py-2 text-sm font-medium"
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
