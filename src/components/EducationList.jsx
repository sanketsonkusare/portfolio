import { education } from "../data/education.js";

const gem = { viewBox: "0 0 24 24", width: 16, height: 16, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export default function EducationList() {
  return (
    <div className="rows cols">
      {education.map((e) => (
        <div className="row edu" key={e.school}>
          <div className="k">{e.dates}</div>
          <div className="c">
            <div className="ttl">
              <img className="lg school" src={e.logo} alt={`${e.school} logo`} width="46" height="46" loading="lazy" />
              <div>
                <h3>{e.school}</h3>
                <div className="co">{e.degree}</div>
              </div>
            </div>
            <div className="sk">
              <svg {...gem}>
                <path d="M6 3h12l4 6-10 13L2 9z" />
                <path d="M11 3 8 9l4 13 4-13-3-6" />
                <path d="M2 9h20" />
              </svg>
              <span>{e.skills}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
