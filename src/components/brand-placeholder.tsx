/**
 * Branded image placeholder used until real photography is shot.
 * Renders an inline SVG that mirrors the hero's warm radial composition,
 * with the dish/role name centred in display type. Each placeholder uses
 * a deterministic hash of `seed` to pick a focal position + accent —
 * so the menu page reads as a varied set of plates, not six identical cards.
 *
 * Replace usages with <Image> + real shoot URLs; the component API is
 * structured so the swap is mechanical.
 */

import { cn } from "@/lib/cn";

interface Props {
  /** Big serif label, e.g. dish name or "Chef Vee" */
  primary: string;
  /** Eyebrow above the label, e.g. "LAGOS · £26" or "FOUNDER" */
  secondary?: string;
  /** Hash seed for deterministic variation. Defaults to `primary`. */
  seed?: string;
  /** Tailwind-compatible className for the wrapping div (size, position). */
  className?: string;
  /** Decorative — alt text is provided by the parent figure/img wrapper. */
  decorative?: boolean;
}

const PALETTES = [
  { glow: "#d4881f", deep: "#b8541e" }, // saffron / ochre
  { glow: "#e09a3a", deep: "#a8480f" }, // soft saffron / dark ochre
  { glow: "#cc6a1a", deep: "#7a3a18" }, // amber / russet
  { glow: "#d4a847", deep: "#7a4f1a" }, // honey / brown
  { glow: "#c97a2a", deep: "#5e2c12" }, // burnt / mahogany
] as const;

const FOCAL_POSITIONS = [
  { cx: 50, cy: 60 },
  { cx: 42, cy: 58 },
  { cx: 58, cy: 62 },
  { cx: 50, cy: 65 },
  { cx: 46, cy: 55 },
  { cx: 54, cy: 58 },
] as const;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function BrandPlaceholder({
  primary,
  secondary,
  seed,
  className,
  decorative = false,
}: Props) {
  const h = hash(seed ?? primary);
  const palette = PALETTES[h % PALETTES.length];
  const focal = FOCAL_POSITIONS[h % FOCAL_POSITIONS.length];
  const angle = (h % 30) - 15;

  return (
    <div
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative ? true : undefined}
      className={cn("relative overflow-hidden bg-bg", className)}
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id={`glow-${h}`}
            cx={`${focal.cx}%`}
            cy={`${focal.cy}%`}
            r="55%"
          >
            <stop offset="0%" stopColor={palette.glow} stopOpacity="0.85" />
            <stop offset="22%" stopColor={palette.deep} stopOpacity="0.55" />
            <stop offset="62%" stopColor="#221f1b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#1a1815" stopOpacity="1" />
          </radialGradient>
          <linearGradient
            id={`vignette-${h}`}
            x1="0"
            y1="0.55"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#1a1815" stopOpacity="0" />
            <stop offset="100%" stopColor="#1a1815" stopOpacity="0.85" />
          </linearGradient>
          {/* Subtle film grain overlay */}
          <filter id={`grain-${h}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix values="0 0 0 0 0.96  0 0 0 0 0.94  0 0 0 0 0.9  0 0 0 0.06 0" />
          </filter>
        </defs>

        <rect width="400" height="500" fill="#1a1815" />
        <rect width="400" height="500" fill={`url(#glow-${h})`} />

        {/* Suggestion of a plate rim — subtle ellipse, never literal */}
        <ellipse
          cx={focal.cx * 4}
          cy={focal.cy * 5}
          rx="135"
          ry="34"
          fill="none"
          stroke={palette.glow}
          strokeOpacity="0.18"
          strokeWidth="1"
          transform={`rotate(${angle} ${focal.cx * 4} ${focal.cy * 5})`}
        />
        <ellipse
          cx={focal.cx * 4}
          cy={focal.cy * 5}
          rx="92"
          ry="22"
          fill="none"
          stroke={palette.glow}
          strokeOpacity="0.12"
          strokeWidth="1"
          transform={`rotate(${angle} ${focal.cx * 4} ${focal.cy * 5})`}
        />

        <rect
          width="400"
          height="500"
          fill={`url(#vignette-${h})`}
          pointerEvents="none"
        />
        <rect
          width="400"
          height="500"
          filter={`url(#grain-${h})`}
          opacity="0.5"
          pointerEvents="none"
        />
      </svg>

      <div className="relative h-full w-full flex flex-col justify-end p-6 md:p-8">
        {secondary && (
          <p
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-saffron mb-2 md:mb-3 font-medium"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            {secondary}
          </p>
        )}
        <p
          className="font-display text-2xl md:text-3xl text-cream leading-tight max-w-[80%]"
          style={{
            fontStyle: "italic",
            fontWeight: 360,
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}
        >
          {primary}
        </p>
      </div>
    </div>
  );
}
