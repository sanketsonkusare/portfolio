import { useLoopTime } from "../hooks/useLoopTime.js";
import { BONES, POSE_LOOP, kneeAngle, poseAt, poseInfo } from "../lib/loops.js";

const ACC = "#6f9bff";
// tiny deterministic noise: the "detector" output wobbles slightly, updated at 30 fps
const noise = (n) => { const x = Math.sin(n * 127.1) * 43758.5453; return x - Math.floor(x) - 0.5; };

// Looping illustration of real-time pose detection and scoring (original stick figure).
export default function PoseLoop() {
  const [ref, t] = useLoopTime(POSE_LOOP, 3.2);
  const frame = Math.floor(t * 30);
  const P = poseAt(t).map(([x, y], j) => [x + noise(frame * 31 + j) * 3, y + noise(frame * 17 + j + 99) * 3]);
  const info = poseInfo(t);
  const knee = kneeAngle(P);
  const K = P[11];
  return (
    <svg ref={ref} className="loop" viewBox="0 0 480 300" role="img"
      aria-label="Animation: a pose detector tracks body keypoints and scores yoga poses in real time">
      <defs>
        <radialGradient id="pbg" cx="50%" cy="0%" r="110%"><stop offset="0" stopColor="#171c2a" /><stop offset="1" stopColor="#0b0d12" /></radialGradient>
      </defs>
      <rect width="480" height="300" fill="url(#pbg)" />
      <polygon points="70,266 330,266 356,292 44,292" fill="#141b2c" stroke={ACC} strokeOpacity=".25" />
      <g transform="translate(80,12) scale(0.4)">
        {BONES.map(([a, b], k) => (
          <line key={k} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} stroke={ACC} strokeWidth="9" strokeLinecap="round" />
        ))}
        <circle cx={P[0][0]} cy={P[0][1]} r="34" fill="none" stroke={ACC} strokeWidth="8" />
        {P.slice(1).map(([x, y], j) => (
          <circle key={j} cx={x} cy={y} r="10" fill="#fff" stroke={ACC} strokeWidth="5" />
        ))}
        <text x={K[0] + 26} y={K[1] + 60} fill="#fff" fontSize="40" fontWeight="800" stroke="#0b0d12" strokeWidth="10" paintOrder="stroke">
          {Math.round(knee)}°
        </text>
      </g>
      <g transform="translate(330,92)">
        <text fill="#a1a4ab" fontSize="13" fontWeight="600">{info.name}</text>
        <text y="56" fill="#f4f4f5" fontSize="54" fontWeight="700" letterSpacing="-2">{info.score ?? "··"}</text>
        <text y="78" fill="#878b93" fontSize="12">pose score /100</text>
      </g>
      <g transform="translate(14,14)">
        <rect width="58" height="22" rx="11" fill="rgba(0,0,0,.5)" />
        <circle cx="13" cy="11" r="4" fill="#ff4d5e" opacity={Math.floor(t * 2) % 2 ? 0.35 : 1} />
        <text x="23" y="15" fill="#f4f4f5" fontSize="11" fontWeight="600">Live</text>
      </g>
      <text x="424" y="29" fill="#878b93" fontSize="10.5" fontWeight="600">30 fps</text>
    </svg>
  );
}
