import Image from "next/image";
import { ProductCallouts, type Callout } from "@/components/hero/product-callouts";
import { accentVar } from "@/lib/site";

/**
 * Familia de botellas del hero: Kombucha Jamaica al frente (protagonista +
 * LCP), Kéfir Plain y Agua de Coco a los costados (núcleo, todas las
 * pantallas), Kombucha Café y Kéfir Frutos Rojos asomando atrás (solo lg+,
 * evita saturar mobile). Ninguna foto de origen es un cutout con alpha real
 * (bg blanco plano o, en el caso de la lata, una foto ambientada con props) —
 * `mask-image` radial disuelve ese fondo hacia transparente y `drop-shadow`
 * agrega la sombra de contacto siguiendo esa silueta ya recortada.
 */

type ClusterBottle = {
  id: string;
  src: string;
  maskPreset: "glass" | "can";
  accent: string;
  /** % de alto del contenedor. Ya incluye la proporción real estimada del
   *  envase (kombucha=1 · kéfir≈0.80 · coco≈0.62) y, en las de atrás, un
   *  factor extra de profundidad compositiva. */
  height: number;
  left: number; // % desde la izquierda del contenedor
  rotate: number; // deg
  z: number;
  layer: "core" | "extra";
  priority?: boolean;
};

// Los dos números de tamaño son RADIOS (mitad del ancho/alto cubierto), no
// diámetros — con radios ~60/92% el óvalo caía fuera de la caja y no se veía
// ningún desvanecido (todo quedaba opaco = "tarjeta blanca" con esquinas
// duras). Recalculado para que el desvanecido ocurra dentro de la imagen.
// Dimensiones reales de origen — distintas entre botella de vidrio (kombucha
// y kéfir, mismo crop) y la lata de coco. Pasarle a next/image el tamaño
// equivocado la deforma y desalinea la máscara calculada contra el aspecto
// real.
const SOURCE_SIZE: Record<ClusterBottle["maskPreset"], { width: number; height: number }> = {
  glass: { width: 420, height: 940 },
  can: { width: 582, height: 838 },
};

const MASK: Record<ClusterBottle["maskPreset"], string> = {
  glass: "radial-gradient(46% 48% at 50% 49%, black 62%, transparent 100%)",
  // La lata toca CASI al ras los cocos de utilería a los costados (no hay
  // margen real entre envase y prop en la foto original) — radio ajustado
  // al borde real de la lata + transición angosta (75%→95%) para que el
  // fundido corte ahí mismo y no deje traslucir los cocos.
  can: "radial-gradient(24% 45% at 48% 51%, black 75%, transparent 95%)",
};

const BOTTLES: ClusterBottle[] = [
  {
    id: "kombucha-cafe",
    src: "/products/kombucha-cafe.webp",
    maskPreset: "glass",
    accent: accentVar("cafe"),
    height: 51,
    left: 4,
    rotate: -14,
    z: 10,
    layer: "extra",
  },
  {
    id: "kefir-frutos-rojos",
    src: "/products/kefir-frutos-rojos.webp",
    maskPreset: "glass",
    accent: accentVar("berry"),
    height: 40,
    left: 95,
    rotate: 13,
    z: 10,
    layer: "extra",
  },
  {
    id: "kefir-plain",
    src: "/products/kefir-plain.webp",
    maskPreset: "glass",
    accent: accentVar("kefir"),
    height: 74,
    left: 23,
    rotate: -7,
    z: 20,
    layer: "core",
  },
  {
    id: "agua-de-coco",
    src: "/products/agua-de-coco.webp",
    maskPreset: "can",
    accent: accentVar("coco"),
    height: 57,
    left: 77,
    rotate: 6,
    z: 20,
    layer: "core",
  },
  {
    id: "kombucha-jamaica",
    src: "/products/kombucha-jamaica.webp",
    maskPreset: "glass",
    accent: accentVar("jamaica"),
    height: 92,
    left: 50,
    rotate: -2,
    z: 30,
    layer: "core",
    priority: true,
  },
];

// Tips más cortos que en el diseño original: ahí la lata ocupaba casi todo
// el ancho del hero; acá es una de cinco botellas en un cluster angosto, y
// con x:12/88 las etiquetas quedaban tapadas por la botella vecina (Kombucha
// Jamaica, al frente, con más z-index).
const COCO_CALLOUTS: Callout[] = [
  { label: "100% Natural", anchor: { x: 35, y: 33 }, tip: { x: 58, y: 3 }, side: "right" },
  { label: "Orgánica", anchor: { x: 37, y: 63 }, tip: { x: 24, y: 76 }, side: "left" },
  { label: "Sin aditivos", anchor: { x: 65, y: 40 }, tip: { x: 76, y: 20 }, side: "right" },
  { label: "Sin azúcar añadida", anchor: { x: 63, y: 66 }, tip: { x: 76, y: 76 }, side: "right" },
];

function BottleImage({ bottle }: { bottle: ClusterBottle }) {
  const { width, height } = SOURCE_SIZE[bottle.maskPreset];
  return (
    <Image
      src={bottle.src}
      alt=""
      width={width}
      height={height}
      priority={bottle.priority}
      sizes="(min-width: 1024px) 220px, (min-width: 640px) 180px, 140px"
      className="h-full w-auto max-w-none object-contain"
      style={{
        maskImage: MASK[bottle.maskPreset],
        WebkitMaskImage: MASK[bottle.maskPreset],
        filter:
          "drop-shadow(10px 18px 22px color-mix(in srgb, var(--color-forest-deep) 38%, transparent))",
      }}
    />
  );
}

export function BottleCluster() {
  return (
    <div
      role="img"
      aria-label="Variedad de botellas Fermento y The Ritual: kombucha, kéfir y agua de coco"
      className="relative mx-auto aspect-[6/5] w-full max-w-md lg:max-w-xl"
    >
      {BOTTLES.map((bottle) => {
        // `flex` (no h-full) es lo que le da altura definida a la cadena de
        // envoltorios: un item de flex estirado SÍ cuenta como alto definido
        // para que el `height:100%` de BottleImage resuelva bien (un bloque
        // auto-height normal no lo haría). Leader lines de la lata solo desde
        // lg: con 5 botellas no hay aire en mobile/tablet sin verse apretadas.
        const wrapperClassName = [
          "absolute bottom-0 items-stretch",
          bottle.layer === "extra" ? "hidden lg:flex" : "flex",
          bottle.id === "agua-de-coco" ? "max-lg:pointer-events-none" : "",
        ]
          .filter(Boolean)
          .join(" ");
        const wrapperStyle = {
          height: `${bottle.height}%`,
          left: `${bottle.left}%`,
          transform: `translateX(-50%) rotate(${bottle.rotate}deg)`,
          zIndex: bottle.z,
        };

        if (bottle.id === "agua-de-coco") {
          return (
            <div key={bottle.id} className={wrapperClassName} style={wrapperStyle}>
              <ProductCallouts
                accent={bottle.accent}
                toggleLabel="Mostrar las propiedades del Agua de Coco"
                callouts={COCO_CALLOUTS}
              >
                <BottleImage bottle={bottle} />
              </ProductCallouts>
            </div>
          );
        }

        return (
          <div key={bottle.id} className={wrapperClassName} style={wrapperStyle}>
            <BottleImage bottle={bottle} />
          </div>
        );
      })}

      {/* Sombra de contacto compartida: apoya todo el grupo sobre una
          superficie y elimina la sensación de flotar contra la crema. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-2 -bottom-1 -z-10 h-7 rounded-[100%] blur-xl"
        style={{
          background:
            "color-mix(in srgb, var(--color-forest-deep) 45%, transparent)",
        }}
      />
    </div>
  );
}
