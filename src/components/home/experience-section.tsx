"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    label: "01",
    title: "Choose your menu",
    body: "Pick what calls to you from this season's six courses. Order one portion or twelve. We'll confirm by morning.",
  },
  {
    label: "02",
    title: "We cook on the day",
    body: "Stocks, peppers, marinades — built in our private Leicester kitchen the same morning your order leaves.",
  },
  {
    label: "03",
    title: "Hand-delivered, hot",
    body: "Within Leicester we drive it ourselves. Across the East Midlands and London, we use chilled couriers — with reheat notes that work.",
  },
  {
    label: "04",
    title: "Open. Eat. Linger.",
    body: "Plated for two, spread for ten. We send you the music too — a short playlist for the meal.",
  },
];

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative bg-surface/40 border-y border-line"
    >
      <div className="mx-auto max-w-screen-2xl px-5 md:px-10 py-24 md:py-40">
        <header className="max-w-3xl mb-20 md:mb-32">
          <p className="text-eyebrow mb-5">The experience</p>
          <h2 id="experience-heading" className="text-section">
            Four steps from inbox to table.
          </h2>
        </header>

        <ol className="grid gap-12 md:gap-16 md:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 2) * 0.08,
              }}
              className="flex gap-6 md:gap-8"
            >
              <span
                aria-hidden
                className="font-display text-3xl text-saffron flex-none w-12"
              >
                {step.label}
              </span>
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 text-cream-soft leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
