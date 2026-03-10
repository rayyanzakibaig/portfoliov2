"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    <footer className="px-6 md:px-10 pt-24 pb-12 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight text-fg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let&apos;s build{" "}
            <em className="not-italic text-accent">something.</em>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <button onClick={copyEmail} className="group flex items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={copied ? "copied" : "email"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className={`text-sm tracking-wide ${
                  copied ? "text-accent" : "text-fg-muted group-hover:text-fg"
                } transition-colors duration-200`}
              >
                {copied ? "Copied ✓" : EMAIL}
              </motion.span>
            </AnimatePresence>
            {!copied && (
              <span className="text-xs text-fg-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ↗ copy
              </span>
            )}
          </button>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/rayyanzakibaig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted hover:text-fg transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rayyanzakibaig"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted hover:text-fg transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted hover:text-fg transition-colors duration-200"
            >
              Resume ↗
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-fg-muted">
            © {new Date().getFullYear()} Rayyan Zakibaig
          </p>
        </div>
      </div>
    </footer>
  );
}
