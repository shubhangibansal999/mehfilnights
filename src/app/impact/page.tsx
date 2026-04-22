import type { Metadata } from "next";
import ImpactHero from "@/components/impact/ImpactHero";
import ExpandedStats from "@/components/impact/ExpandedStats";
import MilestonesTimeline from "@/components/impact/MilestonesTimeline";
import ImpactStories from "@/components/impact/ImpactStories";
import PartnerGroups from "@/components/impact/PartnerGroups";
import PDFDownload from "@/components/impact/PDFDownload";
import TrustBlock from "@/components/TrustBlock";
import CTABanner from "@/components/CTABanner";

/**
 * /impact — composition per Saloni's Impact v1 spec (docs/design/impact-v1.md).
 *
 * Primary audience: grant reviewers. The closest the site comes to a grant-
 * application PDF in web form.
 *
 * Section rhythm: short Deep-Olive hero → Ivory expanded stats → Warm-White
 * milestones timeline → Ivory impact stories → Warm-White partner groups →
 * Sand PDF download → Ivory Trust Block → Deep-Olive closing CTA.
 *
 * Closing CTA uses Turmeric primary (not Saffron) to preserve the site-wide
 * 4-Saffron budget. See CTABanner.tsx for the deviation note.
 *
 * ============================================================================
 * TODO(founder) placeholders on this page (grep "TODO(founder)" for all):
 *   - EIN (TrustBlock)
 *   - All 4 impact stat numbers + trend lines + footnotes
 *   - 4–6 real milestones (dates + titles + descriptions)
 *   - 3 authentic impact stories (artist + audience + volunteer)
 *   - Story photos (currently using Turmeric-music-note placeholder)
 *   - Real partner groupings (Venue / Community / Funder)
 *   - 2025 Impact Report PDF at /public/reports/mehfil-nights-impact-2025.pdf
 * ============================================================================
 */

export const metadata: Metadata = {
  title:
    "Impact — Mehfil Nights · Annual Metrics, Stories & Transparency Report",
  description:
    "Five years of impact at Mehfil Nights. Real numbers, real stories, real transparency — formatted for grant committees, funders, and neighbors who want to see where their support goes.",
};

export default function ImpactPage() {
  return (
    <>
      <ImpactHero />
      <ExpandedStats />
      <MilestonesTimeline />
      <ImpactStories />
      <PartnerGroups />
      <PDFDownload />
      <TrustBlock
        heading="Mehfil Nights is a 501(c)(3) nonprofit organization."
        body="Registered with the IRS. Annual financial reports published to this Impact page every April. Full audit documents available on request."
      />
      <CTABanner
        id="impact-closing-heading"
        eyebrow="You&rsquo;ve read our numbers. Here&rsquo;s how to help."
        heading="Help us host the next one."
        body="Your gift — or a conversation about how you might help — keeps this work going. We answer every message, often within 24 hours."
        primary={{ label: "Donate Now →", href: "/donate" }}
        secondary={{ label: "Get in Touch", href: "/contact" }}
        primaryVariant="turmeric"
      />
    </>
  );
}
