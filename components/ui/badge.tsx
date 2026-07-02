import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  /** Color del texto/borde (valor CSS, ej. var(--color-jamaica)). */
  color?: string;
  className?: string;
}

/**
 * Etiqueta utilitaria en mayúsculas con tracking amplio — imita el lenguaje
 * de etiqueta física de las botellas ("SIN PASTEURIZAR", "375 ML").
 */
export function Badge({ children, color, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block text-[0.625rem] font-medium uppercase leading-none tracking-[0.14em] ${className}`}
      style={color ? { color } : undefined}
    >
      {children}
    </span>
  );
}
