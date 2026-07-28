import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal/client";

interface OrderNotice {
  contact?: {
    firstName?: unknown;
    lastName?: unknown;
    email?: unknown;
    phone?: unknown;
    address?: unknown;
  };
  delivery?: unknown;
  items?: unknown;
  amountUsd?: unknown;
}

/** Avisa a n8n que un pago se confirmó. Nunca debe romper la respuesta al
 *  cliente: el pago ya está capturado en PayPal pase lo que pase acá. */
async function notifyPaymentWebhook(orderId: string, order: OrderNotice | undefined) {
  const webhookUrl = process.env.N8N_PAYMENT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        orderId,
        firstName: order?.contact?.firstName,
        lastName: order?.contact?.lastName,
        email: order?.contact?.email,
        phone: order?.contact?.phone,
        delivery: order?.delivery,
        address: order?.contact?.address,
        items: order?.items,
        amountUsd: order?.amountUsd,
      }),
    });
  } catch (err) {
    console.error("[paypal/capture-order] webhook n8n falló", err);
  }
}

/**
 * Único punto donde "pago exitoso" se declara verdadero: solo si PayPal
 * confirma `status: "COMPLETED"` acá. El callback `onApprove` del navegador
 * nunca alcanza por sí solo.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo de la solicitud inválido." }, { status: 400 });
  }

  const { orderID, order } = (payload ?? {}) as { orderID?: unknown; order?: OrderNotice };
  if (typeof orderID !== "string" || !orderID) {
    return NextResponse.json({ error: "Falta el orderID." }, { status: 400 });
  }

  try {
    const result = await capturePayPalOrder(orderID);
    if (result.status !== "COMPLETED") {
      return NextResponse.json(
        { status: result.status, error: "El pago no se completó." },
        { status: 502 },
      );
    }
    await notifyPaymentWebhook(result.id, order);
    return NextResponse.json({ status: "COMPLETED", id: result.id });
  } catch (err) {
    console.error("[paypal/capture-order]", err);
    return NextResponse.json(
      { error: "No pudimos capturar el pago de PayPal." },
      { status: 502 },
    );
  }
}
