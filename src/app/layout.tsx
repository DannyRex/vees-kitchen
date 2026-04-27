import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GrainOverlay } from "@/components/grain-overlay";
import { OrganizationJsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a1815",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Nigerian food Leicester",
    "private chef Leicester",
    "Nigerian catering East Midlands",
    "jollof Leicester",
    "Vee's Kitchen",
    "Nigerian fine dining UK",
  ],
  authors: [{ name: "Chef Vee" }],
  creator: "Chef Vee",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-bg text-cream">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GrainOverlay />
        <SiteHeader />
        <main id="main" className="flex-1 relative z-10">
          {children}
        </main>
        <SiteFooter />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
