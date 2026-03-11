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
      className="hidden xl:flex flex-col fixed z-40"
      style={{
        top: "6rem",
        left: "max(1.5rem, calc(50vw - 32rem - 12rem))",
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
