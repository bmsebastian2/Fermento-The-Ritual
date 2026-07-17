"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { checkout } from "@/lib/checkout";
import { deliveryMethods } from "@/lib/site";
import { StampLabel } from "@/components/ui/stamp-label";
import { WhatsAppIcon } from "@/components/ui/icons";
import { CartItem } from "@/components/cart/cart-item";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Panel lateral del pedido.
 *
 * Usa el mismo `<dialog>` nativo que el detalle de producto: foco atrapado,
 * `aria-modal` y devolución de foco los aporta el elemento, no código nuestro.
 * Acá solo agregamos la animación de entrada/salida, el cierre por backdrop y
 * el scroll lock. El fade del fondo lo hereda de la regla `dialog::backdrop`
 * de globals.css, atada a `[data-visible="true"]`.
 *
 * El drawer no conoce WhatsApp: delega en `checkout.submit()`.
 */

/** Duración de la animación; debe coincidir con la clase de transición. */
const EXIT_MS = 300;

export function CartDrawer() {
  const { items, count, delivery, setDelivery, isOpen, closeCart, clear } =
    useCart();
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    }
  }, [isOpen]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const finish = () => {
      dialog?.close();
      document.body.style.overflow = "";
      closeCart();
    };
    setVisible(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) finish();
    else window.setTimeout(finish, EXIT_MS);
  }, [closeCart]);

  return (
    <dialog
      ref={dialogRef}
      data-visible={visible}
      aria-labelledby="cart-drawer-title"
      onCancel={(e) => {
        // Esc: cancelamos el cierre nativo instantáneo para animar la salida.
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className={`fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-[min(27rem,100vw)] max-w-none bg-cream p-0 text-ink shadow-2xl backdrop:bg-transparent transition-transform duration-300 ease-out ${
        visible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <header className="shrink-0 border-b border-ink/10 px-6 pb-5 pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <StampLabel align="left">Fermento · The Ritual</StampLabel>
              <h2
                id="cart-drawer-title"
                className="mt-3 font-display text-3xl leading-tight text-forest-deep"
              >
                Tu pedido
              </h2>
            </div>

            <button
              type="button"
              onClick={close}
              autoFocus
              aria-label="Cerrar pedido"
              className="-mr-1 flex h-9 w-9 shrink-0 items-center justify-center text-ink/60 transition-colors hover:bg-forest/[0.06] hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Ítems ──────────────────────────────────────────────────── */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span
              aria-hidden="true"
              className="h-3 w-3 rotate-45 bg-forest/25"
            />
            <p className="font-display text-2xl leading-tight text-forest-deep">
              Todavía no agregaste nada
            </p>
            <p className="max-w-[22rem] text-sm leading-relaxed text-ink/60">
              Sumá lo que quieras probar desde el catálogo. Cuando termines, te
              cotizamos el pedido por WhatsApp.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 text-sm font-semibold text-forest underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Ver el catálogo
            </button>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-6 py-5">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </ul>
        )}

        {/* ── Pie: unidades + envío ──────────────────────────────────── */}
        {items.length > 0 && (
          <footer className="shrink-0 border-t border-ink/10 bg-cream px-6 pb-6 pt-5">
            <div className="flex items-baseline justify-between gap-3">
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

            {/* ── Modo de entrega ────────────────────────────────────────
                Radio group nativo: navegable con flechas y anunciado como
                grupo por el lector de pantalla sin JS de accesibilidad propio.
                Las opciones salen de `deliveryMethods` (lib/site.ts). */}
            <fieldset className="mt-4">
              <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50">
                ¿Cómo querés recibirlo?
              </legend>
              <div className="mt-2.5 flex flex-col gap-2">
                {deliveryMethods.map((method) => {
                  const selected = delivery === method.id;
                  return (
                    <label
                      key={method.id}
                      className={`flex cursor-pointer items-center gap-3 border px-3.5 py-2.5 transition-colors ${
                        selected
                          ? "border-forest bg-forest/[0.05]"
                          : "border-ink/15 hover:border-forest/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery-method"
                        value={method.id}
                        checked={selected}
                        onChange={() => setDelivery(method.id)}
                        className="h-4 w-4 shrink-0 accent-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                      />
                      <span className="flex min-w-0 flex-col">
                        <span className="text-sm font-medium leading-tight text-forest-deep">
                          {method.label}
                        </span>
                        {method.note && (
                          <span className="mt-0.5 text-xs text-ink/50">
                            {method.note}
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <p className="mt-3 text-xs leading-relaxed text-ink/55">
              Te confirmamos precio y disponibilidad por WhatsApp al recibir el
              pedido.
            </p>

            {/* Mismo lenguaje que ButtonLink (variant primary), como <button>:
                el envío es una acción, no una navegación a una URL fija.
                Bloqueado hasta elegir modo de entrega — el texto de abajo
                explica por qué, no queda un botón muerto sin feedback. */}
            <button
              type="button"
              onClick={() => delivery && checkout.submit(items, delivery)}
              disabled={!delivery}
              aria-describedby={!delivery ? "delivery-hint" : undefined}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:pointer-events-none disabled:bg-forest/40 disabled:shadow-none"
            >
              {checkout.id === "whatsapp" && <WhatsAppIcon className="h-4 w-4" />}
              {checkout.ctaLabel}
            </button>

            {!delivery && (
              <p
                id="delivery-hint"
                className="mt-2 text-center text-xs text-ink/55"
              >
                Elegí cómo querés recibir el pedido para continuar.
              </p>
            )}
          </footer>
        )}
      </div>
    </dialog>
  );
}
