# CLAUDE.md — Fermento / The Ritual

Contexto persistente para Claude Code en este repositorio. Se lee automáticamente al iniciar sesión.

## Proyecto

Sitio web de **Fermento / The Ritual** (Viva Terra Group S.A., Managua, Nicaragua) — bebidas fermentadas y funcionales artesanales. Dos líneas de producto bajo la misma marca, catálogo completo de 18 productos en 6 categorías (fuente: `productos_fermento_the_ritual.md`):

- **Fermento** (fermentados):
  - Kombucha viva sin pasteurizar, 375ml — Jamaica, Jengibre, Mango *(temporada)*, Piña.
  - Kéfir con cultivos vivos, 360ml — Plain, Mango, Frutos Rojos, Piña.
  - Cold Brew (café de Dipilto), 375ml — clásico, Infusión Naranja y Miel.
- **The Ritual** (funcionales/naturales):
  - Agua de Coco 100% natural, 330g.
  - Shots, 75ml — Red Vitality, Ginger Boost, Green Detox, Turmeric Defense.
  - Dessert Jars, 300g — Tiramisú, Chocolate Fudge, Tres Leches, Red Velvet.

Ojo: no existe "Kombucha Café" — el café es la línea **Cold Brew**. Los precios reales aún no están definidos (todos con `// TODO: precio real`).

Sitio simple pero de diseño de alto impacto: catálogo con precios, secciones por sabor, contacto. No es una app compleja — no hay login, ni dashboard, ni base de datos transaccional. Prioridad: verse premium, cargar rápido, funcionar perfecto en mobile.

Ver `/design-system.md` en la raíz del repo (o en la knowledge base del proyecto) para tokens de color, tipografía, motion y reglas de diseño. **No inventar colores, fuentes ni radius fuera de ese archivo** — si algo no está definido ahí, preguntar antes de asumir.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS **v4** — los tokens se definen en `app/globals.css` con `@theme` (no hay `tailwind.config.js`). Extender la paleta ahí.
- TypeScript
- Fuentes vía `next/font/google`: **Fraunces** (display, con eje `opsz`) e **Inter** (body/UI). Variables `--font-fraunces` / `--font-inter`, expuestas como `--font-display` / `--font-sans` en `@theme`.
- Deploy: Vercel
- Sin backend/base de datos por ahora — el catálogo de productos vive en un archivo local (`lib/data/products.ts` o `.json`), no asumir Supabase ni ninguna API externa salvo que se indique explícitamente.
- Formulario de contacto: enlaza directo a WhatsApp (`wa.me/...`), no asumir envío de email ni backend de formularios salvo que se pida.

## Estructura de carpetas

```
/app
  /page.tsx              → home (hero, catálogo, contacto en una sola página o con anchors)
  /layout.tsx
  /globals.css           → variables CSS de design-system.md (colores, fuentes)
/components
  /hero/
  /product-card/
  /product-grid/
  /contact/
  /nav/
  /footer/
  ui/                     → botones, badges, elementos reutilizables genéricos
/lib
  /data/products.ts       → catálogo: nombre, línea (fermento/ritual), sabor, precio, tamaño, descripción, notas de sabor
/public
  /products/               → fotos de producto individuales (recortadas, sin composición)
  /brand/                  → logos SVG/PNG limpios
```

Componentes chicos y con un solo propósito. No mezclar lógica de datos con presentación dentro del mismo componente si se puede evitar.

## Convenciones

- Mobile-first siempre: escribir clases base para mobile, luego `md:` / `lg:` para escalar hacia arriba — nunca al revés.
- Nombres de componentes y archivos en inglés (`ProductCard`, `product-card.tsx`), copy de UI en español (es el mercado nicaragüense).
- Usar los tokens CSS de `design-system.md` vía variables (`var(--color-forest)`, etc.) o utilidades Tailwind derivadas del `@theme` de `globals.css` (`bg-forest`, `text-cream`) — no hardcodear hex sueltos en componentes.
- Acentos por producto. Base (de `design-system.md`): `jamaica`, `jengibre`, `cafe`, `pina`, `coco`. **Acentos nuevos aprobados** (categorías sin token en design-system): `mango` `#dc6f1e` (naranja-mango, separado de jengibre/piña), `kefir` `#b8a282`, `berry` `#6c2a44`, `beet` `#8e2e3a`, `green` `#5f7a3a`, `dessert` `#6a4326`. Reusos: Cold Brew→`cafe`, Ginger Boost→`jengibre`, Turmeric Defense→`pina`, Kéfir Piña→`pina`, Red Velvet→`jamaica`. Cada card lleva un solo acento vía `var(--color-<accent>)`; conviven todos solo en la grilla de catálogo.
- Tipografías: display serif (Fraunces u equivalente definido en design-system.md) solo para títulos y nombres de sabor. Body sans para todo lo demás. No usar una tercera familia sin consultar.
- Animaciones: respetar `prefers-reduced-motion`. No agregar libraries de animación pesadas (Framer Motion, GSAP) sin consultar primero — evaluar si CSS/Tailwind alcanza.
- Antes de cualquier trabajo de UI, invocar el skill `frontend-design`.

## Flujo de trabajo

**Fase 1 — Análisis**: antes de escribir código, solo analizar. Encontrar el archivo, la línea y la causa del problema (o el punto donde iría lo nuevo). Mostrar snippets relevantes, no archivos completos. Nada de código todavía — esperar confirmación explícita antes de seguir. Hallazgos en lista breve (archivo, línea, causa), sin párrafos largos. Excepción: en tareas complejas (arquitectura, seguridad, pagos) el análisis puede ser más profundo aunque rompa la concisión, ahí el detalle previene errores caros.

**Fase 2 — Implementación**: solo tras aprobación explícita. Mostrar diff, no el archivo completo. Máximo 2 líneas de explicación. Sin resúmenes finales salvo que se pidan.

**Reglas:**
- Un archivo por mensaje — si el cambio toca varios componentes, se hacen de a uno.
- No agregar dependencias nuevas sin consultar.
- No mezclar cambios visuales con cambios de lógica/datos en el mismo paso.
- Consultar antes de asumir cualquier decisión no especificada (diseño, arquitectura, nombres, estados) — no adivinar.
- Cambios de UI/diseño: invocar el skill `frontend-design` y mantener el sistema de diseño ya establecido (paleta, tipografía, tokens) sin alterarlo.

## Datos pendientes (no inventar)

- Precios reales de cada producto — hasta que se provean, marcar con `// TODO: precio real` en vez de inventar un número.
- Copy final de descripciones — se puede usar el texto de la lámina de marca como base, pero flaggear si es borrador.
- Logos limpios en SVG — hasta tenerlos, usar el nombre en texto con la tipografía de marca en vez de forzar el logo de una foto compuesta. Hay un sello letterpress limpio en `public/brand/logo-letterpress.jpg`.
- Imágenes de producto: el material original son láminas/flyers con texto incrustado, no fotos recortadas. **Solo Agua de Coco tiene render limpio** (`public/products/agua-de-coco.jpg`, recortado del compuesto). El resto de las cards cae a **placeholder por color de acento** hasta tener fotos recortadas sobre transparente. El material fuente (flyers y fotos) está resguardado en `/assets/` (labels y photos), fuera de `/public` para no servirlo.
