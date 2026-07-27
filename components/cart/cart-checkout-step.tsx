import type { RefObject } from "react";
import { checkoutProviders, hasPendingPrice, subtotal } from "@/lib/checkout";
import { deliveryMethods, formatPrice, isContactValid } from "@/lib/site";
import { CartSummaryRow } from "@/components/cart/cart-summary-row";
import { CartContactFields } from "@/components/cart/cart-contact-fields";
import { useCart } from "@/components/cart/cart-provider";

const inputClassName =
  "w-full border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const labelClassName =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50";

/**
 * Paso 2 — Checkout: resumen de solo lectura de la canasta + entrega + método
 * de pago. El registro de métodos (`checkoutProviders`, WhatsApp/PayPal) y su
 * `render()` ya existían en el drawer de un solo paso — acá solo se reubican,
 * la lógica de `lib/checkout` no cambia.
 */
export function CartCheckoutStep({
  onBack,
  headingRef,
  providerId,
  setProviderId,
  checkoutError,
  setCheckoutError,
  onCheckoutSuccess,
}: {
  onBack: () => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
  providerId: string | undefined;
  setProviderId: (id: string) => void;
  checkoutError: string | undefined;
  setCheckoutError: (message: string | undefined) => void;
  onCheckoutSuccess: () => void;
}) {
  const { items, count, delivery, setDelivery, contact, setContact } = useCart();
  const contactValid = isContactValid(contact, delivery);

  const availableProviders = checkoutProviders.filter((p) => p.isAvailable(items));
  const provider =
    availableProviders.find((p) => p.id === providerId) ?? availableProviders[0];

  return (
    <>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Volver
        </button>

        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 font-display text-2xl leading-tight text-forest-deep focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-forest"
        >
          Confirmá tu pedido
        </h3>

        <ul className="mt-4">
          {items.map((item) => (
            <CartSummaryRow key={item.product.id} item={item} />
          ))}
        </ul>

        <div className="mt-4 flex items-baseline justify-between gap-3">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50">
            Subtotal · {count} {count === 1 ? "unidad" : "unidades"}
          </span>
          <span className="text-xl font-semibold tabular-nums text-forest-deep">
            {formatPrice(subtotal(items))}
            {hasPendingPrice(items) && "*"}
          </span>
        </div>

        <CartContactFields />

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

        {/* Dirección — dato de envío, no de contacto: solo aparece pegada al
            modo de entrega, cuando de verdad hace falta (delivery, no retiro). */}
        {delivery === "delivery" && (
          <label className="mt-3 flex flex-col gap-1">
            <span className={labelClassName}>Dirección de envío</span>
            <textarea
              value={contact.address}
              onChange={(e) => setContact({ address: e.target.value })}
              rows={2}
              placeholder="Referencias, barrio, punto conocido"
              className={inputClassName}
            />
          </label>
        )}

        <p className="mt-3 text-xs leading-relaxed text-ink/55">
          El subtotal no incluye envío. Te confirmamos el total con envío y la
          disponibilidad por WhatsApp.
          {hasPendingPrice(items) &&
            " Los ítems con * tienen precio a confirmar."}
        </p>

        {/* ── Método de pago ─────────────────────────────────────────
            Mismo patrón visual que el fieldset de entrega. Solo aparece si
            hay más de un método disponible para el carrito actual. */}
        {availableProviders.length > 1 && (
          <fieldset className="mt-4">
            <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50">
              ¿Cómo querés pagar?
            </legend>
            <div className="mt-2.5 flex flex-col gap-2">
              {availableProviders.map((p) => {
                const selected = provider?.id === p.id;
                return (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer items-center gap-3 border px-3.5 py-2.5 transition-colors ${
                      selected
                        ? "border-forest bg-forest/[0.05]"
                        : "border-ink/15 hover:border-forest/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="checkout-method"
                      value={p.id}
                      checked={selected}
                      onChange={() => {
                        setProviderId(p.id);
                        setCheckoutError(undefined);
                      }}
                      className="h-4 w-4 shrink-0 accent-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                    />
                    <span className="text-sm font-medium leading-tight text-forest-deep">
                      {p.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
      </div>

      <footer className="shrink-0 border-t border-ink/10 bg-cream px-6 pb-6 pt-5">
        {/* Bloqueado hasta elegir entrega y completar los datos — el texto de
            abajo explica por qué, no queda un botón muerto sin feedback. */}
        {delivery && provider && contactValid ? (
          provider.render({
            items,
            delivery,
            contact,
            onSuccess: onCheckoutSuccess,
            onError: setCheckoutError,
          })
        ) : (
          <button
            type="button"
            disabled
            aria-describedby="checkout-hint"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm disabled:pointer-events-none disabled:bg-forest/40 disabled:shadow-none"
          >
            Continuar
          </button>
        )}

        {(!delivery || !contactValid) && (
          <p id="checkout-hint" className="mt-2 text-center text-xs text-ink/55">
            {!delivery
              ? "Elegí cómo querés recibir el pedido para continuar."
              : "Completá tus datos para continuar."}
          </p>
        )}

        {checkoutError && (
          <p role="alert" className="mt-2 text-center text-xs font-medium text-jamaica">
            {checkoutError}
          </p>
        )}
      </footer>
    </>
  );
}
