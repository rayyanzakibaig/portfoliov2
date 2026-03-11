"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Work" },
  { href: "/creative", label: "Creative" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (y < 60 || y < lastY.current) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[9990] h-14"
        >
          {/* Frosted glass background */}
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              scrolled
                ? "bg-white/85 dark:bg-[#0a0a0a]/85 backdrop-blur-2xl border-b border-[#eaeaea] dark:border-[#2a2a2a]"
                : "bg-transparent"
            }`}
          />

          <div className="relative h-full max-w-5xl mx-auto px-6 md:px-8 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity duration-200">
              <Image
                src="/rz-logo.png"
                alt="RZ"
                width={36}
                height={36}
                className="h-7 w-auto dark:invert"
                priority
              />
            </Link>

            {/* Links */}
            <nav className="flex items-center gap-0.5">
              {links.map(({ href, label }) => {
                const active =
                  href === "/"
                    ? pathname === "/" || pathname.startsWith("/work")
                    : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className="relative px-3 py-1.5 text-sm"
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-surface border border-border"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-150 ${
                        active ? "text-fg font-medium" : "text-fg-muted hover:text-fg"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}

              <div className="w-px h-4 bg-border mx-1" />

              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-fg-muted hover:text-fg hover:bg-surface transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 30 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    {theme === "light" ? (
                      /* Moon — shown in light mode to switch to dark */
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    ) : (
                      /* Sun — shown in dark mode to switch to light */
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
