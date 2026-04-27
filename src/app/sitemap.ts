import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/menu`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/order`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/events`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/chef`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/journal`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE.url}/contact`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE.url}/legal/privacy`, lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/legal/terms`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
