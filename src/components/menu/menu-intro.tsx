import { SEASON } from "@/lib/menu";
import { SITE } from "@/lib/site";

export function MenuIntro() {
  return (
    <section className="mx-auto max-w-screen-2xl px-5 md:px-10 pt-32 md:pt-48 pb-16 md:pb-24">
      <p className="text-eyebrow mb-5">
        {SEASON.label} · valid through{" "}
        {new Date(SEASON.validUntil).toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <h1 className="text-display max-w-4xl">This season&rsquo;s menu</h1>
      <p className="mt-8 text-lede max-w-2xl">
        {SEASON.subtitle} Six courses, each priced per portion between £
        {SITE.pricePerHead.min} and £{SITE.pricePerHead.max}. Mix what suits you —
        order one dish or the whole sequence. We bring it warm.
      </p>
    </section>
  );
}
