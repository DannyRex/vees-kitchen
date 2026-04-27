import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact & FAQ",
  description: `Contact ${SITE.name} for orders, events, or questions. Frequently asked questions about delivery, allergies, and how the kitchen works.`,
  alternates: { canonical: "/contact" },
};

const FAQS = [
  {
    q: "Where are you based?",
    a: `${SITE.name} is a private kitchen in ${SITE.city}. The address isn't published — we share it on order confirmation only.`,
  },
  {
    q: "Where do you deliver?",
    a: `Leicester (LE1–LE5) is included with 72 hours' notice. The wider East Midlands is £25 with five days' notice. London by arrangement, ${SITE.leadTime.london.label}.`,
  },
  {
    q: "How do I pay?",
    a: "We don't take payment through the website. Once Chef Vee confirms your order, you'll get a Stripe payment link by email. Cards, Apple Pay, Google Pay all accepted.",
  },
  {
    q: "Can I order for one?",
    a: `Yes. Minimum order is one portion (£${SITE.pricePerHead.min}). Most people order at least two — for the lead time, sharing is the better economy.`,
  },
  {
    q: "Allergies and dietary needs?",
    a: "Tell us in the order form and Chef Vee will reply with what's possible. Several dishes are vegetarian or can be adapted. We work in a kitchen with peanuts, gluten, dairy, fish, and shellfish.",
  },
  {
    q: "Can I change or cancel my order?",
    a: "Up to 48 hours before delivery, no charge. Inside 48 hours, we ask for 50% of subtotal as we'll already have shopped.",
  },
  {
    q: "Do you cater for events?",
    a: `For 10+ guests we build bespoke menus — see our private events page for the formats we offer.`,
  },
  {
    q: "Are you a restaurant?",
    a: "No. There's no dining room and no walk-ins. Vee's Kitchen exists to cook your meal and bring it to your table.",
  },
];

function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ContactPage() {
  return (
    <>
      <FAQJsonLd />
      <div className="mx-auto max-w-screen-xl px-5 md:px-10 pt-32 md:pt-48 pb-32">
        <header className="mb-20 md:mb-28 max-w-3xl">
          <p className="text-eyebrow mb-5">Contact &amp; FAQ</p>
          <h1 className="text-display">Get in touch.</h1>
          <p className="mt-8 text-lede">
            For most things, the easiest path is the order form. For events,
            press, or anything custom — write to us.
          </p>
        </header>

        <section className="grid gap-10 md:gap-20 md:grid-cols-2 mb-24 md:mb-32">
          <div>
            <p className="text-eyebrow mb-4">Email</p>
            <a
              href={`mailto:${SITE.email}`}
              className="font-display text-2xl md:text-3xl text-cream hover:text-saffron transition-colors break-all"
            >
              {SITE.email}
            </a>
            <p className="mt-4 text-cream-soft text-sm">
              Replies within one working day.
            </p>
          </div>
          <div>
            <p className="text-eyebrow mb-4">Address</p>
            <p className="font-display text-2xl md:text-3xl text-cream-soft italic">
              Shared on confirmation
            </p>
            <p className="mt-4 text-cream-soft text-sm leading-relaxed max-w-sm">
              We&rsquo;re in {SITE.city}, {SITE.region}. Because we cook from a
              private kitchen, we keep the address off the open web — you&rsquo;ll
              get it by email when your order is confirmed.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="border-t border-line pt-16 md:pt-24"
        >
          <h2 id="faq-heading" className="text-section mb-12 md:mb-16">
            Common questions.
          </h2>
          <dl className="grid gap-y-12 md:grid-cols-2 md:gap-x-16">
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <dt className="font-display text-xl md:text-2xl text-cream">
                  {faq.q}
                </dt>
                <dd className="mt-3 text-cream-soft leading-relaxed">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-24 md:mt-32 text-center">
          <Button href="/order" size="lg">
            Build your order →
          </Button>
        </section>
      </div>
    </>
  );
}
