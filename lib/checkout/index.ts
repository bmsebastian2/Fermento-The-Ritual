import type { CategoryId, Product } from "@/lib/data/products";
import { getCategory } from "@/lib/data/products";
import type { DeliveryMethodId } from "@/lib/site";
import { formatPrice, getDeliveryMethod, whatsappUrl } from "@/lib/site";

/**
 * Capa de checkout — punto único por donde sale un pedido.
 *
 * El carrito solo conoce `checkout.submit(items)`: no sabe si el pedido va por
 * WhatsApp, por una pasarela o por un backend. Para enchufar pagos online más
 * adelante alcanza con escribir otro `CheckoutProvider` y cambiar la constante
 * `checkout` del final del archivo — el drawer y el provider no se tocan.
 *
 * PRECIOS: en córdobas (C$), desde products.ts. El mensaje incluye el precio de
 *          cada línea y el subtotal de productos. El total FINAL (con envío) lo
 *          confirma Fermento por WhatsApp: la tarifa de delivery no está definida.
 *          Ítems sin precio (`null`, p. ej. Cold Brew clásico) salen como "a
 *          confirmar" y no suman al subtotal.
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
  /**
   * Entrega el pedido por el canal correspondiente. `delivery` es el modo de
   * entrega elegido por el usuario (nunca `null`: el drawer bloquea el envío
   * hasta que se elija). Una pasarela futura recibe el mismo dato.
   */
  submit(items: CheckoutItem[], delivery: DeliveryMethodId): void;
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

/** Total de una línea (precio × cantidad), o `null` si el precio no está fijado. */
export function lineTotal({ product, qty }: CheckoutItem): number | null {
  return product.price == null ? null : product.price * qty;
}

/** Subtotal de productos con precio confirmado (en C$). Ignora los `null`. */
export function subtotal(items: CheckoutItem[]): number {
  return items.reduce((sum, item) => sum + (lineTotal(item) ?? 0), 0);
}

/** `true` si algún ítem no tiene precio fijado (subtotal parcial). */
export function hasPendingPrice(items: CheckoutItem[]): boolean {
  return items.some(({ product }) => product.price == null);
}

/**
 * Arma el texto del pedido. Una línea por ítem (cantidad, nombre, tamaño y
 * precio de línea), pensada para leerse sin wrap en la pantalla de un teléfono.
 * Cierra con el subtotal de productos; el total con envío lo confirma Fermento.
 */
export function buildOrderMessage(
  items: CheckoutItem[],
  delivery: DeliveryMethodId,
): string {
  const lines = items.map((item) => {
    const { product, qty } = item;
    const total = lineTotal(item);
    const amount = total == null ? "precio a confirmar" : formatPrice(total);
    return `• ${qty}× ${productLabel(product)} — ${product.size} — ${amount}`;
  });
  const units = totalUnits(items);
  const pending = hasPendingPrice(items);
  const subtotalLine = `Subtotal: ${formatPrice(subtotal(items))}${
    pending ? " (+ ítems a confirmar)" : ""
  } · ${units} ${units === 1 ? "unidad" : "unidades"}`;
  const method = getDeliveryMethod(delivery);
  // "Delivery a domicilio (costo a confirmar)" / "Retiro en persona".
  const deliveryLine = method
    ? `Entrega: ${method.label}${method.note ? ` (${method.note.toLowerCase()})` : ""}`
    : null;

  return [
    "¡Hola Fermento! Quiero hacer este pedido 🌱",
    "",
    ...lines,
    "",
    subtotalLine,
    ...(deliveryLine ? [deliveryLine] : []),
    "¿Me confirman el total con envío y la disponibilidad?",
  ].join("\n");
}

// ── Providers ────────────────────────────────────────────────────────────

/** Canal actual: abre WhatsApp con el pedido prellenado. */
export const whatsappCheckout: CheckoutProvider = {
  id: "whatsapp",
  ctaLabel: "Enviar pedido por WhatsApp",
  submit(items, delivery) {
    if (items.length === 0) return;
    window.open(
      whatsappUrl(buildOrderMessage(items, delivery)),
      "_blank",
      "noopener,noreferrer",
    );
  },
};

/** Canal activo. Único punto a cambiar cuando entre la pasarela de pago. */
export const checkout: CheckoutProvider = whatsappCheckout;
