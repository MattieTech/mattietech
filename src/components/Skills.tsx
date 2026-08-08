"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skills, skillLevels } from "@/lib/data";

export default function Skills() {
  const categories = Object.entries(skills);
  const half = Math.ceil(skillLevels.length / 2);
  const columns = [skillLevels.slice(0, half), skillLevels.slice(half)];

  return (
    <section id="skills" className="py-24 md:py-32 scroll-mt-20 bg-bone-raised/40 dark:bg-void-raised/30">
      <div className="container-content">
        <SectionHeading
          icon={Code2}
          index="02"
          eyebrow="TECHNICAL COMPETENCIES"
          title="Where I'm strong, and where I'm actively leveling up."
          description="Confidence levels below are self-assessed and updated as I ship — not a certification score."
          align="split"
        />

        {/* Proficiency bars */}
        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-7 mb-16">
          {columns.map((col, ci) => (
            <div key={ci} className="space-y-7">
              {col.map((skill, i) => (
                <motion.div
                  key={skill.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <p className="text-sm font-medium">{skill.label}</p>
                    <p className="font-mono text-xs font-semibold text-signal dark:text-sky-400">
                      {skill.value}%
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-bone-border/60 dark:bg-void-border overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-signal via-sky-400 to-cyan-300 shadow-sm"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Category pill groups */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card-surface hover-lift rounded-2xl p-6"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-full border border-bone-border dark:border-void-border text-ink-muted dark:text-paper-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
