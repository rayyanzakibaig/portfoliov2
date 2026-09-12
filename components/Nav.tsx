"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "/",         label: "Work"     },
  { href: "/creative", label: "Creative" },
  { href: "/about",    label: "About"    },
];

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
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
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-[9990]"
    >

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center transition-opacity duration-200 hover:opacity-50 p-2 -m-2"
        >
          <Image
            src="/rz-logo.png"
            alt="RZ"
            width={32}
            height={32}
            className="h-9 w-auto dark:invert"
            priority
          />
        </Link>

        {/* Links + toggle */}
        <div className="flex items-center gap-7">
          <nav className="flex items-center gap-6">
            {links.map(({ href, label }) => {
              const active =
                href === "/"
                  ? pathname === "/" || pathname.startsWith("/work")
                  : pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-opacity duration-150 px-2 py-3 -my-3"
                  style={{
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--fg)" : "var(--fg-muted)",
                    opacity: active ? 1 : undefined,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="w-px h-4 bg-border" />

          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            aria-label="Toggle theme"
            whileTap={{ scale: 0.88 }}
            className="flex items-center justify-center text-fg-muted hover:text-fg transition-colors duration-150"
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
  );
}
