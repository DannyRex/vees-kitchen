import { Hero } from "@/components/hero/hero";
import { ExperienceSection } from "@/components/home/experience-section";
import { MenuTeaser } from "@/components/home/menu-teaser";
import { ChefTeaser } from "@/components/home/chef-teaser";
import { ClosingCta } from "@/components/home/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <MenuTeaser />
      <ChefTeaser />
      <ClosingCta />
    </>
  );
}
