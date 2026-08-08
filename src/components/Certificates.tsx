"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { certificates } from "@/lib/data";

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 md:py-32 scroll-mt-20 bg-bone-raised/40 dark:bg-void-raised/30">
      <div className="container-content">
        <SectionHeading
          icon={Award}
          index="05"
          eyebrow="VERIFIED CREDENTIALS"
          title="Certifications & Licenses"
          description="Industry-recognized credentials validating core programming and web development proficiencies."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.url}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card-surface hover-lift rounded-2xl p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-bone dark:bg-void border border-bone-border dark:border-void-border grid place-items-center font-mono text-xs font-semibold">
                    {cert.badge}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{cert.provider}</p>
                    <p className="flex items-center gap-1 text-xs text-terminal-green font-mono">
                      <CheckCircle2 size={12} /> {cert.status}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-ink-muted dark:text-paper-muted border border-bone-border dark:border-void-border rounded px-1.5 py-1 shrink-0">
                  ID: {cert.id}
                </span>
              </div>

              <h3 className="font-display font-semibold text-lg leading-snug">{cert.name}</h3>

              <ul className="mt-4 space-y-2 flex-1">
                {cert.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2 text-sm text-ink-muted dark:text-paper-muted">
                    <CheckCircle2 size={14} className="text-signal shrink-0 mt-0.5" />
                    {skill}
                  </li>
                ))}
              </ul>

              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-lg border border-bone-border dark:border-void-border py-2.5 text-sm font-medium hover:border-signal hover:text-signal transition-colors"
              >
                Verify Credential
                <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
