import { useEffect, useMemo, useRef } from "react";
import { useContributions } from "../hooks/useContributions.js";
import { describeDay, emptyYear, monthLabels, toWeeks } from "../lib/contrib.js";

const CELL = 11, STEP = 14, LEFT = 30, TOP = 18, RIGHT = 16; // RIGHT leaves room for the last month label
const WEEKDAYS = [[1, "Mon"], [3, "Wed"], [5, "Fri"]];
const ext = { target: "_blank", rel: "noopener noreferrer" };

// GitHub-style contribution calendar in the site's accent colour.
// `data` ({ total, days }) skips the network; tests use it.
export default function GitHubActivity({ username, data }) {
  const live = useContributions(username, Boolean(data));
  const state = data ? { status: "ready", ...data } : live;
  const days = useMemo(() => (state.days.length ? state.days : emptyYear()), [state.days]);
  const weeks = useMemo(() => toWeeks(days), [days]);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const scroller = useRef(null);

  // On narrow screens the graph scrolls sideways: start at the most recent weeks.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [state.status]);

  const w = LEFT + weeks.length * STEP + RIGHT, h = TOP + 7 * STEP;
  const ready = state.status === "ready";
  const summary = ready ? `${state.total} contributions in the last year` : null;

  return (
    <div className="gh">
      <div className="ghs" ref={scroller}>
        <svg className={`ghg ${ready ? "on" : ""}`} viewBox={`0 0 ${w} ${h}`} role="img"
          aria-label={ready ? `${state.total} GitHub contributions in the last year` : "GitHub contribution graph"}>
          {labels.map((l) => (
            <text key={`${l.label}${l.col}`} x={LEFT + l.col * STEP} y={10}>{l.label}</text>
          ))}
          {WEEKDAYS.map(([r, name]) => (
            <text key={name} x={0} y={TOP + r * STEP + 9}>{name}</text>
          ))}
          {weeks.map((week, c) =>
            week.map((d, r) =>
              d ? (
                <rect key={d.date} className={`lv${d.level}`} x={LEFT + c * STEP} y={TOP + r * STEP} width={CELL} height={CELL} rx={2.5}>
                  {ready && <title>{describeDay(d)}</title>}
                </rect>
              ) : null,
            ),
          )}
        </svg>
      </div>
      <div className="ghf">
        {summary ? (
          <span>{summary}</span>
        ) : state.status === "error" ? (
          <a href={`https://github.com/${username}`} {...ext}>See my activity on GitHub</a>
        ) : (
          <span>Loading contributions…</span>
        )}
        <span className="leg" aria-hidden="true">
          Less <i className="lv0" /><i className="lv1" /><i className="lv2" /><i className="lv3" /><i className="lv4" /> More
        </span>
      </div>
    </div>
  );
}
