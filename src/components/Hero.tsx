"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import AnimatedHeadline from "./AnimatedHeadline";
import DownloadResumeButton from "./DownloadResumeButton";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid text-ink/[0.035] dark:text-paper/[0.05]" />
      </div>

      <div className="container-content">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-8 items-start">
          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-6"
            >
              {profile.status}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-balance"
            >
              Hi, I&apos;m{" "}
              <span className="text-signal">{profile.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-lg sm:text-2xl lg:text-[1.75rem] leading-[1.3] min-h-[1.5em] mt-3"
            >
              <AnimatedHeadline />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-lg text-ink-muted dark:text-paper-muted text-base sm:text-lg leading-relaxed"
            >
              {profile.title} building full-stack and AI-powered products,
              based in {profile.location}. I learn in public and ship real
              things along the way.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-4 font-mono text-xs sm:text-sm text-terminal-green"
            >
              &quot;{profile.quote}&quot;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <DownloadResumeButton variant="primary" />
              <div className="flex items-center gap-3">
                <a
                  href="#projects"
                  className="group btn-secondary"
                >
                  <ExternalLink size={16} className="transition-transform group-hover:scale-110" />
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="group btn-ghost px-2 py-3"
                >
                  Contact
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mx-auto w-[70%] sm:w-[55%] md:w-full max-w-[320px] group"
          >
            <div className="relative aspect-[1024/1483]">
              <div className="absolute -inset-6 rounded-[2rem] bg-signal/[0.08] blur-3xl -z-10" />
              <Image
                src="/images/portrait.webp"
                alt="Portrait of Matthew Aliu"
                fill
                priority
                sizes="(min-width: 768px) 28vw, 55vw"
                className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
              />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                className="pointer-events-none absolute left-1/2 top-[58%] -translate-x-1/2 w-[85%] opacity-0 translate-y-3 scale-95 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-300 ease-out"
              >
                <div className="card-surface rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm">
                  <p className="font-display font-semibold text-sm leading-tight">
                    {profile.name}
                  </p>
                  <p className="text-xs text-ink-muted dark:text-paper-muted mt-0.5">
                    {profile.title}
                  </p>
                  <p className="text-xs text-signal mt-0.5">Founder • {profile.brand}</p>
                </div>
              </motion.div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
