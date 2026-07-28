import { products } from "@/lib/data/products";
import type { ContactInfo, DeliveryMethodId } from "@/lib/site";
import { getDeliveryMethod, isContactValid } from "@/lib/site";
import { hasPendingPrice } from "./helpers";
import type { CheckoutItem } from "./types";

const catalog = new Map(products.map((p) => [p.id, p]));
const DELIVERY_IDS: readonly DeliveryMethodId[] = ["delivery", "pickup"];

/** Topes de longitud server-side — nunca confiar en que el cliente ya acotó. */
const NAME_MAX = 60;
const EMAIL_MAX = 120;
const PHONE_MAX = 30;
const ADDRESS_MAX = 140;

export interface ValidatedCart {
  items: CheckoutItem[];
  delivery: DeliveryMethodId;
  contact: ContactInfo;
}

export interface CartValidationError {
  code:
    | "INVALID_PAYLOAD"
    | "INVALID_DELIVERY"
    | "EMPTY_CART"
    | "INVALID_ITEM"
    | "PENDING_PRICE"
    | "INVALID_CONTACT";
  error: string;
}

/** Sanea un campo de texto del payload: recorta espacios y longitud, nunca
 *  confía en el tipo declarado por el cliente. */
function sanitizeText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/**
 * Reconstruye y valida el carrito contra el catálogo — nunca confía en ids,
 * cantidades ni montos que vengan del cliente. El monto en USD se calcula
 * siempre a partir de este resultado, nunca de un total recibido del navegador.
 */
export function validateCartPayload(payload: unknown): ValidatedCart | CartValidationError {
  if (typeof payload !== "object" || payload === null) {
    return { code: "INVALID_PAYLOAD", error: "Carrito inválido." };
  }
  const { lines, delivery, contact: rawContact } = payload as {
    lines?: unknown;
    delivery?: unknown;
    contact?: unknown;
  };

  if (typeof delivery !== "string" || !DELIVERY_IDS.includes(delivery as DeliveryMethodId)) {
    return { code: "INVALID_DELIVERY", error: "Modo de entrega inválido." };
  }
  if (!Array.isArray(lines) || lines.length === 0) {
    return { code: "EMPTY_CART", error: "El carrito está vacío." };
  }

  const contactPayload =
    typeof rawContact === "object" && rawContact !== null
      ? (rawContact as Partial<Record<keyof ContactInfo, unknown>>)
      : {};
  const contact: ContactInfo = {
    firstName: sanitizeText(contactPayload.firstName, NAME_MAX),
    lastName: sanitizeText(contactPayload.lastName, NAME_MAX),
    email: sanitizeText(contactPayload.email, EMAIL_MAX),
    phone: sanitizeText(contactPayload.phone, PHONE_MAX),
    address: sanitizeText(contactPayload.address, ADDRESS_MAX),
  };
  if (!isContactValid(contact, delivery as DeliveryMethodId)) {
    return {
      code: "INVALID_CONTACT",
      error: "Completá nombre, apellido, teléfono y dirección (si es delivery).",
    };
  }

  const items: CheckoutItem[] = [];
  for (const line of lines) {
    if (typeof line !== "object" || line === null) {
      return { code: "INVALID_ITEM", error: "Ítem de carrito inválido." };
    }
    const { id, qty } = line as { id?: unknown; qty?: unknown };
    const product = typeof id === "string" ? catalog.get(id) : undefined;
    if (!product) {
      return { code: "INVALID_ITEM", error: "Uno de los productos no existe." };
    }
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1) {
      return { code: "INVALID_ITEM", error: "Cantidad inválida." };
    }
    items.push({ product, qty });
  }

  if (hasPendingPrice(items)) {
    return {
      code: "PENDING_PRICE",
      error:
        "Uno de los productos todavía no tiene precio confirmado — completá ese pedido por WhatsApp.",
    };
  }

  return { items, delivery: delivery as DeliveryMethodId, contact };
}

const PAYPAL_TEXT_LIMIT = 127;

function truncate(text: string): string {
  return text.length > PAYPAL_TEXT_LIMIT ? `${text.slice(0, PAYPAL_TEXT_LIMIT - 3)}...` : text;
}

/**
 * Descripción legible para el dashboard de PayPal (único registro del pedido,
 * no hay base de datos). Prioriza el CONTACTO (nombre, teléfono, entrega y
 * dirección si entra) por sobre el detalle de ítems: es lo que el merchant
 * necesita ver de un vistazo para poder contactar al comprador — el detalle
 * de ítems ya lo tiene el comprador en la pantalla de PayPal y el merchant en
 * `custom_id`. PayPal limita este campo a 127 caracteres, así que una
 * dirección muy larga puede truncarse — aceptado: el contacto por
 * teléfono/WhatsApp sigue siendo el mecanismo real de confirmación de envío.
 */
export function buildPayPalDescription(
  delivery: DeliveryMethodId,
  contact: ContactInfo,
): string {
  const method = getDeliveryMethod(delivery);
  const parts = [
    `${contact.firstName} ${contact.lastName}`.trim(),
    contact.phone,
    method?.label,
    delivery === "delivery" && contact.address ? contact.address : null,
  ].filter((part): part is string => Boolean(part));
  return truncate(`Fermento — ${parts.join(" · ")}`);
}

/** String compacto y greppable para `custom_id`: ítems + entrega + teléfono. */
export function buildPayPalCustomId(
  items: CheckoutItem[],
  delivery: DeliveryMethodId,
  contact: ContactInfo,
): string {
  const itemsPart = items.map((item) => `${item.product.id}:${item.qty}`).join("|");
  return truncate(`${itemsPart}|delivery:${delivery}|tel:${contact.phone}`);
}
