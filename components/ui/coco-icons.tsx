/**
 * Set de íconos monolínea para la sección Agua de Coco (The Ritual).
 * Mismo lenguaje que `LineIcon`: trazo fino, `currentColor`, esquinas suaves —
 * lecturas botánicas / de materia prima, no iconografía flat de "salud"
 * (design-system §6 proscribe corazones/rayos/checks tipo app fitness).
 *
 * Heredan el color vía currentColor: usar con `text-coco` o `style={{ color }}`.
 */

export type CocoIconName =
  // Beneficios
  | "drop" // hidratación
  | "coconut" // electrolitos (fuente)
  | "sprout" // 100% pura y real
  | "sun" // energía natural
  | "sprig" // fuente de vitaminas
  | "ring" // bienestar integral
  // Atributos (tira al pie)
  | "flask" // sin aditivos
  | "leaf" // orgánico
  | "no-sugar" // sin azúcar añadida
  | "snowflake"; // mantener refrigerado

const PATHS: Record<CocoIconName, React.ReactNode> = {
  // Gota de agua con reflejo interno.
  drop: (
    <>
      <path d="M24 7 C 24 7 34 21 34 29 A 10 10 0 1 1 14 29 C 14 21 24 7 24 7 Z" />
      <path d="M18.5 31 C 18.5 34.5 20.5 37 23.5 37.5" strokeWidth={1.4} />
    </>
  ),
  // Coco en corte transversal — cáscara + pulpa + agua.
  coconut: (
    <>
      <circle cx="24" cy="25" r="15" />
      <circle cx="24" cy="25" r="8.5" />
      <circle cx="21" cy="22" r="1.2" strokeWidth={1.3} />
      <circle cx="27" cy="27" r="1.2" strokeWidth={1.3} />
    </>
  ),
  // Brote de dos hojas sobre tallo.
  sprout: (
    <>
      <path d="M24 41 L 24 22" />
      <path d="M24 27 C 18 27 13.5 23 13 16.5 C 19.5 17 24 21 24 27 Z" />
      <path d="M24 23 C 30 23 34.5 19 35 12.5 C 28.5 13 24 17 24 23 Z" />
      <path d="M19 41 L 29 41" strokeWidth={1.4} />
    </>
  ),
  // Sol naciente sobre el horizonte — energía natural (no rayo eléctrico).
  sun: (
    <>
      <path d="M9 35 L 39 35" />
      <path d="M15 35 A 9 9 0 0 1 33 35" />
      <path d="M24 18 L 24 13.5" strokeWidth={1.5} />
      <path d="M35 22 L 38 19" strokeWidth={1.5} />
      <path d="M13 22 L 10 19" strokeWidth={1.5} />
    </>
  ),
  // Ramita con frutos — fuente de vitaminas.
  sprig: (
    <>
      <path d="M13 39 C 20 33 24 25 24.5 15" />
      <path d="M22.5 27 C 18 25 16 21 17 16.5 C 21.5 18.5 23.5 22.5 22.5 27 Z" />
      <circle cx="25" cy="12" r="2.6" />
      <circle cx="30" cy="16.5" r="2.6" />
    </>
  ),
  // Anillo/remolino de La Ritual con brote al centro — bienestar integral.
  ring: (
    <>
      <path d="M35 15 A 15 15 0 1 1 30 11" />
      <path d="M30 11 C 32 11.5 33.5 12.5 35 15" strokeWidth={1.3} />
      <path d="M24 30 L 24 22" strokeWidth={1.5} />
      <path d="M24 24 C 20.5 24 18 21.5 18 18 C 21.5 18 24 20.5 24 24 Z" strokeWidth={1.5} />
    </>
  ),
  // Matraz con línea diagonal — sin aditivos (additive free).
  flask: (
    <>
      <path d="M20 8 L 20 19 L 12.5 33 C 11 36 13 39.5 16.5 39.5 L 31.5 39.5 C 35 39.5 37 36 35.5 33 L 28 19 L 28 8" />
      <path d="M18 8 L 30 8" />
      <path d="M15 26 L 33 26" strokeWidth={1.3} />
      <path d="M14 11 L 34 37" strokeWidth={1.6} />
    </>
  ),
  // Hoja con nervadura — orgánico.
  leaf: (
    <>
      <path d="M12 37 C 12 21 24 10 38 11 C 39 27 27 39 12 37 Z" />
      <path d="M14 35 C 23 30 31 22 36 14" strokeWidth={1.4} />
    </>
  ),
  // Gota con línea diagonal — sin azúcar añadida.
  "no-sugar": (
    <>
      <path d="M24 10 C 24 10 32 21 32 27 A 8 8 0 1 1 16 27 C 16 21 24 10 24 10 Z" />
      <path d="M13 13 L 35 35" strokeWidth={1.6} />
    </>
  ),
  // Copo — mantener refrigerado.
  snowflake: (
    <>
      <path d="M24 8 L 24 40" />
      <path d="M11 15.5 L 37 32.5" />
      <path d="M37 15.5 L 11 32.5" />
      <path d="M24 14 L 20.5 11 M24 14 L 27.5 11" strokeWidth={1.4} />
      <path d="M24 34 L 20.5 37 M24 34 L 27.5 37" strokeWidth={1.4} />
    </>
  ),
};

export function CocoIcon({
  name,
  className,
}: {
  name: CocoIconName;
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
      {PATHS[name]}
    </svg>
  );
}
