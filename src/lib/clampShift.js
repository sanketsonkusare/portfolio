/**
 * Horizontal shift (px) to keep a card, centred on `centerX`, inside the viewport.
 * Returns 0 when it already fits.
 */
export function clampShift({ centerX, cardWidth, viewportWidth, margin = 12 }) {
  const left = centerX - cardWidth / 2;
  const maxLeft = viewportWidth - margin - cardWidth;
  const clamped = Math.max(margin, Math.min(maxLeft, left));
  return clamped - left;
}
