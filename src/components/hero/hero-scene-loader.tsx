"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getGPUTier } from "detect-gpu";
import { HeroFallback } from "./hero-fallback";

const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <HeroFallback /> },
);

type Decision =
  | { mode: "loading" }
  | { mode: "fallback" }
  | { mode: "scene"; grainCount: number };

export function HeroSceneLoader() {
  const [decision, setDecision] = useState<Decision>({ mode: "loading" });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setDecision({ mode: "fallback" });
      return;
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let cancelled = false;

    // Defer 3D init until idle so we don't fight LCP
    const start = () => {
      getGPUTier()
        .then((gpu) => {
          if (cancelled) return;
          if (!gpu.tier || gpu.tier < 2) {
            setDecision({ mode: "fallback" });
            return;
          }
          setDecision({
            mode: "scene",
            grainCount: isMobile ? 250 : 800,
          });
        })
        .catch(() => {
          if (!cancelled) setDecision({ mode: "fallback" });
        });
    };

    // requestIdleCallback isn't in all browsers; fall back to a short timeout.
    const ric = (
      window as Window &
        typeof globalThis & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
          cancelIdleCallback?: (id: number) => void;
        }
    ).requestIdleCallback;

    let handle: number;
    if (ric) {
      handle = ric(start, { timeout: 800 });
    } else {
      handle = window.setTimeout(start, 500);
    }

    return () => {
      cancelled = true;
      const cic = (
        window as Window &
          typeof globalThis & {
            cancelIdleCallback?: (id: number) => void;
          }
      ).cancelIdleCallback;
      if (cic) cic(handle);
      else clearTimeout(handle);
    };
  }, []);

  if (decision.mode === "scene") {
    return <HeroScene grainCount={decision.grainCount} />;
  }
  return <HeroFallback />;
}
