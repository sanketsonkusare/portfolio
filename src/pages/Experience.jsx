import Section from "../components/Section.jsx";
import Timeline from "../components/Timeline.jsx";
import EducationList from "../components/EducationList.jsx";
import { experience } from "../data/experience.js";

export default function Experience() {
  return (
    <main>
      <div className="pagehead">
        <h1>Experience</h1>
        <p>Where I've worked and what I built there.</p>
      </div>
      <section className="first">
        <Timeline items={experience} detailed />
      </section>
      <Section title="Education">
        <EducationList />
      </Section>
    </main>
  );
}
