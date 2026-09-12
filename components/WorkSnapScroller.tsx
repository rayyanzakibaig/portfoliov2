"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { projects } from "@/data/projects";
import ProjectSlide from "@/components/ProjectSlide";
import WorkIndicator from "@/components/WorkIndicator";

export default function WorkSnapScroller() {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Track active slide and section visibility via a single observer set
  useEffect(() => {
    const visibleSlides = new Set<number>();
    const observers: IntersectionObserver[] = [];

    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSlides.add(i);
            setActiveIndex(i);
          } else {
            visibleSlides.delete(i);
          }
          setSectionVisible(visibleSlides.size > 0);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleDotClick = useCallback((i: number) => {
    slideRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <section id="work">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            ref={(el) => { slideRefs.current[i] = el; }}
            style={{ height: "100svh" }}
          >
            <ProjectSlide
              project={project}
              index={i}
              total={projects.length}
              isActive={activeIndex === i && sectionVisible}
            />
          </div>
        ))}
      </section>

      <WorkIndicator
        activeIndex={activeIndex}
        total={projects.length}
        isVisible={sectionVisible}
        onDotClick={handleDotClick}
      />
    </>
  );
}
