"use client";

import { useId } from "react";

/**
 * Botella de shot ilustrada (vector) — vidrio con líquido en el color del jugo,
 * tapa oscura, etiqueta con emblema de brote y brillo de vidrio. El `color` es
 * el acento del sabor (var de globals.css); los tonos de líquido, brillo y
 * contorno se derivan por `color-mix`. Da presencia real de producto embotellado
 * a los sabores que todavía no tienen foto limpia.
 *
 * Silueta calcada del frasco real de 2 oz (medido sobre la foto de Ginger Boost):
 * cuerpo 1:2,87, tapa ancha al 85% del cuerpo, cuello al 71%, hombro que abre
 * entre el 19% y el 35% de la altura, y etiqueta ocupando más de medio cuerpo.
 * El viewBox replica el encuadre de las fotos (510×1160 con la botella al 72%
 * del ancho y al 91% del alto): renderizadas a la misma altura, la ilustrada y
 * la fotografiada quedan del mismo tamaño y apoyadas en la misma base.
 *
 * `width`/`height` van explícitos: sin tamaño intrínseco el SVG no resuelve
 * `w-auto` y se descuelga del encuadre.
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
  // Cuello corto, hombro que abre en dos curvas hasta el cuerpo recto, base con radio mínimo.
  const body =
    "M24 40 L76 40 L75.6 48 C76.5 54 79 57 81.5 62 C84 68 86 75 86 84 L86 208 C86 214 82.5 218 77 218 L23 218 C17.5 218 14 214 14 208 L14 84 C14 75 16 68 18.5 62 C21 57 23.5 54 24.4 48 Z";

  return (
    <svg
      viewBox="0 0 100 228"
      width={100}
      height={228}
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clip}>
          <path d={body} />
        </clipPath>
      </defs>

      {/* Vidrio */}
      <path d={body} fill={glass} />

      {/* Líquido (recortado a la silueta) */}
      <g clipPath={`url(#${clip})`}>
        <rect x="10" y="45" width="80" height="177" fill={color} />
        <rect x="10" y="45" width="80" height="4" fill={juiceHi} opacity="0.5" />
        <rect x="20" y="52" width="8" height="156" rx="4" fill="white" opacity="0.16" />
        <rect x="72" y="45" width="8" height="177" fill={juiceLo} opacity="0.35" />
      </g>

      {/* Etiqueta — mismo reparto que la real: emblema, nombre, banda, notas, sellos */}
      <rect x="18" y="92" width="64" height="104" rx="3" fill={cream} />
      <rect x="18" y="92" width="64" height="104" rx="3" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="113" r="8" fill="none" stroke={color} strokeWidth="1.4" />
      <path
        d="M50 117c-2.7 0-4.6-1.8-4.8-4.5 2.7.1 4.6 2 4.8 4.5 Z M50 115c2.7 0 4.6-1.8 4.8-4.5-2.7.1-4.6 2-4.8 4.5 Z"
        fill={color}
      />
      <path d="M35 133h30" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
      <rect x="27" y="141" width="46" height="10" rx="2" fill={color} opacity="0.85" />
      <path d="M32 160h36M38 168h24" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
      <g fill="none" stroke={color} strokeWidth="1" opacity="0.5">
        <circle cx="36" cy="182" r="4.5" />
        <circle cx="50" cy="182" r="4.5" />
        <circle cx="64" cy="182" r="4.5" />
      </g>

      {/* Tapa — ancha y estriada, con anillo de base */}
      <rect x="20" y="11" width="60" height="26" rx="3" fill={cap} />
      <rect x="19" y="34" width="62" height="8" rx="2" fill={cap} />
      <path d="M32 15v18M41 15v18M50 15v18M59 15v18M68 15v18" stroke="white" strokeWidth="1" opacity="0.12" />
      <rect x="25" y="14" width="5" height="17" rx="2.5" fill="white" opacity="0.14" />

      {/* Contorno */}
      <path d={body} fill="none" stroke={outline} strokeWidth="2" />
    </svg>
  );
}
