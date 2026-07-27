import type { CategoryId } from "@/lib/data/products";
import { getCategory } from "@/lib/data/products";
import type { CheckoutItem } from "./types";

/**
 * Nombre de categoría para mensajes de pedido. En singular donde el plural del
 * catálogo chirría al anteponerlo a un sabor ("Shots Ginger Boost" → "Shot
 * Ginger Boost").
 */
const CATEGORY_LABEL: Partial<Record<CategoryId, string>> = {
  shots: "Shot",
};

/**
 * Nombre legible de un producto: "Categoría Sabor", sin repetir cuando el
 * producto ya se llama como su categoría (evita "Cold Brew Cold Brew").
 * Misma regla que el alt de ProductMedia.
 */
export function productLabel(product: CheckoutItem["product"]): string {
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
