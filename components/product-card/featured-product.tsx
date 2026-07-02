"use client";

import Image from "next/image";
import type { Product } from "@/lib/data/products";
import { accentVar, productImage, whatsappUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useProductDetail } from "@/components/product-detail/product-detail-provider";

/**
 * Card destacada horizontal — para el producto estrella de una línea
 * (ej. Agua de Coco). Imagen a un lado, ficha ampliada al otro.
 */
export function FeaturedProduct({ product }: { product: Product }) {
  const { open } = useProductDetail();
  const accent = accentVar(product.accent);
  const orderMessage = `¡Hola Fermento! Quiero pedir ${product.name} (${product.size}) 🌱`;

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className="group relative grid overflow-hidden border border-ink/10 bg-cream/60 md:grid-cols-2"
    >
      {/* Barra de acento lateral */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-full w-1"
        style={{ backgroundColor: accent }}
      />

      {/* Media — clickable, abre el detalle */}
      <button
        type="button"
        onClick={() => open(product)}
        aria-label={`Ver detalle de ${product.name}`}
        className="relative aspect-[4/3] overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 md:aspect-auto md:min-h-[26rem]"
        style={{ outlineColor: accent }}
      >
        <Image
          src={productImage(product)}
          alt={`${product.name} — ${product.size}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </button>

      {/* Ficha */}
      <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {product.badges.map((b) => (
            <Badge key={b} color={accent}>
              {b}
            </Badge>
          ))}
        </div>

        <h3 className="font-display text-4xl leading-tight text-forest-deep lg:text-5xl">
          {product.name}
        </h3>

        <p className="max-w-md text-base leading-relaxed text-ink/75">
          {product.description}
        </p>

        {/* Notas de sabor / propiedades */}
        <ul className="flex flex-wrap gap-2">
          {product.notes.map((note) => (
            <li
              key={note}
              className="flex items-center gap-1.5 text-sm text-ink/70"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rotate-45"
                style={{ backgroundColor: accent }}
              />
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ButtonLink
            href={whatsappUrl(orderMessage)}
            variant="primary"
            external
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir por WhatsApp
          </ButtonLink>
          <button
            type="button"
            onClick={() => open(product)}
            className="text-sm font-semibold underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            style={{ color: accent }}
          >
            Ver detalle
          </button>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/55">
            {product.size}
          </span>
        </div>
      </div>
    </article>
  );
}
