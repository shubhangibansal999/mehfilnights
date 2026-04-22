import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { formatDetailPill, type Event } from "@/lib/events";

/**
 * EventDetailHero — full-bleed Deep Olive header for /events/[slug].
 * Two-column desktop (60/40 text/image), single-column mobile.
 *
 * For past events, CTA shifts to "See Photos →" (Teal) with a "This event
 * has passed" tag above the H1. Per Saloni §3.1.
 */

export default function EventDetailHero({ event }: { event: Event }) {
  const isPast = event.status === "past";
  const ctaLabel = isPast ? "See Photos →" : event.isFree ? "RSVP Free →" : "Get Tickets →";
  const ctaVariant = isPast ? "teal" : "turmeric";

  return (
    <section
      data-testid="event-detail-hero"
      aria-labelledby="event-hero-heading"
      className="relative isolate overflow-hidden bg-deep-olive text-ivory min-h-[60vh] md:min-h-[72vh] flex items-center"
    >
      {/* Decorative Turmeric hairline at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-turmeric/40"
      />

      <Container className="relative z-10 py-14 md:py-24">
        <Link
          href="/events"
          data-testid="event-detail-breadcrumb"
          aria-label="Back to all events"
          className="inline-block font-body text-[13px] tracking-[0.5px] text-turmeric hover:text-ivory transition-colors mb-6"
        >
          ← All events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 items-center">
          <div className="max-w-[620px]">
            {isPast && (
              <p
                data-testid="event-detail-past-tag"
                className="font-accent italic text-[18px] text-sage-muted mb-3"
              >
                This event has passed.
              </p>
            )}
            <span
              data-testid="event-detail-date-pill"
              aria-hidden="true"
              className="inline-block bg-turmeric text-deep-olive font-body font-semibold text-[13px] px-3 py-1.5 rounded-[4px] mb-5"
            >
              {formatDetailPill(event.date)}
            </span>
            <h1
              id="event-hero-heading"
              data-testid="event-hero-heading"
              className="font-display text-ivory text-[32px] md:text-[48px] leading-[1.15] mb-5"
            >
              {event.title}
            </h1>
            <p
              data-testid="event-hero-artist-line"
              className="font-accent italic text-[20px] md:text-[22px] text-turmeric mb-4"
            >
              Featuring {event.artists.join(", ")}.
            </p>
            <address
              data-testid="event-hero-venue"
              className="not-italic font-body text-[15px] text-ivory/90 mb-8"
            >
              <span aria-hidden="true" className="mr-1.5">
                📍
              </span>
              {event.venue}
              {event.venueAddress ? ` · ${event.venueAddress}` : ""}
            </address>

            <time dateTime={event.date} className="sr-only">
              {formatDetailPill(event.date)}
            </time>

            <div className="mb-6">
              <Button
                href={event.ticketUrl}
                variant={ctaVariant}
                size="lg"
                target={event.ticketUrl.startsWith("http") ? "_blank" : undefined}
                rel={
                  event.ticketUrl.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={`${ctaLabel} — ${event.title}${
                  event.ticketUrl.startsWith("http") ? " (opens in new tab)" : ""
                }`}
              >
                {ctaLabel}
              </Button>
            </div>

            {event.accessibility && event.accessibility.length > 0 && (
              <p
                data-testid="event-hero-meta"
                className="font-body text-[13px] text-sage-muted flex flex-wrap gap-x-3 gap-y-1"
              >
                {event.accessibility.map((tag, i) => (
                  <span key={tag} className="inline-flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-sage-muted/50">
                        |
                      </span>
                    )}
                    {tag}
                  </span>
                ))}
              </p>
            )}
          </div>

          {/* Image column — rounded Turmeric-bordered frame. */}
          <div className="order-first lg:order-last">
            <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden border-2 border-turmeric bg-deep-olive">
              {event.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.imageUrl}
                  alt={event.imageAlt ?? ""}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 m-auto h-24 w-24 opacity-50"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <circle cx="32" cy="32" r="14" stroke="#D4A843" strokeWidth="1" />
                  <circle
                    cx="32"
                    cy="32"
                    r="22"
                    stroke="#D4A843"
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  <circle cx="32" cy="32" r="3" fill="#D4A843" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
