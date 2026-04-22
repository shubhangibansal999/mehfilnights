import Container from "@/components/Container";

/**
 * ImpactHero — short Deep Olive band (~44vh). Left-aligned at all breakpoints
 * (institutional, document-like). No CTAs.
 *
 * Per Saloni §2.1: "the data is the content; the hero is a label."
 */
export default function ImpactHero() {
  return (
    <section
      data-testid="impact-hero"
      aria-labelledby="impact-hero-heading"
      className="relative isolate overflow-hidden bg-deep-olive text-ivory min-h-[36vh] md:min-h-[44vh] flex items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-turmeric/40"
      />

      <Container className="relative z-10 py-14 md:py-20">
        <div className="max-w-[820px]">
          <p
            data-testid="impact-hero-eyebrow"
            className="font-accent italic text-[18px] text-turmeric mb-4"
          >
            Our impact.
          </p>
          <h1
            id="impact-hero-heading"
            data-testid="impact-hero-heading"
            className="font-display text-ivory text-[32px] md:text-[44px] leading-[1.15] mb-6"
          >
            Five years, forty-eight evenings, one slowly growing room.
          </h1>
          <p
            data-testid="impact-hero-body"
            className="font-body text-[17px] text-ivory/90 leading-[1.8] max-w-[640px]"
          >
            {/* TODO(founder): numbers in [brackets] populate from real counts
                once Sanity ImpactStat content is wired (PRD §10). */}
            Since 2020, Mehfil Nights has hosted 48 events, platformed 45
            independent South Asian artists, and welcomed 2,400+ neighbors
            through our rooms. The data below is the full picture — updated
            annually, published publicly, and always open to questions.
          </p>
        </div>
      </Container>
    </section>
  );
}
