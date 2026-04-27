import { SITE } from "@/lib/site";

interface JsonLdProps {
  data: Record<string, unknown>;
}

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD blocks need raw, unescaped JSON. Source is a typed object,
      // not user input, so XSS surface is nil.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization", "FoodEstablishment"],
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    email: SITE.email,
    servesCuisine: "Nigerian",
    priceRange: `£${SITE.pricePerHead.min}–£${SITE.pricePerHead.max} per portion`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: SITE.city },
      { "@type": "AdministrativeArea", name: SITE.region },
      { "@type": "City", name: "London" },
    ],
    sameAs: [SITE.instagram],
  };

  return <JsonLd data={data} />;
}
