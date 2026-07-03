/**
 * Catálogo Fermento & The Ritual.
 * Fuente: productos_fermento_the_ritual.md (copy textual del material de marca).
 *
 * PRECIOS: ninguno confirmado todavía → `price: null` con `// TODO: precio real`.
 *          No inventar montos.
 * IMÁGENES: cada producto tiene su imagen WebP en public/products/<id>.webp
 *           (derivada por `productImage()` en lib/site.ts). Por ahora son las
 *           láminas de producto optimizadas; reemplazar por fotos limpias cuando
 *           las haya. `image` sirve solo para override puntual (normalmente null).
 * ACENTO:   cada producto referencia un token de color de globals.css
 *           (var(--color-<accent>)). No mezclar acentos fuera de su card.
 */

export type Line = "fermento" | "ritual";

export type CategoryId =
  | "kombucha"
  | "kefir"
  | "cold-brew"
  | "agua-de-coco"
  | "shots"
  | "postres";

export type Accent =
  | "jamaica"
  | "jengibre"
  | "cafe"
  | "pina"
  | "coco"
  | "mango"
  | "kefir"
  | "berry"
  | "beet"
  | "green"
  | "dessert";

export interface Category {
  id: CategoryId;
  line: Line;
  /** Nombre de línea/categoría, en display serif. */
  name: string;
  /** Volumen o peso de referencia de la categoría. */
  size?: string;
  /** Descripción de la categoría (intro de sección). */
  blurb: string;
  /** Instrucciones de conservación / consumo. */
  care?: string;
}

/** Íconos de beneficio funcional (solo shots por ahora). */
export type BenefitIcon =
  | "energy"
  | "antioxidant"
  | "heart"
  | "digestion"
  | "circulation"
  | "detox"
  | "hydrate"
  | "vitamin"
  | "shield"
  | "immune";

export interface Benefit {
  icon: BenefitIcon;
  label: string;
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  line: Line;
  /** Nombre de sabor — se muestra en Fraunces. */
  name: string;
  size: string;
  /** Copy textual del catálogo. */
  description: string;
  /** Notas de sabor / ingredientes clave, en sans. */
  notes: string[];
  /** Beneficios funcionales con ícono (fuente: lámina de marca). */
  benefits?: Benefit[];
  /** Alérgenos declarados (solo postres por ahora). */
  contains?: string;
  /** Etiquetas tipo "SIN PASTEURIZAR", en mayúsculas con tracking amplio. */
  badges: string[];
  /** Token de color de marca (var(--color-<accent>)). */
  accent: Accent;
  /** Ruta en /public/products, o null → placeholder por color. */
  image: string | null;
  /** Producto de temporada. */
  seasonal?: boolean;
  price: number | null; // TODO: precio real
}

export const categories: Category[] = [
  {
    id: "kombucha",
    line: "fermento",
    name: "Kombucha",
    size: "375 ml",
    blurb:
      "Bebida fermentada viva, cultivos naturales, sin pasteurizar. 20 calorías por porción.",
    care: "Mantener refrigerado · No agitar · Abrir con cuidado.",
  },
  {
    id: "kefir",
    line: "fermento",
    name: "Kéfir",
    size: "360 ml",
    blurb:
      "Bebida fermentada con cultivos vivos, 100% natural y orgánico. Con probióticos, fácil de digerir, fortalece el sistema inmunológico.",
    care: "Agitar bien antes de disfrutar · Mantener refrigerado.",
  },
  {
    id: "cold-brew",
    line: "fermento",
    name: "Cold Brew",
    size: "375 ml",
    blurb:
      "Café cultivado en zonas altas de Dipilto, Nicaragua. 12 horas de extracción, hecho artesanalmente. Energizante natural.",
    care: "Mantener refrigerado.",
  },
  {
    id: "agua-de-coco",
    line: "ritual",
    name: "Agua de Coco",
    size: "330 g",
    blurb:
      "100% natural, sin aditivos ni azúcar añadida. Orgánica, cultivada con respeto.",
    care: "Mantener refrigerado.",
  },
  {
    id: "shots",
    line: "ritual",
    name: "Shots",
    size: "75 ml · 2 oz",
    blurb:
      "100% natural, sin conservantes. 15 calorías por porción.",
    care: "Agitar antes de consumir · Mantener refrigerado.",
  },
  {
    id: "postres",
    line: "ritual",
    name: "Dessert Jars",
    size: "300 g",
    blurb: "Ingredientes naturales, sin conservantes.",
    care: "Mantener refrigerado.",
  },
];

export const products: Product[] = [
  // ── Kombucha (Fermento) ──────────────────────────────────────────────
  {
    id: "kombucha-jamaica",
    categoryId: "kombucha",
    line: "fermento",
    name: "Jamaica",
    size: "375 ml",
    description:
      "Infusión de jamaica, azúcar de caña y SCOBY. Kombucha viva sin pasteurizar.",
    notes: ["Infusión de jamaica", "Azúcar de caña", "SCOBY"],
    badges: ["SIN PASTEURIZAR", "CULTIVOS VIVOS"],
    accent: "jamaica",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "kombucha-jengibre",
    categoryId: "kombucha",
    line: "fermento",
    name: "Jengibre",
    size: "375 ml",
    description:
      "Jengibre fresco, azúcar de caña y SCOBY. Kombucha viva sin pasteurizar.",
    notes: ["Jengibre fresco", "Azúcar de caña", "SCOBY"],
    badges: ["SIN PASTEURIZAR", "CULTIVOS VIVOS"],
    accent: "jengibre",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "kombucha-mango",
    categoryId: "kombucha",
    line: "fermento",
    name: "Mango",
    size: "375 ml",
    description:
      "Pulpa de mango, azúcar de caña y SCOBY. Kombucha viva sin pasteurizar.",
    notes: ["Pulpa de mango", "Azúcar de caña", "SCOBY"],
    badges: ["SIN PASTEURIZAR", "TEMPORADA"],
    accent: "mango",
    image: null,
    seasonal: true,
    price: null, // TODO: precio real
  },
  {
    id: "kombucha-pina",
    categoryId: "kombucha",
    line: "fermento",
    name: "Piña",
    size: "375 ml",
    description: "Piña, azúcar de caña y SCOBY. Kombucha viva sin pasteurizar.",
    notes: ["Piña", "Azúcar de caña", "SCOBY"],
    badges: ["SIN PASTEURIZAR", "CULTIVOS VIVOS"],
    accent: "pina",
    image: null,
    price: null, // TODO: precio real
  },

  // ── Kéfir (Fermento) ─────────────────────────────────────────────────
  {
    id: "kefir-plain",
    categoryId: "kefir",
    line: "fermento",
    name: "Plain",
    size: "360 ml",
    description: "Sabor natural, sin frutas añadidas.",
    notes: ["Sabor natural", "Cultivos vivos", "Probióticos"],
    badges: ["CON PROBIÓTICOS", "100% NATURAL"],
    accent: "kefir",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "kefir-mango",
    categoryId: "kefir",
    line: "fermento",
    name: "Mango",
    size: "360 ml",
    description: "Con mango.",
    notes: ["Mango", "Cultivos vivos", "Probióticos"],
    badges: ["CON PROBIÓTICOS", "100% NATURAL"],
    accent: "mango",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "kefir-frutos-rojos",
    categoryId: "kefir",
    line: "fermento",
    name: "Frutos Rojos",
    size: "360 ml",
    description: "Con fresa, mora, arándano y frambuesa.",
    notes: ["Fresa", "Mora", "Arándano", "Frambuesa"],
    badges: ["CON PROBIÓTICOS", "100% NATURAL"],
    accent: "berry",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "kefir-pina",
    categoryId: "kefir",
    line: "fermento",
    name: "Piña",
    size: "360 ml",
    description: "Con piña.",
    notes: ["Piña", "Cultivos vivos", "Probióticos"],
    badges: ["CON PROBIÓTICOS", "100% NATURAL"],
    accent: "pina",
    image: null,
    price: null, // TODO: precio real
  },

  // ── Cold Brew (Fermento) ─────────────────────────────────────────────
  {
    id: "cold-brew-clasico",
    categoryId: "cold-brew",
    line: "fermento",
    name: "Cold Brew",
    size: "375 ml",
    description: "Acidez baja. Notas achocolatadas, mandarina y frutos secos.",
    notes: ["Achocolatadas", "Mandarina", "Frutos secos", "Acidez baja"],
    badges: ["ENERGIZANTE NATURAL", "ARTESANAL"],
    accent: "cafe",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "cold-brew-naranja-miel",
    categoryId: "cold-brew",
    line: "fermento",
    name: "Infusión Naranja y Miel",
    size: "375 ml",
    description:
      "Acidez balanceada. Notas cítricas, miel, semillas de jícaro y cacao.",
    notes: ["Cítricas", "Miel", "Semillas de jícaro", "Cacao"],
    badges: ["ENERGIZANTE NATURAL", "ARTESANAL"],
    accent: "cafe",
    image: null,
    price: null, // TODO: precio real
  },

  // ── Agua de Coco (The Ritual) ────────────────────────────────────────
  {
    id: "agua-de-coco",
    categoryId: "agua-de-coco",
    line: "ritual",
    name: "Agua de Coco",
    size: "330 g",
    description:
      "100% natural, sin aditivos ni azúcar añadida. Orgánica, cultivada con respeto.",
    notes: ["Hidratación pura", "Electrolitos naturales", "Sin azúcar añadida"],
    badges: ["100% NATURAL", "SIN AZÚCAR AÑADIDA"],
    accent: "coco",
    image: null,
    price: null, // TODO: precio real
  },

  // ── Shots (The Ritual) ───────────────────────────────────────────────
  {
    id: "shot-red-vitality",
    categoryId: "shots",
    line: "ritual",
    name: "Red Vitality",
    size: "75 ml",
    description:
      "Energía y vitalidad en cada shot. Apoya la salud cardiovascular y ayuda a combatir el cansancio diario.",
    notes: ["Remolacha", "Jengibre", "Manzana", "Limón"],
    benefits: [
      { icon: "energy", label: "Aporta energía" },
      { icon: "antioxidant", label: "Rico en antioxidantes" },
      { icon: "heart", label: "Salud cardiovascular" },
    ],
    badges: ["SIN CONSERVANTES", "100% NATURAL"],
    accent: "beet",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "shot-ginger-boost",
    categoryId: "shots",
    line: "ritual",
    name: "Ginger Boost",
    size: "75 ml",
    description:
      "Un impulso natural que despierta tu energía, mejora la digestión y revitaliza tu día.",
    notes: ["Jengibre", "Limón", "Miel"],
    benefits: [
      { icon: "energy", label: "Energizante natural" },
      { icon: "digestion", label: "Mejora la digestión" },
      { icon: "circulation", label: "Estimula la circulación" },
    ],
    badges: ["SIN CONSERVANTES", "100% NATURAL"],
    accent: "jengibre",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "shot-green-detox",
    categoryId: "shots",
    line: "ritual",
    name: "Green Detox",
    size: "75 ml",
    description:
      "Limpia, fresca y ligera. Ideal para apoyar la desintoxicación natural del cuerpo y mantener el equilibrio.",
    notes: ["Pepino", "Espinaca", "Manzana", "Limón"],
    benefits: [
      { icon: "detox", label: "Desintoxicante" },
      { icon: "hydrate", label: "Hidratante" },
      { icon: "vitamin", label: "Fuente de vitaminas" },
    ],
    badges: ["SIN CONSERVANTES", "100% NATURAL"],
    accent: "green",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "shot-tumeric-defense",
    categoryId: "shots",
    line: "ritual",
    name: "Tumeric Defense",
    size: "75 ml",
    description:
      "Una combinación poderosa que apoya tu sistema inmunológico y ayuda a reducir la inflamación naturalmente.",
    notes: ["Cúrcuma", "Jengibre", "Limón", "Miel", "Pimienta negra"],
    benefits: [
      { icon: "shield", label: "Antiinflamatorio natural" },
      { icon: "immune", label: "Apoya el sistema inmune" },
      { icon: "antioxidant", label: "Rico en antioxidantes" },
    ],
    badges: ["SIN CONSERVANTES", "100% NATURAL"],
    accent: "pina",
    image: null,
    price: null, // TODO: precio real
  },

  // ── Dessert Jars (The Ritual) ────────────────────────────────────────
  {
    id: "postre-tiramisu",
    categoryId: "postres",
    line: "ritual",
    name: "Tiramisú",
    size: "300 g",
    description:
      "Cremoso y suave, con cacao natural, vainilla, café de Dipilto y mascarpone premium.",
    notes: ["Cacao natural", "Vainilla", "Café de Dipilto", "Mascarpone premium"],
    contains: "Contiene gluten, lácteos, huevos y azúcar.",
    badges: ["SIN CONSERVANTES", "ARTESANAL"],
    accent: "dessert",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "postre-chocolate-fudge",
    categoryId: "postres",
    line: "ritual",
    name: "Chocolate Fudge",
    size: "300 g",
    description:
      "Intenso y cremoso, con ganache de chocolate nicaragüense y crema fudge artesanal.",
    notes: ["Ganache de chocolate nicaragüense", "Crema fudge artesanal"],
    contains: "Contiene gluten, lácteos, huevos y azúcar.",
    badges: ["SIN CONSERVANTES", "ARTESANAL"],
    accent: "dessert",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "postre-tres-leches",
    categoryId: "postres",
    line: "ritual",
    name: "Tres Leches",
    size: "300 g",
    description:
      "Suave y tradicional, con leche evaporada, condensada y crema de leche.",
    notes: ["Leche evaporada", "Leche condensada", "Crema de leche", "Canela"],
    contains: "Contiene gluten, lácteos, huevos, canela y azúcar.",
    badges: ["SIN CONSERVANTES", "ARTESANAL"],
    accent: "dessert",
    image: null,
    price: null, // TODO: precio real
  },
  {
    id: "postre-red-velvet",
    categoryId: "postres",
    line: "ritual",
    name: "Red Velvet",
    size: "300 g",
    description:
      "Húmedo y suave, con remolacha natural y crema de queso artesanal.",
    notes: ["Remolacha natural", "Crema de queso artesanal", "Cacao"],
    contains: "Contiene gluten, lácteos, huevos, azúcar y cacao.",
    badges: ["SIN CONSERVANTES", "ARTESANAL"],
    accent: "jamaica",
    image: null,
    price: null, // TODO: precio real
  },
];

// ── Helpers ────────────────────────────────────────────────────────────

export const lines: { id: Line; name: string; tagline: string }[] = [
  {
    id: "fermento",
    name: "Fermento",
    tagline: "Fermentación viva, hecha con las manos.",
  },
  {
    id: "ritual",
    name: "The Ritual",
    tagline: "Tu pausa favorita del día.",
  },
];

export const getCategory = (id: CategoryId): Category | undefined =>
  categories.find((c) => c.id === id);

export const productsByCategory = (id: CategoryId): Product[] =>
  products.filter((p) => p.categoryId === id);

export const categoriesByLine = (line: Line): Category[] =>
  categories.filter((c) => c.line === line);
