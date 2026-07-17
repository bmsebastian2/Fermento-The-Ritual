"use client";

import Image from "next/image";
import type { Category, Product } from "@/lib/data/products";
import { accentVar, productImage } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { StampLabel } from "@/components/ui/stamp-label";
import { CocoIcon, type CocoIconName } from "@/components/ui/coco-icons";
import { PalmFrond } from "@/components/hero/palm-frond";
import { useProductDetail } from "@/components/product-detail/product-detail-provider";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

/**
 * Spread editorial del Agua de Coco (producto estrella de The Ritual).
 * Traduce la lámina de marca (grilla de beneficios + producto sobre textura)
 * al sistema de diseño: un solo acento `coco`, íconos monolínea, tipografía de
 * lámina para los beneficios. Reemplaza a la card genérica solo para este SKU.
 */

// Beneficios curados del flyer (respaldo de marca), solo título en versalitas.
const BENEFITS: { icon: CocoIconName; label: string }[] = [
  { icon: "drop", label: "Hidratación natural" },
  { icon: "coconut", label: "Electrolitos naturales" },
  { icon: "sprout", label: "100% pura y real" },
  { icon: "sun", label: "Energía natural" },
  { icon: "sprig", label: "Fuente de vitaminas" },
  { icon: "ring", label: "Bienestar integral" },
];

// Tira de atributos al pie — lenguaje de etiqueta física.
const ATTRS: { icon: CocoIconName; label: string }[] = [
  { icon: "flask", label: "Sin aditivos" },
  { icon: "leaf", label: "Orgánico" },
  { icon: "no-sugar", label: "Sin azúcar añadida" },
  { icon: "snowflake", label: "Mantener refrigerado" },
];

export function CocoFeature({
  category,
  product,
}: {
  category: Category;
  product: Product;
}) {
  const { open } = useProductDetail();
  const accent = accentVar(product.accent);

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className="relative isolate overflow-hidden border border-coco/25 bg-cream"
    >
      {/* Wash de acento sutil detrás de la columna de producto (no plano). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-1/2"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-coco) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-2 lg:gap-6 lg:p-14">
        {/* ── Columna de contenido ─────────────────────────────────────── */}
        <div className="order-2 lg:order-1">
          <StampLabel align="left" color={accent}>
            The Ritual · Hidratación pura
          </StampLabel>

          <h3 className="mt-5 font-display text-5xl leading-[0.95] text-forest-deep lg:text-6xl">
            Agua de Coco
          </h3>

          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">
            {category.blurb}
          </p>

          {/* Grilla de beneficios — ícono monolínea en círculo + título. */}
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {BENEFITS.map((b) => (
              <li key={b.label} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    color: accent,
                    borderColor:
                      "color-mix(in srgb, var(--color-coco) 45%, transparent)",
                  }}
                >
                  <CocoIcon name={b.icon} className="h-6 w-6" />
                </span>
                <span className="text-[0.8125rem] font-semibold uppercase leading-tight tracking-[0.06em] text-forest">
                  {b.label}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <AddToCartButton product={product} variant="primary" />
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

        {/* ── Columna de producto — protagonista ───────────────────────── */}
        <div className="relative order-1 mx-auto w-full max-w-xs lg:order-2 lg:max-w-sm">
          {/* Palma detrás — profundidad botánica (lenguaje de marca). */}
          <PalmFrond
            className="pointer-events-none absolute -z-10 text-coco/40"
            style={{
              top: "-8%",
              right: "-16%",
              width: "52%",
              transform: "scaleX(-1) rotate(-14deg)",
            }}
          />
          {/* Halo de acento — despega la lata del fondo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, var(--color-coco) 40%, transparent), transparent 75%)",
            }}
          />

          <button
            type="button"
            onClick={() => open(product)}
            aria-label={`Ver detalle de ${product.name}`}
            className="coco-media-trigger block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            style={{ outlineColor: accent }}
          >
            <div className="coco-media overflow-hidden rounded-[4px]">
              <Image
                src={productImage(product) ?? "/products/agua-de-coco.webp"}
                alt={`${product.name} The Ritual sobre madera, con cocos frescos`}
                width={582}
                height={838}
                sizes="(max-width: 1024px) 20rem, 24rem"
                className="h-auto w-full object-cover"
              />
            </div>
          </button>

          {/* Sombra de contacto — apoya la lata sobre la superficie; se ensancha
              al levantarse (hermana del trigger vía `~ .coco-shadow`). */}
          <div
            aria-hidden="true"
            className="coco-shadow absolute inset-x-8 -z-10 h-6 rounded-[100%] blur-xl"
            style={{
              bottom: "1.5rem",
              background:
                "color-mix(in srgb, var(--color-forest-deep) 45%, transparent)",
            }}
          />

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {product.badges.map((b) => (
              <Badge key={b} color={accent}>
                {b}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tira de atributos — reglas finas, lenguaje de etiqueta ─────── */}
      {/* gap-px + bg de acento → hairlines entre celdas a cualquier breakpoint. */}
      <ul className="grid grid-cols-2 gap-px border-t border-coco/25 bg-coco/20 sm:grid-cols-4">
        {ATTRS.map((a) => (
          <li
            key={a.label}
            className="flex items-center gap-2.5 bg-cream px-5 py-4 sm:justify-center"
          >
            <CocoIcon name={a.icon} className="h-5 w-5 shrink-0 text-coco" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.09em] text-forest">
              {a.label}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
