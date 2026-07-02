import type { CSSProperties, ReactNode } from "react";

/**
 * Leader lines editoriales sobre una imagen de producto. Al hacer hover
 * (desktop) o tap (touch, vía checkbox-hack) se "dibujan" líneas finas desde
 * un punto del producto hasta una etiqueta corta con una virtud del producto.
 *
 * Solo CSS/SVG: el reveal en touch usa un <input type="checkbox"> oculto
 * (`.callout-toggle`), sin JS ni "use client". Animación y estilos viven en
 * app/globals.css. Respeta prefers-reduced-motion (regla global).
 */

export type Callout = {
  /** Copy corto de la etiqueta (respaldado por la lámina de producto). */
  label: string;
  /** Ancla sobre el producto, en % del contenedor de imagen (0–100). */
  anchor: { x: number; y: number };
  /** Fin de la línea y posición de la etiqueta, en % del contenedor (0–100). */
  tip: { x: number; y: number };
  /** Lado hacia el que crece el texto respecto al tip. */
  side: "left" | "right";
};

// El viewBox mantiene la relación de la imagen (582:838 ≈ 100:144) para que,
// con preserveAspectRatio="none", el escalado sea uniforme y no deforme trazos.
const VIEW_W = 100;
const VIEW_H = 144;

function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}

export function ProductCallouts({
  accent,
  toggleLabel,
  callouts,
  children,
}: {
  /** Color de acento del producto (var(--color-<accent>)). */
  accent: string;
  /** Texto accesible del control que revela las propiedades (touch/teclado). */
  toggleLabel: string;
  callouts: Callout[];
  children: ReactNode;
}) {
  return (
    <label
      className="callout-trigger"
      style={cssVars({ "--callout-accent": accent })}
    >
      <input type="checkbox" className="callout-toggle" aria-label={toggleLabel} />

      {children}

      <div className="callouts">
        <svg
          className="callout-lines"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {callouts.map((c, i) => {
            const ax = (c.anchor.x / 100) * VIEW_W;
            const ay = (c.anchor.y / 100) * VIEW_H;
            const ex = (c.tip.x / 100) * VIEW_W;
            const ey = (c.tip.y / 100) * VIEW_H;
            // Punto de control: leve arco hacia arriba → sensación hecha a mano.
            const cx = (ax + ex) / 2;
            const cy = (ay + ey) / 2 - 5;
            return (
              <g
                key={c.label}
                className="callout-line"
                style={cssVars({ "--i": i })}
              >
                <path
                  className="callout-path"
                  pathLength={1}
                  d={`M ${ax} ${ay} Q ${cx} ${cy} ${ex} ${ey}`}
                />
                <circle className="callout-dot" cx={ax} cy={ay} r={1.2} />
                <circle className="callout-tip" cx={ex} cy={ey} r={0.7} />
              </g>
            );
          })}
        </svg>

        {callouts.map((c, i) => (
          <span
            key={c.label}
            className="callout-label"
            data-side={c.side}
            style={cssVars({ left: `${c.tip.x}%`, top: `${c.tip.y}%`, "--i": i })}
          >
            {c.label}
          </span>
        ))}
      </div>
    </label>
  );
}
