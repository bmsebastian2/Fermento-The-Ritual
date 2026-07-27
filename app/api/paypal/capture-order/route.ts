import { NextResponse } from "next/server";
import { capturePayPalOrder } from "@/lib/paypal/client";

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

  const { orderID } = (payload ?? {}) as { orderID?: unknown };
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
    return NextResponse.json({ status: "COMPLETED", id: result.id });
  } catch (err) {
    console.error("[paypal/capture-order]", err);
    return NextResponse.json(
      { error: "No pudimos capturar el pago de PayPal." },
      { status: 502 },
    );
  }
}
