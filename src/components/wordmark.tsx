import Link from "next/link";
import { cn } from "@/lib/cn";

export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <Link
      href="/"
      aria-label="Vee's Kitchen — home"
      className={cn(
        "inline-flex items-baseline gap-1.5 font-display leading-none tracking-tight transition-opacity hover:opacity-80",
        size === "sm" ? "text-lg" : "text-xl md:text-2xl",
        className,
      )}
    >
      <span className="font-medium">Vee&rsquo;s</span>
      <span aria-hidden className="text-saffron">
        ·
      </span>
      <span className="font-light italic text-cream-soft">Kitchen</span>
    </Link>
  );
}
