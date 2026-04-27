"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { TextField, TextareaField } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { ZoneNotice } from "./zone-notice";
import { submitOrderAction } from "@/app/actions/order";
import { DISHES, dishBySlug } from "@/lib/menu";
import { earliestDateFor, zoneFor } from "@/lib/postcode";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/cn";

type CartLine = { slug: string; qty: number };

export function OrderForm() {
  const searchParams = useSearchParams();
  const initialDish = searchParams.get("dish");

  const [cart, setCart] = useState<CartLine[]>(() =>
    initialDish && dishBySlug(initialDish) ? [{ slug: initialDish, qty: 1 }] : [],
  );
  const [postcode, setPostcode] = useState("");
  const [minDate, setMinDate] = useState<string>(earliestDateFor("leicester"));

  const [state, formAction, pending] = useActionState(submitOrderAction, null);

  const total = useMemo(
    () =>
      cart.reduce(
        (sum, line) => sum + (dishBySlug(line.slug)?.price ?? 0) * line.qty,
        0,
      ),
    [cart],
  );

  const fieldError = (name: string): string | undefined => {
    if (state?.kind !== "error") return undefined;
    return state.fieldErrors?.[name]?.[0];
  };

  const itemsError =
    state?.kind === "error" && state.fieldErrors?.items
      ? state.fieldErrors.items[0]
      : undefined;

  useEffect(() => {
    // When the postcode changes, refresh the date min so users can't pick
    // a delivery date inside the lead-time window.
    if (postcode.trim().length >= 3) {
      setMinDate(earliestDateFor(zoneFor(postcode)));
    }
  }, [postcode]);

  const addDish = (slug: string) => {
    setCart((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) =>
          line.slug === slug ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { slug, qty: 1 }];
    });
  };

  const updateQty = (slug: string, delta: number) => {
    setCart((current) =>
      current
        .map((line) =>
          line.slug === slug
            ? { ...line, qty: Math.max(0, line.qty + delta) }
            : line,
        )
        .filter((line) => line.qty > 0),
    );
  };

  const removeLine = (slug: string) => {
    setCart((current) => current.filter((line) => line.slug !== slug));
  };

  return (
    <form action={formAction} className="grid gap-12 md:gap-20 md:grid-cols-12">
      <input type="hidden" name="items" value={JSON.stringify(cart)} />

      {/* ─── Cart ────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="cart-heading"
        className="md:col-span-7 flex flex-col gap-6"
      >
        <header>
          <h2 id="cart-heading" className="text-section">
            Your order
          </h2>
          <p className="mt-3 text-cream-soft">
            One portion or twelve. Mix as you like.
          </p>
        </header>

        {cart.length === 0 ? (
          <div className="border border-dashed border-line-strong p-8 text-cream-soft">
            <p>
              Nothing chosen yet. Pick from this season&rsquo;s menu below, or{" "}
              <a className="text-saffron underline underline-offset-4" href="/menu">
                browse the full menu
              </a>
              .
            </p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-line">
            {cart.map((line) => {
              const dish = dishBySlug(line.slug);
              if (!dish) return null;
              return (
                <li key={line.slug} className="py-5 grid grid-cols-[1fr_auto_auto] items-center gap-4">
                  <div>
                    <p className="font-display text-xl text-cream">{dish.name}</p>
                    <p className="text-sm text-muted">£{dish.price} per portion</p>
                  </div>
                  <div className="flex items-center gap-1 border border-line-strong">
                    <button
                      type="button"
                      onClick={() => updateQty(line.slug, -1)}
                      aria-label={`Decrease ${dish.name}`}
                      className="p-2 hover:text-saffron transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span aria-live="polite" className="min-w-7 text-center text-sm tabular-nums">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(line.slug, 1)}
                      aria-label={`Increase ${dish.name}`}
                      className="p-2 hover:text-saffron transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-cream tabular-nums w-16 text-right">
                      £{dish.price * line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLine(line.slug)}
                      aria-label={`Remove ${dish.name}`}
                      className="p-2 text-muted hover:text-ochre transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {itemsError && (
          <p role="alert" className="text-ochre text-sm">
            {itemsError}
          </p>
        )}

        {/* Add-from-menu */}
        <div className="mt-4 border-t border-line pt-8">
          <p className="text-eyebrow mb-4">Add from this season</p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {DISHES.map((dish) => {
              const inCart = cart.some((c) => c.slug === dish.slug);
              return (
                <li key={dish.slug}>
                  <button
                    type="button"
                    onClick={() => addDish(dish.slug)}
                    className={cn(
                      "w-full text-left p-4 border border-line hover:border-saffron transition-colors flex justify-between items-center gap-3",
                      inCart && "border-saffron/40 bg-saffron/5",
                    )}
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block font-display text-base text-cream truncate">
                        {dish.name}
                      </span>
                      <span className="block text-xs text-muted mt-0.5">
                        {dish.region} · £{dish.price}
                      </span>
                    </span>
                    <span aria-hidden className="text-saffron">
                      {inCart ? "+1" : "+"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─── Details ─────────────────────────────────────────────────── */}
      <section
        aria-labelledby="details-heading"
        className="md:col-span-5 flex flex-col gap-6 md:sticky md:top-24 md:self-start"
      >
        <header>
          <h2 id="details-heading" className="text-section">
            Delivery & you
          </h2>
        </header>

        <TextField
          label="Your name"
          name="name"
          required
          autoComplete="name"
          error={fieldError("name")}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={fieldError("email")}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          hint="Helpful for delivery day. Optional."
          error={fieldError("phone")}
        />

        <div>
          <TextField
            label="Delivery postcode"
            name="postcode"
            required
            autoComplete="postal-code"
            placeholder="LE1 1AA"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            error={fieldError("postcode")}
          />
          <ZoneNotice postcode={postcode} />
        </div>

        <TextField
          label="Wanted for"
          name="deliveryDate"
          type="date"
          required
          min={minDate}
          hint={`Earliest available: ${new Date(minDate).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}`}
          error={fieldError("deliveryDate")}
        />
        <TextField
          label="Occasion (optional)"
          name="occasion"
          placeholder="Anniversary, Friday night, …"
          error={fieldError("occasion")}
        />
        <TextareaField
          label="Dietary needs"
          name="dietary"
          hint="Allergies, intolerances, vegetarians at the table"
          error={fieldError("dietary")}
        />
        <TextareaField
          label="Anything else"
          name="notes"
          hint="Time of day preference, gate code, the works"
          error={fieldError("notes")}
        />

        <fieldset className="flex flex-col gap-3 mt-2">
          <label className="flex items-start gap-3 text-sm text-cream-soft cursor-pointer">
            <input
              type="checkbox"
              name="gdprConsent"
              required
              className="mt-1 accent-saffron"
            />
            <span>
              You may contact me about this order. (Required.)
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-cream-soft cursor-pointer">
            <input
              type="checkbox"
              name="marketingOptIn"
              className="mt-1 accent-saffron"
            />
            <span>
              Send me an email when each season&rsquo;s menu opens. (Optional.)
            </span>
          </label>
        </fieldset>

        {fieldError("gdprConsent") && (
          <p role="alert" className="text-ochre text-sm">
            {fieldError("gdprConsent")}
          </p>
        )}

        {state?.kind === "error" && !state.fieldErrors && (
          <p role="alert" className="text-ochre text-sm">
            {state.message}
          </p>
        )}

        <div className="flex items-center justify-between mt-4 pt-6 border-t border-line">
          <span className="text-eyebrow">Subtotal</span>
          <span className="text-2xl font-display text-cream tabular-nums">
            £{total}
          </span>
        </div>

        <Button type="submit" size="lg" disabled={pending || cart.length === 0}>
          {pending ? "Sending…" : "Send order request"}
          <span aria-hidden>→</span>
        </Button>

        <p className="text-xs text-muted leading-snug">
          We don&rsquo;t take payment here. Chef Vee will reply within one
          working day with delivery time and a Stripe link to settle. By
          submitting you agree to our{" "}
          <a href="/legal/privacy" className="underline underline-offset-2">
            privacy notice
          </a>
          . Minimum order is one portion ({SITE.minPortions}).
        </p>
      </section>
    </form>
  );
}
