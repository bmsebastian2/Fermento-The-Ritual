import Image from "next/image";
import { Bubbles } from "@/components/hero/bubbles";
import { NicaraguaSilhouette } from "@/components/hero/nicaragua-silhouette";
import { PalmFrond } from "@/components/hero/palm-frond";
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
      {/* Silueta de Nicaragua — marca de agua de identidad, detrás del producto,
          sangrando por el borde inferior-derecho. Trazo fino, muy sutil. */}
      <NicaraguaSilhouette
        className="pointer-events-none absolute -z-10 opacity-[0.12] hidden lg:block"
        style={{
          right: "0.5%",
          top: "-8%",
          width: "min(40rem, 44%)",
          transform: "rotate(-6deg)",
        }}
      />

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
          {/* Frondas de palma — capa de profundidad botánica, abren desde las
              esquinas superiores por detrás de la botella (lenguaje de marca). */}
          <PalmFrond
            className="pointer-events-none absolute -z-10 text-forest/25"
            style={{
              top: "-11%",
              left: "-20%",
              width: "58%",
              transform: "rotate(-18deg)",
            }}
          />
          <PalmFrond
            className="pointer-events-none absolute -z-10 text-coco/40"
            style={{
              top: "-15%",
              right: "-18%",
              width: "50%",
              transform: "scaleX(-1) rotate(-14deg)",
            }}
          />

          {/* Botella: leve rotación + sombra con dirección de luz (arriba-izq →
              proyecta abajo-der), en capas para dar volumen real. */}
          <div
            className="overflow-hidden rounded-[4px]"
            style={{
              transform: "rotate(-2deg)",
              boxShadow:
                "26px 36px 64px -20px color-mix(in srgb, var(--color-forest-deep) 42%, transparent), 10px 14px 26px -10px color-mix(in srgb, var(--color-forest-deep) 30%, transparent)",
            }}
          >
            <Image
              src="/products/agua-de-coco.webp"
              alt="Lata de Agua de Coco The Ritual sobre madera, con cocos frescos"
              width={582}
              height={838}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Sombra de contacto: apoya la botella sobre una superficie y
              elimina la sensación de flotar contra la crema. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-8 -z-10 h-6 rounded-[100%] blur-xl"
            style={{
              bottom: "2.75rem",
              background:
                "color-mix(in srgb, var(--color-forest-deep) 50%, transparent)",
            }}
          />

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
