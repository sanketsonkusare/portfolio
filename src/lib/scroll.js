/** Page scroll progress as 0..100. Pages that do not scroll report 0. */
export function scrollPercent({ scrollY, scrollHeight, innerHeight }) {
  const max = scrollHeight - innerHeight;
  if (max <= 0) return 0;
  return Math.max(0, Math.min(100, (scrollY / max) * 100));
}
