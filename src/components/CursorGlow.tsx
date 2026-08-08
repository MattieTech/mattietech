"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>(0);
  const target = useRef({ x: 0.5, y: 0.3 });
  const current = useRef({ x: 0.5, y: 0.3 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || isCoarse) return;

    function onMove(e: MouseEvent) {
      target.current = {
        x: e.clientX / window.innerWidth,
        y: (e.clientY + window.scrollY) / document.documentElement.scrollHeight,
      };
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    function tick() {
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;
      if (glowRef.current) {
        glowRef.current.style.setProperty("--gx", `${current.current.x * 100}%`);
        glowRef.current.style.setProperty("--gy", `${current.current.y * 100}%`);
      }
      frame.current = requestAnimationFrame(tick);
    }
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  const dots = Array.from({ length: 22 });

  return (
    <div className="fixed inset-0 -z-30 overflow-hidden pointer-events-none hidden dark:block">
      {/* cursor-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-60 transition-opacity duration-700"
        style={
          {
            "--gx": "50%",
            "--gy": "30%",
            background:
              "radial-gradient(600px circle at var(--gx) var(--gy), rgba(79,93,255,0.14), transparent 65%)",
          } as React.CSSProperties
        }
      />
      {/* small drifting oscillator dots */}
      {dots.map((_, i) => {
        const left = (i * 43 + 7) % 100;
        const top = (i * 29 + 11) % 100;
        const size = 2 + (i % 3);
        const duration = 10 + (i % 6) * 3;
        const delay = (i % 5) * 0.8;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-signal-light/50"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animation: `oscillate ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes oscillate {
          0%, 100% { transform: translate(0, 0); opacity: 0.25; }
          50% { transform: translate(12px, -16px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
