"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

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
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-[9990] px-6 md:px-10 py-5 flex items-center justify-between"
        >
          <Link
            href="/"
            className="font-display text-base text-fg tracking-wide hover:text-accent transition-colors duration-200"
            style={{ fontFamily: "var(--font-display)" }}
          >
            RZ
          </Link>

          <nav className="flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/" || pathname.startsWith("/work")
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm tracking-wide transition-colors duration-200 ${
                    active ? "text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {label}
                </Link>
              );
            })}

            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center text-fg-muted hover:text-fg transition-colors duration-200"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 30 }}
                  transition={{ duration: 0.2 }}
                  className="text-base leading-none"
                >
                  {theme === "light" ? "○" : "●"}
                </motion.span>
              </AnimatePresence>
            </button>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
