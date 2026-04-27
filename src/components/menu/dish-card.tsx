"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dish } from "@/lib/menu";
import { BrandPlaceholder } from "@/components/brand-placeholder";

interface Props {
  dish: Dish;
  index: number;
  /** When true, the dish links to the order page with this dish preselected. */
  orderable?: boolean;
}

export function DishCard({ dish, index, orderable = true }: Props) {
  // Alternate dish layout left/right for an editorial rhythm
  const flip = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-8 md:gap-16 md:grid-cols-12 items-center py-16 md:py-28 border-t border-line first:border-t-0"
    >
      <div
        className={
          flip
            ? "md:col-span-6 md:col-start-7 md:row-start-1"
            : "md:col-span-6"
        }
      >
        <figure className="relative aspect-[4/5] overflow-hidden bg-surface">
          {dish.imageSrc ? (
            <Image
              src={dish.imageSrc}
              alt={dish.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
            />
          ) : (
            <BrandPlaceholder
              primary={dish.nativeName ?? dish.name}
              secondary={`${dish.region} · £${dish.price}`}
              seed={dish.slug}
              className="absolute inset-0"
            />
          )}
          <figcaption className="sr-only">{dish.imageAlt}</figcaption>
        </figure>
      </div>

      <div
        className={
          flip
            ? "md:col-span-5 md:col-start-1 md:row-start-1"
            : "md:col-span-5 md:col-start-8"
        }
      >
        <p className="text-eyebrow mb-3">
          {dish.region} · £{dish.price} per portion
        </p>
        <h3 className="text-section text-cream">
          {dish.name}
          {dish.nativeName && dish.nativeName !== dish.name && (
            <span className="block font-display italic text-cream-soft text-2xl md:text-3xl mt-2">
              {dish.nativeName}
            </span>
          )}
        </h3>
        <p className="mt-5 text-cream-soft leading-relaxed text-lg max-w-prose">
          {dish.blurb}
        </p>

        <dl className="mt-8 grid gap-y-4 grid-cols-[max-content_1fr] gap-x-6 text-sm">
          <dt className="text-eyebrow self-start pt-1">Ingredients</dt>
          <dd className="text-cream-soft">{dish.ingredients.join(" · ")}</dd>
          <dt className="text-eyebrow self-start pt-1">Pairing</dt>
          <dd className="text-cream-soft italic font-display text-base">
            {dish.pairing}
          </dd>
          <dt className="text-eyebrow self-start pt-1">Notes</dt>
          <dd className="text-muted">{dish.notes.join(" · ")}</dd>
        </dl>

        {orderable && (
          <div className="mt-8">
            <Link
              href={{ pathname: "/order", query: { dish: dish.slug } }}
              className="inline-flex items-center gap-2 text-saffron border-b border-saffron/40 pb-1 hover:border-saffron transition-colors"
            >
              Add to order <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}
