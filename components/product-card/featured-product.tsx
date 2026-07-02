import Image from "next/image";
import type { Product } from "@/lib/data/products";
import { accentVar, whatsappUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { BottleGlyph } from "@/components/ui/bottle-glyph";

/**
 * Card destacada horizontal — para el producto estrella de una línea
 * (ej. Agua de Coco). Imagen a un lado, ficha ampliada al otro.
 */
export function FeaturedProduct({ product }: { product: Product }) {
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

      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[26rem]">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} — ${product.size}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{
              background:
                "linear-gradient(165deg, color-mix(in srgb, var(--accent) 24%, var(--color-cream)), var(--color-cream))",
            }}
          >
            <BottleGlyph
              className="h-2/5 w-auto opacity-70"
              color="color-mix(in srgb, var(--accent) 72%, var(--color-ink))"
            />
          </div>
        )}
      </div>

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

        <div className="mt-2 flex items-center gap-5">
          <ButtonLink
            href={whatsappUrl(orderMessage)}
            variant="primary"
            external
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pedir por WhatsApp
          </ButtonLink>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/55">
            {product.size}
          </span>
        </div>
      </div>
    </article>
  );
}
