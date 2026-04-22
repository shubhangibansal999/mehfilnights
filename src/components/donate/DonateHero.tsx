import Container from "@/components/Container";
import Button from "@/components/Button";

/**
 * DonateHero — primary Deep Olive hero with the page's first Saffron CTA.
 *
 * This is Saffron instance #3 site-wide (Header + Homepage DonateBand +
 * /donate hero + /donate closer = 4 total). Per Saloni §2.1 + Saffron
 * scarcity rule.
 *
 * Saffron button scrolls to the gift table (#gift-table) so donors see options
 * before committing to a specific amount. The secondary outline-on-dark CTA is
 * built inline here (no dedicated Button variant exists yet; small footprint,
 * only used here).
 */
export default function DonateHero() {
  return (
    <section
      data-testid="donate-hero"
      aria-labelledby="donate-hero-heading"
      className="relative isolate overflow-hidden bg-deep-olive text-ivory min-h-[48vh] md:min-h-[58vh] flex items-center"
    >
      {/* Soft Turmeric vignette from the right edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-turmeric/15 to-transparent"
      />

      <Container className="relative z-10 py-16 md:py-24">
        <div className="max-w-[720px] mx-auto text-center">
          <p
            data-testid="donate-hero-eyebrow"
            className="font-accent italic text-[18px] text-turmeric mb-5"
          >
            Your support keeps the room open.
          </p>
          <h1
            id="donate-hero-heading"
            data-testid="donate-hero-heading"
            className="font-display text-ivory text-[32px] md:text-[48px] leading-[1.15] mb-6"
          >
            Every mehfil is paid for by people who believe in what they hear.
          </h1>
          <p
            data-testid="donate-hero-subtitle"
            className="font-accent italic text-[19px] md:text-[22px] text-sage-muted leading-[1.4] max-w-[580px] mx-auto mb-10"
          >
            Artists paid. Venues covered. Tickets kept low. A neighborhood
            tradition — sustained by neighbors.
          </p>

          <div
            data-testid="donate-hero-cta-row"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Button
              href="#gift-table"
              variant="saffron"
              size="lg"
              aria-label="Donate to Mehfil Nights"
            >
              Donate Now →
            </Button>
            <a
              href="#gift-table"
              data-testid="donate-hero-secondary"
              className="inline-flex items-center justify-center font-body font-semibold text-[15px] tracking-[0.5px] rounded-[6px] border-2 border-ivory text-ivory bg-transparent px-10 py-4 hover:bg-ivory hover:text-deep-olive transition-colors"
            >
              See where it goes
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
