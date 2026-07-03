import type { Category, Product } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card/product-card";
import { Reveal } from "@/components/ui/reveal";

/**
 * Grilla de catálogo con carril deslizable en mobile: reusa la misma card, pero
 * en pantallas chicas presenta los productos como un carril con scroll-snap
 * nativo (cada card engancha al deslizar y la siguiente asoma en el borde —
 * única señal de "hay más", sin flechas ni dots). En sm+ vuelve a la grilla
 * estándar (2 → 4). Se usa donde el stack vertical mobile se hace largo.
 */
export function ProductCarousel({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  return (
    <div className="mt-14 first:mt-0">
      {/* Encabezado de categoría (idéntico a la grilla genérica). */}
      <div className="mb-6 max-w-2xl">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-2xl text-forest">{category.name}</h3>
          {category.size && (
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/50">
              {category.size}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">
          {category.blurb}
        </p>
        {category.care && (
          <p className="mt-1 text-xs text-ink/45">{category.care}</p>
        )}
      </div>

      <Reveal>
        {/*
          Mobile: carril flex con snap, a sangre (-mx-8/px-8) para deslizar de
          borde a borde manteniendo el inset de la sección al enganchar.
          sm+: grilla estándar auto-rows-fr 2 → 4, sin overflow ni snap.
        */}
        <div className="-mx-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-2 scroll-px-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:auto-rows-fr sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0 basis-[86%] snap-start sm:basis-auto"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
