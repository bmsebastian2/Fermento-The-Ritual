import Image from "next/image";
import type { Product } from "@/lib/data/products";
import { accentVar, whatsappUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { BottleGlyph } from "@/components/ui/bottle-glyph";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Placeholder por color de acento — mientras no haya foto recortada. */
function ColorPlaceholder({ product }: { product: Product }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={{
        background:
          "linear-gradient(165deg, color-mix(in srgb, var(--accent) 24%, var(--color-cream)), var(--color-cream))",
      }}
    >
      <BottleGlyph
        className="h-3/5 w-auto opacity-70 transition-transform duration-500 group-hover:scale-105"
        color="color-mix(in srgb, var(--accent) 72%, var(--color-ink))"
      />
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
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

      {/* Media — más bajo en mobile para acortar el scroll del catálogo. */}
      <div className="relative aspect-[3/2] overflow-hidden sm:aspect-[4/5]">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} — ${product.size}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <ColorPlaceholder product={product} />
        )}

        {product.seasonal && (
          <span
            className="absolute left-0 top-3 py-1 pl-3 pr-4 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cream"
            style={{ backgroundColor: accent }}
          >
            Temporada
          </span>
        )}
      </div>

      {/* Cuerpo */}
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

        {/* Pie: tamaño + CTA por producto */}
        <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-3">
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
      </div>
    </article>
  );
}
