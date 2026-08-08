"use client";

import { motion } from "framer-motion";
import { Wrench, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 scroll-mt-20">
      <div className="container-content">
        <SectionHeading icon={Wrench} index="07" eyebrow="SERVICES" title="How I can help." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="card-surface hover-lift rounded-2xl p-6"
            >
              <h3 className="font-display font-semibold text-lg">{service.title}</h3>
              <p className="mt-2.5 text-sm text-ink-muted dark:text-paper-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: services.length * 0.05 }}
            className="group rounded-2xl p-6 border border-dashed border-bone-border dark:border-void-border hover:border-signal transition-colors flex flex-col justify-center"
          >
            <h3 className="font-display font-semibold text-lg">Have something else in mind?</h3>
            <span className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
              Let&apos;s talk about it
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
