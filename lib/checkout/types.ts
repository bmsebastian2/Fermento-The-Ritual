import type { ReactNode } from "react";
import type { Product } from "@/lib/data/products";
import type { ContactInfo, DeliveryMethodId } from "@/lib/site";

export interface CheckoutItem {
  product: Product;
  qty: number;
}

/**
 * Props que el drawer pasa al `render()` de cada provider. `delivery` nunca es
 * `null`: el drawer solo llama a `render()` una vez elegido el modo de entrega.
 * `onSuccess`/`onError` los dispara el provider — WhatsApp no llama a ninguno
 * (no confirma nada), PayPal los llama según el resultado verificado en servidor.
 */
export interface CheckoutRenderProps {
  items: CheckoutItem[];
  delivery: DeliveryMethodId;
  /** Datos del pagador — nombre/apellido/teléfono siempre, dirección si `delivery === "delivery"`. */
  contact: ContactInfo;
  onSuccess: () => void;
  onError?: (message: string) => void;
}

/**
 * Un método de pago disponible en el drawer. `render()` es deliberadamente el
 * único punto de contacto con el drawer: cada provider decide qué UI necesita
 * (un botón simple, un widget de terceros, un redirect) sin que el drawer
 * tenga que distinguir casos. Agregar un provider nuevo (Pagadito) es escribir
 * un módulo con esta forma y sumarlo al registro — no se toca el drawer ni los
 * demás providers.
 */
export interface CheckoutProvider {
  id: string;
  /** Etiqueta del selector de método en el drawer. */
  label: string;
  isAvailable(items: CheckoutItem[]): boolean;
  render(props: CheckoutRenderProps): ReactNode;
}
