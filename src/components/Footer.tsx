import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-bone-border dark:border-void-border py-8">
      <div className="container-content flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-muted dark:text-paper-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built from scratch with Next.js.
        </p>
        <p className="font-mono text-xs">#100DaysOfCode · #{profile.brand}</p>
      </div>
    </footer>
  );
}
