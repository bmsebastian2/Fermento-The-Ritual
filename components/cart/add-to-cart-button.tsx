"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/data/products";
import { productLabel } from "@/lib/checkout";
import { accentVar } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";

/**
 * CTA de "Agregar" — única forma de sumar un producto al pedido.
 *
 * Dos variantes, ambas derivadas del sistema:
 * - `compact`: pie de card, en la tinta del acento del sabor (reemplaza al
 *   viejo link "Pedir"). Va en z-20 para quedar por encima del overlay que
 *   abre el detalle.
 * - `primary`: verde de marca, para los spreads editoriales y el modal.
 *
 * `openOnAdd` decide el feedback: desde el catálogo abre el drawer (enseña que
 * el pedido existe); desde el modal NO, para no apilar dos <dialog> — ahí el
 * botón confirma en el lugar y el contador del nav sube.
 */

const MS_CONFIRM = 2000;

function PlusIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function AddToCartButton({
  product,
  qty = 1,
  variant = "compact",
  openOnAdd = true,
  className = "",
}: {
  product: Product;
  /** Unidades a sumar (el modal manda su stepper). */
  qty?: number;
  variant?: "compact" | "primary";
  /** Abrir el drawer al agregar. False → confirma en el botón. */
  openOnAdd?: boolean;
  className?: string;
}) {
  const { add, openCart } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number | null>(null);
  const accent = accentVar(product.accent);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const onClick = () => {
    add(product, qty);
    if (openOnAdd) {
      openCart();
      return;
    }
    setAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), MS_CONFIRM);
  };

  const label = added ? "Agregado" : "Agregar";

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Agregar ${productLabel(product)} al pedido`}
        className={`relative z-20 inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
        style={{ color: accent, outlineColor: accent }}
      >
        {added ? (
          <CheckIcon className="h-3.5 w-3.5" />
        ) : (
          <PlusIcon className="h-3.5 w-3.5" />
        )}
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Agregar ${productLabel(product)} al pedido`}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${className}`}
    >
      {added ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
      {label}
    </button>
  );
}
