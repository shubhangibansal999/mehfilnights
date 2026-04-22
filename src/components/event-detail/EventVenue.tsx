import Container from "@/components/Container";
import Section from "@/components/Section";
import type { Event } from "@/lib/events";

/**
 * EventVenue — practical logistics. Address + meta + text-link to Google Maps.
 * No embedded map in v1 (PRD §5 non-goal; reduces page weight and avoids
 * Google Maps cookie cascade).
 */

export default function EventVenue({ event }: { event: Event }) {
  const mapQuery = encodeURIComponent(
    `${event.venue}, ${event.venueAddress ?? "Seattle, WA"}`,
  );
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <Section
      background="ivory"
      aria-labelledby="event-venue-heading"
      data-testid="event-venue-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[900px]">
        <h2
          id="event-venue-heading"
          data-testid="event-venue-heading"
          className="font-display text-dark-text text-[28px] md:text-[32px] leading-[1.2] mb-6"
        >
          Where it happens
        </h2>

        <address
          data-testid="event-venue-address"
          className="not-italic mb-4"
        >
          <p className="font-body font-semibold text-[18px] text-dark-text mb-1">
            {event.venue}
          </p>
          {event.venueAddress && (
            <p className="font-body text-[15px] text-body-text">
              {event.venueAddress}
            </p>
          )}
        </address>

        {event.accessibility && event.accessibility.length > 0 && (
          <p
            data-testid="event-venue-meta"
            className="font-body text-[14px] text-body-text mb-6 flex flex-wrap gap-x-3 gap-y-1"
          >
            {event.accessibility.map((tag, i) => (
              <span key={tag} className="inline-flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-muted">
                    |
                  </span>
                )}
                {tag}
              </span>
            ))}
          </p>
        )}

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="event-venue-map-link"
          className="font-body font-semibold text-[15px] text-trust-teal hover:underline inline-block"
        >
          Open in Google Maps →
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </Container>
    </Section>
  );
}
