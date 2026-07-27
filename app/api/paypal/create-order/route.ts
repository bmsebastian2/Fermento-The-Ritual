import { NextResponse } from "next/server";
import { subtotal } from "@/lib/checkout/helpers";
import {
  buildPayPalCustomId,
  buildPayPalDescription,
  validateCartPayload,
} from "@/lib/checkout/paypal-order";
import { cordobaToUsd } from "@/lib/checkout/rate";
import { createPayPalOrder } from "@/lib/paypal/client";

/**
 * Recibe SOLO ids + cantidades + entrega — nunca un monto. El subtotal en C$
 * y su conversión a USD se recalculan acá contra products.ts, la única fuente
 * de verdad para el precio (evita el clásico "el navegador me pagó $0.01").
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { code: "INVALID_PAYLOAD", error: "Cuerpo de la solicitud inválido." },
      { status: 400 },
    );
  }

  const validated = validateCartPayload(payload);
  if ("error" in validated) {
    return NextResponse.json(validated, { status: 400 });
  }

  const { items, delivery, contact } = validated;
  const usdAmount = cordobaToUsd(subtotal(items));

  try {
    const order = await createPayPalOrder({
      usdAmount,
      description: buildPayPalDescription(delivery, contact),
      customId: buildPayPalCustomId(items, delivery, contact),
    });
    return NextResponse.json({ id: order.id });
  } catch (err) {
    console.error("[paypal/create-order]", err);
    return NextResponse.json(
      { code: "PAYPAL_ERROR", error: "No pudimos crear la orden de PayPal." },
      { status: 502 },
    );
  }
}
