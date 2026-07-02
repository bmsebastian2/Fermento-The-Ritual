import type { CategoryId } from "@/lib/data/products";
import { getCategory, productsByCategory } from "@/lib/data/products";
import { ProductCard } from "@/components/product-card/product-card";
import { FeaturedProduct } from "@/components/product-card/featured-product";
import { Reveal } from "@/components/ui/reveal";

/** Bloque de una categoría: encabezado + grilla de sus productos. */
export function ProductGrid({ categoryId }: { categoryId: CategoryId }) {
  const category = getCategory(categoryId);
  const items = productsByCategory(categoryId);
  if (!category || items.length === 0) return null;

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
        /* Grilla 4 → 2 → 1 */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
