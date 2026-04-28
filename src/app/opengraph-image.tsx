import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default OG image for the home / non-overridden pages. Renders the wordmark
 * + tagline on the brand charcoal with a saffron radial glow — same
 * composition as the hero fallback.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#1a1815",
          color: "#f5efe6",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 55% at 70% 70%, rgba(212,136,31,0.55) 0%, rgba(184,84,30,0.25) 28%, rgba(26,24,21,0.95) 65%, #1a1815 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            fontSize: "32px",
            letterSpacing: "-0.02em",
            position: "relative",
          }}
        >
          <span style={{ fontWeight: 600 }}>Vee&rsquo;s</span>
          <span style={{ color: "#d4881f" }}>·</span>
          <span style={{ fontStyle: "italic", opacity: 0.92 }}>Kitchen</span>
        </div>

        <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d4881f",
              marginBottom: "24px",
            }}
          >
            A private kitchen · Leicester
          </div>
          <div
            style={{
              fontSize: "92px",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              fontWeight: 380,
              maxWidth: "1000px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>
              <span>Authentically&nbsp;</span>
              <span style={{ color: "#d4881f" }}>Nigerian.</span>
            </div>
            <span style={{ fontStyle: "italic", opacity: 0.92 }}>
              Unapologetically refined.
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
