/**
 * Campo de burbujas de fermentación — el elemento distintivo de la página.
 * CSS puro (sin canvas), sutil y performante. Se congela con reduced-motion
 * vía la regla global de globals.css. Decorativo: aria-hidden.
 *
 * Conjunto fijo (no aleatorio) para evitar mismatch de hidratación.
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
const JENGIBRE = "var(--color-jengibre)";
const COCO = "var(--color-coco)";

const bubbles: Bubble[] = [
  { x: 6, size: 10, duration: 13, delay: 0, drift: 18, opacity: 0.28, tint: FOREST },
  { x: 14, size: 6, duration: 16, delay: 3, drift: -14, opacity: 0.22, tint: COCO },
  { x: 22, size: 14, duration: 11, delay: 6, drift: 22, opacity: 0.32, tint: FOREST },
  { x: 31, size: 8, duration: 18, delay: 1.5, drift: -10, opacity: 0.24, tint: JENGIBRE },
  { x: 39, size: 5, duration: 15, delay: 8, drift: 12, opacity: 0.2, tint: FOREST },
  { x: 47, size: 12, duration: 12, delay: 4, drift: -20, opacity: 0.3, tint: COCO },
  { x: 55, size: 7, duration: 17, delay: 10, drift: 16, opacity: 0.24, tint: FOREST },
  { x: 63, size: 16, duration: 10, delay: 2, drift: -24, opacity: 0.34, tint: FOREST },
  { x: 70, size: 6, duration: 19, delay: 7, drift: 14, opacity: 0.22, tint: JENGIBRE },
  { x: 78, size: 11, duration: 13, delay: 5, drift: -16, opacity: 0.3, tint: COCO },
  { x: 85, size: 8, duration: 16, delay: 9, drift: 20, opacity: 0.24, tint: FOREST },
  { x: 92, size: 13, duration: 12, delay: 3.5, drift: -12, opacity: 0.32, tint: FOREST },
  { x: 97, size: 6, duration: 20, delay: 11, drift: 10, opacity: 0.2, tint: COCO },
  { x: 43, size: 9, duration: 14, delay: 13, drift: 18, opacity: 0.26, tint: FOREST },
];

export function Bubbles() {
  return (
    <div
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
          }}
        />
      ))}
    </div>
  );
}
