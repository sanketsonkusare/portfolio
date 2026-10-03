import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  return (
    <main>
      <div className="pagehead">
        <h1>Projects</h1>
        <p>Things I've built, from AI products to full-stack apps and developer tools.</p>
      </div>
      <section className="first">
        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} variant="full" />
          ))}
        </div>
      </section>
    </main>
  );
}
