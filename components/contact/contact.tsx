import { StampLabel } from "@/components/ui/stamp-label";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  whatsappUrl,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/site";

const CREAM = "var(--color-cream)";

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
            "radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--color-coco) 22%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <StampLabel color={CREAM}>Hacé tu pedido</StampLabel>
        </div>

        <h2 className="mt-6 font-display text-5xl leading-[0.95] lg:text-6xl">
          ¿Listo para algo vivo?
        </h2>

        <p className="mx-auto mt-5 max-w-md text-lg text-cream/80">
          Escribinos por WhatsApp y armamos tu pedido. Bebidas fermentadas
          frescas, hechas a mano en Managua.
        </p>

        <div className="mt-9 flex justify-center">
          <ButtonLink
            href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
            variant="cream"
            external
            className="px-8 py-4 text-base"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Pedí por WhatsApp
          </ButtonLink>
        </div>

        {/* Datos de contacto */}
        <div className="mt-10 flex flex-col items-center gap-2 text-sm text-cream/70 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cream"
          >
            +505 7603-5477
          </a>
          <span aria-hidden="true" className="hidden sm:inline text-cream/30">
            ·
          </span>
          <a
            href="mailto:info@fermentotheritual.com"
            className="transition-colors hover:text-cream"
          >
            info@fermentotheritual.com
          </a>
          <span aria-hidden="true" className="hidden sm:inline text-cream/30">
            ·
          </span>
          <span>Managua, Nicaragua</span>
        </div>
      </div>
    </section>
  );
}
