import { navLinks, whatsappUrl, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/site";

function Wordmark() {
  return (
    <div className="flex items-baseline gap-2 text-cream">
      <span className="font-display text-2xl font-semibold tracking-tight">
        Fermento
      </span>
      <span
        aria-hidden="true"
        className="h-1 w-1 translate-y-[-3px] rotate-45 bg-cream/50"
      />
      <span className="font-display text-sm italic text-cream/70">
        The Ritual
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest-deep px-6 py-14 text-cream/70">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr]">
        {/* Marca */}
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Bebidas fermentadas vivas y funcionales, hechas a mano con materia
            prima real.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-cream/45">
            Viva Terra Group S.A. · Managua, Nicaragua
          </p>
        </div>

        {/* Navegación */}
        <nav>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-cream"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contacto */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">
            Contacto
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-cream"
              >
                WhatsApp · +505 7603-5477
              </a>
            </li>
            <li>
              <a
                href="mailto:info@fermentotheritual.com"
                className="transition-colors hover:text-cream"
              >
                info@fermentotheritual.com
              </a>
            </li>
            <li className="text-cream/60">fermentotheritual.com</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Fermento / The Ritual. Todos los derechos reservados.</p>
        <p>Bebidas vivas, fermentadas artesanalmente en Nicaragua.</p>
      </div>
    </footer>
  );
}
