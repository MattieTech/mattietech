"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users2, UserRound } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { about, education } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          icon={UserRound}
          index="01"
          eyebrow="BACKGROUND & PHILOSOPHY"
          title="Building in public, one project at a time."
        />

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            {about.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-muted dark:text-paper-muted leading-relaxed text-[15px] sm:text-base">
                {p}
              </p>
            ))}

            <dl className="grid sm:grid-cols-3 gap-6 pt-6 mt-2 border-t border-bone-border dark:border-void-border">
              {about.focus.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-paper-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface rounded-2xl p-7 sm:p-8 h-fit"
          >
            <div className="flex items-center gap-2.5 mb-6">
              <GraduationCap size={20} className="text-signal" />
              <h3 className="font-display font-semibold text-lg">Education</h3>
            </div>

            <p className="font-medium leading-snug">{education.program}</p>
            <p className="text-sm text-ink-muted dark:text-paper-muted mt-1">
              {education.school}
            </p>
            <p className="text-sm text-ink-muted dark:text-paper-muted">{education.campus}</p>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-bone-border dark:border-void-border">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-paper-muted">
                  Level
                </p>
                <p className="mt-1 font-display font-semibold">{education.level}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-paper-muted">
                  CGPA
                </p>
                <p className="mt-1 font-display font-semibold text-signal">{education.cgpa}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-bone-border dark:border-void-border flex gap-3">
              <Users2 size={18} className="text-signal shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{education.role}</p>
                <p className="text-sm text-ink-muted dark:text-paper-muted mt-0.5">
                  {education.roleDetail}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
