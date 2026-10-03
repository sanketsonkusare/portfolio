import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import Header from "./Header.jsx";
import SocialIcons from "./SocialIcons.jsx";
import Timeline from "./Timeline.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { experience } from "../data/experience.js";
import { projects } from "../data/projects.js";

const inRouter = (el, location = "/") => renderToStaticMarkup(<StaticRouter location={location}>{el}</StaticRouter>);
const count = (html, re) => (html.match(re) || []).length;

test("ThemeToggle names the theme it will switch to", () => {
  assert.match(renderToStaticMarkup(<ThemeToggle theme="dark" onToggle={() => {}} />), /aria-label="Switch to light theme"/);
  assert.match(renderToStaticMarkup(<ThemeToggle theme="light" onToggle={() => {}} />), /aria-label="Switch to dark theme"/);
});
test("ThemeToggle contains both a sun and a moon icon", () => {
  const html = renderToStaticMarkup(<ThemeToggle theme="dark" onToggle={() => {}} />);
  assert.ok(html.includes("i-sun") && html.includes("i-moon"));
});

test("Header has Experience, Projects, then the theme button", () => {
  const html = inRouter(<Header theme="dark" onToggle={() => {}} />);
  const e = html.indexOf(">Experience<"), p = html.indexOf(">Projects<"), t = html.indexOf('class="tbtn"');
  assert.ok(e > 0 && p > e && t > p);
  assert.match(html, /href="\/experience"/);
  assert.match(html, /href="\/projects"/);
});
test("Header marks the current page", () => {
  const html = inRouter(<Header theme="dark" onToggle={() => {}} />, "/projects");
  assert.match(html, /class="[^"]*\bon\b[^"]*"[^>]*href="\/projects"|href="\/projects"[^>]*class="[^"]*\bon\b/);
});

test("SocialIcons renders four external links with a handle card each", () => {
  const html = renderToStaticMarkup(<SocialIcons />);
  assert.equal(count(html, /target="_blank"/g), 4);
  assert.equal(count(html, /rel="noopener noreferrer"/g), 4);
  for (const label of ["GitHub profile", "X profile", "LinkedIn profile", "Instagram profile"]) assert.ok(html.includes(`aria-label="${label}"`), label);
  for (const s of ["@sanketsonkusare", "@sassysanket", "in/sanketsonkusare", "Source code for my projects.", "Fitness and life outside work."]) assert.ok(html.includes(s), s);
  assert.equal(count(html, /role="tooltip"/g), 4);
});

test("Timeline summary mode shows four logos and previews, no bullet lists", () => {
  const html = inRouter(<Timeline items={experience} />);
  for (const c of ["DevRev", "Scrobits", "Manastik", "Rubixe"]) assert.ok(html.includes(`alt="${c} logo"`), c);
  assert.equal(count(html, /<li>/g), 0);
  assert.ok(html.includes(experience[1].preview));
  assert.equal(count(html, /class="dot/g), 4);
});
test("Timeline detailed mode shows summaries and every bullet", () => {
  const html = inRouter(<Timeline items={experience} detailed />);
  const bullets = experience.reduce((n, e) => n + e.bullets.length, 0);
  assert.equal(count(html, /<li>/g), bullets);
  assert.ok(html.includes("Automation Squad"));
});
test("Timeline marks only the current role with Now", () => {
  const html = inRouter(<Timeline items={experience} />);
  assert.equal(count(html, />Now</g), 1);
});

test("ProjectCard full variant hides Live when there is no live link", () => {
  const hand = projects.find((p) => p.id === "hand-cursor");
  const html = inRouter(<ProjectCard project={hand} variant="full" />);
  assert.ok(!html.includes(">Live<"));
  assert.ok(html.includes(">GitHub<"));
});
test("ProjectCard full variant uses liveLabel when present", () => {
  const html = inRouter(<ProjectCard project={projects.find((p) => p.id === "github-wrapper")} variant="full" />);
  assert.ok(html.includes(">npm<"));
});
test("ProjectCard external links are safe", () => {
  const html = inRouter(<ProjectCard project={projects[1]} variant="full" />);
  assert.equal(count(html, /target="_blank"/g), count(html, /rel="noopener noreferrer"/g));
});
test("ProjectCard preview variant links to /projects and shows the featured tag", () => {
  const html = inRouter(<ProjectCard project={projects[0]} variant="preview" />);
  assert.match(html, /href="\/projects"/);
  assert.ok(html.includes("Featured"));
  assert.ok(html.includes("card wide"));
});
