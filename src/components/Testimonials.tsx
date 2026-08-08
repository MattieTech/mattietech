"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          icon={Quote}
          index="09"
          eyebrow="TESTIMONIALS"
          title="What collaborators say."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card-surface rounded-2xl py-16 px-8 text-center"
        >
          <div className="w-10 h-10 mx-auto rounded-full border border-bone-border dark:border-void-border grid place-items-center mb-5">
            <Quote size={16} className="text-signal" />
          </div>
          <p className="max-w-md mx-auto text-ink-muted dark:text-paper-muted leading-relaxed">
            Testimonials are coming soon — I&apos;m collecting feedback from freelance clients and
            collaborators as current projects wrap up.
          </p>
          <a
            href="#contact"
            className="inline-block mt-4 text-sm font-medium text-signal hover:underline"
          >
            Worked with me? Send a quote →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
