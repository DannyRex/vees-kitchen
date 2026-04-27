import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { NewsletterForm } from "@/components/newsletter-form";
import { SITE, FOOTER_NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface/40">
      <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-10 md:py-24 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-6">
          <Wordmark />
          <p className="font-display text-2xl md:text-3xl leading-tight max-w-md text-cream-soft">
            {SITE.tagline}
          </p>
          <p className="text-sm text-muted max-w-sm leading-relaxed">
            A private kitchen in {SITE.city}. Address shared on order
            confirmation. {SITE.region} delivery as standard; London by
            arrangement.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm"
        >
          {FOOTER_NAV.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <h3 className="text-eyebrow">{group.heading}</h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream-soft hover:text-saffron transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="md:col-span-3">
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-screen-2xl px-5 py-6 md:px-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-faint">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Registered in England.
          </p>
          <p>
            Built in Leicester, with palm oil and patience.{" "}
            <Link
              href="/legal/privacy"
              className="hover:text-saffron transition-colors"
            >
              Privacy
            </Link>{" "}
            ·{" "}
            <Link
              href="/legal/terms"
              className="hover:text-saffron transition-colors"
            >
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
