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
  assert.equal(count(html, /class="card/g), 3);
  assert.match(html, /href="\/projects"[^>]*>All projects</);
  assert.match(html, /href="\/experience"[^>]*>Full experience</);
});
test("Home hero has resume and email actions and the four-stat proof row", () => {
  const html = page(<Home />);
  assert.match(html, /href="\/resume\.pdf"[^>]*>Download resume</);
  assert.match(html, /href="mailto:sanketsonkusare01@gmail\.com"/);
  assert.equal(count(html, /<div class="proof">/g), 1);
  assert.ok(html.includes("167"));
});
test("Experience page has full detail and education", () => {
  const html = page(<Experience />);
  assert.ok(html.includes("RS256 JWT"));
  assert.ok(html.includes("<h2>Education"));
});
test("Projects page lists all six projects", () => {
  const html = page(<Projects />);
  assert.equal(count(html, /class="card/g), 6);
  assert.ok(!html.includes("rickroll"));
});
test("Footer has Email me and all four social links", () => {
  const html = page(<Footer />);
  assert.ok(html.includes(">Email me<"));
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
