"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Campo de burbujas de fermentación — el elemento distintivo de la página.
 * CSS puro (sin canvas), sutil y performante. Se congela con reduced-motion
 * vía la regla global de globals.css. Decorativo: aria-hidden.
 *
 * Conjunto fijo (no aleatorio) para evitar mismatch de hidratación.
 * La animación se pausa cuando el hero sale del viewport (IntersectionObserver).
 */

type Bubble = {
  x: number; // % desde la izquierda
  size: number; // px
  duration: number; // s
  delay: number; // s
  drift: number; // px de deriva lateral
  opacity: number;
  tint: string; // valor CSS
};

const FOREST = "var(--color-forest)";
const COCO = "var(--color-coco)";

// La corriente vive en las zonas VISIBLES sobre la crema: el gutter entre el
// titular y la lata (x 38–54) y el margen derecho (x 90–98) — lee como
// fermentación subiendo AL LADO de la bebida. Detrás de la foto opaca (x 56–86)
// solo unas pocas y chicas, que asoman por los bordes. A la izquierda, ambiente
// tenue para no pisar la legibilidad del titular. Solo forest + coco (un acento
// por sección — design-system). Delays escalonados: el gutter siempre tiene
// burbujas en tránsito, así lee como corriente y no como puntos sueltos.
const bubbles: Bubble[] = [
  // Ambiente izquierdo — detrás del texto, discreto.
  { x: 8, size: 6, duration: 17, delay: 2, drift: 12, opacity: 0.2, tint: FOREST },
  { x: 16, size: 8, duration: 14, delay: 7, drift: -10, opacity: 0.22, tint: FOREST },
  { x: 27, size: 5, duration: 19, delay: 11, drift: 14, opacity: 0.18, tint: COCO },
  { x: 34, size: 7, duration: 15, delay: 4.5, drift: -12, opacity: 0.22, tint: FOREST },
  // Corriente del gutter — presente, escalonada.
  { x: 39, size: 14, duration: 12, delay: 0, drift: 16, opacity: 0.46, tint: FOREST },
  { x: 41, size: 8, duration: 14, delay: 10.5, drift: -10, opacity: 0.32, tint: COCO },
  { x: 43, size: 9, duration: 16, delay: 6, drift: -12, opacity: 0.36, tint: COCO },
  { x: 46, size: 20, duration: 11, delay: 3, drift: 18, opacity: 0.5, tint: FOREST },
  { x: 47, size: 6, duration: 19, delay: 13.5, drift: 12, opacity: 0.26, tint: COCO },
  { x: 49, size: 7, duration: 18, delay: 9, drift: 10, opacity: 0.3, tint: COCO },
  { x: 51, size: 10, duration: 15, delay: 7.5, drift: 14, opacity: 0.38, tint: FOREST },
  { x: 52, size: 12, duration: 13, delay: 1.5, drift: -16, opacity: 0.44, tint: FOREST },
  { x: 54, size: 6, duration: 20, delay: 12, drift: 8, opacity: 0.28, tint: COCO },
  // Detrás de la foto — pocas y chicas, asoman por los bordes.
  { x: 60, size: 8, duration: 15, delay: 7, drift: -10, opacity: 0.3, tint: COCO },
  { x: 72, size: 10, duration: 13, delay: 4, drift: 14, opacity: 0.34, tint: FOREST },
  { x: 84, size: 7, duration: 17, delay: 10, drift: -8, opacity: 0.28, tint: COCO },
  // Margen derecho — visible al costado de la lata.
  { x: 91, size: 16, duration: 12, delay: 2.5, drift: -14, opacity: 0.46, tint: FOREST },
  { x: 95, size: 10, duration: 15, delay: 6.5, drift: 12, opacity: 0.38, tint: COCO },
  { x: 98, size: 12, duration: 13, delay: 8.5, drift: -10, opacity: 0.42, tint: FOREST },
];

export function Bubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-[-5%] rounded-full"
          style={{
            left: `${b.x}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 32% 30%, color-mix(in srgb, ${b.tint} 55%, transparent), color-mix(in srgb, ${b.tint} 12%, transparent))`,
            boxShadow: `0 0 6px color-mix(in srgb, ${b.tint} 30%, transparent)`,
            // Variables consumidas por el keyframe bubble-rise.
            ["--bubble-opacity" as string]: String(b.opacity),
            ["--bubble-drift" as string]: `${b.drift}px`,
            animation: `bubble-rise ${b.duration}s linear ${b.delay}s infinite`,
            animationPlayState: visible ? "running" : "paused",
          }}
        />
      ))}
    </div>
  );
}
