"use client";

import { useState, useTransition } from "react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

type Status =
  | { kind: "idle" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(async () => {
          const result = await subscribeNewsletter(data);
          setStatus(result);
        });
      }}
      className="flex flex-col gap-2"
      aria-describedby="newsletter-help"
    >
      <label htmlFor="newsletter-email" className="text-eyebrow">
        New menu drops
      </label>
      <p id="newsletter-help" className="text-sm text-muted leading-snug">
        One email when each season&rsquo;s menu opens. Unsubscribe anytime.
      </p>
      <div className="flex gap-2 mt-1">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="flex-1 min-w-0 bg-transparent border-b border-line-strong px-1 py-2 text-cream placeholder:text-faint focus:outline-none focus:border-saffron"
        />
        <button
          type="submit"
          disabled={pending}
          className="text-sm font-medium tracking-tight text-saffron border-b border-saffron/40 hover:border-saffron transition-colors disabled:opacity-50"
        >
          {pending ? "Sending…" : "Subscribe"}
        </button>
      </div>
      {status.kind !== "idle" && (
        <p
          role="status"
          className={
            status.kind === "success" ? "text-sm text-emerald-soft mt-2" : "text-sm text-ochre mt-2"
          }
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
