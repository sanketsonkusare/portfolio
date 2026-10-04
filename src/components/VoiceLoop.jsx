import { useLoopTime } from "../hooks/useLoopTime.js";
import { PRODUCTS, VOICE_LOOP, cardLayout, voiceState } from "../lib/loops.js";

const ACC = "#6f9bff";
const CARD_W = 130, CARD_H = 58;
const slotXY = (s) => [28 + (Math.round(s * 1000) / 1000 % 3) * 142, 84 + Math.floor(s / 3 + 1e-6) * 66];
// interpolate between two slot positions (slots can move across rows)
const pos = (c) => {
  const [x0, y0] = slotXY(c.from), [x1, y1] = slotXY(c.to);
  return [x0 + (x1 - x0) * c.u, y0 + (y1 - y0) * c.u];
};
const noise = (n) => { const x = Math.sin(n * 91.7) * 43758.5453; return x - Math.floor(x); };
const SHOE = "M14,74 C14,58 28,52 46,48 L84,26 C94,20 108,22 114,32 L128,54 C146,58 178,60 190,70 C196,76 194,86 184,86 L24,86 C17,86 14,81 14,74 Z";

function Shoe({ color, x, y, s = 0.26 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d={SHOE} fill={color} />
      <path d="M18,86 L186,86 C190,86 192,90 190,94 L20,94 C16,94 15,88 18,86 Z" fill="#e9e9ec" />
    </g>
  );
}

// Looping illustration of a voice assistant that changes a (demo) store page from spoken requests.
export default function VoiceLoop() {
  const [ref, t] = useLoopTime(VOICE_LOOP, 5.0);
  const v = voiceState(t), cards = cardLayout(t), frame = Math.floor(t * 30);
  const chip = (x, w, label, on) => (
    <g>
      <rect x={x} y="56" width={w} height="18" rx="9" fill={on ? "rgba(111,155,255,.22)" : "none"} stroke={on ? ACC : "#2a2d36"} />
      <text x={x + w / 2} y="68.5" textAnchor="middle" fill={on ? "#f4f4f5" : "#8b8d94"} fontSize="9.5" fontWeight="600">{label}</text>
    </g>
  );
  const [fx, fy] = slotXY(0);
  const fly = v.flying > 0 && v.flying < 1;
  return (
    <svg ref={ref} className="loop" viewBox="0 0 480 300" role="img"
      aria-label="Animation: a voice assistant filters, sorts and adds to cart on a demo store page from spoken requests">
      <rect width="480" height="300" fill="#0b0d12" />
      <rect x="12" y="10" width="456" height="214" rx="10" fill="#0e1015" stroke="#262931" />
      <circle cx="26" cy="20" r="3" fill="#3a3c44" /><circle cx="36" cy="20" r="3" fill="#3a3c44" /><circle cx="46" cy="20" r="3" fill="#3a3c44" />
      <text x="28" y="47" fill="#f4f4f5" fontSize="12" fontWeight="700">Demo store</text>
      <g transform="translate(432,33)" fill="none" stroke="#c9ccd3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h12l-1.4 7.5H4.5z" /><path d="M3 4 2.2 1H0" /><circle cx="6" cy="14.5" r="1.1" /><circle cx="12.5" cy="14.5" r="1.1" />
      </g>
      {v.cart > 0 && (
        <g><circle cx="451" cy="33" r="7" fill={ACC} /><text x="451" y="36.5" textAnchor="middle" fill="#07080a" fontSize="9" fontWeight="800">1</text></g>
      )}
      {chip(28, 32, "Red", v.filtered)}
      {chip(66, 54, "Running", v.filtered)}
      <rect x="350" y="56" width="104" height="18" rx="6" fill="none" stroke={v.sorted ? ACC : "#2a2d36"} />
      <text x="358" y="68.5" fill="#c9ccd3" fontSize="9" fontWeight="600">{v.sorted ? "Price: low to high" : "Sort: Featured"}</text>
      {cards.map((c, i) => {
        const p = PRODUCTS[i], [x, y] = pos(c);
        const picked = v.cart > 0 && i === v.flyFrom;
        return (
          <g key={p.name} opacity={c.opacity} transform={`translate(${x},${y})`}>
            <rect width={CARD_W} height={CARD_H} rx="8" fill="#15171c" stroke={picked ? ACC : "#262931"} />
            <rect x="1" y="1" width={CARD_W - 2} height="32" rx="7" fill={p.color} fillOpacity=".14" />
            <Shoe color={p.color} x={38} y={3} />
            <text x="9" y="45" fill="#f4f4f5" fontSize="9" fontWeight="700">{p.name}</text>
            <text x="9" y="54" fill="#8b8d94" fontSize="8">₹{p.price.toLocaleString("en-IN")}</text>
          </g>
        );
      })}
      {fly && (
        <g transform={`translate(${fx + 40 + (390 - fx) * v.flying},${fy + 4 - (fy - 20) * v.flying ** 2 - Math.sin(Math.PI * v.flying) * 24}) scale(${1 - 0.7 * v.flying})`}>
          <rect width="50" height="30" rx="6" fill="#2a1416" stroke={ACC} />
          <Shoe color={PRODUCTS[v.flyFrom].color} x={8} y={4} s={0.17} />
        </g>
      )}
      {v.code && (
        <g opacity={Math.min(1, v.codeAge * 6)}>
          <rect x="176" y="186" width="282" height="28" rx="8" fill="rgba(17,19,24,.96)" stroke="#33405e" />
          <text x="186" y="204" fill="#9db8ff" fontSize="9" fontFamily="ui-monospace,Menlo,monospace" fontWeight="600">{v.code}</text>
        </g>
      )}
      <rect x="60" y="240" width="360" height="44" rx="22" fill="#111318" stroke="#2a2d36" />
      <circle cx="84" cy="262" r="14" fill={ACC} />
      {v.listening && <circle cx="84" cy="262" r={17 + 3 * Math.sin(t * 18)} fill="none" stroke={ACC} strokeOpacity=".4" strokeWidth="3" />}
      <g transform="translate(79.5,254)" fill="none" stroke="#07080a" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2.5" y="0" width="4" height="9" rx="2" /><path d="M0 7a4.5 4.5 0 0 0 9 0M4.5 11.5v3" />
      </g>
      {Array.from({ length: 14 }, (_, k) => {
        const h = v.listening ? 4 + 22 * Math.sin((Math.PI * (k + 1)) / 15) * (0.35 + 0.65 * noise(frame * 13 + k)) : 3;
        return <rect key={k} x={106 + k * 5} y={262 - h / 2} width="3" height={h} rx="1.5" fill={ACC} opacity={v.listening ? 1 : 0.4} />;
      })}
      <text x="186" y="266.5" fill={v.listening ? "#f4f4f5" : "#8b8d94"} fontSize="12.5" fontWeight="600">
        {v.text || (v.code ? "" : "Ask for anything…")}
      </text>
    </svg>
  );
}
