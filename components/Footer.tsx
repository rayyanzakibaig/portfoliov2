"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const EMAIL = "rzakibaig@gmail.com";

const footerLinks = [
  { href: "/",         label: "Work"     },
  { href: "/creative", label: "Creative" },
  { href: "/about",    label: "About"    },
];

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 10.794A7 7 0 0 1 5.206 2 7.001 7.001 0 1 0 14 10.794z" />
    </svg>
  );
}

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-8 pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col items-center text-center gap-6">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-5xl font-bold text-fg"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Let's build something better together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-base text-fg-muted max-w-2xl leading-relaxed"
        >
          I'm open to internships and co-ops in design, development, or management.
        </motion.p>

        {/* CTA pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mt-1"
        >
          {/* Email — primary filled */}
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-fg/80 transition-all duration-200"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "check" : "envelope"}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8.5l3.5 3.5L13 5" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="14" height="10" rx="2" />
                    <path d="M1 5l7 5 7-5" />
                  </svg>
                )}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={copied ? "copied" : "email"}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? "Copied" : EMAIL}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Resume — secondary */}
          <a
            href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-fg-muted/25 bg-surface/40 text-sm text-fg-muted hover:text-fg hover:border-fg/40 hover:bg-surface transition-all duration-200"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 1h6l4 4v10H2V1z" />
              <path d="M10 1v4h4" />
              <path d="M5 9h6M5 12h4" />
            </svg>
            Resume
          </a>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/rz-logo.png"
              alt="RZ"
              width={18}
              height={18}
              className="h-[18px] w-auto dark:invert opacity-70"
            />
            <p className="text-xs text-fg-muted">© {new Date().getFullYear()} Rayyan Zakibaig</p>
          </div>
          <div className="flex items-center gap-5">
            <nav className="flex items-center gap-5">
              {footerLinks.map(({ href, label }) => {
                const active =
                  href === "/"
                    ? pathname === "/" || pathname.startsWith("/work")
                    : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-xs transition-colors duration-150 ${
                      active ? "text-fg" : "text-fg-muted hover:text-fg"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="w-px h-3.5 bg-border" />
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg transition-colors duration-200"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -20 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                </motion.span>
              </AnimatePresence>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
