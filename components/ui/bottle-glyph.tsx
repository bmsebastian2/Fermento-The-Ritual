/** Silueta de botella — glyph decorativo para cards sin foto. */
export function BottleGlyph({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 112"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* tapa */}
      <path d="M20 4h8v6h-8z" />
      {/* cuello + hombros + cuerpo */}
      <path d="M20 10c0 4 3 4 3 8v6c4 2 7 6 7 12v56c0 4-3 7-7 7H17c-4 0-7-3-7-7V36c0-6 3-10 7-12v-6c0-4 3-4 3-8" />
      {/* etiqueta */}
      <path d="M13 66h22" opacity="0.5" />
      <path d="M13 82h22" opacity="0.5" />
    </svg>
  );
}
