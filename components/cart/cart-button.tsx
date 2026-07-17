"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Botón del pedido en el nav, con contador.
 *
 * HIDRATACIÓN: el número solo se pinta con `hydrated` en true. El server no
 * conoce el pedido (vive en localStorage), así que pintarlo antes desincroniza
 * el HTML del server con el del cliente. Mientras tanto el botón existe igual:
 * no se mueve nada de lugar al aparecer el contador.
 */

/**
 * Canasta de mercado — monolínea, mismo trazo que el resto del set.
 * Deliberadamente no es un carrito de supermercado: acá se arma un pedido
 * artesanal, no se empuja un changuito por una góndola.
 */
function BasketIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Asa */}
      <path d="M8.5 8.5c0-3 1.6-5 3.5-5s3.5 2 3.5 5" />
      {/* Borde */}
      <path d="M3.5 8.5h17" />
      {/* Cuerpo */}
      <path d="M5.2 8.5l1.5 10.1c.15 1 1 1.7 2 1.7h6.6c1 0 1.85-.7 2-1.7l1.5-10.1" />
      {/* Listones */}
      <path d="M10 12.2v4.6M14 12.2v4.6" />
    </svg>
  );
}

export function CartButton({ className = "" }: { className?: string }) {
  const { count, hydrated, openCart } = useCart();
  const [bump, setBump] = useState(false);
  const previous = useRef<number | null>(null);

  // Pulso al cambiar la cantidad — el único feedback cuando se agrega desde el
  // modal y el drawer no se abre. No debe dispararse al hidratar: recuperar un
  // pedido guardado no es "algo acaba de pasar".
  useEffect(() => {
    if (!hydrated) return;
    if (previous.current === null) {
      previous.current = count;
      return;
    }
    if (previous.current === count) return;
    previous.current = count;
    setBump(true);
    const t = window.setTimeout(() => setBump(false), 260);
    return () => window.clearTimeout(t);
  }, [count, hydrated]);

  const showCount = hydrated && count > 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        showCount
          ? `Ver mi pedido — ${count} ${count === 1 ? "unidad" : "unidades"}`
          : "Ver mi pedido"
      }
      className={`relative flex h-10 w-10 items-center justify-center text-forest transition-colors hover:text-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${className}`}
    >
      <BasketIcon className="h-6 w-6" />

      {/* Contador — cuadrado, no píldora: el idioma de la marca es de esquina
          recta (design-system §4). tabular-nums evita que salte al pasar a 2 dígitos. */}
      {showCount && (
        <span
          aria-hidden="true"
          className={`absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center bg-forest px-1 text-[0.625rem] font-semibold leading-none tabular-nums text-cream transition-transform duration-200 ease-out ${
            bump ? "scale-125" : "scale-100"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
