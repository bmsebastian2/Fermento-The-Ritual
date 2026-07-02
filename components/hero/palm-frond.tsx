/**
 * Fronda de palma — capa de profundidad botánica detrás del producto.
 *
 * Línea orgánica generada paramétricamente (raquis curvo + foliolos que abren
 * hacia la punta), no un ícono flat genérico: replica el lenguaje de marca de
 * agua botánico que ya usa la marca en sus láminas. Color vía `currentColor`
 * (se tinta con tokens desde el contenedor). Decorativa: aria-hidden.
 */

type Pt = { x: number; y: number };

// Raquis como curva cuadrática (base → punta).
const P0: Pt = { x: 28, y: 312 };
const P1: Pt = { x: 58, y: 150 };
const P2: Pt = { x: 172, y: 14 };

const bezier = (t: number): Pt => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
});

const tangent = (t: number): Pt => ({
  x: 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x),
  y: 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y),
});

const LEAFLETS = 15;
const SPREAD = 0.74; // radianes de apertura respecto del raquis

const leafletPaths: string[] = [];
for (let i = 1; i <= LEAFLETS; i++) {
  const t = i / (LEAFLETS + 1);
  const base = bezier(t);
  const d = tangent(t);
  const ang = Math.atan2(d.y, d.x); // dirección hacia la punta
  // Foliolos más largos al centro de la fronda, cortos en base y punta.
  const len = 74 * Math.sin(Math.PI * t) ** 0.7 + 10;
  for (const side of [-1, 1] as const) {
    const a = ang + side * SPREAD;
    const ex = base.x + Math.cos(a) * len;
    const ey = base.y + Math.sin(a) * len;
    // Curvatura suave del foliolo (control hacia el raquis).
    const cx = base.x + Math.cos(a - side * 0.28) * len * 0.55;
    const cy = base.y + Math.sin(a - side * 0.28) * len * 0.55;
    leafletPaths.push(
      `M${base.x.toFixed(1)} ${base.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`
    );
  }
}

const RACHIS = `M${P0.x} ${P0.y} Q${P1.x} ${P1.y} ${P2.x} ${P2.y}`;

export function PalmFrond({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={RACHIS} strokeWidth="3" />
      {leafletPaths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
