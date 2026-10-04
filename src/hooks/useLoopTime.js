import { useEffect, useRef, useState } from "react";

// Drives a looping animation at ~30 fps while it is on screen.
// Returns [ref, t]: attach ref to the animated element. With reduced motion, t stays at `still`.
export function useLoopTime(duration, still = 0) {
  const ref = useRef(null);
  const [t, setT] = useState(still);
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const start = performance.now() - still * 1000;
    let raf = 0, last = 0, visible = !("IntersectionObserver" in window);
    const tick = (now) => {
      if (!visible) { raf = 0; return; }
      raf = requestAnimationFrame(tick);
      if (now - last < 33) return;
      last = now;
      setT((((now - start) / 1000) % duration + duration) % duration);
    };
    let io;
    if ("IntersectionObserver" in window && ref.current) {
      io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(tick);
      }, { rootMargin: "120px" });
      io.observe(ref.current);
    } else raf = requestAnimationFrame(tick);
    return () => { io?.disconnect(); cancelAnimationFrame(raf); };
  }, [duration, still]);
  return [ref, t];
}
