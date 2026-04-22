import Container from "@/components/Container";
import Button from "@/components/Button";

/**
 * Hero — the single Deep Olive "night moment" above the fold.
 * Establishes identity, mission, and the two CTAs (support + events).
 *
 * No founder-facing photography yet — per Saloni: do NOT ship a stock photo.
 * Instead we use a quiet decorative Turmeric SVG accent (a hand-drawn hairline
 * plus a faint concentric-arc glow) that echoes the sparkle in the logo mark.
 */
export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-deep-olive text-ivory min-h-[640px] md:min-h-[85vh] lg:min-h-[92vh] flex items-center"
    >
      {/* Decorative turmeric arc — no founder asset yet, so we hand-draw the mood.
          aria-hidden because the H1 carries the message. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] opacity-[0.18] md:opacity-[0.22]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#D4A843" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4A843" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="200" fill="url(#hero-glow)" />
        <circle cx="200" cy="200" r="120" stroke="#D4A843" strokeWidth="0.5" fill="none" opacity="0.4" />
        <circle cx="200" cy="200" r="160" stroke="#D4A843" strokeWidth="0.5" fill="none" opacity="0.25" />
      </svg>

      {/* Gradient wash keeps text contrast high even as the glow blooms behind it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-deep-olive via-deep-olive/95 to-deep-olive/70"
      />

      <Container className="relative z-10 py-20 md:py-28">
        <div className="max-w-[780px]">
          {/* Eyebrow — defines "mehfil" for grant reviewers in one line */}
          <p
            data-testid="hero-eyebrow"
            className="font-accent italic text-[18px] text-turmeric mb-5"
          >
            A mehfil — an intimate gathering for music, poetry, and art.
          </p>

          {/* Single H1 on the page */}
          <h1
            id="hero-heading"
            data-testid="hero-heading"
            className="font-display text-ivory text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] mb-6"
          >
            South Asian live music,
            <br className="hidden sm:inline" /> in the room next door.
          </h1>

          {/* Hidden on <480px per spec — reads as a line break at tiny widths */}
          <div
            aria-hidden="true"
            className="hidden sm:block h-px w-16 bg-turmeric mb-6"
          />

          {/* Sage-muted subtitle for WCAG AA on dark bg */}
          <p
            data-testid="hero-subtitle"
            className="font-accent italic text-[18px] md:text-[22px] text-sage-muted leading-snug mb-8 max-w-[680px]"
          >
            Bollywood · Ghazal · Sufi · Desi Folk · Classical · Coke Studio ·
            Fusion — performed acoustically in cozy Seattle venues you can walk
            to.
          </p>

          {/* Body — names the 501(c)(3) + Seattle explicitly for grant trust */}
          <p
            data-testid="hero-body"
            className="font-body text-[17px] text-ivory/85 leading-[1.75] mb-10 max-w-[620px]"
          >
            Mehfil Nights is a Seattle 501(c)(3) building community through
            South Asian live music — supporting independent artists, welcoming
            every neighbor, and carrying a centuries-old tradition into the
            Pacific Northwest.
          </p>

          {/* CTAs: Saffron (soft donate ask) + Turmeric (events).
              Saffron first in DOM order per spec accessibility note. */}
          <div
            data-testid="hero-cta-row"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button href="/donate" variant="saffron" size="md">
              Support Our Mission
            </Button>
            <Button href="/events" variant="turmeric" size="md">
              See Upcoming Events →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
