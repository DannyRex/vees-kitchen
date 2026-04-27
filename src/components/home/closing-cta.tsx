import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function ClosingCta() {
  return (
    <section
      aria-labelledby="closing-cta-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(212,136,31,0.18) 0%, rgba(212,136,31,0) 65%)",
        }}
      />
      <div className="relative mx-auto max-w-screen-2xl px-5 md:px-10 py-32 md:py-48 text-center">
        <p className="text-eyebrow mb-6">Ready for the table</p>
        <h2 id="closing-cta-heading" className="text-display max-w-4xl mx-auto">
          Order this season&rsquo;s menu<span className="text-saffron">.</span>
        </h2>
        <p className="mt-8 text-lede max-w-xl mx-auto">
          {SITE.region} delivery, 72 hours&rsquo; notice. London by arrangement.
          Stripe link sent on confirmation.
        </p>
        <div className="mt-12">
          <Button href="/order" size="lg">
            Build your order
            <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
