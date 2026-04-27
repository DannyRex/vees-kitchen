import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from a private Nigerian kitchen in Leicester — recipes, technique, and the stories behind the menu.",
  alternates: { canonical: "/journal" },
};

/**
 * Journal is wired for Sanity in /sanity (see README), but with no posts
 * authored yet, this page renders a placeholder index. Once Sanity is
 * connected and the first posts are published, swap this to fetch via
 * `client.fetch(postsQuery)`.
 */

const PLACEHOLDER_POSTS = [
  {
    title: "What jollof in Leicester wants you to know",
    dek: "Notes on tatashe, smoke, and why the bottom of the pot is the prize.",
    date: "October 2025",
  },
  {
    title: "A brief case for stockfish",
    dek: "How a piece of dried Norwegian cod made it into our egusi — and why it stays.",
    date: "September 2025",
  },
  {
    title: "Suya, the long way round",
    dek: "Yaji from scratch: kuli-kuli, ginger, clove, dried bonnet, and patience.",
    date: "August 2025",
  },
];

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-screen-xl px-5 md:px-10 pt-32 md:pt-48 pb-32">
      <header className="mb-20 md:mb-28">
        <p className="text-eyebrow mb-5">Journal</p>
        <h1 className="text-display max-w-3xl">
          Notes from the kitchen.
        </h1>
        <p className="mt-8 text-lede max-w-2xl">
          Recipes, technique, and the stories behind the menu. New posts when
          we have something worth saying.
        </p>
      </header>

      <ul className="divide-y divide-line">
        {PLACEHOLDER_POSTS.map((post, i) => (
          <li key={i}>
            <Link
              href="/journal"
              aria-disabled="true"
              className="grid md:grid-cols-12 gap-4 md:gap-10 py-10 md:py-14 group"
            >
              <p className="md:col-span-2 text-eyebrow text-faint pt-2">
                {post.date}
              </p>
              <div className="md:col-span-8">
                <h2 className="font-display text-3xl md:text-4xl text-cream group-hover:text-saffron transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-cream-soft text-lg leading-relaxed">
                  {post.dek}
                </p>
              </div>
              <p className="md:col-span-2 md:text-right text-faint pt-2 text-sm">
                Coming soon
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-24 text-sm text-muted max-w-md">
        The journal is published from Sanity Studio. Once posts are live, this
        page lists them with full reading view at <code>/journal/[slug]</code>.
      </p>
    </div>
  );
}
