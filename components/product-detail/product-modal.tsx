"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { getCategory, lines } from "@/lib/data/products";
import { accentVar, whatsappUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { StampLabel } from "@/components/ui/stamp-label";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { ProductMedia } from "@/components/product-card/product-media";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";

/** Paso de cantidad — cuadrado, mismo idioma que el stepper del drawer. */
function StepButton({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-9 items-center justify-center text-ink/70 transition-colors hover:bg-forest/[0.06] hover:text-forest disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-forest"
    >
      {children}
    </button>
  );
}

export function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const accent = accentVar(product.accent);
  const category = getCategory(product.categoryId);
  const lineName = lines.find((l) => l.id === product.line)?.name ?? "";
  const orderMessage = `¡Hola Fermento! Quiero pedir ${product.name} (${product.size}) 🌱`;

  return (
    <div className="relative flex max-h-[85vh] flex-col overflow-y-auto sm:max-h-[85vh]">
      {/* Barra de acento superior */}
      <span
        aria-hidden="true"
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: accent }}
      />

      {/* Botón cerrar — siempre visible */}
      <button
        type="button"
        onClick={onClose}
        autoFocus
        aria-label="Cerrar detalle"
        className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream/80 text-ink shadow-sm ring-1 ring-ink/10 backdrop-blur transition-colors hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ outlineColor: accent }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <div className="grid sm:grid-cols-2">
        {/* Imagen — lámina completa (object-contain) sobre tinte del acento */}
        <div
          className="relative h-48 shrink-0 sm:h-auto sm:min-h-[26rem]"
          style={{
            background:
              "linear-gradient(165deg, color-mix(in srgb, var(--accent, transparent) 16%, var(--color-cream)), var(--color-cream))",
            ["--accent" as string]: accent,
          }}
        >
          <ProductMedia
            product={product}
            sizes="(max-width: 640px) 100vw, 384px"
            imageClassName="object-cover object-center"
          />
          {product.seasonal && (
            <span
              className="absolute left-0 top-4 py-1 pl-3 pr-4 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cream"
              style={{ backgroundColor: accent }}
            >
              Temporada
            </span>
          )}
        </div>

        {/* Ficha */}
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <StampLabel align="left" color={accent}>
            {lineName}
            {category ? ` · ${category.name}` : ""}
          </StampLabel>

          <h2
            id="product-modal-title"
            className="font-display text-4xl leading-tight text-forest-deep"
          >
            {product.name}
          </h2>

          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {product.badges.map((b) => (
              <Badge key={b} color={accent}>
                {b}
              </Badge>
            ))}
          </div>

          {/* Descripción (verbatim del catálogo) */}
          <p className="text-base leading-relaxed text-ink/80">
            {product.description}
          </p>

          {/* Notas / ingredientes */}
          {product.notes.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                Notas
              </h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <li
                    key={note}
                    className="flex items-center gap-1.5 text-sm text-ink/75"
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
            </div>
          )}

          {/* Propiedades (blurb de categoría, verbatim) + conservación */}
          {category && (
            <div className="border-t border-ink/10 pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/50">
                Propiedades
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                {category.blurb}
              </p>
              {category.care && (
                <p className="mt-2 text-xs text-ink/50">{category.care}</p>
              )}
            </div>
          )}

          {/* Alérgenos (verbatim, solo postres) */}
          {product.contains && (
            <p className="text-xs italic text-ink/55">{product.contains}</p>
          )}

          {/* Cantidad + CTA. Agregar es la acción principal; el WhatsApp
              directo queda como salida secundaria para pedir solo este. */}
          <div className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-5">
            <div className="flex items-stretch gap-3">
              <div className="flex items-center border border-ink/15">
                <StepButton
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  label="Quitar una unidad"
                  disabled={qty <= 1}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </StepButton>
                <span
                  aria-live="polite"
                  className="min-w-8 text-center text-sm font-semibold tabular-nums text-forest-deep"
                >
                  {qty}
                </span>
                <StepButton
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  label="Agregar una unidad"
                  disabled={qty >= 99}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </StepButton>
              </div>

              {/* openOnAdd={false}: abrir el drawer acá apilaría dos <dialog>.
                  Confirma en el botón y sube el contador del nav. */}
              <AddToCartButton
                product={product}
                qty={qty}
                variant="primary"
                openOnAdd={false}
                className="flex-1"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <ButtonLink
                href={whatsappUrl(orderMessage)}
                variant="outline"
                external
                className="px-4 py-2 text-xs"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Pedí solo este
              </ButtonLink>
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-ink/55">
                {product.size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
