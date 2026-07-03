/**
 * Set de íconos monolínea para el teaser de Panes (The Ritual · Próximamente).
 * Mismo lenguaje que `CocoIcon`/`LineIcon`: trazo fino, `currentColor`, esquinas
 * suaves — lecturas de panadería (espiga, hogaza, rodillo), no iconografía flat.
 * design-system §6 proscribe corazones/rayos/checks: "hechos con amor" se
 * resuelve con un rodillo (oficio artesanal), no con un ♥.
 *
 * Heredan el color vía currentColor: usar con `text-dessert` o `style={{ color }}`.
 */

export type BreadIconName =
  // Beneficios
  | "gluten-free" // sin gluten (espiga tachada)
  | "natural" // ingredientes naturales (brote)
  | "artisan" // hechos con amor (rodillo)
  | "flavor" // sabor que nutre (hogaza)
  // Tipos de pan (chips "próximamente")
  | "seeds" // pan de semillas
  | "rustic" // pan rústico
  | "multigrain" // pan multigrano
  | "pan-loaf"; // pan de molde

// Espiga de trigo — tallo + grano superior + 3 pares de granos.
// Reutilizada por "multigrain" y (con tachadura) por "gluten-free".
const Wheat = (
  <>
    <path d="M24 44 L 24 22" />
    <path d="M24 22 C 21 19 21 14 24 11 C 27 14 27 19 24 22 Z" />
    <path d="M23.5 24 C 19.5 22.5 17.5 19 18 14.5 C 22 16 24 19.5 23.5 24 Z" />
    <path d="M24.5 24 C 28.5 22.5 30.5 19 30 14.5 C 26 16 24 19.5 24.5 24 Z" />
    <path d="M23.5 30 C 19.5 28.5 17.5 25 18 20.5 C 22 22 24 25.5 23.5 30 Z" />
    <path d="M24.5 30 C 28.5 28.5 30.5 25 30 20.5 C 26 22 24 25.5 24.5 30 Z" />
    <path d="M23.5 36 C 19.5 34.5 17.5 31 18 26.5 C 22 28 24 31.5 23.5 36 Z" />
    <path d="M24.5 36 C 28.5 34.5 30.5 31 30 26.5 C 26 28 24 31.5 24.5 36 Z" />
  </>
);

const PATHS: Record<BreadIconName, React.ReactNode> = {
  // Espiga con tachadura diagonal — sin gluten (mismo idioma que "no-sugar").
  "gluten-free": (
    <>
      {Wheat}
      <path d="M11 12 L 37 38" strokeWidth={1.8} />
    </>
  ),
  // Brote de dos hojas — ingredientes naturales.
  natural: (
    <>
      <path d="M24 42 L 24 20" />
      <path d="M24 26 C 18 26 13.5 22 13 15.5 C 19.5 16 24 20 24 26 Z" />
      <path d="M24 22 C 30 22 34.5 18 35 11.5 C 28.5 12 24 16 24 22 Z" />
      <path d="M19 42 L 29 42" strokeWidth={1.4} />
    </>
  ),
  // Rodillo de amasar — oficio artesanal (hechos con amor).
  artisan: (
    <>
      <path d="M15 18 L 33 18 A 6 6 0 0 1 33 30 L 15 30 A 6 6 0 0 1 15 18 Z" />
      <path d="M6 24 L 15 24" />
      <path d="M33 24 L 42 24" />
      <path d="M6 21 L 6 27" strokeWidth={1.4} />
      <path d="M42 21 L 42 27" strokeWidth={1.4} />
    </>
  ),
  // Hogaza con corte superior — sabor que nutre.
  flavor: (
    <>
      <path d="M8 34 C 8 22 15 16 24 16 C 33 16 40 22 40 34 C 40 35 39 36 38 36 L 10 36 C 9 36 8 35 8 34 Z" />
      <path d="M17 23 C 19 26 21 26 23 23" strokeWidth={1.3} />
      <path d="M25 25 C 27 28 29 28 31 25" strokeWidth={1.3} />
    </>
  ),
  // Pan de semillas — cúpula con granos sembrados.
  seeds: (
    <>
      <path d="M9 32 C 9 22 16 17 24 17 C 32 17 39 22 39 32 Z" />
      <path d="M8 32 L 40 32" />
      <circle cx="18" cy="26" r="1.1" strokeWidth={1.3} />
      <circle cx="24" cy="23" r="1.1" strokeWidth={1.3} />
      <circle cx="30" cy="26" r="1.1" strokeWidth={1.3} />
      <circle cx="21" cy="29" r="1.1" strokeWidth={1.3} />
      <circle cx="27" cy="29" r="1.1" strokeWidth={1.3} />
    </>
  ),
  // Hogaza redonda con corte en cruz — pan rústico.
  rustic: (
    <>
      <circle cx="24" cy="26" r="14" />
      <path d="M18 20 L 30 32" strokeWidth={1.4} />
      <path d="M30 20 L 18 32" strokeWidth={1.4} />
    </>
  ),
  // Espiga de trigo — pan multigrano.
  multigrain: Wheat,
  // Pan de molde — hogaza rectangular de corona, rebanadas insinuadas.
  "pan-loaf": (
    <>
      <path d="M12 34 L 12 26 C 12 20 18 17 24 17 C 30 17 36 20 36 26 L 36 34" />
      <path d="M9 34 L 39 34" />
      <path d="M20 20 L 20 34" strokeWidth={1.2} />
      <path d="M28 19 L 28 34" strokeWidth={1.2} />
    </>
  ),
};

export function BreadIcon({
  name,
  className,
}: {
  name: BreadIconName;
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
