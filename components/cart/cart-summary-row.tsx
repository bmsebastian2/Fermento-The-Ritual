import type { CheckoutItem } from "@/lib/checkout";
import { lineTotal, productLabel } from "@/lib/checkout";
import { accentVar, formatPrice } from "@/lib/site";
import { ProductMedia } from "@/components/product-card/product-media";

/**
 * Fila de solo lectura para el resumen del Paso 2 — a propósito no es una
 * variante de CartItem: sin stepper, sin "Quitar", condensada. Reusa los
 * mismos helpers de precio/nombre que CartItem para no divergir del total
 * real de la canasta.
 */
export function CartSummaryRow({ item }: { item: CheckoutItem }) {
  const { product, qty } = item;
  const accent = accentVar(product.accent);

  return (
    <li className="flex items-center gap-3 border-b border-ink/10 py-2.5 first:pt-0">
      <div
        className="relative h-9 w-9 shrink-0 overflow-hidden bg-cream"
        style={{ ["--accent" as string]: accent }}
      >
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 z-10 h-full w-[3px]"
          style={{ backgroundColor: accent }}
        />
        <ProductMedia product={product} sizes="36px" />
      </div>

      <span className="min-w-0 flex-1 truncate text-sm font-medium text-forest-deep">
        <span className="tabular-nums text-ink/60">{qty}×</span>{" "}
        {productLabel(product)}
      </span>

      <span className="shrink-0 text-right text-sm font-semibold tabular-nums text-forest-deep">
        {product.price == null ? (
          <span className="text-xs font-normal italic text-ink/45">
            A confirmar
          </span>
        ) : (
          <>
            {formatPrice(lineTotal(item))}
            {qty > 1 && (
              <span className="ml-1 block text-right text-[0.6875rem] font-normal text-ink/45">
                ({formatPrice(product.price)} c/u)
              </span>
            )}
          </>
        )}
      </span>
    </li>
  );
}
