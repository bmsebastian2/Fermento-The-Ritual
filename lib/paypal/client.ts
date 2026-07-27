/**
 * Único módulo que habla con la REST API de PayPal. Server-only: es el único
 * lugar del repo que lee PAYPAL_CLIENT_SECRET. Nunca importar este archivo
 * desde un componente "use client" — los route handlers de
 * app/api/paypal/*.ts son sus únicos consumidores.
 */

const PAYPAL_API_BASE_URL =
  process.env.PAYPAL_API_BASE_URL ?? "https://api-m.sandbox.paypal.com";

function getCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Faltan credenciales de PayPal (NEXT_PUBLIC_PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET).",
    );
  }
  return { clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
  const { clientId, clientSecret } = getCredentials();
  const res = await fetch(`${PAYPAL_API_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`No se pudo autenticar con PayPal (HTTP ${res.status}).`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export interface CreatePayPalOrderParams {
  usdAmount: number;
  description: string;
  customId: string;
}

/** Crea una orden PayPal por el monto USD ya calculado en el servidor. */
export async function createPayPalOrder({
  usdAmount,
  description,
  customId,
}: CreatePayPalOrderParams): Promise<{ id: string }> {
  const accessToken = await getAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          custom_id: customId,
          description,
          amount: { currency_code: "USD", value: usdAmount.toFixed(2) },
        },
      ],
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PayPal rechazó la creación de la orden (HTTP ${res.status}): ${body}`);
  }
  const data = (await res.json()) as { id: string };
  return { id: data.id };
}

export interface PayPalCaptureResult {
  status: string;
  id: string;
}

/**
 * Captura una orden ya aprobada por el comprador. Devuelve el `status` que
 * PayPal reporte (incluso en respuestas no-2xx, ej. orden ya capturada o
 * denegada) para que la ruta decida — nunca asumimos éxito sin chequear.
 */
export async function capturePayPalOrder(orderId: string): Promise<PayPalCaptureResult> {
  const accessToken = await getAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { status?: string; id?: string };
  return { status: data.status ?? "FAILED", id: data.id ?? orderId };
}
