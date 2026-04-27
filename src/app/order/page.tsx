import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderForm } from "@/components/order/order-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Place an order",
  description: `Order from this season's menu — Chef Vee replies within a working day with delivery time and payment link. ${SITE.region} delivery as standard, London by arrangement.`,
  alternates: { canonical: "/order" },
  robots: { index: false, follow: true }, // form pages don't need indexing
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-5 md:px-10 pt-32 md:pt-40 pb-32">
      <header className="mb-16 md:mb-24">
        <p className="text-eyebrow mb-4">Place an order</p>
        <h1 className="text-display max-w-3xl">
          Build your <em className="not-italic text-saffron">menu</em>.
        </h1>
        <p className="mt-6 text-lede max-w-2xl">
          Choose your dishes, tell us where and when. Chef Vee confirms
          availability within one working day and sends a payment link.
        </p>
      </header>

      <Suspense
        fallback={
          <div aria-busy className="text-cream-soft">
            Loading order form…
          </div>
        }
      >
        <OrderForm />
      </Suspense>
    </div>
  );
}
