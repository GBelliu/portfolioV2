/** Ícone de computador em pixel art usado como logo. */
export function PixelComputer({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="currentColor" d="M3 1h10v1h1v9h-1v1H3v-1H2V2h1zM2 13h12v2H2z" />
      <path fill="var(--screen)" d="M4 3h8v6H4z" />
      <path fill="var(--phosphor)" d="M5 4h1v1H5zM6 5h1v1H6zM5 6h1v1H5zM8 6h3v1H8z" />
      <path fill="var(--accent)" d="M4 10h2v1H4z" />
    </svg>
  );
}
