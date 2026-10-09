import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel() {
  return (
    <div className="px-4 pt-28 pb-16">
      <div className="max-w-screen-xl mx-auto">
        <h2
          className="text-3xl font-bold text-fg mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Case Studies
        </h2>
        <p className="text-base text-fg-muted mb-10">
          Here are some of my projects in product design, UX and mobile design
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
