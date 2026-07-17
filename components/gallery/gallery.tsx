import Image from "next/image";
import { StampLabel } from "@/components/ui/stamp-label";
import { Reveal } from "@/components/ui/reveal";

/**
 * Galería de producto entre catálogo y contacto. Cada foto es una "copia
 * impresa sobre la mesa": leve giro + sombra en capas (idioma `gallery-print`,
 * hermano del `coco-media` del hero); se endereza y levanta al tocarla.
 * Composición de collage con TAMAÑOS distintos sobre una grilla de 12 (desktop)
 * / 2 (mobile); el aire entre copias es la mesa que asoma.
 *
 * Detalle del producto (`gallery-caption`): el nombre, la línea/tamaño y una
 * nota corta de ingredientes. En desktop aparece al hover/foco; en touch queda
 * fijo (ver globals.css). `alt` describe la foto para SR; el caption vive
 * siempre en el DOM, así la info nunca depende solo del hover.
 *
 * Datos tomados del catálogo (`lib/data/products.ts`): tamaños reales
 * (Kombucha 375 ml, Shots 75 ml, Dessert Jars 300 g) — no inventar.
 *
 * Server component: solo `Reveal` es client y llega como wrapper, así la home
 * sigue prerenderizándose estática.
 */

type Photo = {
  src: string;
  alt: string;
  /** Nombre en display serif. */
  name: string;
  /** Línea · categoría · tamaño (mayúsculas, tracking). */
  meta: string;
  /** Nota corta de ingredientes / carácter del producto. */
  desc: string;
  /** Ancho x alto intrínsecos para next/image (mantiene el aspecto real). */
  w: number;
  h: number;
  /** Giro propio de la copia. */
  rot: string;
  /** Clases de tamaño/posición en la grilla (2 cols mobile / 12 desktop). */
  cls: string;
  /** `sizes` de next/image según el ancho renderizado. */
  sizes: string;
};

const photos: Photo[] = [
  // Copia grande (apaisada): la gama completa de kombucha.
  {
    src: "/gallery/kombucha-lineup.webp",
    alt: "Cuatro botellas de Kombucha Fermento — Jengibre, Café, Piña y Jamaica — en fila sobre fondo claro",
    name: "Kombucha viva",
    meta: "Fermento · Sin pasteurizar · 375 ml",
    desc: "Bebida fermentada de cultivos naturales, 20 cal por porción",
    w: 1100,
    h: 825,
    rot: "-1.6deg",
    cls: "col-span-2 lg:col-span-8",
    sizes: "(min-width: 1024px) 760px, 100vw",
  },
  // Chica, ladeada fuerte a la izquierda.
  {
    src: "/gallery/postre-chocolate-fudge.webp",
    alt: "Dessert Jar de Chocolate Fudge de The Ritual sostenido entre hojas verdes",
    name: "Chocolate Fudge",
    meta: "The Ritual · Dessert Jar · 300 g",
    desc: "Ganache de chocolate nicaragüense y crema fudge artesanal",
    w: 825,
    h: 1100,
    rot: "-3.2deg",
    cls: "col-span-1 lg:col-span-4",
    sizes: "(min-width: 1024px) 370px, 50vw",
  },
  // Chica.
  {
    src: "/gallery/postre-tres-leches.webp",
    alt: "Dessert Jar de Tres Leches de The Ritual sostenido entre hojas verdes",
    name: "Tres Leches",
    meta: "The Ritual · Dessert Jar · 300 g",
    desc: "Leche evaporada, condensada y crema de leche",
    w: 825,
    h: 1100,
    rot: "2.6deg",
    cls: "col-span-1 lg:col-span-3",
    sizes: "(min-width: 1024px) 280px, 50vw",
  },
  // Grande (postre protagonista con capas), ancho completo en mobile.
  {
    src: "/gallery/postre-tres-leches-capas.webp",
    alt: "Dessert Jar de Tres Leches mostrando sus capas de bizcocho y crema",
    name: "Tres Leches",
    meta: "The Ritual · Dessert Jar · 300 g",
    desc: "Capas de bizcocho y crema — suave y tradicional",
    w: 825,
    h: 1100,
    rot: "-3deg",
    cls: "col-span-2 lg:col-span-5",
    sizes: "(min-width: 1024px) 470px, 100vw",
  },
  // Mediana.
  {
    src: "/gallery/shots-trio.webp",
    alt: "Tres wellness shots Fermento — Turmeric Defense, Green Detox y Ginger Boost — en la mano entre hojas",
    name: "Wellness Shots",
    meta: "The Ritual · 75 ml · 2 oz",
    desc: "Turmeric Defense · Green Detox · Ginger Boost",
    w: 825,
    h: 1100,
    rot: "3.4deg",
    cls: "col-span-1 lg:col-span-4",
    sizes: "(min-width: 1024px) 370px, 50vw",
  },
  // Mediana, centrada para cerrar la escena.
  {
    src: "/gallery/postre-tiramisu.webp",
    alt: "Dessert Jar de Tiramisú de The Ritual sostenido entre hojas verdes",
    name: "Tiramisú",
    meta: "The Ritual · Dessert Jar · 300 g",
    desc: "Café de Dipilto, cacao natural y mascarpone premium",
    w: 825,
    h: 1100,
    rot: "-2.2deg",
    cls: "col-span-1 lg:col-span-5 lg:col-start-4",
    sizes: "(min-width: 1024px) 470px, 50vw",
  },
];

export function Gallery() {
  return (
    <section
      id="galeria"
      className="scroll-mt-24 overflow-x-clip px-6 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="max-w-2xl">
            <StampLabel align="left">Galería</StampLabel>
            <h2 className="mt-5 font-display text-5xl text-forest lg:text-6xl">
              Frescura que se <span className="italic">ve</span>
            </h2>
            <p className="mt-4 text-lg text-ink/75">
              Fotos reales de nuestros lotes, hechos a mano en Managua.
            </p>
          </header>
        </Reveal>

        {/* Collage de copias: tamaños distintos, giros propios, aire entre medio.
            El detalle del producto sube al hover (desktop) / fijo en touch. */}
        <div className="mt-14 grid grid-cols-2 items-start gap-y-10 gap-x-5 sm:gap-x-6 lg:mt-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-14">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={Math.min(i, 5) * 70}
              className={photo.cls}
            >
              <figure className="gallery-print-trigger group">
                <div
                  className="gallery-print relative overflow-hidden rounded-[4px]"
                  style={{ ["--rot" as string]: photo.rot }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    sizes={photo.sizes}
                    className="h-auto w-full object-cover"
                  />

                  <figcaption className="gallery-caption pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/92 via-forest-deep/50 to-transparent px-4 pb-4 pt-12 text-cream">
                    <p className="font-display text-base leading-tight lg:text-xl">
                      {photo.name}
                    </p>
                    <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cream/70">
                      {photo.meta}
                    </p>
                    <p className="mt-1.5 text-[0.72rem] leading-snug text-cream/85 lg:text-xs">
                      {photo.desc}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
