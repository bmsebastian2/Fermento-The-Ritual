"use client";

import Image from "next/image";
import type { Product } from "@/lib/data/products";
import { accentVar, productImage, whatsappUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useProductDetail } from "@/components/product-detail/product-detail-provider";

export function ProductCard({ product }: { product: Product }) {
  const { open } = useProductDetail();
  const accent = accentVar(product.accent);
  const orderMessage = `¡Hola Fermento! Quiero pedir ${product.name} (${product.size}) 🌱`;

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className="group relative flex flex-col overflow-hidden border border-ink/10 bg-cream/60 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-deep/15"
    >
      {/* Barra de acento superior */}
      <span
        aria-hidden="true"
        className="h-1 w-full shrink-0"
        style={{ backgroundColor: accent }}
      />

      {/* Superficie clickable → abre el detalle. */}
      <button
        type="button"
        onClick={() => open(product)}
        aria-label={`Ver detalle de ${product.name}`}
        className="flex flex-1 flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
        style={{ outlineColor: accent }}
      >
        {/* Media — lámina de producto (WebP). object-top prioriza logo + sabor. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={productImage(product)}
            alt={`${product.name} — ${product.size}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />

          {product.seasonal && (
            <span
              className="absolute left-0 top-3 py-1 pl-3 pr-4 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cream"
              style={{ backgroundColor: accent }}
            >
              Temporada
            </span>
          )}
        </div>

        {/* Ficha resumida */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {product.badges.map((b) => (
              <Badge key={b} color={accent}>
                {b}
              </Badge>
            ))}
          </div>

          <h3 className="font-display text-2xl leading-tight text-forest-deep">
            {product.name}
          </h3>

          <p className="text-sm leading-relaxed text-ink/70">
            {product.notes.join(" · ")}
          </p>

          {product.contains && (
            <p className="text-xs italic text-ink/45">{product.contains}</p>
          )}
        </div>
      </button>

      {/* Pie: tamaño + CTA por producto (fuera del botón, sin anidar interactivos) */}
      <div className="flex items-center justify-between border-t border-ink/10 px-5 py-3">
        <span className="text-xs font-medium uppercase tracking-[0.1em] text-ink/55">
          {product.size}
        </span>
        <a
          href={whatsappUrl(orderMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-70"
          style={{ color: accent }}
          aria-label={`Pedir ${product.name} por WhatsApp`}
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Pedir
        </a>
      </div>
    </article>
  );
}
