import { useEffect, useState } from "react";
import { contributionsUrl, parseContributions } from "../lib/contrib.js";

// Loads the last year of GitHub contributions in the browser. `skip` turns it off (tests, prerender).
export function useContributions(username, skip = false) {
  const [state, setState] = useState({ status: "loading", total: 0, days: [] });
  useEffect(() => {
    if (skip) return undefined;
    const ctrl = new AbortController();
    fetch(contributionsUrl(username), { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json) => {
        const { total, days } = parseContributions(json);
        setState(days.length ? { status: "ready", total, days } : { status: "error", total: 0, days: [] });
      })
      .catch((err) => {
        if (err.name !== "AbortError") setState({ status: "error", total: 0, days: [] });
      });
    return () => ctrl.abort();
  }, [username, skip]);
  return state;
}
