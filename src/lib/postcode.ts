/**
 * Lightweight UK postcode → delivery-zone classifier.
 *
 * We extract the OUTWARD code (everything before the space — e.g. "LE2", "EC1A").
 * We don't validate against a postcode service; we just need a zone for the
 * lead-time gate.
 *
 * This is editable by Vee without a developer — add postcodes to the lists
 * and they take effect immediately.
 */

import { SITE } from "./site";

export type Zone = "leicester" | "eastMidlands" | "london" | "outOfZone";

const LEICESTER_OUTWARDS = ["LE1", "LE2", "LE3", "LE4", "LE5"] as const;

const EAST_MIDLANDS_PREFIXES = [
  "LE6", "LE7", "LE8", "LE9", "LE1", // covers LE10–LE19
  "DE", "NG", "CV", "NN",
] as const;

// London outward codes always start with one of these area letters.
const LONDON_AREAS = [
  "EC", "WC",
  "E", "N", "NW", "SE", "SW", "W",
] as const;

export function parseOutwardCode(input: string): string | null {
  if (!input) return null;
  // Normalise: uppercase, strip spaces, take chars before the inward portion
  const normalised = input.toUpperCase().replace(/\s+/g, "");
  // UK postcode pattern: outward (1-2 letters + digits + optional letter), inward (digit + 2 letters)
  // We just need the outward part.
  const match = normalised.match(/^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})?$/);
  if (!match) return null;
  return match[1] ?? null;
}

export function zoneFor(input: string): Zone {
  const out = parseOutwardCode(input);
  if (!out) return "outOfZone";

  if ((LEICESTER_OUTWARDS as readonly string[]).includes(out)) {
    return "leicester";
  }

  if (
    out.startsWith("LE") ||
    EAST_MIDLANDS_PREFIXES.some((p) => out.startsWith(p))
  ) {
    return "eastMidlands";
  }

  // For London we match by area letters before the digit.
  const areaMatch = out.match(/^([A-Z]{1,2})\d/);
  const area = areaMatch?.[1];
  if (area && (LONDON_AREAS as readonly string[]).includes(area)) {
    return "london";
  }

  return "outOfZone";
}

export interface ZoneInfo {
  zone: Zone;
  leadHours: number;
  leadLabel: string;
  deliveryFee: number | null;
  deliveryLabel: string;
  description: string;
}

export function zoneInfo(zone: Zone): ZoneInfo {
  switch (zone) {
    case "leicester":
      return {
        zone,
        leadHours: SITE.leadTime.leicester.hours,
        leadLabel: SITE.leadTime.leicester.label,
        deliveryFee: SITE.delivery.leicester.fee,
        deliveryLabel: SITE.delivery.leicester.label,
        description:
          "You're in the Leicester delivery zone. Order at least 72 hours ahead; delivery is included.",
      };
    case "eastMidlands":
      return {
        zone,
        leadHours: SITE.leadTime.eastMidlands.hours,
        leadLabel: SITE.leadTime.eastMidlands.label,
        deliveryFee: SITE.delivery.eastMidlands.fee,
        deliveryLabel: SITE.delivery.eastMidlands.label,
        description:
          "You're in the wider East Midlands. Please give us 5 days; delivery is £25.",
      };
    case "london":
      return {
        zone,
        leadHours: SITE.leadTime.london.hours,
        leadLabel: SITE.leadTime.london.label,
        deliveryFee: SITE.delivery.london.fee,
        deliveryLabel: SITE.delivery.london.label,
        description:
          "London delivery requires 14 days' notice. Courier cost quoted with your confirmation.",
      };
    case "outOfZone":
      return {
        zone,
        leadHours: 0,
        leadLabel: "—",
        deliveryFee: null,
        deliveryLabel: "Out of zone",
        description:
          "We don't currently deliver to that postcode. Please email us — we may still be able to arrange something.",
      };
  }
}

/** Returns ISO date string of the soonest acceptable delivery date for a zone. */
export function earliestDateFor(zone: Zone): string {
  const info = zoneInfo(zone);
  const earliest = new Date();
  earliest.setHours(earliest.getHours() + info.leadHours);
  return earliest.toISOString().slice(0, 10);
}
