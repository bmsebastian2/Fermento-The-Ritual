import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

// Display serif — solo títulos, hero y nombres de sabor. opsz activado para
// que las curvas se sientan hechas a mano en tamaños grandes.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

// Sans humanista para body, precios, botones y nav.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fermentotheritual.com"),
  title: {
    default: "Fermento & The Ritual — Bebidas fermentadas vivas",
    template: "%s · Fermento / The Ritual",
  },
  description:
    "Kombucha, kéfir, cold brew y bebidas funcionales artesanales de Managua, Nicaragua. Cultivos vivos, materia prima real. Vivo. Natural. Real.",
  keywords: [
    "kombucha",
    "kéfir",
    "cold brew",
    "agua de coco",
    "bebidas fermentadas",
    "probióticos",
    "Nicaragua",
    "Managua",
    "Fermento",
    "The Ritual",
  ],
  authors: [{ name: "Viva Terra Group S.A." }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_NI",
    url: "/",
    siteName: "Fermento / The Ritual",
    title: "Fermento & The Ritual — Bebidas fermentadas vivas",
    description:
      "Kombucha, kéfir, cold brew y bebidas funcionales artesanales de Managua, Nicaragua. Vivo. Natural. Real.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e3a2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
