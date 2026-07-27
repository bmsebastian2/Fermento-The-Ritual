import { Bubbles } from "@/components/hero/bubbles";
import { PalmFrond } from "@/components/hero/palm-frond";
import { BottleCluster } from "@/components/hero/bottle-cluster";
import { StampLabel } from "@/components/ui/stamp-label";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon, ArrowDownIcon } from "@/components/ui/icons";
import { whatsappUrl, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden px-6 pt-28 pb-16 md:pt-32 lg:pb-24"
    >
      <Bubbles />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Columna de texto */}
        <div className="max-w-xl">
          <div className="hero-in" style={{ animationDelay: "0ms" }}>
            <StampLabel align="left">
              Bebidas fermentadas vivas · Nicaragua
            </StampLabel>
          </div>

          <h1 className="mt-7 font-display font-semibold text-forest leading-[0.92] tracking-tight">
            <span
              className="hero-in block text-6xl font-bold italic sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "120ms" }}
            >
              Vivo.
            </span>
            <span
              className="hero-in block text-6xl sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "220ms" }}
            >
              Natural.
            </span>
            <span
              className="hero-in block text-6xl sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "320ms" }}
            >
              Real.
            </span>
          </h1>

          <p
            className="hero-in mt-7 max-w-md text-lg leading-relaxed text-ink/80"
            style={{ animationDelay: "450ms" }}
          >
            Kombucha, kéfir, cold brew y bebidas funcionales — fermentadas a
            mano en Managua, con cultivos vivos y materia prima real.
          </p>

          <div
            className="hero-in mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "560ms" }}
          >
            <ButtonLink href="#fermento" variant="primary">
              Ver catálogo
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
              variant="outline"
              external
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedí por WhatsApp
            </ButtonLink>
            <a
              href="#galeria"
              className="group/gal self-center text-sm font-medium text-forest/70 underline-offset-4 transition-colors hover:text-forest"
            >
              Ver la galería
              <span
                aria-hidden="true"
                className="ml-1 inline-block transition-transform group-hover/gal:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Columna de producto: familia de botellas, no un envase único. */}
        <div
          className="hero-in relative mx-auto w-full max-w-md lg:max-w-xl"
          style={{ animationDelay: "260ms" }}
        >
          {/* Frondas de palma — capa de profundidad botánica, abren desde las
              esquinas superiores por detrás del grupo (lenguaje de marca). */}
          <PalmFrond
            className="pointer-events-none absolute -z-10 text-forest/25"
            style={{
              top: "-9%",
              left: "-14%",
              width: "44%",
              transform: "rotate(-18deg)",
            }}
          />
          <PalmFrond
            className="pointer-events-none absolute -z-10 text-coco/40"
            style={{
              top: "-12%",
              right: "-12%",
              width: "38%",
              transform: "scaleX(-1) rotate(-14deg)",
            }}
          />

          <BottleCluster />

          <div className="mt-3 flex items-center justify-between">
            <Badge color="var(--color-forest)">Fermento</Badge>
            <Badge color="var(--color-coco)">The Ritual</Badge>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#fermento"
        className="relative z-10 mx-auto mt-14 flex w-fit flex-col items-center gap-1 text-forest/60 transition-colors hover:text-forest"
        aria-label="Ir al catálogo"
      >
        <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em]">
          Catálogo
        </span>
        <ArrowDownIcon className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
