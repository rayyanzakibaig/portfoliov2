import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel() {
  return (
    <div className="px-6 md:px-8 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl font-bold text-fg mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Case Studies
        </h2>
        <p className="text-base text-fg-muted mb-10">
          Here are some of my projects in product design, UX and mobile design
        </p>
        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
