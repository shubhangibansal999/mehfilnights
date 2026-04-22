import Container from "@/components/Container";

/**
 * AboutHero — short Deep Olive band (~52vh, not a full hero moment).
 * "You've arrived somewhere" — center-aligned, warm, no CTAs.
 *
 * Per Saloni's About spec §2.1: this is a welcome band, not a night moment.
 * The Turmeric hairline gradient at the bottom is pure CSS (no image).
 */
export default function AboutHero() {
  return (
    <section
      data-testid="about-hero"
      aria-labelledby="about-hero-heading"
      className="relative isolate overflow-hidden bg-deep-olive text-ivory min-h-[44vh] md:min-h-[52vh] flex items-center"
    >
      {/* Decorative Turmeric gradient fade from the bottom edge up — pure CSS. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-turmeric/15 to-transparent"
      />

      <Container className="relative z-10 py-16 md:py-20">
        <div className="max-w-[780px] mx-auto text-center">
          <p
            data-testid="about-hero-eyebrow"
            className="font-accent italic text-[18px] text-turmeric mb-4"
            style={{ letterSpacing: "0.3px" }}
          >
            About Mehfil Nights.
          </p>
          <h1
            id="about-hero-heading"
            data-testid="about-hero-heading"
            className="font-display text-ivory text-[36px] md:text-[48px] leading-[1.15] mb-6"
          >
            A room built for music,
            <br className="hidden sm:inline" /> a tradition built for us.
          </h1>
          <p
            data-testid="about-hero-subtitle"
            className="font-accent italic text-[19px] md:text-[22px] text-sage-muted leading-[1.4] max-w-[620px] mx-auto"
          >
            We&rsquo;re a Seattle 501(c)(3) that gathers neighbors around South
            Asian live music — and keeps a centuries-old tradition alive by
            doing it one evening at a time.
          </p>
        </div>
      </Container>
    </section>
  );
}
