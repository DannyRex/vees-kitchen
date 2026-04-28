import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Chef Vee",
  description:
    "Trained in Lagos, finished in London. The story of Chef Vee — and why Vee's Kitchen exists.",
  alternates: { canonical: "/chef" },
};

function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chef Vee",
    jobTitle: "Chef and founder",
    worksFor: { "@type": "Organization", name: "Vee's Kitchen" },
    nationality: "Nigerian",
    homeLocation: {
      "@type": "City",
      name: "Leicester",
      addressCountry: "GB",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ChefPage() {
  return (
    <>
      <PersonJsonLd />
      <article>
        <header className="mx-auto max-w-screen-2xl px-5 md:px-10 pt-32 md:pt-48 pb-16 md:pb-24">
          <p className="text-eyebrow mb-5">Chef &amp; founder</p>
          <h1 className="text-display max-w-4xl">
            Chef Vee.
          </h1>
          <p className="mt-8 text-lede max-w-2xl">
            Lagos-trained. London-finished. Now home in Leicester, cooking the
            food she always meant to.
          </p>
        </header>

        <figure className="relative h-[60svh] md:h-[80svh] overflow-hidden">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Efo_Riro_with_fried_mackerel_fishes_and_roasted_cowskin.jpg"
            alt="A bowl of efo riro — Yoruba spinach stew — with fried mackerel and roasted cow-skin"
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
            priority
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,24,21,0.65) 0%, rgba(26,24,21,0.15) 50%, rgba(26,24,21,0) 100%)",
            }}
          />
        </figure>

        <div className="mx-auto max-w-screen-md px-5 md:px-10 py-24 md:py-32 prose-editorial">
          <p className="font-display text-3xl md:text-4xl leading-tight text-cream">
            &ldquo;Nigerian food has been loud about itself for so long that
            people forgot it could whisper.&rdquo;
          </p>
          <p className="mt-12 text-cream-soft leading-relaxed text-lg">
            Vee grew up in Lagos with two grandmothers who never agreed on a
            single thing about jollof. From them she learned that the right way
            is whichever way feels truer that day. She trained at Quilon and
            spent four years at Ikoyi in London, where her job — among other
            things — was to make sure the smoked-bonnet butter never broke.
          </p>
          <p className="mt-6 text-cream-soft leading-relaxed text-lg">
            She started Vee&rsquo;s Kitchen in late 2024 from a converted
            outbuilding in Leicester, with a small wood-fired hearth and a
            stockpot that doesn&rsquo;t leave the stove. The menu rotates with
            the seasons. Everything is cooked on the day. Everything goes out
            warm.
          </p>
          <p className="mt-6 text-cream-soft leading-relaxed text-lg">
            There&rsquo;s no dining room. There&rsquo;s no booking line. There
            is one chef, one menu, and a quietly growing list of people who
            understand the difference.
          </p>
        </div>

        <section className="border-t border-line bg-surface/30">
          <div className="mx-auto max-w-screen-md px-5 md:px-10 py-24 md:py-32 text-center">
            <p className="text-eyebrow mb-6">Eat with Vee</p>
            <h2 className="text-section">Order this season&rsquo;s menu.</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/order" size="lg">
                Build your order →
              </Button>
              <Link
                href="/menu"
                className="text-cream-soft hover:text-saffron transition-colors self-center"
              >
                See the menu first
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
