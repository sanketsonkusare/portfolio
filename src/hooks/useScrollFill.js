import { useEffect } from "react";
import { computeFill } from "../lib/timeline.js";

/**
 * Drives the timeline: positions the base line between the first and last dot,
 * grows the accent line as the page scrolls, and lights dots once reached.
 * `ref` points at the element with class `tl`.
 */
export function useScrollFill(ref) {
  useEffect(() => {
    const tl = ref.current;
    if (!tl) return undefined;
    const dots = [...tl.querySelectorAll(".dot")];
    const base = tl.querySelector(".tl-base");
    const fill = tl.querySelector(".tl-fill");
    if (dots.length < 2 || !base || !fill) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const centers = () => dots.map((d) => { const r = d.getBoundingClientRect(); return r.top + r.height / 2; });

    const layout = () => {
      const top = tl.getBoundingClientRect().top;
      const c = centers();
      const first = c[0] - top;
      base.style.top = `${first}px`;
      base.style.height = `${c[c.length - 1] - c[0]}px`;
      fill.style.top = `${first}px`;
      update();
    };

    const update = () => {
      const c = centers();
      const anchor = reduce ? Infinity : window.innerHeight * 0.62;
      const { fillHeight, reached } = computeFill(c, anchor);
      fill.style.height = `${reduce ? c[c.length - 1] - c[0] : fillHeight}px`;
      dots.forEach((d, i) => d.classList.toggle("on", reached[i]));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    layout();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    window.addEventListener("load", layout);
    const fonts = document.fonts?.ready?.then(layout);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      window.removeEventListener("load", layout);
      void fonts;
    };
  }, [ref]);
}
