import Hero from "@/components/home/Hero";
import ImpactSnapshot from "@/components/home/ImpactSnapshot";
import WhatIsMehfil from "@/components/home/WhatIsMehfil";
import ProgramPillars from "@/components/home/ProgramPillars";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import PartnerStrip from "@/components/home/PartnerStrip";
import FounderBlurb from "@/components/home/FounderBlurb";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import DonateBand from "@/components/home/DonateBand";

/**
 * Homepage — v1 composition per Saloni's design spec
 * (/docs/design/homepage-v1.md).
 *
 * Section rhythm: one Deep Olive "night" moment (Hero) → warm Ivory/Warm White
 * middle (Impact → What is a Mehfil → Pillars) → Deep Olive Events → Ivory
 * Partners → Linen Founder → Warm White Newsletter → Deep Olive Donate Band.
 *
 * Saffron appears on exactly TWO pages of this site: the persistent header
 * Donate button and the final DonateBand below. Do not add Saffron elsewhere.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactSnapshot />
      <WhatIsMehfil />
      <ProgramPillars />
      <UpcomingEvents />
      <PartnerStrip />
      <FounderBlurb />
      <NewsletterSignup />
      <DonateBand />
    </>
  );
}
