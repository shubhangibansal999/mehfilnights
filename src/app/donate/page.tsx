import type { Metadata } from "next";
import DonateHero from "@/components/donate/DonateHero";
import GiftTable from "@/components/donate/GiftTable";
import DonateActionFrame from "@/components/donate/DonateActionFrame";
import TrustBlock from "@/components/TrustBlock";
import OtherWaysToHelp from "@/components/donate/OtherWaysToHelp";
import DonateClosing from "@/components/donate/DonateClosing";

/**
 * /donate — composition per Saloni's Donate v1 spec (docs/design/donate-v1.md).
 *
 * Primary audience: first-time donors considering a gift. Also the only page
 * on the site where "is the thing you're doing here giving money?" is an
 * honest yes. Exactly two Saffron buttons (hero + closer); middle of page is
 * Turmeric (gift tiers), Teal (other ways), and the PayPal embed itself.
 *
 * Site-wide Saffron audit: Header (1) + Homepage DonateBand (1) + /donate
 * hero (1) + /donate closer (1) = 4 total. Nowhere else.
 *
 * Section rhythm: Deep-Olive hero (Saffron) → Ivory Gift Table → Sand PayPal
 * action frame → Ivory Trust Block (EIN #2) → Warm-White Other Ways →
 * Deep-Olive closer (Saffron).
 *
 * ============================================================================
 * TODO(founder) placeholders on this page (grep "TODO(founder)" for all):
 *   - EIN (×3: TrustBlock + Closing + implicit in copy)
 *   - PayPal hosted-button ID / embed code (phase-3)
 *   - Gift-tier dollar amounts + impact lines (verify program-cost data)
 *   - Confirm $100 is actually the most-common gift size
 *   - Donor quotes (currently omitted — spec allows dropping if unavailable)
 *   - Founder name + title on closing signature
 * ============================================================================
 */

export const metadata: Metadata = {
  title:
    "Donate — Mehfil Nights · Tax-Deductible Gifts to a Seattle 501(c)(3)",
  description:
    "Every mehfil is paid for by people who believe in what they hear. Donate to keep ticket prices accessible, artists paid, and the room open — tax-deductible to the full extent of the law.",
};

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <GiftTable />
      <DonateActionFrame />
      <TrustBlock
        heading="Your gift is tax-deductible."
        body="Mehfil Nights is a 501(c)(3) nonprofit organization registered with the IRS. All donations are tax-deductible to the full extent of the law. You'll receive an acknowledgment letter from us within 7 business days of your gift — keep it for your tax records."
      />
      <OtherWaysToHelp />
      <DonateClosing />
    </>
  );
}
