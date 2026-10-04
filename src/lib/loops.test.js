import { test } from "node:test";
import assert from "node:assert/strict";
import { POSE_LOOP, VOICE_LOOP, poseAt, poseInfo, kneeAngle, voiceState, cardLayout, PRODUCTS } from "./loops.js";

const close = (a, b, eps = 0.01) => a.every((p, i) => Math.abs(p[0] - b[i][0]) < eps && Math.abs(p[1] - b[i][1]) < eps);

test("pose loop is seamless: the last frame matches the first", () => {
  assert.ok(close(poseAt(0), poseAt(POSE_LOOP - 1e-6), 0.05));
  assert.ok(close(poseAt(0.1), poseAt(POSE_LOOP + 0.1)));
});
test("pose loop holds Warrior II with a bent front knee, then Tree pose", () => {
  const w = poseInfo(3);
  assert.equal(w.name, "Warrior II");
  assert.equal(w.score, 94);
  const k = kneeAngle(poseAt(3));
  assert.ok(k > 85 && k < 98, `knee ${k}`);
  assert.equal(poseInfo(7).name, "Tree pose");
  assert.equal(poseInfo(0.3).score, null);
});
test("voice loop types the request, then changes the page", () => {
  const typing = voiceState(1.1);
  assert.ok(typing.listening && typing.text.length > 0 && typing.text.length < "Show me red running shoes".length);
  const filtered = voiceState(2.6);
  assert.equal(filtered.code, 'filter({ color: "red", category: "running" })');
  assert.equal(voiceState(7.5).cart, 1);
  assert.equal(voiceState(0.2).cart, 0);
});
test("cards: filter keeps red shoes, sort puts the cheapest first, then the page resets", () => {
  const start = cardLayout(0);
  assert.ok(start.every((c, i) => c.slot === i && c.opacity === 1));
  const sorted = cardLayout(5);
  const reds = PRODUCTS.map((p, i) => [p, sorted[i]]).filter(([p]) => p.red);
  assert.ok(reds.every(([, c]) => c.opacity === 1));
  assert.ok(sorted.filter((c, i) => !PRODUCTS[i].red).every((c) => c.opacity === 0));
  const cheapest = PRODUCTS.indexOf([...PRODUCTS].filter((p) => p.red).sort((a, b) => a.price - b.price)[0]);
  assert.equal(sorted[cheapest].slot, 0);
  assert.ok(cardLayout(VOICE_LOOP - 0.05).every((c, i) => c.slot === i && c.opacity === 1));
});
