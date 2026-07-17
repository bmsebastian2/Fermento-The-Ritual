"use client";

import Image from "next/image";
import type { Category, Product } from "@/lib/data/products";
import { accentVar } from "@/lib/site";
import { StampLabel } from "@/components/ui/stamp-label";
import { BenefitIcon } from "@/components/ui/benefit-icons";
import { ShotBottle } from "@/components/ui/shot-bottle";
import { PalmFrond } from "@/components/hero/palm-frond";
import { Reveal } from "@/components/ui/reveal";
import { useProductDetail } from "@/components/product-detail/product-detail-provider";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

/**
 * Spread editorial de los Wellness Shots (The Ritual).
 * Cada shot es una ficha de altura uniforme: a la izquierda, la botella
 * ilustrada (líquido en el color del jugo) parada sobre su acuarela de
 * ingredientes y un halo del acento — presencia real de producto embotellado;
 * a la derecha, notas, descripción (copy de la lámina) y tres beneficios
 * funcionales con ícono monolínea botánico. Reemplaza a la grilla genérica.
 */

function ShotRow({ product }: { product: Product }) {
  const { open } = useProductDetail();
  const accent = accentVar(product.accent);

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className="group relative isolate flex h-full min-h-[320px] overflow-hidden border border-ink/10 bg-cream/70 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-deep/10"
    >
      {/* Acento del sabor: barra lateral izquierda. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 h-full w-1"
        style={{ backgroundColor: accent }}
      />

      {/* Superficie clickable → abre el detalle. */}
      <button
        type="button"
        onClick={() => open(product)}
        aria-label={`Ver detalle de ${product.name}`}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2"
        style={{ outlineColor: accent }}
      />

      {/* ── Escenario: botella parada sobre sus ingredientes ──────────── */}
      <div className="relative flex shrink-0 basis-[43%] items-end justify-center overflow-hidden">
        {/* Halo de acento desde la base. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(72% 56% at 50% 64%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 72%)",
          }}
        />
        {/* Fronda botánica de fondo (lenguaje de marca). */}
        <PalmFrond
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            color: "color-mix(in srgb, var(--accent) 24%, transparent)",
            top: "4%",
            left: "-22%",
            width: "66%",
            transform: "rotate(6deg)",
          }}
        />
        {/* Acuarela de ingredientes — base still-life bajo la botella.
            Máscara radial: se funde con el escenario, sin borde de rectángulo. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] opacity-90 mix-blend-multiply"
          style={{
            maskImage:
              "radial-gradient(125% 108% at 50% 100%, #000 52%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(125% 108% at 50% 100%, #000 52%, transparent 82%)",
          }}
        >
          <Image
            src={`/products/${product.id}-ingredients.webp`}
            alt={`${product.name}: ${product.notes.join(", ")}`}
            fill
            sizes="(max-width: 1024px) 45vw, 22vw"
            className="object-cover object-bottom"
          />
        </div>
        {/* Botella — protagonista. Decorativa: deja pasar el click al overlay. */}
        <ShotBottle
          color={accent}
          className="pointer-events-none relative z-10 h-[90%] w-auto max-w-[78%] pt-4 transition-transform duration-500 group-hover:-translate-y-1"
          style={{
            filter:
              "drop-shadow(0 10px 12px color-mix(in srgb, var(--color-forest-deep) 24%, transparent))",
          }}
        />
      </div>

      {/* ── Ficha ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3.5 p-6 sm:p-7">
        <div>
          <h4 className="font-display text-2xl leading-tight text-forest-deep sm:text-[1.7rem]">
            {product.name}
          </h4>
          <p
            className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.09em]"
            style={{ color: accent }}
          >
            {product.notes.join(" · ")}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-ink/75">
          {product.description}
        </p>

        {/* Beneficios funcionales — ícono botánico en círculo + título. */}
        {product.benefits && (
          <ul className="mt-0.5 flex flex-col gap-2.5">
            {product.benefits.map((b) => (
              <li key={b.label} className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    color: accent,
                    borderColor:
                      "color-mix(in srgb, var(--accent) 45%, transparent)",
                  }}
                >
                  <BenefitIcon name={b.icon} className="h-4 w-4" />
                </span>
                <span className="text-xs font-semibold uppercase leading-tight tracking-[0.05em] text-forest">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Pie: tamaño + CTA (elevado sobre el overlay). */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink/10 pt-4">
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-ink/55">
            {product.size} · 2 oz
          </span>
          <AddToCartButton product={product} variant="compact" />
        </div>
      </div>
    </article>
  );
}

export function ShotsFeature({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  return (
    <div id="cat-shots" className="mt-14 scroll-mt-32 first:mt-0">
      <Reveal>
        <div className="mb-8 max-w-2xl">
          <StampLabel align="left">The Ritual · Wellness Shots</StampLabel>
          <div className="mt-4 flex items-baseline gap-3">
            <h3 className="font-display text-3xl text-forest sm:text-4xl">
              Wellness Shots
            </h3>
            {category.size && (
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/50">
                {category.size}
              </span>
            )}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            Pequeños en tamaño, grandes en beneficios. Fórmulas funcionales con
            ingredientes frescos, prensados en frío. {category.blurb}
          </p>
        </div>
      </Reveal>

      {/* auto-rows-fr empareja la altura de las cuatro fichas. */}
      <div className="grid auto-rows-fr gap-5 lg:grid-cols-2">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i, 4) * 80} className="h-full">
            <ShotRow product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
