import test from "node:test";
import assert from "node:assert/strict";
import { readTheme, writeTheme, otherTheme } from "./theme.js";
import { computeFill } from "./timeline.js";
import { clampShift } from "./clampShift.js";
import { scrollPercent } from "./scroll.js";

const memory = (initial = {}) => {
  const data = { ...initial };
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = v; }, data };
};

test("readTheme defaults to dark with empty storage", () => {
  assert.equal(readTheme(memory()), "dark");
});
test("readTheme returns a saved valid theme", () => {
  assert.equal(readTheme(memory({ theme: "light" })), "light");
});
test("readTheme falls back to dark for an invalid saved value", () => {
  assert.equal(readTheme(memory({ theme: "purple" })), "dark");
});
test("readTheme falls back to dark when storage throws or is missing", () => {
  const broken = { getItem() { throw new Error("blocked"); } };
  assert.equal(readTheme(broken), "dark");
  assert.equal(readTheme(undefined), "dark");
});
test("writeTheme persists and never throws", () => {
  const m = memory();
  writeTheme(m, "light");
  assert.equal(m.data.theme, "light");
  assert.doesNotThrow(() => writeTheme({ setItem() { throw new Error("full"); } }, "dark"));
});
test("otherTheme flips", () => {
  assert.equal(otherTheme("dark"), "light");
  assert.equal(otherTheme("light"), "dark");
});

test("computeFill is 0 when the line is above the first dot", () => {
  const r = computeFill([300, 500, 700], 200);
  assert.equal(r.fillHeight, 0);
  assert.deepEqual(r.reached, [false, false, false]);
});
test("computeFill clamps to the full span below the last dot", () => {
  const r = computeFill([300, 500, 700], 900);
  assert.equal(r.fillHeight, 400);
  assert.deepEqual(r.reached, [true, true, true]);
});
test("computeFill marks dots at or above the line as reached", () => {
  const r = computeFill([300, 500, 700], 500);
  assert.equal(r.fillHeight, 200);
  assert.deepEqual(r.reached, [true, true, false]);
});
test("computeFill handles fewer than two dots", () => {
  assert.deepEqual(computeFill([], 100), { fillHeight: 0, reached: [] });
  assert.deepEqual(computeFill([50], 100), { fillHeight: 0, reached: [true] });
});

test("clampShift is 0 when the card fits", () => {
  assert.equal(clampShift({ centerX: 200, cardWidth: 244, viewportWidth: 800 }), 0);
});
test("clampShift pulls the card left when it overflows the right edge at 360px", () => {
  // icon centre at 340px, card 244px wide: right edge would be 462 > 360 - 12
  const s = clampShift({ centerX: 340, cardWidth: 244, viewportWidth: 360 });
  assert.equal(340 - 122 + s + 244, 360 - 12);
  assert.ok(s < 0);
});
test("clampShift pushes the card right when it overflows the left edge", () => {
  const s = clampShift({ centerX: 20, cardWidth: 244, viewportWidth: 360 });
  assert.equal(20 - 122 + s, 12);
  assert.ok(s > 0);
});
test("clampShift pins to the left margin when the card is wider than the viewport", () => {
  const s = clampShift({ centerX: 100, cardWidth: 400, viewportWidth: 320 });
  assert.equal(100 - 200 + s, 12);
});

test("scrollPercent is 0 when the page does not scroll", () => {
  assert.equal(scrollPercent({ scrollY: 0, scrollHeight: 600, innerHeight: 800 }), 0);
});
test("scrollPercent is 100 at the bottom and clamps overscroll", () => {
  assert.equal(scrollPercent({ scrollY: 1200, scrollHeight: 2000, innerHeight: 800 }), 100);
  assert.equal(scrollPercent({ scrollY: 1500, scrollHeight: 2000, innerHeight: 800 }), 100);
  assert.equal(scrollPercent({ scrollY: -20, scrollHeight: 2000, innerHeight: 800 }), 0);
});
