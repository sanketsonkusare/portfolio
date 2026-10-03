/**
 * @param {number[]} dotCenters  viewport-relative y of each dot's centre, top to bottom
 * @param {number} anchor        viewport-relative y of the "reading line"
 * @returns {{ fillHeight: number, reached: boolean[] }}
 */
export function computeFill(dotCenters, anchor) {
  const reached = dotCenters.map((y) => y <= anchor);
  if (dotCenters.length < 2) return { fillHeight: 0, reached };
  const first = dotCenters[0];
  const span = dotCenters[dotCenters.length - 1] - first;
  return { fillHeight: Math.max(0, Math.min(span, anchor - first)), reached };
}
