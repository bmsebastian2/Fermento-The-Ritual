"use client";

import { useCart } from "@/components/cart/cart-provider";

/** Estilo compartido por los tres inputs — mismo lenguaje que los fieldsets
 *  de entrega/pago (borde `ink/15`, foco `outline-forest`), sin radius nuevo. */
const inputClassName =
  "w-full border border-ink/15 bg-cream px-3.5 py-2.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

const labelClassName =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink/50";

/**
 * "Tus datos" — nombre, apellido y teléfono, siempre visibles (con o sin
 * delivery: hasta un retiro en persona necesita a quién y cómo contactar). La
 * dirección vive aparte, en cart-checkout-step.tsx, pegada al fieldset de
 * entrega — es un dato de envío, no de contacto, aunque comparta el mismo
 * `ContactInfo`.
 */
export function CartContactFields() {
  const { contact, setContact } = useCart();

  return (
    <fieldset className="mt-4">
      <legend className={labelClassName}>Tus datos</legend>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-1">
          <span className={labelClassName}>Nombre</span>
          <input
            type="text"
            autoComplete="given-name"
            value={contact.firstName}
            onChange={(e) => setContact({ firstName: e.target.value })}
            className={inputClassName}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className={labelClassName}>Apellido</span>
          <input
            type="text"
            autoComplete="family-name"
            value={contact.lastName}
            onChange={(e) => setContact({ lastName: e.target.value })}
            className={inputClassName}
          />
        </label>
      </div>
      <label className="mt-2 flex flex-col gap-1">
        <span className={labelClassName}>Teléfono</span>
        <input
          type="tel"
          autoComplete="tel"
          value={contact.phone}
          onChange={(e) => setContact({ phone: e.target.value })}
          className={inputClassName}
        />
      </label>
    </fieldset>
  );
}
