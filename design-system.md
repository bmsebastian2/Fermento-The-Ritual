# Fermento / The Ritual — Design System

Guía de estilo para mantener consistencia visual en todo el sitio. Toda pieza de UI nueva debe derivarse de estos tokens, no de valores sueltos.

## 1. Personalidad de marca

Fermentación viva, artesanal, con raíz en Nicaragua. No es "wellness clínico" (blanco, minimalista, frío) — es tierra, botánica, proceso real. La materia prima (jamaica, jengibre, café, piña, coco) es siempre protagonista visual. El sello "Viva Terra Group S.A." es letterpress/vintage — eso da la pista de textura: tinta sobre papel, no gradientes digitales planos.

**Una frase guía:** *algo vivo que fue hecho con las manos, no una etiqueta de supermercado.*

## 2. Paleta de color

> Los hex de abajo son punto de partida extraído visualmente del material existente. Antes de fijarlos en el código, tomalos con un eyedropper directo sobre las fotos de producto en alta resolución — la luz varía entre fotos y conviene calibrar contra el verde real del logo.

### Base (siempre presente)
| Token | Hex aprox. | Uso |
|---|---|---|
| `--color-cream` | `#F3EEE3` | Fondo principal, tipo papel/pergamino |
| `--color-forest` | `#1E3A2B` | Verde principal de marca — headers, logo, footer |
| `--color-forest-deep` | `#132419` | Verde casi negro — texto sobre crema, footer oscuro |
| `--color-ink` | `#2A2622` | Texto de cuerpo (no negro puro, cálido) |

### Acento por producto (usar solo en la sección/card de ese sabor, nunca mezclado)
| Token | Hex aprox. | Producto |
|---|---|---|
| `--color-jamaica` | `#7A1F2B` | Kombucha Jamaica (floral/vino) |
| `--color-jengibre` | `#D08A2E` | Kombucha Jengibre (dorado especiado) |
| `--color-cafe` | `#3B2A1E` | Kombucha Café (tostado) |
| `--color-pina` | `#E0B23A` | Kombucha Piña (tropical) |
| `--color-coco` | `#8FA37C` | The Ritual Agua de Coco (verde suave, distinto del forest de marca) |

### Uso
- `cream` es el fondo por defecto de todo el sitio, no blanco puro.
- `forest` es el único verde "de marca" — logo, nav, CTAs primarios.
- Los 5 acentos de producto se usan **uno a la vez**, nunca los cinco juntos salvo en la grilla de catálogo (ahí sí conviven, es la excepción intencional — como en la lámina de producto que ya tenés).
- Evitar cualquier verde-menta o turquesa tipo "spa/salud corporativa" — no es parte de esta marca.

## 3. Tipografía

Dos roles, elegidos para que no lea genérico:

- **Display (títulos, hero, nombres de producto):** una serif orgánica con carácter editorial/botánico — ej. **Fraunces** (weight 600–700, con `font-optical-sizing` activado para que las curvas se sientan hechas a mano en tamaños grandes) o **Canela/Freight Display** si hay presupuesto de licencia. Nada de serif clásica tipo Playfair — se ve "boutique genérica".
- **Body / UI (párrafos, precios, botones, nav):** sans humanista y legible en mobile — ej. **Inter** o **Public Sans**. Peso 400/500, nunca ultra-light (se pierde en mobile con fondo crema).
- **Utilitaria (etiquetas tipo "375ML", badges "SIN PASTEURIZAR"):** la misma sans en mayúsculas, letter-spacing amplio (0.08–0.12em), tamaño pequeño — imitando el lenguaje de etiqueta física que ya usan en las botellas.

**Regla:** el nombre del sabor (Jamaica, Jengibre, Café, Piña) siempre en display serif. El resto de la ficha de producto en sans.

## 4. Layout y espaciado

- Grid base de 8px. Secciones con padding vertical generoso (mínimo 64px desktop / 40px mobile) — el producto necesita "aire" para verse premium, no apretado.
- Border-radius: casi cero en general (las etiquetas y el sello de marca son de esquina recta). Excepción: el cuello/tapa de botella en ilustraciones y los botones de CTA pueden tener un radius suave (6–8px) como único elemento redondeado — contraste intencional.
- Textura: usar imágenes de producto reales sobre fondo natural (madera, hojas, granos) tal como en el material existente — no ilustraciones planas ni iconos flat genéricos para el hero.
- Mobile-first: la grilla de catálogo pasa de 4 columnas (desktop) → 2 columnas (tablet) → 1 columna con scroll horizontal o stack vertical (mobile), priorizando que la botella se vea grande y nítida.

## 5. Movimiento (motion)

Con propósito, no decorativo:
- **Hero:** reveal de entrada suave (fade + slight rise, 400–600ms) en el titular y las botellas, escalonado (stagger 80–100ms entre elementos) — como si "asentaran" en la mesa.
- **Scroll:** cada ficha de sabor entra con fade-up al hacer scroll, una sola vez (no repetir en cada scroll up/down).
- **Hover en producto:** leve tilt/scale (1.02–1.04) + sombra que se profundiza, simulando levantar la botella de la mesa.
- **Signature element (opcional, el "algo memorable" de la página):** un efecto sutil de burbujas ascendiendo detrás del hero o al hacer hover sobre una botella — referencia directa a la fermentación viva ("cultivos vivos"). Debe ser sutil y performante en mobile (CSS/SVG, no canvas pesado).
- Respetar `prefers-reduced-motion` en todos los casos.

## 6. Qué evitar

- Gradientes tipo SaaS (azul-violeta), iconografía flat genérica de "salud" (corazones, checks verdes tipo app de fitness).
- Fondo blanco puro — siempre `--color-cream`.
- Mezclar los 5 acentos de producto en una misma sección que no sea la grilla de catálogo completa.
- Tipografía ultra-delgada o condensada agresiva — la marca es cálida y artesanal, no tech/futurista.
