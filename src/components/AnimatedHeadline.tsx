"use client";

import { useEffect, useState } from "react";
import { headlines } from "@/lib/data";

const TYPE_SPEED = 45;
const DELETE_SPEED = 28;
const HOLD_TIME = 1600;

export default function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    const full = headlines[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < full.length) {
        timeout = setTimeout(() => setText(full.slice(0, text.length + 1)), TYPE_SPEED);
      } else {
        timeout = setTimeout(() => setPhase("holding"), HOLD_TIME);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(full.slice(0, text.length - 1)), DELETE_SPEED);
      } else {
        setIndex((i) => (i + 1) % headlines.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index]);

  return (
    <span className="inline-flex items-center font-mono text-signal">
      <span>{text}</span>
      <span className="ml-1 w-[0.5em] h-[0.9em] bg-signal animate-blink" aria-hidden="true" />
    </span>
  );
}
