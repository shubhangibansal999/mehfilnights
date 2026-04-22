import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * TrustBlock — 501(c)(3) + EIN publication card.
 * Reused on /about, /donate, /impact (same visual, different body + heading
 * copy per page context).
 *
 * Visual: single bordered card (2px Deep Olive border, 12px radius) with a
 * light sand fill inside. Center-aligned content. "OFFICIAL STATUS" label +
 * H3 + body + EIN + registration line.
 *
 * TODO(founder): EIN must land before launch. Appears on /about, /donate
 * (three times on that page), and /impact. Do NOT launch with "XX-XXXXXXX".
 */

export type TrustBlockProps = {
  heading?: string;
  body?: string;
  ein?: string;
  /** Region label override (default: "OFFICIAL STATUS"). */
  label?: string;
};

export default function TrustBlock({
  heading = "Mehfil Nights is a 501(c)(3) nonprofit organization.",
  body = "All donations are tax-deductible to the full extent of the law. Mehfil Nights is registered with the IRS and complies with Washington State nonprofit reporting requirements.",
  ein = "XX-XXXXXXX",
  label = "OFFICIAL STATUS",
}: TrustBlockProps) {
  return (
    <Section
      background="ivory"
      data-testid="trust-block-section"
      className="py-16 md:py-20"
    >
      <Container className="max-w-[900px]">
        <div
          role="region"
          aria-labelledby="trust-block-heading"
          data-testid="trust-block-card"
          className="border-2 border-deep-olive rounded-[12px] px-6 py-10 md:px-12 md:py-12 text-center"
          style={{ backgroundColor: "#F1E9DA" }}
        >
          <p
            data-testid="trust-block-label"
            className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-muted mb-5"
          >
            {label}
          </p>
          <h3
            id="trust-block-heading"
            data-testid="trust-block-heading"
            className="font-display text-dark-text text-[24px] md:text-[28px] leading-[1.3] mb-4"
          >
            {heading}
          </h3>
          <p
            data-testid="trust-block-body"
            className="font-body text-[16px] leading-[1.7] text-body-text max-w-[620px] mx-auto"
          >
            {body}
          </p>
          <p
            data-testid="trust-block-ein"
            className="font-body font-semibold text-[14px] text-dark-text mt-5"
          >
            {/* TODO(founder): replace XX-XXXXXXX with real EIN before launch. */}
            EIN: {ein}
          </p>
          <p
            data-testid="trust-block-registration"
            className="font-body text-[14px] text-muted mt-2"
          >
            Registered in Washington State. Seattle, WA.
          </p>
        </div>
      </Container>
    </Section>
  );
}
