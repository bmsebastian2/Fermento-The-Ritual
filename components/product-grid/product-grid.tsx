import type { CategoryId } from "@/lib/data/products";
import { getCategory, productsByCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card/product-card";
import { FeaturedProduct } from "@/components/product-card/featured-product";
import { CocoFeature } from "@/components/product-card/coco-feature";
import { ShotsFeature } from "@/components/product-grid/shots-feature";
import { Reveal } from "@/components/ui/reveal";

/** Bloque de una categoría: encabezado + grilla de sus productos. */
export function ProductGrid({ categoryId }: { categoryId: CategoryId }) {
  const category = getCategory(categoryId);
  const items = productsByCategory(categoryId);
  if (!category || items.length === 0) return null;

  // Agua de Coco (producto estrella de The Ritual): spread editorial dedicado
  // que trae su propio encabezado a escala display; se salta la card genérica.
  if (categoryId === "agua-de-coco") {
    return (
      <div className="mt-14 first:mt-0">
        <Reveal>
          <CocoFeature category={category} product={items[0]} />
        </Reveal>
      </div>
    );
  }

  // Shots: spread editorial dedicado (imagen horizontal + beneficios), trae su
  // propio encabezado; se salta la grilla genérica de cards verticales.
  if (categoryId === "shots") {
    return <ShotsFeature category={category} products={items} />;
  }

  return (
    <div className="mt-14 first:mt-0">
      {/* Encabezado de categoría */}
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

      {/* Categoría de un solo producto → card destacada horizontal. */}
      {items.length === 1 ? (
        <Reveal>
          <FeaturedProduct product={items[0]} />
        </Reveal>
      ) : (
        /* Grilla 4 → 2 → 1. auto-rows-fr empareja la altura de todas las cards. */
        <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i, 5) * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
