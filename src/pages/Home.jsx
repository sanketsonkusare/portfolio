import Hero from "../components/Hero.jsx";
import Section from "../components/Section.jsx";
import Timeline from "../components/Timeline.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import EducationList from "../components/EducationList.jsx";
import ToolsList from "../components/ToolsList.jsx";
import GitHubActivity from "../components/GitHubActivity.jsx";
import WorkCard from "../components/WorkCard.jsx";
import { work } from "../data/work.js";
import { socials } from "../data/socials.js";
import { experience } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { profile } from "../data/profile.js";

const github = socials.find((s) => s.id === "github");
const githubUser = github.href.split("/").pop();

export default function Home() {
  return (
    <main>
      <Hero />
      <Section title="GitHub activity" link={{ href: github.href, label: github.handle }}>
        <GitHubActivity username={githubUser} />
      </Section>
      <Section title="Experience" link={{ to: "/experience", label: "Full experience" }}>
        <Timeline items={experience} />
      </Section>
      <Section title="Selected work">
        <div className="grid pv">
          {work.map((w) => (
            <WorkCard key={w.id} item={w} />
          ))}
        </div>
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
