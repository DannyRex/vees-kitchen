# Vee's Kitchen

A premium private Nigerian kitchen in Leicester. Chef-driven seasonal menus,
prepared by Chef Vee and delivered across the East Midlands and London.

This is the production website — Next.js 16 (App Router), TypeScript strict,
Tailwind v4, React Three Fiber for the hero, Resend for transactional email,
and Sanity-ready for the journal.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Optional: copy `.env.example` to `.env.local` and fill in the keys. Without
them, transactional emails are logged to the dev console instead of sent —
order submission still works end-to-end.

```env
RESEND_API_KEY=re_...
RESEND_FROM=Vee's Kitchen <hello@veeskitchen.co.uk>
NEXT_PUBLIC_SITE_URL=https://veeskitchen.co.uk
```

## Project layout

```
src/
├── app/
│   ├── (root)/                      # Home, hero composition
│   ├── menu/                        # /menu — full season menu
│   ├── order/                       # /order — form + /order/confirmation
│   ├── chef/                        # /chef — founder editorial
│   ├── events/                      # /events — private catering
│   ├── journal/                     # /journal — ready for Sanity wiring
│   ├── contact/                     # /contact — FAQ + email
│   ├── legal/{privacy,terms}/       # GDPR + ToS
│   ├── actions/                     # server actions (order, newsletter)
│   ├── layout.tsx                   # root, fonts, header/footer/grain
│   ├── opengraph-image.tsx          # default OG card via @vercel/og
│   ├── sitemap.ts                   # MetadataRoute.Sitemap
│   ├── robots.ts                    # MetadataRoute.Robots
│   └── not-found.tsx                # 404
├── components/
│   ├── hero/                        # 3D scene, fallback, loader
│   ├── menu/                        # dish-card, menu-intro
│   ├── order/                       # order-form, zone-notice
│   ├── home/                        # experience, menu-teaser, chef-teaser, closing-cta
│   ├── ui/                          # button, field
│   └── site-{header,footer}.tsx, grain-overlay, wordmark, json-ld
└── lib/
    ├── site.ts                      # canonical brand + nav + zone config
    ├── menu.ts                      # current season's dishes (typed)
    ├── postcode.ts                  # UK outward → zone classifier
    ├── order-schema.ts              # zod schema shared client + server
    ├── order-provider.ts            # SubmitOrder seam (currently emails Vee)
    ├── email.ts                     # Resend wrapper, dev-safe
    └── cn.ts                        # class merging
```

## Key design decisions

### Brand system → Tailwind v4 tokens
Colors, fonts, easings live in `src/app/globals.css` under `@theme`. Use the
named utility classes — `bg-bg`, `text-cream`, `border-line`, etc. The
display + section + eyebrow type sizes are bespoke utility classes
(`text-display`, `text-section`, `text-eyebrow`) using `clamp()` for fluid
scaling.

### Hero 3D scene
A procedural jollof-on-brass plate (`hero-scene.tsx`) — built entirely from
primitives so there's no GLTF asset to download. Brass plate is a lathe
geometry; rice is an `InstancedMesh` of ~800 grains (mobile drops to 250);
steam is three stretched billboards with a custom GLSL shader (domain-warped
fbm advected upward). The scene is lazy-loaded via `dynamic(() => …, { ssr:
false })` and only mounts after `requestIdleCallback` or 500ms post-LCP.

The loader (`hero-scene-loader.tsx`) checks `prefers-reduced-motion` and
calls `getGPUTier()`. If either fails, it falls back to a static radial
gradient (`hero-fallback.tsx`) with the same composition — same warm focal
point, no motion. The wrapper reserves an aspect-ratio box so swapping in
the canvas can't cause layout shift.

### Order flow
Form → server action → email Vee + autoresponder. Vee replies offline with a
Stripe payment link. The contract (`OrderInput` from `lib/order-schema.ts`)
is shared between the client form and the server action — same Zod schema
on both sides.

To swap to Stripe Checkout / Tock / Resy later, replace `submitOrder()` in
`lib/order-provider.ts`. The `SubmitResult` shape stays.

### Postcode → zone gating
`lib/postcode.ts` parses the outward part of any UK postcode and classifies
into `leicester | eastMidlands | london | outOfZone`, returning lead-time
and delivery fee from `lib/site.ts`. The order form's date picker `min`
attribute updates live as the postcode changes, preventing same-day London
orders. Edit the `LEICESTER_OUTWARDS` / `EAST_MIDLANDS_PREFIXES` arrays as
the delivery footprint expands.

### Why Sanity for the journal (over Contentlayer)
Contentlayer has been effectively unmaintained since mid-2024. Sanity gives
Chef Vee a real authoring UI, ships a Studio you can mount at `/studio`,
has first-class Next.js integration via `next-sanity`, and a free starter
tier that handles this site forever. The journal index is currently a
placeholder with three lorem-style entries — wire `next-sanity` and replace
the array in `app/journal/page.tsx` with a `client.fetch()` call when posts
are ready.

### Photography
All food and portrait images are tagged Unsplash placeholders with
`PLACEHOLDER:` in the alt text and a comment in the source pointing to a
shoot brief (TBD). When real photography is delivered, replace the URLs in
`src/lib/menu.ts` and the editorial pages — alt text remains required.

## Quality bar

- TypeScript strict — no `any`, no `@ts-ignore`
- A11y: WCAG 2.2 AA color contrast across all token combinations, real
  skip-to-content link, semantic landmarks per page, every form field
  labelled, every interactive element keyboard-reachable
- Reduced motion: grain overlay disabled, animation durations collapsed,
  3D scene replaced with static fallback
- SEO: per-page metadata, JSON-LD on home (Organization/FoodEstablishment),
  /menu (Menu schema), /chef (Person), /contact (FAQPage); sitemap +
  robots; dynamic OG image at `/opengraph-image`
- Performance: 3D scene lazy + idle-loaded; `next/font` self-hosted with
  `display: swap`; `next/image` with explicit sizes; aspect-ratio reserved
  on every hero / dish image to prevent CLS

## Scripts

```bash
npm run dev          # local dev server (Turbopack)
npm run build        # production build
npm start            # run production build
npx tsc --noEmit     # typecheck
```

## Deploy

Targets Vercel. Env vars live in the Vercel dashboard:

- `RESEND_API_KEY`
- `RESEND_FROM`
- `NEXT_PUBLIC_SITE_URL` (set to `https://veeskitchen.co.uk`)

Once deployed, configure the custom domain `veeskitchen.co.uk` in Vercel
and set the SPF/DKIM records for Resend on your DNS.
