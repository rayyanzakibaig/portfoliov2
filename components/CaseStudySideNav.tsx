"use client";

import { useEffect, useState } from "react";

export type SectionMeta = {
  id: string;
  label: string;
};

type Props = {
  sections: SectionMeta[];
};

export default function CaseStudySideNav({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const overview = document.getElementById("overview");
      if (!overview) return;
      setPastHero(overview.getBoundingClientRect().top <= 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside
      className="hidden xl:flex flex-col fixed z-40 transition-all duration-300"
      style={{
        top: "6rem",
        left: "2rem",
        opacity: pastHero ? 1 : 0,
        pointerEvents: pastHero ? "auto" : "none",
        transform: pastHero ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <div className="flex flex-col gap-2.5 pl-3 border-l border-border/50">
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`text-xs transition-all duration-200 leading-snug ${
                isActive
                  ? "text-accent font-medium"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {label}
            </a>
          );
        })}
      </div>
    </aside>
  );
}
