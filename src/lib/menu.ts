/**
 * The current seasonal menu. Update this file when the menu rotates.
 *
 * Photography refs are Unsplash placeholders — replace with shoot images when
 * available (see docs/shoot-brief.md once created).
 */

export type Region =
  | "Lagos"
  | "Yoruba (Ogun)"
  | "Igbo (Eastern)"
  | "Hausa (Northern)"
  | "Calabar (Cross River)"
  | "Pan-Nigerian";

export type Course = "starter" | "main" | "side" | "dessert";

export interface Dish {
  slug: string;
  name: string;
  /** Yoruba/Igbo/Hausa name, in the original. */
  nativeName?: string;
  course: Course;
  region: Region;
  price: number; // GBP per portion
  blurb: string; // 2–3 sentence sensorial description
  ingredients: string[]; // 4–6 hero ingredients
  pairing: string; // wine / drink suggestion (delivery context)
  /**
   * Until photography is shot, dishes use the brand-placeholder SVG
   * keyed off `slug`. Once shoot images are in, add `imageSrc` here and
   * the components will prefer it over the placeholder.
   */
  imageSrc?: string;
  imageAlt: string;
  /** Allergen / dietary flags */
  notes: string[];
}

export const SEASON = {
  label: "Harmattan & Embers",
  subtitle: "A six-course rotation, late autumn through winter.",
  validUntil: "2026-03-31",
};

export const DISHES: Dish[] = [
  {
    slug: "puff-puff-honey-tamarind",
    name: "Puff-puff with honey & tamarind",
    nativeName: "Puff-puff",
    course: "starter",
    region: "Lagos",
    price: 20,
    blurb:
      "A dozen yeasted dough rounds, fried until the edges caramelise. Glossed with cold-pressed Yorkshire honey loosened with tamarind — sweet, sour, almost lacquered.",
    ingredients: [
      "Type 00 flour",
      "Active dry yeast",
      "Tamarind pulp",
      "Yorkshire honey",
      "Maldon salt",
    ],
    pairing: "A flute of dry English sparkling — Wiston Cuvée works.",
    imageAlt:
      "A dozen golden-fried puff-puff rounds glossed with honey-tamarind",
    notes: ["Vegetarian", "Contains: gluten"],
  },
  {
    slug: "jollof-smoked-bone-marrow",
    name: "Smoked-marrow jollof",
    nativeName: "Jollof",
    course: "main",
    region: "Lagos",
    price: 26,
    blurb:
      "Long-grain parboiled rice cooked in a tatashe-and-Scotch-bonnet base, finished over open flame. Folded with brown butter from a marrow bone roasted to bronze. The bottom is the prize.",
    ingredients: [
      "Tatashe (red bell)",
      "Scotch bonnet",
      "Beef bone marrow",
      "Bay & curry leaf",
      "Smoked paprika",
    ],
    pairing: "Côtes du Rhône — Grenache-led, peppery, modest weight.",
    imageAlt:
      "Smoky long-grain jollof rice with charred edges, folded with marrow brown butter",
    notes: ["Contains: dairy"],
  },
  {
    slug: "egusi-stockfish-pounded-yam",
    name: "Egusi with stockfish & pounded yam",
    nativeName: "Egusi efo",
    course: "main",
    region: "Igbo (Eastern)",
    price: 28,
    blurb:
      "Ground egusi seeds bloomed in palm oil with locust bean, then loosened with goat stock and a single piece of Norwegian stockfish. Served beside warm pounded white yam, hand-folded to order.",
    ingredients: [
      "Egusi (melon seed)",
      "Stockfish (okporoko)",
      "Palm oil",
      "Locust bean (iru)",
      "White yam",
    ],
    pairing: "An off-dry German Riesling — the residual sugar settles the heat.",
    imageAlt:
      "Egusi stew with stockfish in palm oil, alongside a portion of warm pounded yam",
    notes: ["Contains: fish"],
  },
  {
    slug: "suya-aged-rib-eye",
    name: "Suya, 35-day aged rib-eye",
    nativeName: "Suya",
    course: "main",
    region: "Hausa (Northern)",
    price: 30,
    blurb:
      "Skewered rib-eye, dredged in yaji — kuli-kuli, ginger, clove, dried bonnet — and fired close to the heat. Served on butcher paper with raw onion, tomato, and a wedge of lime.",
    ingredients: [
      "Aged rib-eye",
      "Kuli-kuli (peanut)",
      "Yaji spice",
      "Red onion",
      "Lime",
    ],
    pairing: "Côte-Rôtie if you're feeling generous; otherwise a chilled Beaujolais.",
    imageAlt:
      "Charred suya skewers of aged rib-eye dredged in yaji, served with raw onion and lime",
    notes: ["Contains: peanut"],
  },
  {
    slug: "ofada-ayamase",
    name: "Ofada rice & ayamase",
    nativeName: "Ofada & ayamase",
    course: "main",
    region: "Yoruba (Ogun)",
    price: 24,
    blurb:
      "Short-grain heirloom ofada steamed in moin-moin leaf for fragrance, served beside a fierce green pepper stew with iru and assorted offal. Earthy, sour, intentionally untamed.",
    ingredients: [
      "Ofada rice",
      "Green bell + bonnet",
      "Iru (locust bean)",
      "Tripe & shaki",
      "Boiled egg",
    ],
    pairing: "Cool palm wine if you can find it; otherwise a young Vinho Verde.",
    imageAlt:
      "Heirloom ofada rice beside a green pepper ayamase stew with iru and offal",
    notes: ["Contains: egg"],
  },
  {
    slug: "chin-chin-cardamom-clotted-cream",
    name: "Cardamom chin-chin, clotted cream",
    nativeName: "Chin-chin",
    course: "dessert",
    region: "Pan-Nigerian",
    price: 20,
    blurb:
      "Chin-chin rolled thin, scored, and fried until snapping-crisp. Tossed in cardamom sugar while warm and served with a dollop of Cornish clotted cream and a spoon of black sesame.",
    ingredients: [
      "Type 00 flour",
      "Green cardamom",
      "Cornish clotted cream",
      "Black sesame",
      "Demerara",
    ],
    pairing: "A small glass of Pedro Ximénez, very cold.",
    imageAlt:
      "Crisp golden chin-chin squares dusted in cardamom sugar with clotted cream",
    notes: ["Vegetarian", "Contains: gluten, dairy, sesame"],
  },
];

export function dishBySlug(slug: string): Dish | undefined {
  return DISHES.find((d) => d.slug === slug);
}

export function dishesByCourse(course: Course): Dish[] {
  return DISHES.filter((d) => d.course === course);
}

export const COURSE_ORDER: Course[] = ["starter", "main", "side", "dessert"];

export const COURSE_LABELS: Record<Course, string> = {
  starter: "To begin",
  main: "The middle",
  side: "Alongside",
  dessert: "To finish",
};
