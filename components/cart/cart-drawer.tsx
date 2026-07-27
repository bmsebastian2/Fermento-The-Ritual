"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StampLabel } from "@/components/ui/stamp-label";
import { CartBasketStep } from "@/components/cart/cart-basket-step";
import { CartCheckoutStep } from "@/components/cart/cart-checkout-step";
import { useCart } from "@/components/cart/cart-provider";

/**
 * Panel lateral del pedido — shell del `<dialog>` nativo.
 *
 * Usa el mismo `<dialog>` que el detalle de producto: foco atrapado,
 * `aria-modal` y devolución de foco los aporta el elemento, no código nuestro.
 * Acá agregamos la animación de entrada/salida, el cierre por backdrop, el
 * scroll lock, y el manejo de foco *entre* los dos pasos (Canasta/Checkout) —
 * sin tocar el foco atrapado nativo, solo movemos dónde cae dentro de él.
 *
 * El shell no conoce ítems, entrega ni métodos de pago: eso vive en
 * `CartBasketStep` (Paso 1) y `CartCheckoutStep` (Paso 2), que reciben el
 * estado de checkout como props para sobrevivir el swap entre pasos.
 */

/** Duración de la animación; debe coincidir con la clase de transición. */
const EXIT_MS = 300;

export function CartDrawer() {
  const { items, isOpen, closeCart, clear } = useCart();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [providerId, setProviderId] = useState<string>();
  const [checkoutError, setCheckoutError] = useState<string>();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const checkoutHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    }
  }, [isOpen]);

  // Mueve el foco al pasar de paso, sin pelear con el foco atrapado nativo del
  // dialog (que ya está abierto en ambos casos). La guarda evita disparar en
  // el mount inicial y en el reset defensivo de `step` que ocurre al cerrar
  // (ese reset pasa con el dialog ya cerrado, no hay nada que enfocar).
  useEffect(() => {
    if (!dialogRef.current?.open) return;
    if (step === 2) checkoutHeadingRef.current?.focus();
    else continueButtonRef.current?.focus();
  }, [step]);

  // Si el carrito queda vacío estando en Checkout (ej. un pago de PayPal
  // exitoso ya vació el carrito vía handleCheckoutSuccess), no dejar un Paso 2
  // fantasma: cae a Canasta (el ternario de abajo igual prioriza la vista de
  // éxito o la vacía por sobre `step`, esto solo sanea el estado subyacente).
  useEffect(() => {
    if (items.length === 0 && step === 2) setStep(1);
  }, [items.length, step]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const finish = () => {
      dialog?.close();
      document.body.style.overflow = "";
      closeCart();
      // El próximo pedido empieza limpio: sin paso, error ni éxito heredado.
      setStep(1);
      setCheckoutError(undefined);
      setCheckoutSuccess(false);
    };
    setVisible(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) finish();
    else window.setTimeout(finish, EXIT_MS);
  }, [closeCart]);

  const goToCheckout = useCallback(() => setStep(2), []);

  // Volver a editar la canasta abandona cualquier intento de pago fallido.
  const goBack = useCallback(() => {
    setStep(1);
    setCheckoutError(undefined);
  }, []);

  // Pago confirmado server-side (capture COMPLETED): a diferencia de WhatsApp
  // (que solo abre un chat, nunca confirma nada), acá sí sabemos que el pedido
  // se completó — vaciar el carrito evita que alguien pague dos veces sin querer.
  const handleCheckoutSuccess = useCallback(() => {
    setCheckoutError(undefined);
    setCheckoutSuccess(true);
    clear();
  }, [clear]);

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
      className={`fixed inset-y-0 right-0 left-auto m-0 h-full max-h-none w-[min(32rem,100vw)] max-w-none bg-cream p-0 text-ink shadow-2xl backdrop:bg-transparent transition-transform duration-300 ease-out ${
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

        {checkoutSuccess ? (
          <div
            role="status"
            className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center"
          >
            <span aria-hidden="true" className="h-3 w-3 rotate-45 bg-forest" />
            <p className="font-display text-2xl leading-tight text-forest-deep">
              ¡Listo! Tu pago se confirmó
            </p>
            <p className="max-w-[22rem] text-sm leading-relaxed text-ink/60">
              Te vamos a escribir para coordinar la entrega. Gracias por tu
              pedido 🌱
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-2 text-sm font-semibold text-forest underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Cerrar
            </button>
          </div>
        ) : items.length === 0 ? (
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
        ) : step === 2 ? (
          <CartCheckoutStep
            onBack={goBack}
            headingRef={checkoutHeadingRef}
            providerId={providerId}
            setProviderId={setProviderId}
            checkoutError={checkoutError}
            setCheckoutError={setCheckoutError}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        ) : (
          <CartBasketStep
            onContinue={goToCheckout}
            continueButtonRef={continueButtonRef}
          />
        )}
      </div>
    </dialog>
  );
}
