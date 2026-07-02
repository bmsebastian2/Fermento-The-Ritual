import type { Line } from "@/lib/data/products";

/**
 * Sello de línea (Fermento / The Ritual). SVG monolínea derivado del logo real
 * de cada línea; hereda el color vía `currentColor` (usar con `text-forest`).
 * Decorativo: el nombre de la sección ya está en el <h2>.
 */
export function LineIcon({
  line,
  className,
}: {
  line: Line;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {line === "fermento" ? (
        <>
          {/* tapa / rosca */}
          <rect x="17" y="7" width="14" height="5" rx="1" />
          {/* cuerpo de vidrio del frasco */}
          <path d="M18 12 C 16.5 13.5 16 15 16 17 L 16 37 C 16 40 18 42 21 42 L 27 42 C 30 42 32 40 32 37 L 32 17 C 32 15 31.5 13.5 30 12" />
          {/* superficie del fermento vivo */}
          <path d="M16.5 27 C 20 29 28 29 31.5 27" />
          {/* burbujas ascendiendo */}
          <circle cx="22" cy="34" r="1.4" />
          <circle cx="26.5" cy="31" r="1" />
          <circle cx="24" cy="38" r="1.1" />
          {/* hoja de laurel izquierda */}
          <path d="M15 28 C 10 26 6 29 4.5 34 C 9.5 34 13.5 32 15 28 Z" />
          <path d="M15 28 L 6.5 32.5" strokeWidth={1.3} />
          {/* hoja de laurel derecha */}
          <path d="M33 28 C 38 26 42 29 43.5 34 C 38.5 34 34.5 32 33 28 Z" />
          <path d="M33 28 L 41.5 32.5" strokeWidth={1.3} />
        </>
      ) : (
        <>
          {/* anillo/remolino abierto */}
          <path d="M37 15 A 15 15 0 1 1 32 12" />
          {/* cola del brochazo (superposición) */}
          <path d="M32 12 C 34 12.5 35.5 13.5 37 15" strokeWidth={1.3} />
          {/* tallo de la ramita */}
          <path d="M17 33 C 21 28 25 24 30 21" />
          {/* hoja inferior */}
          <path d="M22 28 C 18 27 16 25 16.5 22 C 20 23 22 25 22 28 Z" />
          {/* hoja superior */}
          <path d="M27 23 C 27 19 29 17 32 16.5 C 31.5 20 30 22 27 23 Z" />
          {/* gota */}
          <path d="M35 27 C 37 30 37 32 35 32.5 C 33 32 33 30 35 27 Z" strokeWidth={1.4} />
        </>
      )}
    </svg>
  );
}
