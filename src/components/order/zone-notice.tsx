"use client";

import { useEffect, useState } from "react";
import { zoneFor, zoneInfo, earliestDateFor, type Zone } from "@/lib/postcode";
import { cn } from "@/lib/cn";

interface Props {
  postcode: string;
  /** Called when the postcode resolves so the parent can update the date min. */
  onZoneChange?: (zone: Zone, earliestDate: string) => void;
}

export function ZoneNotice({ postcode, onZoneChange }: Props) {
  const [info, setInfo] = useState<ReturnType<typeof zoneInfo> | null>(null);

  useEffect(() => {
    if (!postcode || postcode.trim().length < 3) {
      setInfo(null);
      return;
    }
    const zone = zoneFor(postcode);
    const i = zoneInfo(zone);
    setInfo(i);
    onZoneChange?.(zone, earliestDateFor(zone));
  }, [postcode, onZoneChange]);

  if (!info) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "mt-3 px-4 py-3 border-l-2 text-sm leading-snug",
        info.zone === "outOfZone"
          ? "border-ochre bg-ochre/10 text-cream-soft"
          : "border-saffron bg-saffron/10 text-cream-soft",
      )}
    >
      <p className="font-display text-base text-cream mb-1">
        {info.zone === "leicester" && "Leicester delivery zone"}
        {info.zone === "eastMidlands" && "East Midlands delivery"}
        {info.zone === "london" && "London delivery"}
        {info.zone === "outOfZone" && "Out of zone"}
      </p>
      <p>{info.description}</p>
    </div>
  );
}
