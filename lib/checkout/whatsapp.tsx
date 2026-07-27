import { formatPrice, getDeliveryMethod, whatsappUrl } from "@/lib/site";
import type { ContactInfo, DeliveryMethodId } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";
import { hasPendingPrice, lineTotal, productLabel, subtotal, totalUnits } from "./helpers";
import type { CheckoutItem, CheckoutProvider } from "./types";

/**
 * Arma el texto del pedido. Una línea por ítem (cantidad, nombre, tamaño y
 * precio de línea), pensada para leerse sin wrap en la pantalla de un teléfono.
 * Cierra con el subtotal de productos; el total con envío lo confirma Fermento.
 */
export function buildOrderMessage(
  items: CheckoutItem[],
  delivery: DeliveryMethodId,
  contact: ContactInfo,
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

  const contactLines = [
    `Nombre: ${contact.firstName} ${contact.lastName}`.trim(),
    `Teléfono: ${contact.phone}`,
    ...(delivery === "delivery" && contact.address
      ? [`Dirección: ${contact.address}`]
      : []),
  ];

  return [
    "¡Hola Fermento! Quiero hacer este pedido 🌱",
    "",
    ...lines,
    "",
    subtotalLine,
    ...(deliveryLine ? [deliveryLine] : []),
    "",
    ...contactLines,
    "",
    "¿Me confirman el total con envío y la disponibilidad?",
  ].join("\n");
}

/**
 * Canal WhatsApp: abre un chat con el pedido prellenado. No confirma nada
 * server-side, así que su `render()` nunca llama a `onSuccess`/`onError` — el
 * drawer nunca muestra un banner de éxito/error para este método.
 */
export const whatsappCheckout: CheckoutProvider = {
  id: "whatsapp",
  label: "WhatsApp",
  isAvailable: () => true,
  render({ items, delivery, contact }) {
    return (
      <button
        type="button"
        onClick={() =>
          window.open(
            whatsappUrl(buildOrderMessage(items, delivery, contact)),
            "_blank",
            "noopener,noreferrer",
          )
        }
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-forest px-6 py-3 text-sm font-medium tracking-wide text-cream shadow-sm transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Enviar pedido por WhatsApp
      </button>
    );
  },
};
