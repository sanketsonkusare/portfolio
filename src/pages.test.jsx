import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter, matchRoutes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Experience from "./pages/Experience.jsx";
import Projects from "./pages/Projects.jsx";
import Footer from "./components/Footer.jsx";
import { routes } from "./routes.jsx";

const page = (el) => renderToStaticMarkup(<StaticRouter location="/">{el}</StaticRouter>);
const count = (html, re) => (html.match(re) || []).length;

test("Home shows the title and never the word Contract", () => {
  const html = page(<Home />);
  assert.ok(html.includes("Forward Deployed Engineer at DevRev"));
  assert.ok(!/contract/i.test(html));
});
test("Home order: Experience, Projects, Education, Tools, Beyond code", () => {
  const html = page(<Home />);
  const idx = ["<h2>Experience", "<h2>Projects", "<h2>Education", "<h2>Tools", "<h2>Beyond code"].map((s) => html.indexOf(s));
  assert.ok(idx.every((i) => i > 0), JSON.stringify(idx));
  assert.deepEqual([...idx].sort((a, b) => a - b), idx);
});
test("Home previews three projects and links to the full pages", () => {
  const html = page(<Home />);
  assert.equal(count(html, /<a class="card/g), 3);
  assert.match(html, /href="\/projects"[^>]*>All projects</);
  assert.match(html, /href="\/experience"[^>]*>Full experience</);
});
test("Home hero has the resume button and an email icon (no Email me button)", () => {
  const html = page(<Home />);
  assert.match(html, /href="\/resume\.pdf"[^>]*>Download resume</);
  assert.match(html, /aria-label="Email me"/);
  assert.ok(!html.includes(">Email me<"));
});
test("Home has no landing-page stat row; the numbers sit in the experience lines as sentences", () => {
  const html = page(<Home />);
  assert.ok(!html.includes('class="proof"'));
  assert.match(html, /registered 167 datasets without a failure/);
  assert.match(html, /95% accuracy/);
});
test("Home hero puts the icons on the same row as the resume button", () => {
  const html = page(<Home />);
  const row = html.match(/<div class="acts">(.*?)<img class="photo/s)?.[1] ?? "";
  assert.ok(row.includes("Download resume"), "resume button in the actions row");
  assert.ok(row.includes('class="soc'), "icons in the same row");
  assert.ok(row.indexOf("Download resume") < row.indexOf('class="soc'));
});
test("Education and Tools use the two-column list layout on wide screens", () => {
  const html = page(<Home />);
  assert.equal(count(html, /class="rows cols"/g), 2);
});
test("Experience page has full detail and education", () => {
  const html = page(<Experience />);
  assert.ok(html.includes("RS256 JWT"));
  assert.ok(html.includes("<h2>Education"));
});
test("Projects page lists all seven projects", () => {
  const html = page(<Projects />);
  assert.equal(count(html, /class="card/g), 7);
  assert.ok(!html.includes("rickroll"));
});
test("Footer shows email as an icon like the others, plus all four social links", () => {
  const html = page(<Footer />);
  assert.ok(!html.includes(">Email me<"));
  assert.match(html, /aria-label="Email me"/);
  assert.ok(html.includes('href="mailto:sanketsonkusare01@gmail.com"'));
  assert.equal(count(html, /target="_blank"/g), 4);
});

const redirectFor = (path) => {
  const m = matchRoutes(routes, path);
  return m?.at(-1)?.route.handle?.redirectTo;
};
test("legacy and unknown URLs redirect to home", () => {
  for (const p of ["/blogs", "/built", "/connect", "/resume", "/foo", "/projects/x/y"]) assert.equal(redirectFor(p), "/", p);
});
test("real pages do not redirect", () => {
  for (const p of ["/", "/experience", "/projects"]) assert.equal(redirectFor(p), undefined, p);
});

test("Home shows GitHub activity between the hero and Experience, linking to the profile", () => {
  const html = page(<Home />);
  const g = html.indexOf(">GitHub activity<"), e = html.indexOf(">Experience<");
  assert.ok(g > 0 && g < e, "GitHub activity sits above Experience");
  assert.match(html, /href="https:\/\/github\.com\/sanketsonkusare"[^>]*target="_blank"[^>]*rel="noopener noreferrer"[^>]*>@sanketsonkusare</);
});

test("Hero says what Sanket is doing now, linking Aroven", () => {
  const html = page(<Home />);
  assert.match(html, /Currently building <a[^>]*href="https:\/\/www\.aroven\.fit\/"[^>]*>Aroven<\/a> and learning to scale AI architectures/);
});
test("Home shows Selected work between Experience and Projects", () => {
  const html = page(<Home />);
  const e = html.indexOf(">Experience<"), w = html.indexOf(">Selected work<"), p = html.indexOf(">Projects<");
  assert.ok(e > 0 && w > e && p > w);
});
