import { StampLabel } from "@/components/ui/stamp-label";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { PalmFrond } from "@/components/hero/palm-frond";
import { Reveal } from "@/components/ui/reveal";
import {
  whatsappUrl,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/site";

const CREAM = "var(--color-cream)";

/** Rombo del sello letterpress — separador de la línea de datos. */
function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="h-1 w-1 shrink-0 rotate-45 bg-cream/30"
    />
  );
}

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative isolate scroll-mt-24 overflow-hidden bg-forest px-6 py-24 text-cream lg:py-32"
    >
      {/* Glow ambiente sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--color-coco) 18%, transparent), transparent 70%)",
        }}
      />

      {/* Palma — marca de agua botánica (mismo lenguaje que hero/footer),
          baja y detrás del CTA para no chocar con las frondas del footer. */}
      <PalmFrond
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 text-cream/[0.07]"
        style={{
          bottom: "-14%",
          left: "50%",
          width: "min(30rem,86%)",
          transform: "translateX(-50%) rotate(6deg)",
        }}
      />

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <Reveal>
          <StampLabel color={CREAM}>Hacé tu pedido</StampLabel>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] lg:text-6xl">
            ¿Listo para algo <span className="italic">vivo</span>?
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-5 max-w-md text-lg text-cream/80">
            Te armamos tu pedido por WhatsApp — bebidas fermentadas frescas,
            hechas a mano en Managua.
          </p>
        </Reveal>

        {/* CTA protagonista: botón claro grande + bead de cultivo vivo que late */}
        <Reveal delay={200} className="mt-10">
          <div className="flex flex-col items-center gap-4">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coco opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coco" />
            </span>
            <ButtonLink
              href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
              variant="cream"
              external
              className="px-9 py-4 text-base sm:px-10 sm:py-[1.15rem] sm:text-lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pedí por WhatsApp
            </ButtonLink>
          </div>
        </Reveal>

        {/* Datos de contacto — línea letterpress con diamantes del sello */}
        <Reveal delay={260} className="mt-10">
          <div className="flex flex-col items-center gap-2 text-sm text-cream/70 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              +505 7603-5477
            </a>
            <Diamond />
            <a
              href="mailto:info@fermentotheritual.com"
              className="transition-colors hover:text-cream"
            >
              info@fermentotheritual.com
            </a>
            <Diamond />
            <span>Managua, Nicaragua</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
