interface StampLabelProps {
  children: React.ReactNode;
  /** Color de tinta (valor CSS). Por defecto forest. */
  color?: string;
  align?: "center" | "left";
  className?: string;
}

/** Rombo del sello letterpress. */
function Diamond({ color }: { color: string }) {
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 8 8"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="4"
        y="0"
        width="5.66"
        height="5.66"
        transform="rotate(45 4 0)"
        fill={color}
      />
    </svg>
  );
}

/**
 * Encabezado de sección con el idioma del sello letterpress de la marca:
 * regla hairline + rombo + mayúsculas con tracking amplio.
 */
export function StampLabel({
  children,
  color = "var(--color-forest)",
  align = "center",
  className = "",
}: StampLabelProps) {
  // Regla hairline: oculta en mobile (evita overflow del eyebrow), visible en sm+.
  const rule = (
    <span
      aria-hidden="true"
      className="hidden h-px flex-1 sm:block"
      style={{ backgroundColor: color, opacity: 0.35 }}
    />
  );

  return (
    <div
      className={`flex items-center gap-2.5 sm:gap-3 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      {align === "center" && rule}
      <Diamond color={color} />
      <span
        className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] sm:text-xs sm:tracking-[0.22em]"
        style={{ color }}
      >
        {children}
      </span>
      <Diamond color={color} />
      {rule}
    </div>
  );
}
