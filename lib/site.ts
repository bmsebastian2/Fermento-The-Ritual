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

/**
 * Modos de entrega del pedido. Dato de negocio editable: cuando se defina el
 * costo del delivery o la dirección del punto de retiro, se toca solo esta lista
 * (y no el drawer). `note` es la aclaración que acompaña a la opción en la UI y
 * en el mensaje de WhatsApp — hoy "Costo a confirmar" en delivery, porque ni la
 * tarifa ni las zonas están definidas; el retiro no lleva nota (sin dirección aún).
 */
export type DeliveryMethodId = "delivery" | "pickup";

export const deliveryMethods: {
  id: DeliveryMethodId;
  label: string;
  note?: string;
}[] = [
  { id: "delivery", label: "Delivery a domicilio", note: "Costo a confirmar" },
  { id: "pickup", label: "Retiro en persona" },
];

/** Busca un modo de entrega por id (o `undefined` si el id no existe). */
export function getDeliveryMethod(id: DeliveryMethodId | null) {
  return deliveryMethods.find((m) => m.id === id);
}

/**
 * Datos del pagador, pedidos antes de pagar (los dos métodos, WhatsApp y
 * PayPal) para poder contactarlo y confirmar la entrega. `address` solo es
 * obligatoria cuando `delivery === "delivery"` — con retiro en persona no
 * hace falta dirección.
 */
export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export const emptyContactInfo: ContactInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validación compartida cliente/servidor: el drawer la usa para habilitar el
 * CTA de pago, el route handler de PayPal la vuelve a correr server-side
 * (nunca confía en que el cliente ya validó). Teléfono: al menos 7 dígitos,
 * sin exigir un formato exacto (los números nicaragüenses se escriben con o
 * sin código de país, con o sin guion).
 */
export function isContactValid(
  contact: ContactInfo,
  delivery: DeliveryMethodId | null,
): boolean {
  const hasName =
    contact.firstName.trim().length > 0 && contact.lastName.trim().length > 0;
  const hasEmail = EMAIL_PATTERN.test(contact.email.trim());
  const hasPhone = contact.phone.replace(/\D/g, "").length >= 7;
  const hasAddress = delivery !== "delivery" || contact.address.trim().length > 0;
  return hasName && hasEmail && hasPhone && hasAddress;
}

export const navLinks: { href: string; label: string }[] = [
  { href: "#fermento", label: "Fermento" },
  { href: "#the-ritual", label: "The Ritual" },
  { href: "#contacto", label: "Contacto" },
];

/**
 * Sub-líneas navegables del catálogo (barra de chips sticky + menú mobile).
 * `id` coincide con el ancla del wrapper de cada sección (`cat-<categoría>`);
 * `line` agrupa en el menú mobile bajo Fermento / The Ritual.
 */
export const catalogSections: {
  id: string;
  label: string;
  line: "fermento" | "ritual";
}[] = [
  { id: "cat-kombucha", label: "Kombucha", line: "fermento" },
  { id: "cat-cold-brew", label: "Cold Brew", line: "fermento" },
  { id: "cat-kefir", label: "Kéfir", line: "ritual" },
  { id: "cat-agua-de-coco", label: "Agua de Coco", line: "ritual" },
  { id: "cat-shots", label: "Shots", line: "ritual" },
  { id: "cat-postres", label: "Postres", line: "ritual" },
  { id: "cat-panes", label: "Panes", line: "ritual" },
];

/** Devuelve el valor CSS del acento de un producto (var de globals.css). */
export function accentVar(accent: Accent): string {
  return `var(--color-${accent})`;
}

/**
 * Ruta de la imagen (WebP) de un producto, o `null` si no tiene render limpio.
 * `image` es la fuente de verdad: solo los productos con foto/render recortado
 * (sin texto de lámina) lo definen; el resto es `null` → placeholder por color.
 */
export function productImage(product: Pick<Product, "image">): string | null {
  return product.image;
}

/**
 * Formatea un precio en córdobas (C$) para la UI. Entero → "C$ 145"; con
 * decimales → dos dígitos ("C$ 147.50", "C$ 146.16"). `null` (precio aún no
 * confirmado, p. ej. Cold Brew clásico) → "A confirmar".
 */
export function formatPrice(price: number | null): string {
  if (price == null) return "A confirmar";
  const amount = Number.isInteger(price) ? String(price) : price.toFixed(2);
  return `C$ ${amount}`;
}
