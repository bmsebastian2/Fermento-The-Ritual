import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "cream";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Abre en pestaña nueva (para enlaces externos como WhatsApp). */
  external?: boolean;
  className?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium tracking-wide transition-[transform,background-color,color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  // Verde de marca sobre cream.
  primary:
    "bg-forest text-cream hover:bg-forest-deep shadow-sm hover:shadow-md",
  // Contorno sobre cream.
  outline:
    "border border-forest/40 text-forest hover:border-forest hover:bg-forest/[0.04]",
  // Para fondos oscuros (forest): botón claro.
  cream: "bg-cream text-forest hover:bg-white shadow-sm hover:shadow-md",
};

/** CTA con forma de enlace — radius suave, único elemento redondeado. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonLinkProps) {
  const rel = external ? "noopener noreferrer" : undefined;
  const target = external ? "_blank" : undefined;
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
