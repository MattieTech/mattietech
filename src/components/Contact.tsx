"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  AtSign,
  Mail,
  Send,
  Download,
  MessageCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/data";

const socials = [
  { label: "WhatsApp", href: profile.whatsapp, Icon: WhatsAppIcon },
  { label: "GitHub", href: profile.github, Icon: Github },
  { label: "TikTok", href: profile.tiktok, Icon: TikTokIcon },
  { label: "Instagram", href: profile.instagram, Icon: Instagram },
  { label: "Threads", href: profile.threads, Icon: AtSign },
  { label: "YouTube", href: profile.youtube, Icon: Youtube },
  { label: "Facebook", href: profile.facebook, Icon: Facebook },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
];

const SUBJECTS = [
  "Web development",
  "AI-powered tool",
  "Campus / student tool",
  "E-commerce setup",
  "Freelance — general",
  "Internship / job opportunity",
  "Something else",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const WEB3FORMS_KEY = "a79c8b21-638c-402a-91b5-0234e1bf4676";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          replyto: form.email,
          subject: form.subject
            ? `Portfolio Message: ${form.subject} (from ${form.name})`
            : `Portfolio Message from ${form.name}`,
          message: form.message,
          from_name: `${form.name} via MattieTech Portfolio`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage("Network error. Please try again or use an alternative contact method below.");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-20">
      <div className="container-content">
        <SectionHeading
          icon={MessageCircle}
          index="12"
          eyebrow="CONTACT"
          title="Let's build something."
          description="Open to internships, freelance work and graduate roles — reach out directly or drop a message below."
        />

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          {/* Direct Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Email Card */}
            <div className="card-surface rounded-2xl p-5 border border-bone-border dark:border-void-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-signal/10 grid place-items-center text-signal">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-paper-muted">
                    Direct Email
                  </h4>
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-display font-semibold text-lg hover:text-signal transition-colors break-all"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink-muted dark:text-paper-muted ml-13">
                Messages sent via the contact form arrive directly in this inbox.
              </p>
            </div>

            {/* WhatsApp Contact Card */}
            <div className="card-surface rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 grid place-items-center text-emerald-500">
                    <WhatsAppIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      WhatsApp Instant Chat
                    </h4>
                    <a
                      href={profile.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-lg hover:text-emerald-500 transition-colors"
                    >
                      {profile.whatsappNumber}
                    </a>
                  </div>
                </div>

                <a
                  href={`${profile.whatsapp}?text=${encodeURIComponent(
                    "Hello Matthew, I'm reaching out from your portfolio."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 text-xs font-semibold transition-colors"
                >
                  Message on WhatsApp
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-paper-muted mb-3">
                Connect on Socials
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-bone-border dark:border-void-border px-3.5 py-2 text-xs font-medium hover:border-signal hover:text-signal transition-colors"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={profile.resumeHref}
              download
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-signal dark:text-paper-muted dark:hover:text-signal transition-colors pt-2"
            >
              <Download size={15} />
              Download résumé (PDF)
            </a>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card-surface rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Name"
                id="name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-paper-muted">
                Subject
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-bone-border dark:border-void-border bg-transparent px-4 py-3 text-sm outline-none focus:border-signal transition-colors appearance-none"
              >
                <option value="" className="bg-bone dark:bg-void">
                  What's this about?
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-bone dark:bg-void">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-paper-muted">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-bone-border dark:border-void-border bg-transparent px-4 py-3 text-sm outline-none focus:border-signal transition-colors resize-none"
                placeholder="Tell me about your project…"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-signal to-cyan-400 text-white px-6 py-3.5 text-sm font-semibold hover:brightness-110 disabled:opacity-70 transition-all cursor-pointer"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Sending message...
                </>
              ) : (
                <>
                  Send message
                  <Send size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>

            {/* Submission Status Feedback */}
            {status === "success" && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>
                  Message sent! You will get a reply soon.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-medium">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-mono uppercase tracking-widest text-ink-muted dark:text-paper-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-bone-border dark:border-void-border bg-transparent px-4 py-3 text-sm outline-none focus:border-signal transition-colors"
      />
    </div>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2a9.94 9.94 0 0 0-8.544 15.073L2 22l4.98-1.306A9.947 9.947 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18c-1.663 0-3.238-.453-4.597-1.242l-.329-.193-2.957.776.79-2.884-.212-.338A7.954 7.954 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82c-1.02-.9-1.6-2.19-1.6-3.62h-3.14v13.44c0 1.55-1.26 2.8-2.8 2.8a2.8 2.8 0 0 1 0-5.6c.26 0 .51.03.75.1V9.8a5.94 5.94 0 0 0-.75-.05A5.95 5.95 0 1 0 15 15.7V9.24a7.09 7.09 0 0 0 4.14 1.32V7.42a4.85 4.85 0 0 1-2.54-1.6Z" />
    </svg>
  );
}
