import type { CategoryId, Product } from "@/lib/data/products";
import { getCategory } from "@/lib/data/products";
import { whatsappUrl } from "@/lib/site";

/**
 * Capa de checkout — punto único por donde sale un pedido.
 *
 * El carrito solo conoce `checkout.submit(items)`: no sabe si el pedido va por
 * WhatsApp, por una pasarela o por un backend. Para enchufar pagos online más
 * adelante alcanza con escribir otro `CheckoutProvider` y cambiar la constante
 * `checkout` del final del archivo — el drawer y el provider no se tocan.
 *
 * PRECIOS: esta capa no lee `price` a propósito. Ningún monto está confirmado
 *          (todos `null` en products.ts) y el total se cotiza por WhatsApp.
 *          Un provider de pasarela sí necesitará precios: ese es el momento de
 *          cargarlos, no antes.
 */

export interface CheckoutItem {
  product: Product;
  qty: number;
}

export interface CheckoutProvider {
  /** Identificador del canal, para telemetría o feature flags a futuro. */
  id: string;
  /** Etiqueta del CTA que dispara el envío, en el idioma de la UI. */
  ctaLabel: string;
  /** Entrega el pedido por el canal correspondiente. */
  submit(items: CheckoutItem[]): void;
}

// ── Mensaje de WhatsApp ──────────────────────────────────────────────────

/**
 * Nombre de categoría para el mensaje. En singular donde el plural del catálogo
 * chirría al anteponerlo a un sabor ("Shots Ginger Boost" → "Shot Ginger Boost").
 */
const CATEGORY_LABEL: Partial<Record<CategoryId, string>> = {
  shots: "Shot",
};

/**
 * Nombre legible de un producto: "Categoría Sabor", sin repetir cuando el
 * producto ya se llama como su categoría (evita "Cold Brew Cold Brew").
 * Misma regla que el alt de ProductMedia.
 */
export function productLabel(product: Product): string {
  const category = getCategory(product.categoryId);
  if (!category || category.name === product.name) return product.name;
  const name = CATEGORY_LABEL[category.id] ?? category.name;
  return `${name} ${product.name}`;
}

/** Unidades totales del pedido (bultos, no dinero). */
export function totalUnits(items: CheckoutItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Arma el texto del pedido. Una línea por ítem (cantidad, nombre y tamaño),
 * pensada para leerse sin wrap en la pantalla de un teléfono. Cierra pidiendo
 * la cotización: el total en córdobas lo confirma Fermento, no el sitio.
 */
export function buildOrderMessage(items: CheckoutItem[]): string {
  const lines = items.map(
    ({ product, qty }) => `• ${qty}× ${productLabel(product)} — ${product.size}`,
  );
  const units = totalUnits(items);

  return [
    "¡Hola Fermento! Quiero hacer este pedido 🌱",
    "",
    ...lines,
    "",
    `Total: ${units} ${units === 1 ? "unidad" : "unidades"}`,
    "¿Me confirman precio y disponibilidad?",
  ].join("\n");
}

// ── Providers ────────────────────────────────────────────────────────────

/** Canal actual: abre WhatsApp con el pedido prellenado. */
export const whatsappCheckout: CheckoutProvider = {
  id: "whatsapp",
  ctaLabel: "Enviar pedido por WhatsApp",
  submit(items) {
    if (items.length === 0) return;
    window.open(
      whatsappUrl(buildOrderMessage(items)),
      "_blank",
      "noopener,noreferrer",
    );
  },
};

/** Canal activo. Único punto a cambiar cuando entre la pasarela de pago. */
export const checkout: CheckoutProvider = whatsappCheckout;
