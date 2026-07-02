"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Product } from "@/lib/data/products";
import { ProductModal } from "@/components/product-detail/product-modal";

interface ProductDetailContextValue {
  open: (product: Product) => void;
}

const ProductDetailContext = createContext<ProductDetailContextValue | null>(
  null,
);

export function useProductDetail(): ProductDetailContextValue {
  const ctx = useContext(ProductDetailContext);
  if (!ctx) {
    throw new Error("useProductDetail debe usarse dentro de ProductDetailProvider");
  }
  return ctx;
}

/**
 * Provee el detalle de producto como un único <dialog> nativo compartido.
 * El <dialog> aporta foco atrapado, Esc y devolución de foco de forma nativa;
 * acá agregamos animación de entrada/salida, cierre por backdrop y scroll-lock.
 */
export function ProductDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((p: Product) => setProduct(p), []);

  // Abrir el modal recién cuando el contenido ya está montado.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (product && dialog && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => setVisible(true));
    }
  }, [product]);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    const finish = () => {
      dialog?.close();
      document.body.style.overflow = "";
      setProduct(null);
    };
    setVisible(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) finish();
    else window.setTimeout(finish, 240);
  }, []);

  return (
    <ProductDetailContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        data-visible={visible}
        aria-labelledby="product-modal-title"
        onCancel={(e) => {
          // Esc: cancelamos el cierre nativo instantáneo para animar la salida.
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className={`m-0 mt-auto w-full max-w-none overflow-hidden rounded-t-2xl bg-cream p-0 text-ink shadow-2xl backdrop:bg-transparent sm:m-auto sm:max-w-3xl sm:rounded-xl transition-[transform,opacity] duration-300 ease-out ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-full opacity-0 sm:translate-y-0 sm:scale-95"
        }`}
      >
        {product && <ProductModal product={product} onClose={close} />}
      </dialog>
    </ProductDetailContext.Provider>
  );
}
