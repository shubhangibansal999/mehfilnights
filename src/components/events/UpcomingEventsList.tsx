import Container from "@/components/Container";
import Section from "@/components/Section";
import EventCard from "@/components/EventCard";
import EmptyState from "./EmptyState";
import type { Event } from "@/lib/events";

/**
 * UpcomingEventsList — /events list page primary section.
 * Ivory background (catalog, not mood). 3-column at ≥1024px, 2-col tablet,
 * 1-col mobile. Honest empty state if no upcoming events exist.
 */

export type UpcomingEventsListProps = {
  events: Event[];
};

export default function UpcomingEventsList({ events }: UpcomingEventsListProps) {
  return (
    <Section
      background="ivory"
      aria-labelledby="upcoming-list-heading"
      data-testid="upcoming-list-section"
      className="py-14 md:py-20"
    >
      <Container>
        <h2 id="upcoming-list-heading" className="sr-only">
          Upcoming events
        </h2>
        <div className="flex items-baseline justify-between mb-8 md:mb-10 gap-4">
          <p
            data-testid="upcoming-list-eyebrow"
            className="font-accent italic text-[18px] text-henna"
          >
            On the calendar.
          </p>
          <p
            data-testid="upcoming-count"
            className="font-body font-semibold text-[15px] text-dark-text"
          >
            {events.length} upcoming event{events.length === 1 ? "" : "s"}
          </p>
        </div>

        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            data-testid="upcoming-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {events.map((event, i) => (
              <EventCard
                key={event.slug}
                event={event}
                variant="on-light"
                index={i}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
