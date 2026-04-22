import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * DonateClosing — Deep Olive closing band with the second (and final)
 * Saffron button on /donate.
 *
 * This is Saffron instance #4 site-wide (Header + Homepage DonateBand +
 * /donate hero + /donate closer). The Saffron budget ends here.
 *
 * Per Saloni §2.7: the founder's personal note. Center-aligned column.
 * EIN appears here as well ("three times on the page" per spec — hero, Trust
 * Block, and this closing line).
 */

export type DonateClosingProps = {
  founderName?: string;
  ein?: string;
};

export default function DonateClosing({
  founderName = "The Founder",
  ein = "XX-XXXXXXX",
}: DonateClosingProps) {
  return (
    <Section
      background="deep-olive"
      aria-labelledby="donate-closing-heading"
      data-testid="donate-closing-section"
      className="py-20 md:py-28"
    >
      <Container className="max-w-[820px]">
        <h2 id="donate-closing-heading" className="sr-only">
          A note from the founder
        </h2>
        <div className="text-center">
          <p
            data-testid="donate-closing-eyebrow"
            className="font-accent italic text-[20px] text-turmeric mb-6"
          >
            A note from our founder.
          </p>
          <p
            data-testid="donate-closing-body"
            className="font-body text-[17px] text-ivory/90 leading-[1.8] max-w-[620px] mx-auto mb-6"
          >
            If you&rsquo;ve read this far, you&rsquo;ve done me a kindness. If
            you give — whether it&rsquo;s $25 or $2,500 — you&rsquo;re keeping
            the room open for the next neighbor who walks in without knowing
            what a mehfil is, and walks out a little changed.
          </p>
          <p
            data-testid="donate-closing-thanks"
            className="font-body text-[17px] text-ivory/90 leading-[1.8] max-w-[620px] mx-auto mb-8"
          >
            Thank you for being here.
          </p>
          <p
            data-testid="donate-closing-signature"
            className="font-body font-semibold text-[15px] text-turmeric mb-10"
          >
            {/* TODO(founder): replace with real founder name + title. */}
            — {founderName}, Founder
          </p>

          <div className="flex justify-center mb-6">
            <Button
              href="#donate-form"
              variant="saffron"
              size="lg"
              aria-label="Donate to Mehfil Nights"
            >
              Give Now →
            </Button>
          </div>

          <p
            data-testid="donate-closing-ein-line"
            className="font-body text-[13px] text-sage-muted"
          >
            {/* TODO(founder): EIN appears three times on /donate. Confirm final. */}
            EIN: {ein} · 501(c)(3) · Seattle, WA
          </p>
        </div>
      </Container>
    </Section>
  );
}
