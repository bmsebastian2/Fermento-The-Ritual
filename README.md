# Fermento / The Ritual

Sitio web de **Fermento / The Ritual** (Viva Terra Group S.A., Managua, Nicaragua) — bebidas fermentadas y funcionales artesanales. Página única (one-page) con catálogo, secciones por línea y contacto directo a WhatsApp.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** — tokens de marca en `app/globals.css` con `@theme static` (no hay `tailwind.config.js`)
- **TypeScript**
- Fuentes vía `next/font`: **Fraunces** (display) + **Inter** (body/UI)
- Deploy: **Vercel**

Sin backend ni base de datos: el catálogo vive en `lib/data/products.ts` y el contacto enlaza directo a WhatsApp.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # servir el build
npm run lint
```

## Estructura

```
app/
  layout.tsx            fuentes, metadata, favicon (icon.svg), OG (opengraph-image.jpg)
  page.tsx              Nav · Hero · Fermento · The Ritual · Contacto · Footer
  globals.css           tokens de marca (@theme static) + keyframes
components/
  hero/  nav/  footer/  contact/
  product-grid/         grilla por categoría + secciones de línea
  product-card/         card estándar + card destacada (Agua de Coco)
  ui/                   button, badge, stamp-label, reveal, icons, bottle-glyph
lib/
  data/products.ts      catálogo (18 productos, 6 categorías)
  site.ts               WhatsApp, nav, helper de acentos
public/
  products/             fotos de producto (por ahora solo agua-de-coco.jpg)
  brand/                logos
assets/                 material fuente (flyers y fotos), NO se sirve
```

## Deploy a Vercel

1. Subir el repo a GitHub/GitLab.
2. En Vercel: **New Project** → importar el repo. Framework detectado: Next.js (sin configuración extra).
3. Deploy. No hay variables de entorno.
4. Al conectar el dominio final (`fermentotheritual.com`), verificar que coincida con `metadataBase` en `app/layout.tsx`.

## Pendientes de datos (no inventar)

- **Precios**: todos marcados con `// TODO: precio real` en `lib/data/products.ts`. Las cards muestran "Pedir" por WhatsApp en vez de un monto hasta tenerlos.
- **Fotos de producto**: solo Agua de Coco tiene render limpio. El resto usa placeholder por color de acento. Al tener fotos recortadas sobre transparente, colocarlas en `public/products/` y asignar la ruta en el campo `image` del producto.
