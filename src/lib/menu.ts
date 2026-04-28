/**
 * The current seasonal menu. Update this file when the menu rotates.
 *
 * Images are sourced from Wikimedia Commons (CC-licensed, stable URLs).
 * When the photography shoot is complete, swap each `imageSrc` with the
 * production URL — `imageAlt` should be updated to match the actual shot.
 */

export type Region =
  | "Lagos"
  | "Yoruba (Ogun)"
  | "Igbo (Eastern)"
  | "Hausa (Northern)"
  | "Calabar (Cross River)"
  | "Niger Delta"
  | "Pan-Nigerian";

export type Course = "starter" | "main" | "soup" | "side" | "dessert";

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
  imageSrc: string;
  imageAlt: string;
  /** Allergen / dietary flags */
  notes: string[];
  /**
   * Wikimedia Commons attribution required when using these images.
   * Keep this here so it can be surfaced in the page footer credits.
   */
  imageCredit?: string;
}

export const SEASON = {
  label: "Harmattan & Embers",
  subtitle: "Three soups, a starter, a rice, a sweet — late autumn through winter.",
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
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Nigerian-puff-puff-recipe_cropped.jpg",
    imageAlt: "A pile of golden Nigerian puff-puff dough rounds, freshly fried",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    notes: ["Vegetarian", "Contains: gluten"],
  },
  {
    slug: "pepper-soup-catfish",
    name: "Pepper soup with catfish",
    nativeName: "Ofe nsala / pepper soup",
    course: "soup",
    region: "Calabar (Cross River)",
    price: 28,
    blurb:
      "A clear, fierce broth — uziza, uda, ehuru, calabash nutmeg — bloomed in beef bone stock and finished with thick steaks of farmed Cornish catfish. Served boiling. The kind of soup that resets a week.",
    ingredients: [
      "Catfish",
      "Uziza seeds",
      "Uda (negro pepper)",
      "Calabash nutmeg",
      "Scotch bonnet",
      "Scent leaf",
    ],
    pairing: "An ice-cold lager. Star or Gulder if you can find it.",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Assorted_meat_pepper_soup_at_Lagos_Island.jpg/3840px-Assorted_meat_pepper_soup_at_Lagos_Island.jpg",
    imageAlt:
      "A bowl of Nigerian pepper soup, dark broth flecked with herbs and chillies, photographed in Lagos",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    notes: ["Contains: fish"],
  },
  {
    slug: "egusi-stockfish-pounded-yam",
    name: "Egusi soup with stockfish & pounded yam",
    nativeName: "Ofe egusi",
    course: "soup",
    region: "Igbo (Eastern)",
    price: 26,
    blurb:
      "Ground egusi seeds bloomed in palm oil with locust bean, loosened with goat stock and a piece of Norwegian stockfish. Served with warm pounded white yam, hand-folded to order. Eat it with your right hand.",
    ingredients: [
      "Egusi (melon seed)",
      "Stockfish (okporoko)",
      "Palm oil",
      "Locust bean (iru)",
      "Bitterleaf",
      "White yam",
    ],
    pairing: "An off-dry German Riesling — the residual sugar settles the heat.",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/d/d0/EGUSI.JPG",
    imageAlt:
      "A bowl of egusi soup, golden with palm oil and dotted with leafy greens",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    notes: ["Contains: fish"],
  },
  {
    slug: "banga-soup-starch",
    name: "Banga soup with starch",
    nativeName: "Ofe akwu / Banga",
    course: "soup",
    region: "Niger Delta",
    price: 26,
    blurb:
      "Fresh palm fruit pressed and reduced for an hour, finished with beletientien, ataiko, and irugje. Earthy, perfumed, almost meaty without meat. Served with smooth Delta starch the colour of bone china.",
    ingredients: [
      "Palm fruit pulp",
      "Beletientien (oburunbebe)",
      "Ataiko",
      "Irugje",
      "Cassava starch",
      "Smoked catfish",
    ],
    pairing: "A glass of cool Vouvray demi-sec.",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Palm_nut_soup_close_up_02.jpg/3840px-Palm_nut_soup_close_up_02.jpg",
    imageAlt:
      "A close-up of banga (palm-fruit) soup, deep orange with chunks of fish and smoked meat",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    notes: ["Contains: fish"],
  },
  {
    slug: "jollof-smoked-bone-marrow",
    name: "Smoked-marrow jollof",
    nativeName: "Jollof",
    course: "main",
    region: "Lagos",
    price: 24,
    blurb:
      "Long-grain parboiled rice cooked in a tatashe-and-Scotch-bonnet base, finished over open flame for a proper party-jollof smoke. Folded with brown butter from a marrow bone roasted to bronze. The bottom is the prize.",
    ingredients: [
      "Long-grain rice",
      "Tatashe (red bell)",
      "Scotch bonnet",
      "Beef bone marrow",
      "Bay & curry leaf",
      "Smoked paprika",
    ],
    pairing: "Côtes du Rhône — Grenache-led, peppery, modest weight.",
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Jollof_Rice_with_Stew.jpg/3840px-Jollof_Rice_with_Stew.jpg",
    imageAlt: "A heaping plate of Nigerian jollof rice, deep red and smoky",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    notes: ["Contains: dairy"],
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
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/LoveChinChin.jpg",
    imageAlt:
      "Bowls of Nigerian chin-chin — small fried golden squares of sweet dough",
    imageCredit: "Wikimedia Commons (CC BY-SA)",
    notes: ["Vegetarian", "Contains: gluten, dairy, sesame"],
  },
];

export function dishBySlug(slug: string): Dish | undefined {
  return DISHES.find((d) => d.slug === slug);
}

export function dishesByCourse(course: Course): Dish[] {
  return DISHES.filter((d) => d.course === course);
}

export const COURSE_ORDER: Course[] = [
  "starter",
  "soup",
  "main",
  "side",
  "dessert",
];

export const COURSE_LABELS: Record<Course, string> = {
  starter: "To begin",
  soup: "The soups",
  main: "The middle",
  side: "Alongside",
  dessert: "To finish",
};
