/**
 * Tasa córdoba→dólar para cobros por PayPal (PayPal no cobra en NIO). Valor de
 * negocio fijo, no una config de infraestructura — se actualiza a mano acá
 * cuando el tipo de cambio se mueva de forma relevante, igual que un
 * PRICE_TABLE. PLACEHOLDER: confirmar el valor real antes de ir a producción
 * (ver checklist de go-live).
 */
export const CORDOBA_TO_USD_RATE = 36.6;

/** Convierte C$ → USD con la tasa fija, redondeado a centavos. */
export function cordobaToUsd(amountCordobas: number): number {
  return Math.round((amountCordobas / CORDOBA_TO_USD_RATE) * 100) / 100;
}
