import Image from "next/image";
import { Bubbles } from "@/components/hero/bubbles";
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

          <h1 className="mt-7 font-display text-forest leading-[0.92] tracking-tight">
            <span
              className="hero-in block text-6xl sm:text-7xl lg:text-8xl"
              style={{ animationDelay: "120ms" }}
            >
              Vivo.
            </span>
            <span
              className="hero-in block text-6xl italic sm:text-7xl lg:text-8xl"
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
          </div>
        </div>

        {/* Columna de producto */}
        <div
          className="hero-in relative mx-auto w-full max-w-sm lg:max-w-md"
          style={{ animationDelay: "260ms" }}
        >
          {/* Halo de acento coco detrás de la botella */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 translate-y-6 scale-90 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-coco) 45%, transparent), transparent 70%)",
            }}
          />
          <div className="overflow-hidden rounded-[4px] shadow-2xl shadow-forest-deep/25 ring-1 ring-forest/10">
            <Image
              src="/products/agua-de-coco.jpg"
              alt="Lata de Agua de Coco The Ritual sobre madera, con cocos frescos"
              width={582}
              height={838}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <Badge color="var(--color-coco)">The Ritual · Agua de Coco</Badge>
            <Badge color="var(--color-ink)" className="opacity-60">
              330 g
            </Badge>
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
