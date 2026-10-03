// Hexagon "S" mark. Two identical shapes, the second rotated half a turn.
// Fill comes from CSS (var(--acc)) so it follows the theme.
const shape =
  "70,432 70,212 318,63 560,212 376,330 255,258 296,236 376,280 472,214 318,118 112,236 112,410";

export default function Logo() {
  return (
    <svg className="logo" viewBox="70 63 490 574" aria-hidden="true" focusable="false">
      <polygon points={shape} />
      <polygon points={shape} transform="rotate(180 315 350)" />
    </svg>
  );
}
