"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { Product } from "@/lib/data/products";
import { products } from "@/lib/data/products";
import type { CheckoutItem } from "@/lib/checkout";
import { totalUnits } from "@/lib/checkout";
import type { DeliveryMethodId } from "@/lib/site";
import { deliveryMethods } from "@/lib/site";

/**
 * Estado del pedido — client-side, persistido en localStorage.
 *
 * Guarda solo `{ id, qty }`: `products.ts` sigue siendo la fuente de verdad y
 * el producto se resuelve por id en cada render. Así el carrito nunca sirve
 * copias viejas de copy, tamaño ni acento, y no duplica precios (que además no
 * existen todavía). Si un id desaparece del catálogo, la línea se descarta al
 * hidratar en vez de romper.
 */

// v2: el pedido guardado pasó de un array plano de líneas a `{ lines, delivery }`
// para incluir el modo de entrega. La v1 (array) queda huérfana: readStorage la
// descarta sola al no encontrar la forma nueva, sin romper nada.
const STORAGE_KEY = "fermento.cart.v2";
const MAX_QTY = 99;

const deliveryIds = new Set(deliveryMethods.map((m) => m.id));

interface CartLine {
  id: string;
  qty: number;
}

/**
 * `hydrated` vive en el reducer, no en un useState aparte: así solo puede
 * volverse true en la misma acción que trae las líneas de localStorage, y no
 * existe el render intermedio donde el contador ya se pinta pero el pedido
 * todavía está vacío.
 */
interface State {
  lines: CartLine[];
  /** Modo de entrega elegido; `null` hasta que el usuario elija (bloquea el envío). */
  delivery: DeliveryMethodId | null;
  hydrated: boolean;
}

const initialState: State = { lines: [], delivery: null, hydrated: false };

type Action =
  | { type: "hydrate"; lines: CartLine[]; delivery: DeliveryMethodId | null }
  | { type: "add"; id: string; qty: number }
  | { type: "setQty"; id: string; qty: number }
  | { type: "remove"; id: string }
  | { type: "setDelivery"; delivery: DeliveryMethodId }
  | { type: "clear" };

const catalog = new Map(products.map((p) => [p.id, p]));

const clamp = (qty: number) => Math.min(Math.max(Math.round(qty), 1), MAX_QTY);

function reduceLines(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines;

    case "add": {
      const current = lines.find((l) => l.id === action.id);
      if (!current) return [...lines, { id: action.id, qty: clamp(action.qty) }];
      // Reordenar movería el ítem bajo el dedo del usuario: se suma en su lugar.
      return lines.map((l) =>
        l.id === action.id ? { ...l, qty: clamp(l.qty + action.qty) } : l,
      );
    }

    case "setQty":
      if (action.qty < 1) return lines.filter((l) => l.id !== action.id);
      return lines.map((l) =>
        l.id === action.id ? { ...l, qty: clamp(action.qty) } : l,
      );

    case "remove":
      return lines.filter((l) => l.id !== action.id);

    case "clear":
      return [];

    // No tocan las líneas: el modo de entrega se resuelve en `reducer`.
    case "setDelivery":
      return lines;
  }
}

function reduceDelivery(
  delivery: State["delivery"],
  action: Action,
): State["delivery"] {
  if (action.type === "hydrate" || action.type === "setDelivery") {
    return action.delivery;
  }
  // Vaciar el pedido no descarta la elección de entrega: sigue vigente para el
  // próximo pedido, igual que el número de WhatsApp.
  return delivery;
}

function reducer(state: State, action: Action): State {
  return {
    lines: reduceLines(state.lines, action),
    delivery: reduceDelivery(state.delivery, action),
    hydrated: state.hydrated || action.type === "hydrate",
  };
}

interface StoredCart {
  lines: CartLine[];
  delivery: DeliveryMethodId | null;
}

/** Sanea las líneas guardadas. Cualquier entrada corrupta se descarta. */
function sanitizeLines(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): CartLine[] => {
    if (typeof entry !== "object" || entry === null) return [];
    const { id, qty } = entry as { id?: unknown; qty?: unknown };
    if (typeof id !== "string" || !catalog.has(id)) return [];
    if (typeof qty !== "number" || !Number.isFinite(qty) || qty < 1) return [];
    return [{ id, qty: clamp(qty) }];
  });
}

/**
 * Lee y sanea el pedido guardado (v2: `{ lines, delivery }`). Cualquier dato
 * corrupto o un formato viejo (v1 era un array plano, bajo otra key) vale como
 * pedido vacío sin entrega elegida.
 */
function readStorage(): StoredCart {
  const empty: StoredCart = { lines: [], delivery: null };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return empty;
    const { lines, delivery } = parsed as {
      lines?: unknown;
      delivery?: unknown;
    };
    return {
      lines: sanitizeLines(lines),
      delivery:
        typeof delivery === "string" && deliveryIds.has(delivery as DeliveryMethodId)
          ? (delivery as DeliveryMethodId)
          : null,
    };
  } catch {
    return empty;
  }
}

interface CartContextValue {
  /** Líneas del pedido ya resueltas contra el catálogo. */
  items: CheckoutItem[];
  /** Unidades totales (bultos, no dinero). */
  count: number;
  /** Modo de entrega elegido; `null` hasta que el usuario elija. */
  delivery: DeliveryMethodId | null;
  setDelivery: (delivery: DeliveryMethodId) => void;
  /**
   * `false` hasta leer localStorage. El contador no debe pintar un número
   * antes de esto: el server no conoce el pedido y la hidratación no matchea.
   */
  hydrated: boolean;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [{ lines, delivery, hydrated }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const [isOpen, setIsOpen] = useState(false);

  // Hidratar después del primer render (no en el estado inicial): en SSR no hay
  // localStorage y sembrarlo acá desincronizaría el HTML del server.
  useEffect(() => {
    const stored = readStorage();
    dispatch({ type: "hydrate", lines: stored.lines, delivery: stored.delivery });
  }, []);

  // Persistir. Guardado por `hydrated`: sin eso, el estado vacío del primer
  // render pisaría el pedido guardado antes de llegar a leerlo.
  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: StoredCart = { lines, delivery };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage lleno o bloqueado (modo privado): el pedido sigue vivo en
      // memoria, solo no sobrevive al refresh. No hay nada que avisarle al usuario.
    }
  }, [lines, delivery, hydrated]);

  const add = useCallback(
    (product: Product, qty = 1) => dispatch({ type: "add", id: product.id, qty }),
    [],
  );
  const setQty = useCallback(
    (id: string, qty: number) => dispatch({ type: "setQty", id, qty }),
    [],
  );
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const setDelivery = useCallback(
    (delivery: DeliveryMethodId) => dispatch({ type: "setDelivery", delivery }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const items = useMemo(
    () =>
      lines.flatMap((line): CheckoutItem[] => {
        const product = catalog.get(line.id);
        return product ? [{ product, qty: line.qty }] : [];
      }),
    [lines],
  );

  const value = useMemo(
    () => ({
      items,
      count: totalUnits(items),
      delivery,
      setDelivery,
      hydrated,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart,
      closeCart,
    }),
    [
      items,
      delivery,
      setDelivery,
      hydrated,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
