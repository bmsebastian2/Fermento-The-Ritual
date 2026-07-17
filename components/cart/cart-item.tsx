"use client";

import type { CheckoutItem } from "@/lib/checkout";
import { productLabel } from "@/lib/checkout";
import { accentVar } from "@/lib/site";
import { ProductMedia } from "@/components/product-card/product-media";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Fila del pedido — el catálogo en miniatura, con el mismo idioma que la card:
 * barra de acento a la izquierda, sabor en display serif, tamaño en versalitas
 * de etiqueta. La media sale de ProductMedia, así los Shots (sin `image`) caen
 * solos al placeholder por acento en vez de mostrar un hueco.
 *
 * PRECIOS: la fila no muestra monto porque no hay ninguno confirmado. En su
 *          lugar declara "Precio a confirmar" — el total se cotiza por WhatsApp.
 */

/** Botón del stepper — cuadrado, idioma de etiqueta (sin radius). */
function StepButton({
  onClick,
  label,
  disabled = false,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center text-ink/70 transition-colors hover:bg-forest/[0.06] hover:text-forest disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest"
    >
      {children}
    </button>
  );
}

export function CartItem({ item }: { item: CheckoutItem }) {
  const { product, qty } = item;
  const { setQty, remove } = useCart();
  const accent = accentVar(product.accent);

  return (
    <li
      style={{ ["--accent" as string]: accent }}
      className="relative flex gap-4 border-b border-ink/10 py-4 first:pt-0"
    >
      {/* Media — foto o placeholder por acento, con la barra del sabor. */}
      <div className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden bg-cream">
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 z-10 h-full w-1"
          style={{ backgroundColor: accent }}
        />
        <ProductMedia
          product={product}
          sizes="72px"
          imageClassName="object-cover object-center"
        />
      </div>

      {/* Ficha */}
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="font-display text-lg leading-tight text-forest-deep">
          {productLabel(product)}
        </h3>

        <p className="mt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink/50">
          {product.size}
        </p>

        <p className="mt-1 text-xs italic text-ink/45">Precio a confirmar</p>

        {/* Cantidad + quitar */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div className="flex items-center border border-ink/15">
            <StepButton
              onClick={() => setQty(product.id, qty - 1)}
              label={`Quitar una unidad de ${productLabel(product)}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
              </svg>
            </StepButton>

            <span
              aria-live="polite"
              className="min-w-8 text-center text-sm font-semibold tabular-nums text-forest-deep"
            >
              {qty}
            </span>

            <StepButton
              onClick={() => setQty(product.id, qty + 1)}
              label={`Agregar una unidad de ${productLabel(product)}`}
              disabled={qty >= 99}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </StepButton>
          </div>

          <button
            type="button"
            onClick={() => remove(product.id)}
            className="text-xs font-medium text-ink/45 underline decoration-1 underline-offset-4 transition-colors hover:text-jamaica focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            aria-label={`Quitar ${productLabel(product)} del pedido`}
          >
            Quitar
          </button>
        </div>
      </div>
    </li>
  );
}
