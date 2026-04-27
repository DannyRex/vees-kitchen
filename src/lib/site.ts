export const SITE = {
  name: "Vee's Kitchen",
  shortName: "Vee's Kitchen",
  tagline: "Authentically Nigerian. Unapologetically Refined.",
  description:
    "A private Nigerian kitchen in Leicester. Chef-driven seasonal menus, prepared by Chef Vee and delivered across the East Midlands and London.",
  url: "https://veeskitchen.co.uk",
  locale: "en_GB",
  city: "Leicester",
  region: "East Midlands",
  country: "United Kingdom",
  email: "hello@veeskitchen.co.uk",
  instagram: "https://instagram.com/veeskitchen",
  pricePerHead: { min: 20, max: 30, currency: "GBP" },
  minPortions: 1,
  eventThreshold: 10,
  leadTime: {
    leicester: { hours: 72, label: "72 hours" },
    eastMidlands: { hours: 120, label: "5 days" },
    london: { hours: 336, label: "14 days" },
  },
  delivery: {
    leicester: { fee: 0, label: "Included within LE1–LE5" },
    eastMidlands: { fee: 25, label: "£25 across the East Midlands" },
    london: { fee: null, label: "Quoted on confirmation" },
  },
} as const;

export const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/#experience", label: "Experience" },
  { href: "/chef", label: "Chef Vee" },
  { href: "/journal", label: "Journal" },
] as const;

export const FOOTER_NAV = [
  {
    heading: "Visit",
    links: [
      { href: "/menu", label: "This season's menu" },
      { href: "/order", label: "Place an order" },
      { href: "/events", label: "Private events" },
    ],
  },
  {
    heading: "Story",
    links: [
      { href: "/chef", label: "Chef Vee" },
      { href: "/journal", label: "Journal" },
      { href: "/contact", label: "Contact & FAQ" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
] as const;
