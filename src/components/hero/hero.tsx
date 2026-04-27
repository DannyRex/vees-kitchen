import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSceneLoader } from "./hero-scene-loader";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Reserved aspect-ratio box for the 3D scene — prevents CLS. The scene
          and fallback both fill this box absolutely. */}
      <div className="relative aspect-[16/10] min-h-[80svh] md:min-h-[88svh]">
        <div aria-hidden className="absolute inset-0">
          <HeroSceneLoader />
        </div>

        {/* Bottom vignette to seat the copy on a quieter ground */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(26,24,21,0.92) 0%, rgba(26,24,21,0.4) 50%, rgba(26,24,21,0) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
          <p className="text-eyebrow mb-4 md:mb-5">
            A private kitchen · Leicester
          </p>
          <h1
            id="hero-heading"
            className="text-display max-w-4xl"
          >
            Authentically <em className="not-italic text-saffron">Nigerian.</em>
            <br />
            <span className="font-light italic text-cream-soft">
              Unapologetically refined.
            </span>
          </h1>
          <p className="text-lede mt-6 max-w-xl">
            Chef-driven seasonal menus, prepared by Chef Vee and delivered
            across the East Midlands.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/order" size="lg">
              Order this season&rsquo;s menu
              <span aria-hidden>→</span>
            </Button>
            <Link
              href="/menu"
              className="text-sm text-cream-soft hover:text-saffron underline underline-offset-4 decoration-line-strong hover:decoration-saffron transition-colors"
            >
              See what&rsquo;s on
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
