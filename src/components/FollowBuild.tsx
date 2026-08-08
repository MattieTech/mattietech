"use client";

import { Rss } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { followPlatforms } from "@/lib/data";

export default function FollowBuild() {
  const loop = [...followPlatforms, ...followPlatforms];

  return (
    <section id="follow" className="py-24 md:py-32 scroll-mt-20 overflow-hidden">
      <div className="container-content mb-10">
        <SectionHeading
          icon={Rss}
          index="10"
          eyebrow="FOLLOW THE BUILD"
          title="Long-form writing is next. For now, the build is public daily."
          description="A MattieTech blog covering deep-dives on CodeQuest AI, CampusTutor AI, and lessons from #100DaysOfCode is in progress. Until then, follow the day-to-day here:"
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-bone dark:from-void to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-bone dark:from-void to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {loop.map((p, i) => (
            <a
              key={`${p.label}-${i}`}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 px-6 shrink-0 font-display font-bold text-4xl sm:text-6xl text-ink-muted/30 hover:text-signal dark:text-paper-muted/25 dark:hover:text-signal transition-colors"
            >
              {p.label}
              <span className="w-2 h-2 rounded-full bg-ink-muted/30 dark:bg-paper-muted/25" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
