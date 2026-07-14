"use client";

import { useEffect, useRef, useState } from "react";
import { catalogSections } from "@/lib/site";

/**
 * Barra de categorías del catálogo: chips sticky bajo el nav que saltan a cada
 * sub-línea y resaltan la sección activa al scrollear (scroll-spy vía
 * IntersectionObserver). En mobile es un carril horizontal; el chip activo se
 * auto-centra. Estilo tab editorial (versalitas + subrayado forest), en línea
 * con el idioma letterpress de StampLabel.
 */
export function CategoryNav() {
  const [active, setActive] = useState<string>(catalogSections[0].id);
  const chipRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll-spy: la sección activa es la primera visible (en orden de documento)
  // por debajo del nav + esta barra.
  useEffect(() => {
    const ids = catalogSections.map((s) => s.id);
    const visible = new Map<string, boolean>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const top = ids.find((id) => visible.get(id));
        if (top) setActive(top);
      },
      { rootMargin: "-128px 0px -55% 0px", threshold: 0 },
    );
    ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Mantener el chip activo a la vista en el carril horizontal (mobile).
  useEffect(() => {
    chipRefs.current[active]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [active]);

  const handleClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      setActive(id);
    };

  return (
    <nav
      aria-label="Categorías del catálogo"
      className="sticky top-16 z-40 border-y border-forest/10 bg-cream/90 backdrop-blur-md"
    >
      <ul className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-8 [&::-webkit-scrollbar]:hidden">
        {catalogSections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                ref={(el) => {
                  chipRefs.current[s.id] = el;
                }}
                onClick={handleClick(s.id)}
                aria-current={on ? "true" : undefined}
                className={`relative block whitespace-nowrap py-3.5 text-xs font-semibold uppercase tracking-[0.14em] outline-forest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  on ? "text-forest" : "text-ink/50 hover:text-forest"
                }`}
              >
                {s.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-px h-0.5 origin-center bg-forest transition-transform duration-300 ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
