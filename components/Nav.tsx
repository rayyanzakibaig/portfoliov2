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

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14 10.794A7 7 0 0 1 5.206 2 7.001 7.001 0 1 0 14 10.794z" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
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
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[9990]"
        >
          {/* Liquid glass pill */}
          <div
            className="relative h-11 rounded-full px-3
              bg-white/[0.82] dark:bg-[#111]/[0.75]
              backdrop-blur-2xl backdrop-saturate-[180%]
              shadow-[0_0_0_0.5px_rgba(0,0,0,0.1),0_4px_28px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,1)]
              dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.12),0_4px_28px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            {/* Specular rim highlight */}
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/30 rounded-full" />

            <div className="relative h-full flex items-center gap-5">
              {/* Logo */}
              <Link
                href="/"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="flex items-center transition-opacity duration-200 pl-1"
              >
                <Image
                  src="/rz-logo.png"
                  alt="RZ"
                  width={32}
                  height={32}
                  className="h-8 w-auto dark:invert"
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
                          className="absolute inset-0 rounded-full
                            bg-white dark:bg-white/[0.14]
                            shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)]
                            dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.25)]"
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
              </nav>

              {/* Divider */}
              <div className="w-px h-4 bg-black/10 dark:bg-white/15" />

              {/* Theme toggle */}
              <motion.button
                onClick={toggle}
                aria-label="Toggle theme"
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center justify-center w-7 h-7 rounded-full text-fg-muted hover:text-fg transition-colors duration-150 mr-1"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center justify-center"
                  >
                    {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
