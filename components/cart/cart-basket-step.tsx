import type { RefObject } from "react";
import { subtotal } from "@/lib/checkout";
import { formatPrice } from "@/lib/site";
import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Paso 1 — Canasta: la lista editable (+/−, quitar) ocupa todo el alto
 * disponible. Sin entrega ni pago acá — eso vive en el Paso 2. El subtotal no
 * muestra el "*" de precio pendiente: esa leyenda vive en el Paso 2, junto al
 * mensaje que la explica.
 */
export function CartBasketStep({
  onContinue,
  continueButtonRef,
}: {
  onContinue: () => void;
  continueButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const { items, count, clear } = useCart();

  return (
    <>
      <ul className="flex-1 overflow-y-auto px-6 py-5">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </ul>

      <footer className="shrink-0 border-t border-ink/10 bg-cream px-6 pb-6 pt-5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50">
            Subtotal
          </span>
          <span className="text-xl font-semibold tabular-nums text-forest-deep">
            {formatPrice(subtotal(items))}
          </span>
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50">
            {count} {count === 1 ? "unidad" : "unidades"}
          </span>
          <button
            type="button"
            onClick={clear}
            className="text-xs font-medium text-ink/45 underline decoration-1 underline-offset-4 transition-colors hover:text-jamaica focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Vaciar pedido
          </button>
        </div>

        <button
          type="button"
          ref={continueButtonRef}
          onClick={onContinue}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Continuar
        </button>
      </footer>
    </>
  );
}
