import Image from "next/image";
import type { Product } from "@/lib/data/products";
import { accentVar, productImage } from "@/lib/site";

const LINE_NAME: Record<Product["line"], string> = {
  fermento: "Fermento",
  ritual: "The Ritual",
};

/**
 * Media de un producto — foto o placeholder, para cards y modal.
 *
 * Si el producto tiene render limpio (`image`), muestra la foto (fill).
 * Si no, cae a un placeholder letterpress teñido con el acento: wash diagonal
 * del color + rombo del sello de marca + nombre de la línea en display serif.
 * No es un bloque plano ni una "imagen faltante": es un plato de etiqueta
 * intencional. El contenedor debe ser `relative` (ambos casos lo llenan).
 */
export function ProductMedia({
  product,
  sizes,
  imageClassName = "object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]",
}: {
  product: Product;
  /** `sizes` de next/image para la variante con foto. */
  sizes: string;
  /** Clases de la <Image> (object-fit, hover). Ignorado por el placeholder. */
  imageClassName?: string;
}) {
  const src = productImage(product);
  const accent = accentVar(product.accent);

  if (src) {
    return (
      <Image
        src={src}
        alt={`${product.name} — ${product.size}`}
        fill
        sizes={sizes}
        className={imageClassName}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-2.5"
      style={{
        ["--accent" as string]: accent,
        background:
          "linear-gradient(155deg, color-mix(in srgb, var(--accent) 22%, var(--color-cream)), color-mix(in srgb, var(--accent) 7%, var(--color-cream)))",
      }}
    >
      {/* Rombo del sello letterpress (idioma de StampLabel), en tinta del acento. */}
      <span
        className="h-2.5 w-2.5 rotate-45"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <span className="font-display text-base leading-none text-forest-deep sm:text-lg">
        {LINE_NAME[product.line]}
      </span>
    </div>
  );
}
