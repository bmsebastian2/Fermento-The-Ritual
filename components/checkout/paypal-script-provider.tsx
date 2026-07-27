"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

/**
 * Solo lee la variable pública del client ID — nunca PAYPAL_CLIENT_SECRET,
 * que es server-only (ver lib/paypal/client.ts).
 */
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

/**
 * Envuelve el widget de PayPal con su propio script. Se monta solo dentro del
 * `render()` de `paypalCheckout` (recién cuando el usuario elige ese método),
 * no en `app/layout.tsx`: la mayoría de pedidos sale por WhatsApp y no tiene
 * sentido pagar el costo de carga del script en cada visita.
 */
export function FermentoPayPalScriptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!clientId) return null;
  return (
    <PayPalScriptProvider options={{ clientId, currency: "USD", intent: "capture" }}>
      {children}
    </PayPalScriptProvider>
  );
}
