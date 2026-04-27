import Image from "next/image";
import Link from "next/link";
import { DISHES, SEASON } from "@/lib/menu";
import { BrandPlaceholder } from "@/components/brand-placeholder";

export function MenuTeaser() {
  // Show 3 dishes — the smoked-marrow jollof, egusi, and chin-chin make a
  // nice opener-main-finisher arc.
  const featured = [
    "jollof-smoked-bone-marrow",
    "egusi-stockfish-pounded-yam",
    "chin-chin-cardamom-clotted-cream",
  ]
    .map((slug) => DISHES.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  return (
    <section
      aria-labelledby="menu-teaser-heading"
      className="mx-auto max-w-screen-2xl px-5 md:px-10 py-24 md:py-40"
    >
      <header className="flex flex-wrap items-end justify-between gap-6 mb-16 md:mb-24">
        <div className="max-w-xl">
          <p className="text-eyebrow mb-5">{SEASON.label}</p>
          <h2 id="menu-teaser-heading" className="text-section">
            What&rsquo;s on this season.
          </h2>
        </div>
        <Link
          href="/menu"
          className="text-saffron border-b border-saffron/40 hover:border-saffron pb-1 transition-colors"
        >
          Full menu →
        </Link>
      </header>

      <ul className="grid gap-10 md:gap-8 md:grid-cols-3">
        {featured.map((dish) => (
          <li key={dish.slug} className="group">
            <Link
              href={`/menu#${dish.slug}`}
              className="block focus:outline-none"
            >
              <figure className="relative aspect-[4/5] overflow-hidden bg-surface">
                {dish.imageSrc ? (
                  <Image
                    src={dish.imageSrc}
                    alt={dish.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                  />
                ) : (
                  <BrandPlaceholder
                    primary={dish.nativeName ?? dish.name}
                    secondary={`${dish.region} · £${dish.price}`}
                    seed={dish.slug}
                    className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                )}
              </figure>
              <div className="mt-5">
                <p className="text-eyebrow text-faint mb-2">
                  {dish.region} · £{dish.price}
                </p>
                <h3 className="font-display text-2xl text-cream group-hover:text-saffron transition-colors">
                  {dish.name}
                </h3>
                <p className="mt-3 text-sm text-cream-soft leading-relaxed line-clamp-3">
                  {dish.blurb}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
