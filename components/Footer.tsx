"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import ArcadeBox from "./ArcadeBox";
import { lenisRef } from "@/lib/lenis";

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
      <div className="max-w-screen-xl mx-auto px-4 pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — headline + CTA */}
          <div className="flex flex-col items-start text-left">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-5xl font-bold text-fg"
              style={{ fontFamily: "var(--font-lexend), sans-serif", fontWeight: 700 }}
            >
              Let&apos;s build something better together.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-base text-fg-muted leading-relaxed mt-4"
              style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 400 }}
            >
              Searching for internships and roles across product design, development, or management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-nowrap items-center gap-3 mt-6 overflow-x-auto scrollbar-none w-full"
            >
              {/* Email — primary filled */}
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium hover:bg-fg/80 transition-all duration-200 shrink-0"
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
                    {copied ? "Copied" : "Email"}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* Resume — secondary */}
              <a
                href="https://drive.google.com/file/d/1mnPFnb0WzECPuX6eOYl4WHcP4RkWxX7f/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-fg-muted/25 bg-surface/40 text-sm text-fg-muted hover:text-fg hover:border-fg/40 hover:bg-surface transition-all duration-200 shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 1h6l4 4v10H2V1z" />
                  <path d="M10 1v4h4" />
                  <path d="M5 9h6M5 12h4" />
                </svg>
                Resume
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/rayyan-zakibaig"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:opacity-85 shrink-0"
                style={{ background: "#0A66C2" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/rayyanzakibaig"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:opacity-85 shrink-0"
                style={{ background: "#181717" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right — arcade console */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <ArcadeBox />
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
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
            <div className="w-px h-3.5 bg-border" />
            <button
              onClick={() => lenisRef.current?.scrollTo(0)}
              className="flex items-center gap-1.5 text-xs text-fg-muted hover:text-fg transition-colors duration-200"
            >
              Back to top
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V3M3 7l5-5 5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
