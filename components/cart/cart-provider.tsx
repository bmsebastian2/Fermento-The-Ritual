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

/**
 * Estado del pedido — client-side, persistido en localStorage.
 *
 * Guarda solo `{ id, qty }`: `products.ts` sigue siendo la fuente de verdad y
 * el producto se resuelve por id en cada render. Así el carrito nunca sirve
 * copias viejas de copy, tamaño ni acento, y no duplica precios (que además no
 * existen todavía). Si un id desaparece del catálogo, la línea se descarta al
 * hidratar en vez de romper.
 */

const STORAGE_KEY = "fermento.cart.v1";
const MAX_QTY = 99;

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
  hydrated: boolean;
}

const initialState: State = { lines: [], hydrated: false };

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; id: string; qty: number }
  | { type: "setQty"; id: string; qty: number }
  | { type: "remove"; id: string }
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
  }
}

function reducer(state: State, action: Action): State {
  return {
    lines: reduceLines(state.lines, action),
    hydrated: state.hydrated || action.type === "hydrate",
  };
}

/** Lee y sanea el pedido guardado. Cualquier dato corrupto vale como vacío. */
function readStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { id, qty } = entry as { id?: unknown; qty?: unknown };
      if (typeof id !== "string" || !catalog.has(id)) return [];
      if (typeof qty !== "number" || !Number.isFinite(qty) || qty < 1) return [];
      return [{ id, qty: clamp(qty) }];
    });
  } catch {
    return [];
  }
}

interface CartContextValue {
  /** Líneas del pedido ya resueltas contra el catálogo. */
  items: CheckoutItem[];
  /** Unidades totales (bultos, no dinero). */
  count: number;
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
  const [{ lines, hydrated }, dispatch] = useReducer(reducer, initialState);
  const [isOpen, setIsOpen] = useState(false);

  // Hidratar después del primer render (no en el estado inicial): en SSR no hay
  // localStorage y sembrarlo acá desincronizaría el HTML del server.
  useEffect(() => {
    dispatch({ type: "hydrate", lines: readStorage() });
  }, []);

  // Persistir. Guardado por `hydrated`: sin eso, el [] del primer render
  // pisaría el pedido guardado antes de llegar a leerlo.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage lleno o bloqueado (modo privado): el pedido sigue vivo en
      // memoria, solo no sobrevive al refresh. No hay nada que avisarle al usuario.
    }
  }, [lines, hydrated]);

  const add = useCallback(
    (product: Product, qty = 1) => dispatch({ type: "add", id: product.id, qty }),
    [],
  );
  const setQty = useCallback(
    (id: string, qty: number) => dispatch({ type: "setQty", id, qty }),
    [],
  );
  const remove = useCallback((id: string) => dispatch({ type: "remove", id }), []);
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
      hydrated,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      openCart,
      closeCart,
    }),
    [items, hydrated, add, setQty, remove, clear, isOpen, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
