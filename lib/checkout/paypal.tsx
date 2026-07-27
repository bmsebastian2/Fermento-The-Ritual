"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FermentoPayPalScriptProvider } from "@/components/checkout/paypal-script-provider";
import { hasPendingPrice, subtotal } from "./helpers";
import { cordobaToUsd } from "./rate";
import type { CheckoutProvider, CheckoutRenderProps } from "./types";

function formatUsd(amount: number): string {
  return `US$ ${amount.toFixed(2)}`;
}

/** POST helper: cuerpo JSON, devuelve el body parseado sea 2xx o no. */
async function postJson(
  url: string,
  body: unknown,
): Promise<{ ok: boolean; data: Record<string, unknown> }> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  return { ok: res.ok, data };
}

function PayPalCheckoutPanel({
  items,
  delivery,
  contact,
  onSuccess,
  onError,
}: CheckoutRenderProps) {
  const [processing, setProcessing] = useState(false);
  const usdAmount = cordobaToUsd(subtotal(items));

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs leading-relaxed text-ink/55">
        Se te cobrará{" "}
        <strong className="font-semibold text-forest-deep">{formatUsd(usdAmount)}</strong> por
        PayPal (conversión fija de córdobas a dólares).
      </p>
      <div aria-busy={processing}>
        <PayPalButtons
          style={{ layout: "vertical", shape: "rect" }}
          disabled={processing}
          createOrder={async () => {
            const { ok, data } = await postJson("/api/paypal/create-order", {
              lines: items.map((item) => ({ id: item.product.id, qty: item.qty })),
              delivery,
              contact,
            });
            if (!ok || typeof data.id !== "string") {
              const message =
                typeof data.error === "string"
                  ? data.error
                  : "No pudimos iniciar el pago con PayPal.";
              throw new Error(message);
            }
            return data.id;
          }}
          onApprove={async (data) => {
            setProcessing(true);
            try {
              const { ok, data: result } = await postJson("/api/paypal/capture-order", {
                orderID: data.orderID,
              });
              if (ok && result.status === "COMPLETED") {
                onSuccess();
              } else {
                const message =
                  typeof result.error === "string"
                    ? result.error
                    : "El pago no se completó. Tu pedido sigue en el carrito — probá de nuevo.";
                onError?.(message);
              }
            } finally {
              setProcessing(false);
            }
          }}
          onCancel={() => {
            // El comprador cerró el popup de PayPal: sin error, vuelve a idle.
          }}
          onError={() => {
            onError?.("No pudimos conectar con PayPal. Intentá de nuevo o usá WhatsApp.");
          }}
        />
      </div>
    </div>
  );
}

/**
 * Canal PayPal: crea la orden y la captura contra los route handlers de
 * app/api/paypal/*, que recalculan el monto en el servidor. No disponible si
 * algún ítem tiene precio pendiente (PayPal no puede cobrar "a confirmar").
 */
export const paypalCheckout: CheckoutProvider = {
  id: "paypal",
  label: "PayPal",
  isAvailable: (items) => !hasPendingPrice(items),
  render(props) {
    return (
      <FermentoPayPalScriptProvider>
        <PayPalCheckoutPanel {...props} />
      </FermentoPayPalScriptProvider>
    );
  },
};
