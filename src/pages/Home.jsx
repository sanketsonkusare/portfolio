import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import Timeline from "../components/Timeline.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import EducationList from "../components/EducationList.jsx";
import ToolsList from "../components/ToolsList.jsx";
import { experience } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { profile } from "../data/profile.js";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="proof">
        {profile.proof.map((p) => (
          <div key={p.label}>
            <b>{p.value}</b>
            <span>{p.label}</span>
            <small>{p.source}</small>
          </div>
        ))}
      </div>
      <Section title="Experience" link={{ to: "/experience", label: "Full experience" }}>
        <Timeline items={experience} />
      </Section>
      <Section title="Projects" link={{ to: "/projects", label: "All projects" }}>
        <div className="grid pv">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} variant="preview" />
          ))}
        </div>
      </Section>
      <Section title="Education">
        <EducationList />
      </Section>
      <Section title="Tools">
        <ToolsList />
      </Section>
      <Section title="Beyond code">
        <div className="rows">
          <div className="row">
            <div className="k">{profile.beyondCode.label}</div>
            <div className="v m">{profile.beyondCode.text}</div>
          </div>
        </div>
      </Section>
    </main>
  );
}
