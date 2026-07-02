import type { Accent, Product } from "@/lib/data/products";

/** Datos de contacto y navegación del sitio. */

export const WHATSAPP_NUMBER = "50576035477";

/** Construye un enlace a WhatsApp con mensaje opcional prellenado. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_DEFAULT_MESSAGE =
  "¡Hola Fermento! Quiero hacer un pedido 🌱";

export const navLinks: { href: string; label: string }[] = [
  { href: "#fermento", label: "Fermento" },
  { href: "#the-ritual", label: "The Ritual" },
  { href: "#contacto", label: "Contacto" },
];

/** Devuelve el valor CSS del acento de un producto (var de globals.css). */
export function accentVar(accent: Accent): string {
  return `var(--color-${accent})`;
}

/**
 * Ruta de la imagen (WebP) de un producto. Usa `image` si está definido;
 * si no, deriva por convención `/products/<id>.webp`. Todas las imágenes
 * viven en public/products como WebP optimizado.
 */
export function productImage(product: Pick<Product, "id" | "image">): string {
  return product.image ?? `/products/${product.id}.webp`;
}
