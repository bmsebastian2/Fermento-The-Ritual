import Image from "next/image";
import { accentVar, whatsappUrl } from "@/lib/site";
import { StampLabel } from "@/components/ui/stamp-label";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { BreadIcon, type BreadIconName } from "@/components/ui/bread-icons";

/**
 * Teaser "Próximamente" de la colección de Panes sin gluten (The Ritual).
 * NO es una card de catálogo: no hay precios ni SKUs todavía, así que no se
 * fuerza `ProductCard`. Panel editorial con el copy y la foto de la lámina de
 * marca (recorte limpio de la canasta, sin texto — igual que Agua de Coco).
 * Un solo acento `dessert` (aprobado en CLAUDE.md).
 */

// Beneficios — copy textual del flyer (imagen de referencia).
const BENEFITS: { icon: BreadIconName; title: string; body: string }[] = [
  { icon: "gluten-free", title: "Sin gluten", body: "100% libres de gluten." },
  {
    icon: "natural",
    title: "Ingredientes naturales",
    body: "Seleccionados por su calidad y pureza.",
  },
  {
    icon: "artisan",
    title: "Hechos con amor",
    body: "Recetas artesanales que nutren y reconfortan.",
  },
  {
    icon: "flavor",
    title: "Sabor que nutre",
    body: "Textura perfecta, sabor auténtico, siempre.",
  },
];

// La colección que viene — cada pan con su ícono monolínea.
const TYPES: { icon: BreadIconName; label: string }[] = [
  { icon: "seeds", label: "Pan de semillas" },
  { icon: "rustic", label: "Pan rústico" },
  { icon: "multigrain", label: "Pan multigrano" },
  { icon: "pan-loaf", label: "Pan de molde" },
];

const NOTIFY_MESSAGE =
  "¡Hola Fermento! Avísenme cuando salgan los panes sin gluten de The Ritual 🍞";

export function BreadTeaser() {
  const accent = accentVar("dessert");

  return (
    <article
      style={{ ["--accent" as string]: accent }}
      className="relative isolate overflow-hidden border border-dessert/25 bg-cream"
    >
      {/* Wash de acento cálido detrás de la columna de imagen (no plano). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full lg:w-1/2"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-dessert) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:p-14">
        {/* ── Columna de anuncio ───────────────────────────────────────── */}
        <div className="order-2 lg:order-1">
          <StampLabel align="left" color={accent}>
            The Ritual · Próximamente
          </StampLabel>

          <h3 className="mt-5 font-display text-5xl leading-[0.95] text-forest-deep lg:text-6xl">
            Panes sin gluten
          </h3>

          <p className="mt-4 text-lg font-medium" style={{ color: accent }}>
            Artesanales, nutritivos y deliciosos.
          </p>

          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/75">
            Pan artesanal elaborado con ingredientes reales y métodos
            tradicionales para un sabor y textura excepcionales.
          </p>

          {/* Beneficios — ícono monolínea en círculo + título + bajada. */}
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li key={b.title} className="flex gap-3.5">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    color: accent,
                    borderColor:
                      "color-mix(in srgb, var(--color-dessert) 45%, transparent)",
                  }}
                >
                  <BreadIcon name={b.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-forest">
                    {b.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ButtonLink href={whatsappUrl(NOTIFY_MESSAGE)} variant="primary" external>
              <WhatsAppIcon className="h-4 w-4" />
              Avisame cuando estén
            </ButtonLink>
            <span className="max-w-[16rem] text-sm italic leading-snug text-ink/55">
              Ritual es más que pan, es un ritual de bienestar.
            </span>
          </div>
        </div>

        {/* ── Columna de imagen — canasta de panes (recorte limpio) ─────── */}
        <div className="relative order-1 mx-auto w-full max-w-xs lg:order-2 lg:max-w-sm">
          {/* Halo de acento — despega la canasta del fondo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 45%, color-mix(in srgb, var(--color-dessert) 34%, transparent), transparent 75%)",
            }}
          />
          <div
            className="overflow-hidden rounded-[4px]"
            style={{
              boxShadow:
                "22px 30px 60px -22px color-mix(in srgb, var(--color-forest-deep) 42%, transparent)",
            }}
          >
            <Image
              src="/products/panes.webp"
              alt="Canasta de panes artesanales con semillas — colección Ritual, próximamente"
              width={409}
              height={884}
              sizes="(max-width: 1024px) 20rem, 24rem"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── Tira de la colección que viene ─────────────────────────────── */}
      <div className="border-t border-dessert/25 bg-dessert/[0.06] px-7 py-5 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink/50">
            Próximamente
          </span>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-1 sm:justify-between">
            {TYPES.map((t) => (
              <li key={t.label} className="flex items-center gap-2.5">
                <BreadIcon
                  name={t.icon}
                  className="h-5 w-5 shrink-0 text-dessert"
                />
                <span className="text-[0.8125rem] font-medium text-forest">
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
