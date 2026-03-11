"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMAIL = "rzakibaig@gmail.com";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="mt-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16">
        {/* CTA */}
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-fg-muted mb-4">
            Let&apos;s connect
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-fg leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to build{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8A6FF0, #C855A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              something great?
            </span>
          </h2>
        </div>

        {/* Links row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface-hover text-sm font-medium text-fg transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={copied ? "copied" : "email"}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.15 }}
                className={copied ? "text-accent" : ""}
              >
                {copied ? "Copied ✓" : EMAIL}
              </motion.span>
            </AnimatePresence>
            {!copied && (
              <span className="text-fg-muted text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                copy
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/rayyan-zakibaig"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm text-fg-muted hover:text-fg hover:bg-surface transition-all duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rayyanzakibaig"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm text-fg-muted hover:text-fg hover:bg-surface transition-all duration-200"
            >
              GitHub
            </a>
            <a
              href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-sm text-fg-muted hover:text-fg hover:bg-surface transition-all duration-200"
            >
              Resume ↗
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} Rayyan Zakibaig
          </p>
          <p className="text-xs text-fg-muted">
            Product Designer · Builder
          </p>
        </div>
      </div>
    </footer>
  );
}
