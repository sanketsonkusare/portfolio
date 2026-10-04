import { test } from "node:test";
import assert from "node:assert/strict";
import { parseContributions, toWeeks, monthLabels, describeDay, emptyYear, contributionsUrl } from "./contrib.js";

const sample = {
  total: { lastYear: 378 },
  contributions: [
    { date: "2025-10-05", count: 0, level: 0 }, // a Sunday
    { date: "2025-10-06", count: 3, level: 2 },
    { date: "2025-10-07", count: 1, level: 1 },
  ],
};

test("contributionsUrl asks for the last year of a user", () => {
  assert.equal(contributionsUrl("sanketsonkusare"), "https://github-contributions-api.jogruber.de/v4/sanketsonkusare?y=last");
});
test("parseContributions reads total and days, clamping bad levels", () => {
  const { total, days } = parseContributions({ ...sample, contributions: [...sample.contributions, { date: "2025-10-08", count: "2", level: 9 }] });
  assert.equal(total, 378);
  assert.equal(days.length, 4);
  assert.deepEqual(days[3], { date: "2025-10-08", count: 2, level: 4 });
});
test("parseContributions survives a bad payload", () => {
  assert.deepEqual(parseContributions(null), { total: 0, days: [] });
  assert.deepEqual(parseContributions({ contributions: [{ date: "2025-10-06", count: 5, level: 3 }] }), {
    total: 5, days: [{ date: "2025-10-06", count: 5, level: 3 }],
  });
});
test("toWeeks starts every column on Sunday and pads the first week", () => {
  const days = parseContributions({ contributions: [{ date: "2025-10-07", count: 0, level: 0 }, { date: "2025-10-08", count: 0, level: 0 }] }).days;
  const weeks = toWeeks(days); // Tue, Wed
  assert.equal(weeks.length, 1);
  assert.equal(weeks[0].length, 7);
  assert.equal(weeks[0][0], null);
  assert.equal(weeks[0][1], null);
  assert.equal(weeks[0][2].date, "2025-10-07");
});
test("a full year is 53 week columns", () => {
  const days = emptyYear(new Date("2026-10-04T12:00:00Z"));
  assert.equal(days[days.length - 1].date, "2026-10-04");
  assert.equal(days.length, 365);
  assert.equal(days[0].date, "2025-10-05");
  assert.equal(toWeeks(days).length, 53);
});
test("monthLabels steps month by month, never two labels closer than 3 columns", () => {
  const labels = monthLabels(toWeeks(emptyYear(new Date("2026-10-04T12:00:00Z"))));
  const names = labels.map((l) => l.label);
  assert.deepEqual(names, ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"]);
  for (let i = 1; i < labels.length; i++) assert.ok(labels[i].col - labels[i - 1].col >= 3);
  assert.equal(names[names.length - 1], "Oct");
});
test("describeDay reads naturally", () => {
  assert.equal(describeDay({ date: "2026-10-04", count: 0 }), "No contributions on Oct 4, 2026");
  assert.equal(describeDay({ date: "2026-10-04", count: 1 }), "1 contribution on Oct 4, 2026");
  assert.equal(describeDay({ date: "2026-10-03", count: 15 }), "15 contributions on Oct 3, 2026");
});
