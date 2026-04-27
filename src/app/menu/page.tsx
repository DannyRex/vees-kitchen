import type { Metadata } from "next";
import Link from "next/link";
import { MenuIntro } from "@/components/menu/menu-intro";
import { DishCard } from "@/components/menu/dish-card";
import { Button } from "@/components/ui/button";
import { DISHES, SEASON } from "@/lib/menu";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "This season's menu",
  description: `${SEASON.label} — a six-course Nigerian menu by Chef Vee, delivered across the East Midlands. £${SITE.pricePerHead.min}–£${SITE.pricePerHead.max} per portion.`,
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `${SEASON.label} · ${SITE.name}`,
    description: SEASON.subtitle,
  },
};

// JSON-LD: Menu schema for rich results
function MenuJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${SEASON.label} — ${SITE.name}`,
    description: SEASON.subtitle,
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Tasting menu",
        hasMenuItem: DISHES.map((dish) => ({
          "@type": "MenuItem",
          name: dish.name,
          description: dish.blurb,
          offers: {
            "@type": "Offer",
            price: dish.price,
            priceCurrency: "GBP",
          },
          suitableForDiet: dish.notes.includes("Vegetarian")
            ? "https://schema.org/VegetarianDiet"
            : undefined,
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function MenuPage() {
  return (
    <>
      <MenuJsonLd />
      <MenuIntro />
      <div className="mx-auto max-w-screen-2xl px-5 md:px-10 pb-32">
        {DISHES.map((dish, i) => (
          <DishCard key={dish.slug} dish={dish} index={i} />
        ))}
      </div>

      <section className="border-t border-line bg-surface/30">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-10 py-24 md:py-32 grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-7">
            <p className="text-eyebrow mb-4">Ready when you are</p>
            <h2 className="text-section max-w-2xl">
              Choose your dishes, choose a date.
            </h2>
            <p className="mt-6 text-lede max-w-xl">
              Order one portion or twelve. Chef Vee confirms within a working
              day with delivery time and a Stripe link to settle.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end flex flex-col gap-3">
            <Button href="/order" size="lg">
              Build your order
              <span aria-hidden>→</span>
            </Button>
            <Link
              href="/events"
              className="text-sm text-cream-soft hover:text-saffron transition-colors"
            >
              Hosting more than {SITE.eventThreshold}? See private events →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
