"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";

const WEEKS = 30;
const DAYS = 7;

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export default function OpenSource() {
  const username = profile.github.split("/").pop() || "mattietech";
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubActivity() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        if (data && data.contributions) {
          // Take last WEEKS * DAYS days
          const days: ContributionDay[] = data.contributions.slice(-(WEEKS * DAYS));
          setContributions(days);
          
          if (data.total) {
            const sum = Object.values(data.total as Record<string, number>).reduce((a, b) => a + b, 0);
            setTotal(sum);
          }
        }
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubActivity();
  }, [username]);

  const shades = [
    "bg-bone-border dark:bg-void-border",
    "bg-signal/30",
    "bg-signal/55",
    "bg-signal/80",
    "bg-signal",
  ];

  return (
    <section id="opensource" className="py-24 md:py-32 scroll-mt-20 bg-bone-raised/40 dark:bg-void-raised/30">
      <div className="container-content">
        <SectionHeading
          icon={Github}
          index="08"
          eyebrow="OPEN SOURCE & GITHUB"
          title="Building where anyone can see the commits."
        />

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="card-surface rounded-2xl p-6 sm:p-7"
          >
            <div className="flex items-center justify-between mb-5 text-xs font-mono text-ink-muted dark:text-paper-muted">
              <span>
                {total !== null ? `${total} contributions in last year` : "contribution activity"}
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-signal hover:underline"
              >
                <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
                @{username}
              </a>
            </div>
            <div
              className="grid gap-[3px] overflow-x-auto"
              style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(10px, 1fr))` }}
            >
              {contributions.length > 0
                ? contributions.map((day, i) => (
                    <span
                      key={day.date || i}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`aspect-square rounded-[2px] ${shades[day.level]}`}
                    />
                  ))
                : Array.from({ length: WEEKS * DAYS }).map((_, i) => {
                    const intensity = (i * 37) % 5;
                    return (
                      <span
                        key={i}
                        className={`aspect-square rounded-[2px] ${shades[intensity]}`}
                      />
                    );
                  })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-semibold text-lg">Open source, going forward</h3>
              <p className="mt-3 text-sm text-ink-muted dark:text-paper-muted leading-relaxed">
                Planning to open-source select components of CodeQuest AI and CampusTutor AI as
                they stabilize, so other student developers can learn from and build on them.
              </p>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg border border-bone-border dark:border-void-border py-2.5 text-sm font-medium hover:border-signal hover:text-signal transition-colors w-fit px-5"
            >
              <Github size={15} />
              Visit GitHub profile
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

