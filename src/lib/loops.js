// Pure, time-driven state for the two looping "Selected work" animations.
// Everything is a function of t (seconds), so a loop is seamless and any frame can be rendered on its own.

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (x) => { x = clamp(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const outCubic = (x) => 1 - Math.pow(1 - clamp(x), 3);
const wrap = (t, d) => ((t % d) + d) % d;

/* ---------- pose scoring ---------- */
// 14 keypoints: head, neck, shoulders L/R, elbows L/R, wrists L/R, hips L/R, knees L/R, ankles L/R.
const STAND = [[300,110],[300,175],[255,195],[345,195],[243,288],[357,288],[238,378],[362,378],[274,390],[326,390],[272,515],[328,515],[270,640],[330,640]];
const WARRIOR = [[300,150],[300,205],[250,228],[350,228],[160,230],[440,230],[72,232],[528,232],[266,430],[334,430],[188,535],[455,430],[112,640],[460,640]];
const TREE = [[300,118],[300,182],[262,200],[338,200],[236,128],[364,128],[292,52],[308,52],[276,392],[324,392],[274,515],[408,470],[272,640],[292,452]];
export const BONES = [[1,2],[1,3],[2,3],[2,4],[4,6],[3,5],[5,7],[2,8],[3,9],[8,9],[8,10],[10,12],[9,11],[11,13]];
export const POSE_LOOP = 8;
const POSE_KEYS = [[0, STAND], [0.8, STAND], [1.6, WARRIOR], [3.4, WARRIOR], [4.1, STAND], [4.6, STAND], [5.4, TREE], [7.2, TREE], [8, STAND]];

export function poseAt(time) {
  const t = wrap(time, POSE_LOOP);
  let i = 0;
  while (i < POSE_KEYS.length - 2 && t >= POSE_KEYS[i + 1][0]) i++;
  const [a, A] = POSE_KEYS[i], [b, Bk] = POSE_KEYS[i + 1];
  const u = ease((t - a) / (b - a));
  return A.map((p, j) => [p[0] + (Bk[j][0] - p[0]) * u, p[1] + (Bk[j][1] - p[1]) * u]);
}

// Angle at the right knee (between hip and ankle), in degrees.
export function kneeAngle(P) {
  const k = P[11], v1 = [P[9][0] - k[0], P[9][1] - k[1]], v2 = [P[13][0] - k[0], P[13][1] - k[1]];
  const c = (v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(...v1) * Math.hypot(...v2));
  return (Math.acos(clamp(c, -1, 1)) * 180) / Math.PI;
}

export function poseInfo(time) {
  const t = wrap(time, POSE_LOOP);
  if (t >= 1.6 && t < 4.1) return { name: "Warrior II", score: Math.round(94 * outCubic((t - 1.7) / 0.9)) };
  if (t >= 5.4 && t < POSE_LOOP) return { name: "Tree pose", score: Math.round(91 * outCubic((t - 5.5) / 0.9)) };
  return { name: "Detecting pose", score: null };
}

/* ---------- voice assistant ---------- */
export const VOICE_LOOP = 10;
export const PRODUCTS = [
  { name: "Trail Runner", color: "#e5484d", price: 4299, red: true },
  { name: "Street Low", color: "#e8e8ea", price: 3499, red: false },
  { name: "Pace", color: "#e5484d", price: 3799, red: true },
  { name: "Tempo", color: "#3e7bfa", price: 5999, red: false },
  { name: "Sprint Pro", color: "#e5484d", price: 6499, red: true },
  { name: "Ridge", color: "#30a46c", price: 4999, red: false },
];
export const QUERIES = [
  { t0: 0.6, t1: 1.6, act: 1.8, text: "Show me red running shoes", code: 'filter({ color: "red", category: "running" })' },
  { t0: 3.0, t1: 4.0, act: 4.2, text: "Sort by price, lowest first", code: 'sort({ by: "price", order: "asc" })' },
  { t0: 5.4, t1: 6.4, act: 6.6, text: "Add the cheapest to my cart", code: 'cart.add({ id: "pace" })' },
];
const RESET = 9.0;
const RED_ORDER = PRODUCTS.map((p, i) => (p.red ? i : -1)).filter((i) => i >= 0);
const PRICE_ORDER = [...RED_ORDER].sort((a, b) => PRODUCTS[a].price - PRODUCTS[b].price);

export function voiceState(time) {
  const t = wrap(time, VOICE_LOOP);
  let qi = -1;
  QUERIES.forEach((q, i) => { if (t >= q.t0 && t < RESET) qi = i; });
  const q = QUERIES[qi];
  const text = q ? q.text.slice(0, Math.floor(clamp((t - q.t0) / (q.t1 - q.t0)) * q.text.length)) : "";
  const listening = Boolean(q) && t < q.t1;
  let ai = -1;
  QUERIES.forEach((x, i) => { if (t >= x.act && t < RESET) ai = i; });
  return {
    text, listening, spoken: Boolean(q) && t >= q.t1,
    code: ai >= 0 ? QUERIES[ai].code : null, codeAge: ai >= 0 ? t - QUERIES[ai].act : 0,
    filtered: ai >= 0, sorted: ai >= 1,
    cart: ai >= 2 && t >= QUERIES[2].act + 0.4 ? 1 : 0,
    flying: ai >= 2 ? clamp((t - QUERIES[2].act) / 0.4) : 0,
    flyFrom: PRICE_ORDER[0],
  };
}

// Slot (0-5, left to right, top to bottom) and opacity of each product card, eased between page states.
export function cardLayout(time) {
  const t = wrap(time, VOICE_LOOP);
  const states = [
    { at: 0, slot: (i) => i, show: () => true },
    { at: QUERIES[0].act, slot: (i) => (PRODUCTS[i].red ? RED_ORDER.indexOf(i) : i), show: (i) => PRODUCTS[i].red },
    { at: QUERIES[1].act, slot: (i) => (PRODUCTS[i].red ? PRICE_ORDER.indexOf(i) : i), show: (i) => PRODUCTS[i].red },
    { at: RESET, slot: (i) => i, show: () => true },
  ];
  let k = 0;
  while (k < states.length - 1 && t >= states[k + 1].at) k++;
  const cur = states[k], prev = states[Math.max(0, k - 1)];
  const u = k === 0 ? 1 : ease((t - cur.at) / 0.5);
  return PRODUCTS.map((p, i) => {
    const from = prev.slot(i), to = cur.slot(i);
    const o0 = prev.show(i) ? 1 : 0, o1 = cur.show(i) ? 1 : 0;
    const settled = u >= 1;
    return { slot: settled ? to : from + (to - from) * u, opacity: settled ? o1 : o0 + (o1 - o0) * u, from, to, u };
  });
}
