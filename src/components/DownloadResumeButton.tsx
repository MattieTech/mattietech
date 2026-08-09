"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check, Loader2, ExternalLink } from "lucide-react";
import { profile } from "@/lib/data";

interface DownloadResumeButtonProps {
  variant?: "primary" | "secondary" | "text";
  className?: string;
  label?: string;
  showIcon?: boolean;
}

export default function DownloadResumeButton({
  variant = "primary",
  className = "",
  label = "Download Resume",
  showIcon = true,
}: DownloadResumeButtonProps) {
  const [status, setStatus] = useState<"idle" | "downloading" | "success">("idle");
  const [showToast, setShowToast] = useState(false);
  const isProcessing = useRef(false);

  function handleDownload(e: React.MouseEvent) {
    e.preventDefault();

    if (isProcessing.current || status !== "idle") return;

    isProcessing.current = true;
    setStatus("downloading");

    // Create invisible anchor tag to trigger real browser download
    const link = document.createElement("a");
    link.href = profile.resumeHref;
    link.download = "Matthew-Aliu-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Visual feedback timeline
    setTimeout(() => {
      setStatus("success");
      setShowToast(true);

      // Reset back to idle after 2.5 seconds & clear processing flag
      setTimeout(() => {
        setStatus("idle");
        isProcessing.current = false;
      }, 2500);

      // Auto-hide toast after 4.5s
      setTimeout(() => {
        setShowToast(false);
      }, 4500);
    }, 500);
  }

  // Variant styling
  const getButtonStyles = () => {
    if (variant === "primary") {
      return `btn-primary px-6 py-3 text-sm font-medium ${className}`;
    }
    if (variant === "secondary") {
      return `btn-secondary px-5 py-3 text-sm font-medium ${className}`;
    }
    return `inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-signal dark:text-paper-muted dark:hover:text-signal transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${className}`;
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={status !== "idle"}
        aria-label="Download Resume PDF"
        className={getButtonStyles()}
      >
        {status === "downloading" ? (
          <>
            <Loader2 size={16} className="animate-spin text-white/90" />
            <span>Downloading...</span>
          </>
        ) : status === "success" ? (
          <>
            <Check size={16} className="text-emerald-400 animate-bounce" />
            <span className="text-emerald-400 font-semibold">Downloaded!</span>
          </>
        ) : (
          <>
            {showIcon && <Download size={16} className="transition-transform group-hover:translate-y-0.5" />}
            <span>{label}</span>
          </>
        )}
      </button>

      {/* Download Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-7 sm:max-w-sm z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl border border-emerald-500/30 bg-void-raised/95 backdrop-blur-xl text-paper shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center shrink-0">
              <Check size={18} />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <p className="font-semibold text-paper truncate">Resume Downloaded!</p>
              <p className="text-paper-muted mt-0.5 leading-snug break-words">
                Matthew-Aliu-Resume.pdf saved to your Downloads folder.
              </p>
            </div>
            <a
              href={profile.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-signal/15 hover:bg-signal/30 text-signal text-[11px] font-mono flex items-center gap-1 transition-colors shrink-0"
              title="Open in new browser tab"
            >
              View <ExternalLink size={12} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
