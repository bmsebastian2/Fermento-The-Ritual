# Checklist de go-live — PayPal

PayPal hoy corre **solo en sandbox**. Este documento es el circuito completo
para pasar a producción — no anunciar la función hasta completarlo entero.

## 1. Tasa C$ → USD

- [ ] Confirmar la tasa córdoba→dólar real y actualizar `CORDOBA_TO_USD_RATE`
      en [`lib/checkout/rate.ts`](../lib/checkout/rate.ts) (hoy placeholder:
      `36.6`).
- [ ] Anotar en el comentario del archivo la fuente (BCN oficial, paralelo, o
      una tasa propia que absorba comisiones de PayPal) y la fecha de
      actualización.
- [ ] Definir con qué frecuencia se revisa (¿mensual? ¿cuando se mueve más de
      X%?) — hoy es un valor fijo que se edita a mano, no hay automatismo.

## 2. Precios pendientes del catálogo

- [ ] Completar los precios `null` que queden en
      [`lib/data/products.ts`](../lib/data/products.ts) (hoy: Cold Brew
      clásico). Mientras un producto tenga `price: null`, cualquier carrito
      que lo incluya pierde la opción PayPal — comportamiento correcto, pero
      confirmar que es el deseado antes de anunciar el go-live (si se quiere
      que ese producto también sea pagable por PayPal, primero necesita un
      precio en córdobas).

## 3. Credenciales sandbox → live

- [ ] Crear una app **live** en el
      [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/live)
      (una app nueva, no reutilizar la de sandbox).
- [ ] En Vercel (Project Settings → Environment Variables), reemplazar:
  - `NEXT_PUBLIC_PAYPAL_CLIENT_ID` → client ID de la app live.
  - `PAYPAL_CLIENT_SECRET` → secret de la app live.
  - `PAYPAL_API_BASE_URL` → `https://api-m.paypal.com` (sin `.sandbox`).
- [ ] Confirmar que la cuenta de PayPal Business asociada puede recibir **USD**
      sin restricciones (cuentas de Nicaragua a veces necesitan habilitar
      monedas explícitamente).

## 4. Repetir las pruebas contra credenciales live

- [ ] `create-order` con un carrito real chico (curl o desde la UI) — igual
      que las pruebas de sandbox, pero contra `api-m.paypal.com`.
- [ ] Un pago real de prueba, monto bajo, de punta a punta: agregar producto →
      elegir PayPal → aprobar → confirmar `status: COMPLETED` → carrito se
      vacía solo → el pedido aparece legible en el dashboard de PayPal
      (Business → Activity), con la descripción y el `custom_id` armados por
      [`lib/checkout/paypal-order.ts`](../lib/checkout/paypal-order.ts).
- [ ] Probar también un carrito con un ítem de precio pendiente (si sigue
      existiendo alguno) para confirmar que PayPal se sigue ocultando y
      WhatsApp sigue disponible.

## 5. Datos de contacto del comprador

- [ ] Nombre, teléfono y dirección (si es delivery) viajan hoy en `description`/
      `custom_id` de la orden PayPal (127 caracteres cada uno, con truncado a
      "..." si no entra todo) — **no** en los campos estructurados `payer`/
      `shipping` de la Orders API, que exigirían `country_code`/`postal_code`
      y no se probaron contra el sandbox. Con pedidos grandes o direcciones
      largas, la dirección puede truncarse en `description`. No es crítico hoy
      porque el envío siempre se termina de confirmar por WhatsApp — pero si
      se vuelve un problema real, considerar migrar a `shipping` estructurado
      (probarlo primero en sandbox, Nicaragua no tiene código postal
      confiable).

## 6. Circuito de negocio (pendiente, fuera del código)

- [ ] Compra real de prueba con retiro/envío hasta Montevideo, para verificar
      el circuito completo de principio a fin (pago → coordinación por
      WhatsApp → entrega) — no solo la parte técnica del pago.

---

Ningún ítem de esta lista se resuelve solo; repasarla entera antes de anunciar
PayPal como método de pago real.
