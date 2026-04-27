import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-screen-md px-5 md:px-10 pt-32 md:pt-48 pb-32 text-center">
      <p className="text-eyebrow mb-6">404</p>
      <h1 className="text-display">
        That page isn&rsquo;t cooked.
      </h1>
      <p className="mt-8 text-lede">
        The page you&rsquo;re looking for has either moved or never existed.
      </p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Button href="/menu" size="md">
          See the menu →
        </Button>
        <Link
          href="/"
          className="text-cream-soft hover:text-saffron transition-colors self-center"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
