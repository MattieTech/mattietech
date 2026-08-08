import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#0A0B0F",
          raised: "#14161F",
          border: "#262A38",
        },
        bone: {
          DEFAULT: "#F6F4EF",
          raised: "#FFFFFF",
          border: "#DDD7C8",
        },
        signal: {
          DEFAULT: "#4F5DFF",
          dim: "#3A45C4",
          light: "#7C86FF",
        },
        terminal: {
          green: "#5FEBA0",
        },
        ink: {
          DEFAULT: "#0A0B0F",
          muted: "#5B5F6B",
        },
        paper: {
          DEFAULT: "#EDEBE6",
          muted: "#9A9DA8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1240px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1s step-start infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
