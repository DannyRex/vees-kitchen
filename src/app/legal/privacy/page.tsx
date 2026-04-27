import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${SITE.name} handles your personal data.`,
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-screen-md px-5 md:px-10 pt-32 md:pt-48 pb-32">
      <header className="mb-16">
        <p className="text-eyebrow mb-5">Legal</p>
        <h1 className="text-display">Privacy notice.</h1>
        <p className="mt-6 text-muted text-sm">Last updated: April 2026</p>
      </header>

      <div className="prose-editorial space-y-8 text-cream-soft leading-relaxed">
        <section>
          <h2 className="font-display text-2xl text-cream">Who we are</h2>
          <p className="mt-3">
            {SITE.name} (&ldquo;we&rdquo;) is a private kitchen registered in
            England, operating from {SITE.city}. For privacy questions, write
            to <a href={`mailto:${SITE.email}`} className="text-saffron">{SITE.email}</a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">What we collect</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 marker:text-saffron">
            <li>
              <strong>Order details</strong>: name, email, phone (optional),
              postcode, delivery date, dishes, dietary needs, free-text notes.
            </li>
            <li>
              <strong>Newsletter</strong>: email address only, after a
              confirmed double opt-in.
            </li>
            <li>
              <strong>Analytics</strong>: anonymised, cookie-less page metrics
              via Vercel Analytics. No personal identifiers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">How we use it</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 marker:text-saffron">
            <li>To prepare and deliver your order.</li>
            <li>To reply to enquiries.</li>
            <li>To send seasonal menu updates if you opted in.</li>
          </ul>
          <p className="mt-3">
            We do not sell your data. We don&rsquo;t share it beyond the
            essential providers below.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Who we share with</h2>
          <ul className="list-disc list-inside mt-3 space-y-2 marker:text-saffron">
            <li>
              <strong>Resend</strong> — to send transactional emails (order
              confirmations, receipts).
            </li>
            <li>
              <strong>Stripe</strong> — to take payment after Chef Vee
              confirms your order.
            </li>
            <li>
              <strong>Vercel</strong> — our hosting provider, EU region.
            </li>
            <li>
              <strong>Couriers</strong> — for deliveries outside the
              Leicester core, only what they need (name, address, phone).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Your rights</h2>
          <p className="mt-3">
            Under UK GDPR you can request access, correction, deletion, or
            portability of your data, and object to processing. Email{" "}
            <a href={`mailto:${SITE.email}`} className="text-saffron">{SITE.email}</a>{" "}
            and we&rsquo;ll respond within 30 days. You can also complain to
            the ICO at{" "}
            <a
              href="https://ico.org.uk"
              className="text-saffron"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl text-cream">Retention</h2>
          <p className="mt-3">
            Order records are kept for six years to satisfy UK accounting
            rules. Newsletter subscribers can unsubscribe at any time — we
            remove your address within 14 days.
          </p>
        </section>
      </div>
    </article>
  );
}
