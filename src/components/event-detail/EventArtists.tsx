import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * EventArtists — v1 simplified (artist names only).
 * Per Saloni §3.3: a full ArtistCard with photos + bios + links is v2 content
 * when a richer artist pattern is needed. For v1, we render a single
 * horizontal italic list with a transparency line about the v2 upgrade.
 */

export default function EventArtists({ artists }: { artists: string[] }) {
  if (!artists || artists.length === 0) return null;

  return (
    <Section
      background="warm-white"
      aria-labelledby="event-artists-heading"
      data-testid="event-artists-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[900px]">
        <h2
          id="event-artists-heading"
          data-testid="event-artists-heading"
          className="font-display text-dark-text text-[28px] md:text-[32px] leading-[1.2] mb-3"
        >
          The artists
        </h2>
        <p className="font-accent italic text-[18px] md:text-[20px] text-henna mb-6">
          Meet the musicians for this Mehfil.
        </p>

        <p
          data-testid="event-artists-list"
          className="font-accent italic text-[22px] md:text-[28px] text-henna leading-[1.4]"
        >
          {artists.join(", ")}.
        </p>
        <p className="font-body text-[14px] text-muted italic mt-6">
          {/* TODO(v2 follow-up): expand into full ArtistCards when a richer
              artist profile pattern is desired. */}
          Full artist bios coming soon.
        </p>
      </Container>
    </Section>
  );
}
