// Helpers for the GitHub contribution graph. Dates are "YYYY-MM-DD" strings, handled in UTC.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY = 86400000;
const utc = (date) => new Date(`${date}T00:00:00Z`);
const iso = (d) => d.toISOString().slice(0, 10);

// Public, CORS-enabled service that reads the same calendar GitHub shows on a profile.
export const contributionsUrl = (user) =>
  `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`;

export function parseContributions(json) {
  const list = Array.isArray(json?.contributions) ? json.contributions : [];
  const days = list
    .filter((d) => d && typeof d.date === "string")
    .map((d) => ({
      date: d.date,
      count: Math.max(0, Number(d.count) || 0),
      level: Math.max(0, Math.min(4, Math.round(Number(d.level) || 0))),
    }));
  const reported = Number(json?.total?.lastYear);
  const total = Number.isFinite(reported) ? reported : days.reduce((s, d) => s + d.count, 0);
  return { total, days };
}

// One year of empty days ending today (365, like GitHub): the placeholder grid while loading.
export function emptyYear(today = new Date()) {
  const end = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Array.from({ length: 365 }, (_, i) => ({ date: iso(new Date(end - (364 - i) * DAY)), count: 0, level: 0 }));
}

// Columns of 7 days, Sunday first, like GitHub. Leading days before the first date are null.
export function toWeeks(days) {
  if (!days.length) return [];
  const cells = [...Array(utc(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    const w = cells.slice(i, i + 7);
    while (w.length < 7) w.push(null);
    weeks.push(w);
  }
  return weeks;
}

// A label over the first column of each month; drops a label that would crowd the next one.
export function monthLabels(weeks) {
  const out = [];
  let last = -1;
  weeks.forEach((w, col) => {
    const d = w.find(Boolean);
    if (!d) return;
    const m = utc(d.date).getUTCMonth();
    if (m !== last) {
      last = m;
      if (out.length && col - out[out.length - 1].col < 3) out.pop();
      out.push({ col, label: MONTHS[m] });
    }
  });
  return out;
}

export function describeDay({ date, count }) {
  const d = utc(date);
  const when = `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  if (!count) return `No contributions on ${when}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${when}`;
}
