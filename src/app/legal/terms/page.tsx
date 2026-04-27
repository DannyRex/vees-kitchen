import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of service for ${SITE.name}.`,
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-screen-md px-5 md:px-10 pt-32 md:pt-48 pb-32">
      <header className="mb-16">
        <p className="text-eyebrow mb-5">Legal</p>
        <h1 className="text-display">Terms.</h1>
        <p className="mt-6 text-muted text-sm">Last updated: April 2026</p>
      </header>

      <div className="prose-editorial space-y-8 text-cream-soft leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-cream">The short version</h2>
          <p className="mt-3">
            We cook your order on the day. We deliver it warm. We&rsquo;re
            careful with allergens but the kitchen handles peanuts, gluten,
            dairy, fish, and shellfish — please tell us about reactions in
            advance.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Orders</h2>
          <p className="mt-3">
            Submitting the order form is a <em>request</em>, not a contract.
            We confirm by email and send a payment link. The contract begins
            when you settle the link.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Cancellations</h2>
          <p className="mt-3">
            More than 48 hours before delivery: full refund. Inside 48 hours:
            we keep 50% of subtotal because we&rsquo;ll have shopped. Inside
            12 hours: full charge applies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Delivery</h2>
          <p className="mt-3">
            We give a 2-hour window. If we&rsquo;re late, we&rsquo;ll tell
            you. If you&rsquo;re not in, we leave with a neighbour or return
            to base — couriers may charge a re-delivery fee.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Liability</h2>
          <p className="mt-3">
            We&rsquo;re responsible for the food being safe to eat and as
            described. We&rsquo;re not responsible for losses arising from
            your reheating or storage choices once delivered.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Governing law</h2>
          <p className="mt-3">
            These terms are governed by the laws of England and Wales.
            Disputes are subject to the exclusive jurisdiction of the English
            courts. For questions, write to{" "}
            <a href={`mailto:${SITE.email}`} className="text-saffron">{SITE.email}</a>.
          </p>
        </section>
      </div>
    </article>
  );
}
