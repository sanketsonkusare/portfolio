import { useRef } from "react";
import { useScrollFill } from "../hooks/useScrollFill.js";

export default function Timeline({ items, detailed = false }) {
  const ref = useRef(null);
  useScrollFill(ref);
  return (
    <div className="rows tl" ref={ref}>
      <i className="tl-base" />
      <i className="tl-fill" />
      {items.map((e) => (
        <div className={e.current ? "row cur" : "row"} key={e.id}>
          <div className="k">{e.dates}</div>
          <span className="dot" />
          <div className="c">
            <div className="ttl">
              <img className={e.logoPadding === "tight" ? "lg co tight" : "lg co"} src={e.logo} alt={`${e.company.split(" ")[0]} logo`} width="38" height="38" loading="lazy" />
              <div>
                <h3>
                  {e.role}
                  {e.current && <span className="now">Current</span>}
                </h3>
                <div className="co">{e.company}</div>
              </div>
            </div>
            <p>{detailed ? e.summary : e.preview}</p>
            {detailed && (
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
