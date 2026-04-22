import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import EventCard from "@/components/EventCard";
import type { Event } from "@/lib/events";

/**
 * RelatedEvents — 3-card strip at the bottom of /events/[slug].
 * On Ivory. Shows up to 3 upcoming events (excluding the current slug).
 * If zero upcoming exist, we render a small "subscribe for alerts" band.
 */

export type RelatedEventsProps = {
  events: Event[];
  currentSlug: string;
};

export default function RelatedEvents({
  events,
  currentSlug,
}: RelatedEventsProps) {
  const related = events.filter((e) => e.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) {
    return (
      <Section
        background="ivory"
        data-testid="related-events-empty"
        className="py-14 md:py-20"
      >
        <Container>
          <div className="bg-sand rounded-[12px] p-8 text-center max-w-[620px] mx-auto">
            <p className="font-body text-[16px] text-body-text mb-2">
              The next mehfil is being planned.
            </p>
            <Link
              href="/#newsletter"
              className="font-body font-semibold text-[14px] text-trust-teal underline"
            >
              Subscribe for alerts →
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section
      background="ivory"
      aria-labelledby="related-events-heading"
      data-testid="related-events-section"
      className="py-14 md:py-20"
    >
      <Container>
        <div className="mb-10">
          <h2
            id="related-events-heading"
            data-testid="related-events-heading"
            className="font-display text-dark-text text-[26px] md:text-[32px] leading-[1.2] mb-3"
          >
            More to come
          </h2>
          <p className="font-accent italic text-[18px] md:text-[20px] text-henna">
            {related.length === 1
              ? "One more evening on the calendar."
              : `${related.length} more evenings on the calendar.`}
          </p>
        </div>

        <div
          data-testid="related-events-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {related.map((event, i) => (
            <EventCard
              key={event.slug}
              event={event}
              variant="on-light"
              index={i}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
