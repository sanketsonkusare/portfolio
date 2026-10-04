import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import Header from "./Header.jsx";
import GitHubActivity from "./GitHubActivity.jsx";
import WorkCard from "./WorkCard.jsx";
import { work } from "../data/work.js";
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
test("Header brand is the logo mark linking home, with an accessible name and no visible name text", () => {
  const html = inRouter(<Header theme="dark" onToggle={() => {}} />);
  assert.match(html, /<a[^>]*class="brand"[^>]*aria-label="Sanket Sonkusare, home"[^>]*href="\/"|<a[^>]*href="\/"[^>]*class="brand"[^>]*aria-label="Sanket Sonkusare, home"|<a[^>]*aria-label="Sanket Sonkusare, home"[^>]*class="brand"/);
  assert.ok(html.includes('class="logo"'));
  assert.ok(!html.includes(">Sanket Sonkusare<"));
});
test("Header marks the current page", () => {
  const html = inRouter(<Header theme="dark" onToggle={() => {}} />, "/projects");
  assert.match(html, /class="[^"]*\bon\b[^"]*"[^>]*href="\/projects"|href="\/projects"[^>]*class="[^"]*\bon\b/);
});

test("SocialIcons renders an email icon first, then four external profile links, each with a card", () => {
  const html = renderToStaticMarkup(<SocialIcons />);
  assert.equal(count(html, /target="_blank"/g), 4);
  assert.equal(count(html, /rel="noopener noreferrer"/g), 4);
  assert.match(html, /<a[^>]*aria-label="Email me"/);
  assert.ok(html.indexOf('aria-label="Email me"') < html.indexOf('aria-label="GitHub profile"'));
  assert.ok(html.includes('href="mailto:sanketsonkusare01@gmail.com"'));
  assert.ok(html.includes("sanketsonkusare01@gmail.com</em>"));
  for (const label of ["GitHub profile", "X profile", "LinkedIn profile", "Instagram profile"]) assert.ok(html.includes(`aria-label="${label}"`), label);
  for (const s of ["@sanketsonkusare", "@sassysanket", "in/sanketsonkusare", "Source code for my projects.", "Fitness and life outside work."]) assert.ok(html.includes(s), s);
  assert.equal(count(html, /role="tooltip"/g), 5);
});

test("SocialIcons links describe themselves with their hover card for screen readers", () => {
  const html = renderToStaticMarkup(<SocialIcons />);
  const ids = [...html.matchAll(/aria-describedby="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, 5);
  assert.equal(new Set(ids).size, 5);
  for (const id of ids) assert.ok(html.includes(`id="${id}"`), id);
});
test("ProjectCard screenshots are decorative so the title is not read twice", () => {
  const html = inRouter(<ProjectCard project={projects[0]} variant="preview" />);
  assert.match(html, /<img[^>]*alt=""/);
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
test("Timeline marks only the current role with Current", () => {
  const html = inRouter(<Timeline items={experience} />);
  assert.equal(count(html, />Current</g), 1);
});

test("ProjectCard full variant hides Live when there is no live link", () => {
  const hand = projects.find((p) => p.id === "hand-cursor");
  const html = inRouter(<ProjectCard project={hand} variant="full" />);
  assert.ok(!html.includes(">Live<"));
  assert.ok(html.includes(">GitHub<"));
});
test("ProjectCard full variant hides GitHub when there is no repo", () => {
  const html = inRouter(<ProjectCard project={projects[0]} variant="full" />);
  assert.ok(html.includes(">Website<"));
  assert.ok(!html.includes(">GitHub<"));
});
test("ProjectCard shows extra links such as the Aroven web app", () => {
  const html = inRouter(<ProjectCard project={projects[0]} variant="full" />);
  assert.ok(html.includes(">Try the web app<"));
  assert.ok(html.includes('href="https://web.aroven.fit/"'));
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

test("GitHubActivity draws one cell per day, a total and a legend", () => {
  const days = Array.from({ length: 10 }, (_, i) => ({ date: `2026-09-${String(20 + i).padStart(2, "0")}`, count: i, level: Math.min(4, i) }));
  const html = renderToStaticMarkup(<GitHubActivity username="sanketsonkusare" data={{ total: 378, days }} />);
  assert.equal(count(html, /<rect /g), 10);
  assert.ok(html.includes("378 contributions in the last year"));
  assert.match(html, /role="img"[^>]*aria-label="378 GitHub contributions in the last year"|aria-label="378 GitHub contributions in the last year"[^>]*role="img"/);
  assert.ok(html.includes("Less") && html.includes("More"));
  assert.ok(html.includes("9 contributions on Sep 29, 2026"));
});
test("GitHubActivity shows an empty year while loading", () => {
  const html = renderToStaticMarkup(<GitHubActivity username="sanketsonkusare" />);
  assert.equal(count(html, /<rect /g), 365);
  assert.ok(html.includes("Loading contributions"));
});

test("Selected work has a pose card (Manastik) and a voice assistant card (Scrobits), each with a labelled animation", () => {
  assert.equal(work.length, 2);
  const html = renderToStaticMarkup(<>{work.map((w) => <WorkCard key={w.id} item={w} />)}</>);
  assert.ok(html.includes("Manastik") && html.includes("Scrobits"));
  assert.equal(count(html, /role="img"/g), 2);
  assert.match(html, /aria-label="[^"]*pose[^"]*"/i);
  assert.match(html, /aria-label="[^"]*voice[^"]*"/i);
});
