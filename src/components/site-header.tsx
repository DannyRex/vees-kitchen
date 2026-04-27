"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled || open
          ? "bg-bg/85 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-6 px-5 py-4 md:px-10 md:py-5">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm text-cream-soft"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-1 transition-colors hover:text-saffron focus-visible:text-saffron"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/order" size="sm">
            Order this season&rsquo;s menu
            <span aria-hidden>→</span>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center text-cream"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-px w-6 bg-cream">
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-cream transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "rotate-45 top-0" : "-top-2",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-cream transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open ? "-rotate-45 top-0" : "top-2",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          aria-label="Mobile primary"
          className="flex flex-col gap-1 px-5 pb-6 pt-2"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-cream py-2"
            >
              {item.label}
            </Link>
          ))}
          <Button
            href="/order"
            size="md"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            Order this season&rsquo;s menu
          </Button>
        </nav>
      </div>
    </header>
  );
}
