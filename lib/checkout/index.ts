/**
 * Capa de checkout — punto único por donde sale un pedido.
 *
 * El drawer solo conoce `checkoutProviders`: un registro de métodos
 * disponibles, cada uno con su propio `render()`. No sabe si un método abre
 * WhatsApp, un widget de pago o redirige a una pasarela — solo filtra por
 * `isAvailable(items)` y monta lo que `render()` devuelva. Agregar un método
 * nuevo (Pagadito) es escribir un módulo con la forma `CheckoutProvider` y
 * sumarlo a este array — no se toca el drawer ni los providers existentes.
 *
 * PRECIOS: en córdobas (C$), desde products.ts. Ítems sin precio (`null`, p.
 *          ej. Cold Brew clásico) salen como "a confirmar" en WhatsApp y
 *          deshabilitan cualquier método que requiera precio cerrado (PayPal).
 */

export type { CheckoutItem, CheckoutProvider, CheckoutRenderProps } from "./types";
export {
  hasPendingPrice,
  lineTotal,
  productLabel,
  subtotal,
  totalUnits,
} from "./helpers";
export { CORDOBA_TO_USD_RATE, cordobaToUsd } from "./rate";
export { buildOrderMessage, whatsappCheckout } from "./whatsapp";
export { paypalCheckout } from "./paypal";

import type { CheckoutProvider } from "./types";
import { whatsappCheckout } from "./whatsapp";
import { paypalCheckout } from "./paypal";

/** Métodos de pago disponibles, en el orden en que aparecen en el drawer. */
export const checkoutProviders: CheckoutProvider[] = [whatsappCheckout, paypalCheckout];
