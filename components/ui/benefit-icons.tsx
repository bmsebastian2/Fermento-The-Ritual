/**
 * Íconos de beneficio para los Wellness Shots.
 * Lenguaje monolínea botánico/natural (trazo fino, `currentColor`, esquinas
 * suaves) — coherente con `BreadIcon`/`CocoIcon`. design-system §6 proscribe la
 * iconografía flat de "salud" (corazones, rayos, checks tipo app de fitness):
 * la energía se resuelve con un sol, lo cardiovascular con una gota, lo inmune
 * con un escudo de hoja — nunca con un ♥ o un ⚡.
 *
 * Heredan el color vía currentColor: usar con `style={{ color }}` o `text-*`.
 */

import type { BenefitIcon as BenefitIconName } from "@/lib/data/products";

const PATHS: Record<BenefitIconName, React.ReactNode> = {
  // Sol — energía / vitalidad (no un rayo).
  energy: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </>
  ),
  // Baya con hoja — frutos ricos en antioxidantes.
  antioxidant: (
    <>
      <circle cx="11.5" cy="14.5" r="4.8" />
      <path d="M11.5 9.7V6.5" />
      <path d="M11.5 8c1.7-2.1 4.3-1.9 4.3-1.9s.2 2.6-1.9 3.6" />
    </>
  ),
  // Gota — esencia vital / salud cardiovascular (no un corazón).
  heart: <path d="M12 4s5.8 6.2 5.8 9.8a5.8 5.8 0 1 1-11.6 0C6.2 10.2 12 4 12 4Z" />,
  // Remolino — digestión / flujo.
  digestion: (
    <>
      <path d="M8 12a4 4 0 1 1 4 4" />
      <path d="M12 12a1.9 1.9 0 1 0 1.9 1.9" />
    </>
  ),
  // Flujo circular — circulación.
  circulation: (
    <>
      <path d="M6.6 9.2A6 6 0 0 1 18 9" />
      <path d="M17.4 14.8A6 6 0 0 1 6 15" />
      <path d="M6.6 9.2 4.7 8.7M6.6 9.2 7 7.2" />
      <path d="M17.4 14.8l1.9.5M17.4 14.8l-.4 2" />
    </>
  ),
  // Hoja con gota — depuración / detox.
  detox: (
    <>
      <path d="M5 14.5C5 9 9.5 5.5 14.8 5.5c.2 5.5-4.3 9.3-9.8 9Z" />
      <path d="M5.6 14.2C9 13.2 12 10.2 13.6 6.6" />
      <path d="M16.6 15c0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6c0-.9 1.6-2.5 1.6-2.5s1.6 1.6 1.6 2.5Z" />
    </>
  ),
  // Olas — hidratación.
  hydrate: (
    <>
      <path d="M3.5 9.5c1.4-1.6 2.8-1.6 4.2 0s2.8 1.6 4.2 0 2.8-1.6 4.2 0" />
      <path d="M3.5 14.5c1.4-1.6 2.8-1.6 4.2 0s2.8 1.6 4.2 0 2.8-1.6 4.2 0" />
    </>
  ),
  // Cítrico en corte — fuente de vitaminas.
  vitamin: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" />
    </>
  ),
  // Brote de dos hojas — antiinflamatorio natural / calma.
  shield: (
    <>
      <path d="M12 20V8" />
      <path d="M12 13c-3.2 0-5.4-2.1-5.7-5.4 3.2.2 5.4 2.4 5.7 5.4Z" />
      <path d="M12 11c3.2 0 5.4-2.1 5.7-5.4-3.2.2-5.4 2.4-5.7 5.4Z" />
    </>
  ),
  // Escudo con hoja — sistema inmune / defensa natural.
  immune: (
    <>
      <path d="M12 3.2l6.8 2.4v4.8c0 4.4-2.9 7.2-6.8 8.8-3.9-1.6-6.8-4.4-6.8-8.8V5.6L12 3.2Z" />
      <path d="M12 15v-3.6" />
      <path d="M12 12c-1.7 0-2.9-1.1-3.1-2.8 1.7.1 2.9 1.2 3.1 2.8Z" />
    </>
  ),
};

export function BenefitIcon({
  name,
  className,
}: {
  name: BenefitIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
