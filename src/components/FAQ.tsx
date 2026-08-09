"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="faq" className="py-24 md:py-32 scroll-mt-20 bg-bone-raised/40 dark:bg-void-raised/30">
      <div className="container-content">
        <SectionHeading
          icon={HelpCircle}
          index="11"
          eyebrow="FAQ"
          title="Questions people usually ask."
        />

        <div className="max-w-2xl space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-surface rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-signal/5 cursor-pointer transition-all active:scale-[0.99] group"
                >
                  <span className={`font-medium group-hover:text-signal transition-colors ${isOpen ? "text-signal" : ""}`}>
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-ink-muted dark:text-paper-muted group-hover:text-signal transition-colors">
                    {isOpen ? <X size={16} /> : <Plus size={16} />}
                  </span>
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
                      <p className="px-5 sm:px-6 pb-5 text-sm text-ink-muted dark:text-paper-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
