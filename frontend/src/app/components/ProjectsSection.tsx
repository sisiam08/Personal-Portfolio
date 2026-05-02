import ProjectShowcase from "./ProjectShowcase";

interface ProjectsSectionProps {
  projects: any;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="pt-section-gap">
      <div className="text-center mb-stack-lg">
        <p className="text-primary font-label-caps architectural-tracking mb-2">
          Curated Works
        </p>
        <h2 className="font-h1 text-xl text-white">Project Showcase</h2>
      </div>

      <ProjectShowcase projects={projects} />
    </section>
  );
}
