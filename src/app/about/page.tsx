import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import MissionVisionValues from "@/components/about/MissionVisionValues";
import OurStory from "@/components/about/OurStory";
import AboutProgramsRecap from "@/components/about/AboutProgramsRecap";
import OurCommitments from "@/components/about/OurCommitments";
import TrustBlock from "@/components/TrustBlock";
import PressStrip from "@/components/about/PressStrip";
import CTABanner from "@/components/CTABanner";

/**
 * /about — composition per Saloni's About v1 spec (docs/design/about-v1.md).
 *
 * Primary audience: grant reviewers. Secondary: first-time donors who clicked
 * "Read our full story →" from the homepage.
 *
 * Section rhythm: short Deep-Olive hero band → Ivory Mission/Vision/Values →
 * Warm-White Our Story → Ivory Programs Recap → Sand Commitments (Option A of
 * team section — Option B TeamGrid is deferred pending Decisions Log Q4) →
 * Ivory Trust Block → Warm-White Press Strip → Deep-Olive Closing CTA.
 *
 * Two Deep-Olive moments. One Saffron moment WOULD be the closing CTA per
 * Saloni's spec — but site-wide Saffron budget is 4 (Header + Homepage
 * DonateBand + /donate hero + /donate closer). We use Turmeric on the closing
 * CTA here to preserve that scarcity. See CTABanner.tsx for the deviation note.
 *
 * ============================================================================
 * TODO(founder) placeholders on this page (grep "TODO(founder)" to see all):
 *   - EIN (TrustBlock)                           → before launch, blocking
 *   - Our Story facts: city, year, founder path  → Chapter 1 of OurStory
 *   - Values list (5 bullets)                    → MissionVisionValues
 *   - Team vs Commitments decision (A or B)      → currently shipping Option A
 *   - If Option B: team names + roles + affiliations
 *   - 3 press mentions: publication, headline, date, URL
 * ============================================================================
 */

export const metadata: Metadata = {
  title:
    "About Mehfil Nights — A Seattle 501(c)(3) for South Asian Live Music",
  description:
    "A Seattle 501(c)(3) nonprofit gathering neighbors around South Asian live music. Our mission, story, programs, commitments, and transparent 501(c)(3) status — written for grant reviewers and first-time donors.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVisionValues />
      <OurStory />
      <AboutProgramsRecap />
      <OurCommitments />
      <TrustBlock />
      <PressStrip />
      <CTABanner
        id="about-closing-heading"
        eyebrow="You&rsquo;ve read our story. What now?"
        heading="Help us host the next one."
        body="Every mehfil needs a room, a sound system, and an artist. Your gift covers all three — and keeps ticket prices low so every neighbor can come."
        primary={{ label: "Donate Now →", href: "/donate" }}
        secondary={{ label: "Get in Touch", href: "/contact" }}
        primaryVariant="turmeric"
      />
    </>
  );
}
