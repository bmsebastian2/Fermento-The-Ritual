"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { CartButton } from "@/components/cart/cart-button";
import {
  navLinks,
  catalogSections,
  whatsappUrl,
  WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/site";

/** Wordmark de marca en Fraunces: Fermento · The Ritual. */
function Wordmark() {
  return (
    <a href="#inicio" className="flex items-baseline gap-2 text-forest">
      <span className="font-display text-2xl font-semibold tracking-tight">
        Fermento
      </span>
      <span
        aria-hidden="true"
        className="h-1 w-1 translate-y-[-3px] rotate-45 bg-forest/50"
      />
      <span className="font-display text-sm italic text-forest/70">
        The Ritual
      </span>
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-forest/10 bg-cream/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Wordmark />

        {/* Enlaces desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7 text-sm text-ink/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-forest"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ButtonLink
              href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
              variant="primary"
              external
              className="px-4 py-2 text-xs"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedir
            </ButtonLink>
            <CartButton />
          </div>
        </div>

        {/* Acciones mobile: el pedido queda siempre a mano, fuera del menú. */}
        <div className="flex items-center gap-1 md:hidden">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center text-forest"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-6 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>
    </header>

      {/* Menú mobile — overlay full-screen bajo la barra del nav */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-[45] overflow-y-auto border-t border-forest/10 bg-cream md:hidden transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-6 text-ink">
          {navLinks.map((link) => {
            const line =
              link.href === "#fermento"
                ? "fermento"
                : link.href === "#the-ritual"
                  ? "ritual"
                  : null;
            const subs = line
              ? catalogSections.filter((s) => s.line === line)
              : [];
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-lg font-medium transition-colors hover:text-forest"
                >
                  {link.label}
                </a>
                {subs.length > 0 && (
                  <ul className="mb-1 ml-1 flex flex-col border-l border-forest/15 pl-4">
                    {subs.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={() => setOpen(false)}
                          className="block py-1.5 text-sm text-ink/65 transition-colors hover:text-forest"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          <li className="pt-3">
            <ButtonLink
              href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
              variant="primary"
              external
              className="w-full"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Pedí por WhatsApp
            </ButtonLink>
          </li>
        </ul>
      </div>
    </>
  );
}
