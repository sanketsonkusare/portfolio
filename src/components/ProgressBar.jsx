import { useEffect, useRef } from "react";
import { scrollPercent } from "../lib/scroll.js";

export default function ProgressBar() {
  const ref = useRef(null);
  useEffect(() => {
    const set = () => {
      const d = document.documentElement;
      if (ref.current) ref.current.style.width = `${scrollPercent({ scrollY: window.scrollY, scrollHeight: d.scrollHeight, innerHeight: window.innerHeight })}%`;
    };
    set();
    window.addEventListener("scroll", set, { passive: true });
    window.addEventListener("resize", set);
    return () => {
      window.removeEventListener("scroll", set);
      window.removeEventListener("resize", set);
    };
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}
