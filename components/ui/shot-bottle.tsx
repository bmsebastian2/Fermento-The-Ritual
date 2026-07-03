"use client";

import { useId } from "react";

/**
 * Botella de shot ilustrada (vector) — vidrio con líquido en el color del jugo,
 * tapa oscura, etiqueta con emblema de brote y brillo de vidrio. El `color` es
 * el acento del sabor (var de globals.css); los tonos de líquido, brillo y
 * contorno se derivan por `color-mix`. Da presencia real de producto embotellado
 * sin depender de fotos limpias que aún no existen.
 */
export function ShotBottle({
  color,
  className,
  style,
}: {
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const clip = useId();
  const glass = `color-mix(in srgb, ${color} 14%, var(--color-cream))`;
  const juiceHi = `color-mix(in srgb, ${color} 78%, white)`;
  const juiceLo = `color-mix(in srgb, ${color} 70%, var(--color-forest-deep))`;
  const outline = `color-mix(in srgb, ${color} 45%, var(--color-forest-deep))`;
  const cap = "var(--color-forest-deep)";
  const cream = "var(--color-cream)";
  const body =
    "M40 37 L60 37 L60 50 C60 56 64 58 70 62 C82 68 86 78 86 92 L86 244 C86 252 80 256 72 256 L28 256 C20 256 14 252 14 244 L14 92 C14 78 18 68 30 62 C36 58 40 56 40 50 Z";

  return (
    <svg viewBox="0 0 100 270" fill="none" className={className} style={style} aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
      </defs>

      {/* Vidrio */}
      <path d={body} fill={glass} />

      {/* Líquido (recortado a la silueta) */}
      <g clipPath={`url(#${clip})`}>
        <rect x="10" y="98" width="80" height="170" fill={color} />
        <rect x="10" y="98" width="80" height="6" fill={juiceHi} opacity="0.5" />
        <rect x="18" y="86" width="10" height="182" rx="5" fill="white" opacity="0.16" />
        <rect x="70" y="98" width="8" height="170" fill={juiceLo} opacity="0.35" />
      </g>

      {/* Etiqueta */}
      <rect x="18" y="150" width="64" height="72" rx="4" fill={cream} />
      <rect x="18" y="150" width="64" height="72" rx="4" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="172" r="7.5" fill="none" stroke={color} strokeWidth="1.4" />
      <path
        d="M50 176c-2.6 0-4.4-1.7-4.6-4.3 2.6.1 4.4 1.9 4.6 4.3Z M50 174c2.6 0 4.4-1.7 4.6-4.3-2.6.1-4.4 1.9-4.6 4.3Z"
        fill={color}
      />
      <path d="M38 188h24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M34 198h32M40 206h20" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />

      {/* Tapa */}
      <rect x="35" y="6" width="30" height="27" rx="4" fill={cap} />
      <rect x="33" y="30" width="34" height="9" rx="2.5" fill={cap} />
      <path d="M41 11v16M50 11v16M59 11v16" stroke="white" strokeWidth="1" opacity="0.12" />
      <rect x="38" y="9" width="4" height="20" rx="2" fill="white" opacity="0.14" />

      {/* Contorno */}
      <path d={body} fill="none" stroke={outline} strokeWidth="2" />
    </svg>
  );
}
