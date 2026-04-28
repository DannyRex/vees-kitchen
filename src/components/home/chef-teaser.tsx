import Image from "next/image";
import Link from "next/link";

export function ChefTeaser() {
  return (
    <section
      aria-labelledby="chef-teaser-heading"
      className="border-y border-line bg-surface/30"
    >
      <div className="mx-auto max-w-screen-2xl px-5 md:px-10 py-24 md:py-32 grid gap-12 md:gap-20 md:grid-cols-12 items-center">
        <div className="md:col-span-5 md:col-start-2">
          <figure className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/SuyavarietiesTX.JPG"
              alt="Skewers of suya — Nigerian grilled, spiced beef — over an open flame"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              quality={75}
            />
          </figure>
        </div>
        <div className="md:col-span-5">
          <p className="text-eyebrow mb-5">Behind the kitchen</p>
          <h2 id="chef-teaser-heading" className="text-section">
            Chef Vee.
          </h2>
          <p className="mt-6 text-lede">
            Trained in Lagos, finished in London. Three Michelin kitchens,
            twelve years of suya nights. Now back home — quietly, in
            Leicester — cooking the food she always meant to.
          </p>
          <p className="mt-4 text-cream-soft leading-relaxed">
            Vee&rsquo;s Kitchen isn&rsquo;t a restaurant. It&rsquo;s one chef,
            one menu, and a list of people who&rsquo;ve learned that great
            Nigerian food doesn&rsquo;t have to be loud to be exact.
          </p>
          <Link
            href="/chef"
            className="mt-8 inline-flex items-center gap-2 text-saffron border-b border-saffron/40 hover:border-saffron pb-1 transition-colors"
          >
            Read her story →
          </Link>
        </div>
      </div>
    </section>
  );
}
