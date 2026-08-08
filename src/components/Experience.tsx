"use client";

import { motion } from "framer-motion";
import { Route } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { timeline } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-20 bg-bone-raised/40 dark:bg-void-raised/30">
      <div className="container-content">
        <SectionHeading
          icon={Route}
          index="06"
          eyebrow="LEARNING JOURNEY"
          title="The learning timeline."
          description="From a phone screen and HTML basics, to shipping AI-powered products with real users."
        />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-bone-border dark:bg-void-border" />

          <div className="space-y-10">
            {timeline.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="relative"
              >
                <span className="absolute -left-8 sm:-left-10 top-1.5 w-3.5 h-3.5 rounded-full bg-bone dark:bg-void border-2 border-signal" />
                <p className="font-mono text-xs uppercase tracking-widest text-signal mb-1.5">
                  {m.period}
                </p>
                <h3 className="font-display font-semibold text-lg">{m.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted dark:text-paper-muted leading-relaxed max-w-xl">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
