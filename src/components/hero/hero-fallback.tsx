/**
 * Static fallback rendered when prefers-reduced-motion is on, GPU tier is low,
 * or the 3D scene is still hydrating. Approximates the hero composition with
 * a warm radial gradient — replace with a pre-rendered AVIF of the actual
 * scene once the photo shoot is done.
 */
export function HeroFallback() {
  return (
    <div
      role="img"
      aria-label="A brass plate of jollof rice on a charcoal table, lit warmly from the upper left"
      className="absolute inset-0 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 60% 62%, rgba(212, 136, 31, 0.55) 0%, rgba(184, 84, 30, 0.32) 22%, rgba(34, 31, 27, 0.95) 58%, #1a1815 92%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background:
            "linear-gradient(to top, rgba(26, 24, 21, 1) 0%, rgba(26, 24, 21, 0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[55%] -translate-x-1/2 h-32 w-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 136, 31, 0.35) 0%, rgba(212, 136, 31, 0) 70%)",
          filter: "blur(28px)",
        }}
      />
    </div>
  );
}
