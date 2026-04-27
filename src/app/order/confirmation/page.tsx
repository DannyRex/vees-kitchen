import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ ref?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;

  return (
    <div className="mx-auto max-w-screen-md px-5 md:px-10 pt-32 md:pt-48 pb-32 text-center">
      <p className="text-eyebrow mb-6">Order received</p>
      <h1 className="text-display">
        Thank you<span className="text-saffron">.</span>
      </h1>
      <p className="mt-8 text-lede">
        Chef Vee has your order
        {ref && (
          <>
            {" "}
            (<span className="font-mono text-cream">{ref}</span>)
          </>
        )}
        . You&rsquo;ll get a reply within one working day with delivery time and
        a Stripe link to settle.
      </p>
      <p className="mt-6 text-cream-soft">
        Check your inbox for a confirmation. If anything looks off, just reply
        to that email or write to{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-saffron underline underline-offset-4"
        >
          {SITE.email}
        </a>
        .
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Link
          href="/menu"
          className="text-saffron border-b border-saffron/40 hover:border-saffron pb-1 transition-colors"
        >
          See the menu again
        </Link>
        <span aria-hidden className="text-faint">·</span>
        <Link
          href="/journal"
          className="text-cream-soft hover:text-saffron transition-colors"
        >
          Read the journal
        </Link>
      </div>
    </div>
  );
}
