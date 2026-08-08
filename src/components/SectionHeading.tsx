"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function SectionHeading({
  icon: Icon,
  index,
  eyebrow,
  title,
  description,
  align = "left",
}: {
  icon?: LucideIcon;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "split";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-14 ${align === "split" ? "flex flex-col md:flex-row md:items-end md:justify-between gap-6" : "max-w-2xl"}`}
    >
      <div className={align === "split" ? "max-w-2xl" : ""}>
        <p className="eyebrow mb-3 flex items-center gap-2">
          {Icon && <Icon size={13} />}
          <span>
            {index} · {eyebrow}
          </span>
        </p>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-balance">{title}</h2>
        {description && align === "left" && (
          <p className="mt-4 text-ink-muted dark:text-paper-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {description && align === "split" && (
        <p className="text-ink-muted dark:text-paper-muted leading-relaxed max-w-sm text-sm">
          {description}
        </p>
      )}
    </motion.div>
  );
}
