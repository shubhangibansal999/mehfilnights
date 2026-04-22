// Temporary placeholder — the real homepage is coming in the next phase.
// Saloni is designing it in parallel; this exists just so the build has a
// valid index route while the foundations (fonts, tokens, components) land.

import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <Section background="ivory" data-testid="home-placeholder">
      <Container>
        <div className="max-w-[760px]">
          <h1
            data-testid="home-heading"
            className="font-display text-dark-text text-[42px] md:text-[64px] leading-[1.1] mb-4"
          >
            Mehfil Nights
          </h1>

          <p
            data-testid="home-subtitle"
            className="font-accent italic text-[22px] md:text-[24px] text-body-text mb-8"
          >
            An intimate gathering for music, poetry, and art.
          </p>

          <div className="space-y-5 text-[17px] leading-[1.75] text-body-text">
            <p>
              Mehfil Nights is a Seattle-based 501(c)(3) nonprofit building
              community through South Asian live music — Bollywood, Ghazal, Sufi,
              Desi folk, Classical, Coke Studio, and fusion. We bring people
              together in homely, acoustic settings that feel less like a concert
              and more like an evening in a friend&apos;s living room.
            </p>
            <p>
              We support independent artists, connect cultures, and grow
              cross-cultural audiences across the Pacific Northwest. Every
              donation helps us keep ticket prices low, pay artists fairly, and
              expand our community programs.
            </p>
          </div>

          <div className="mt-10" data-testid="home-cta-row">
            <Button href="/donate" variant="saffron" size="md">
              Support Our Mission
            </Button>
          </div>

          <p
            data-testid="home-build-note"
            className="mt-14 text-[13px] text-muted italic"
          >
            The full homepage is in design — returning next.
          </p>
        </div>
      </Container>
    </Section>
  );
}
