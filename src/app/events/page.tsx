import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Private events & catering",
  description: `Bespoke Nigerian catering for private events of ${SITE.eventThreshold}+ in Leicester, the East Midlands, and London. Custom menus by Chef Vee.`,
  alternates: { canonical: "/events" },
};

const FORMATS = [
  {
    title: "Intimate suppers",
    range: "10–20 guests",
    body: "Six courses, plated for the host's table or family-style. Most popular for milestone birthdays and anniversaries.",
  },
  {
    title: "Standing receptions",
    range: "20–60 guests",
    body: "Canapé sequences from the season's menu — suya skewers, miniature jollof, puff-puff warm to the touch.",
  },
  {
    title: "Corporate hospitality",
    range: "20–80 guests",
    body: "Boardroom lunches, post-launch dinners, end-of-quarter affairs. Discreet, on time, on brand.",
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-5 md:px-10 pt-32 md:pt-48 pb-32">
      <header className="mb-20 md:mb-32 max-w-3xl">
        <p className="text-eyebrow mb-5">Private events</p>
        <h1 className="text-display">
          Beyond the menu<span className="text-saffron">.</span>
        </h1>
        <p className="mt-8 text-lede">
          Hosting more than {SITE.eventThreshold}? Chef Vee builds bespoke
          menus for private events across Leicester, the wider East Midlands,
          and London. Tell us about your evening — we&rsquo;ll quote within
          two working days.
        </p>
      </header>

      <ul className="grid gap-10 md:gap-14 md:grid-cols-3 mb-24 md:mb-32">
        {FORMATS.map((format) => (
          <li key={format.title} className="border-t border-line pt-8">
            <p className="text-eyebrow mb-3">{format.range}</p>
            <h2 className="font-display text-3xl text-cream">{format.title}</h2>
            <p className="mt-4 text-cream-soft leading-relaxed">
              {format.body}
            </p>
          </li>
        ))}
      </ul>

      <section
        aria-labelledby="enquire-heading"
        className="border-t border-line pt-16 md:pt-24"
      >
        <div className="grid gap-10 md:gap-20 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <h2 id="enquire-heading" className="text-section">
              Enquire.
            </h2>
            <p className="mt-6 text-lede max-w-md">
              For events, we work by email. Tell us the date, the count, the
              feel.
            </p>
          </div>
          <div className="md:col-span-7 flex flex-col gap-5">
            <p className="text-cream-soft">
              Write to{" "}
              <a
                href={`mailto:${SITE.email}?subject=Private%20event%20enquiry`}
                className="text-saffron underline underline-offset-4 hover:decoration-2"
              >
                {SITE.email}
              </a>{" "}
              and include:
            </p>
            <ul className="space-y-2 text-cream-soft list-disc list-inside marker:text-saffron">
              <li>Provisional date (or a window)</li>
              <li>Guest count</li>
              <li>Venue + postcode</li>
              <li>Format (seated / canapés / something else)</li>
              <li>Any dietary considerations</li>
              <li>The vibe in one sentence</li>
            </ul>
            <div className="mt-6">
              <Button
                href={`mailto:${SITE.email}?subject=Private%20event%20enquiry`}
                size="md"
                external
              >
                Email Chef Vee →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
