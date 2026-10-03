import test from "node:test";
import assert from "node:assert/strict";
import { profile } from "./profile.js";
import { experience } from "./experience.js";
import { projects } from "./projects.js";
import { education } from "./education.js";
import { tools } from "./tools.js";
import { socials } from "./socials.js";

const everything = JSON.stringify({ profile, experience, projects, education, tools, socials });

test('no content mentions "Contract"', () => {
  assert.ok(!/contract/i.test(everything));
});
test("no customer name or internal workflow reference", () => {
  assert.ok(!/camping/i.test(everything));
  assert.ok(!/workflow-94/i.test(everything));
  assert.ok(!/devrev\.ai\//i.test(everything));
});
test("title reads Forward Deployed Engineer at DevRev", () => {
  assert.equal(profile.title, "Forward Deployed Engineer at DevRev");
});
test("experience has four roles, newest first, DevRev is current", () => {
  assert.deepEqual(experience.map((e) => e.company), ["DevRev", "Scrobits Technologies", "Manastik", "Rubixe"]);
  assert.equal(experience[0].current, true);
  assert.equal(experience.filter((e) => e.current).length, 1);
  for (const e of experience) assert.ok(e.logo && e.preview && e.summary && e.bullets.length > 0, e.id);
});
test("six projects, all with a GitHub https link; Hand Cursor Control has no live link", () => {
  assert.equal(projects.length, 6);
  for (const p of projects) assert.match(p.github, /^https:\/\/github\.com\//, p.id);
  assert.equal(projects.find((p) => p.id === "hand-cursor").live, undefined);
  assert.ok(!everything.includes("rickroll"));
});
test("exactly one featured project and it is first", () => {
  assert.equal(projects.filter((p) => p.featured).length, 1);
  assert.equal(projects[0].featured, true);
});
test("socials are github, x, linkedin, instagram with the right hrefs", () => {
  assert.deepEqual(socials.map((s) => s.id), ["github", "x", "linkedin", "instagram"]);
  assert.deepEqual(socials.map((s) => s.href), [
    "https://github.com/sanketsonkusare",
    "https://x.com/sassysanket",
    "https://www.linkedin.com/in/sanketsonkusare/",
    "https://www.instagram.com/sassysanket/",
  ]);
});
test("education lists MIT WPU then SPPU", () => {
  assert.deepEqual(education.map((e) => e.school), ["MIT World Peace University", "Savitribai Phule Pune University"]);
});
test("tools has four non-empty groups", () => {
  assert.equal(tools.length, 4);
  for (const g of tools) assert.ok(g.items.length > 0);
});
test("email and resume url", () => {
  assert.equal(profile.email, "sanketsonkusare01@gmail.com");
  assert.equal(profile.resumeUrl, "/resume.pdf");
});
