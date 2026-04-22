import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/events";

/**
 * Upcoming Events — Deep Olive section with 3 Sand-colored event cards.
 * Second "night moment" on the homepage, deliberate mood shift.
 *
 * Event data now lives in `src/lib/events.ts` and is shared with both
 * /events (full list) and /events/[slug] (detail). The card itself is the
 * shared `<EventCard />` — parent background and `variant` prop differ only.
 *
 * TODO(phase-1): swap `getUpcomingEvents(3)` for a Sanity query when the
 * Event schema lands (per PRD §10).
 */
export default function UpcomingEvents() {
  const events = getUpcomingEvents(3);

  return (
    <Section
      background="deep-olive"
      aria-labelledby="events-heading"
      data-testid="upcoming-events-section"
      className="py-16 md:py-24"
    >
      <Container>
        {/* Header row: title block (left) + "see all" link (right on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-[680px]">
            <h2
              id="events-heading"
              data-testid="events-heading"
              className="font-display text-ivory text-[28px] md:text-[36px] leading-[1.2] mb-3"
            >
              What&rsquo;s next
            </h2>
            <p
              data-testid="events-subtitle"
              className="font-accent italic text-[19px] md:text-[22px] text-turmeric"
            >
              Three rooms, three evenings — come to one.
            </p>
          </div>
          <Link
            href="/events"
            data-testid="events-see-all"
            className="font-body font-semibold text-[14px] tracking-[0.5px] text-turmeric hover:text-ivory transition-colors whitespace-nowrap"
          >
            See all events →
          </Link>
        </div>

        {events.length === 0 ? (
          <p
            data-testid="events-empty"
            className="font-accent italic text-[18px] text-turmeric text-center"
          >
            The next mehfil is being planned. Subscribe below to hear about it first.
          </p>
        ) : (
          <div
            data-testid="events-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {events.map((event, i) => (
              <EventCard
                key={event.slug}
                event={event}
                variant="on-dark"
                index={i}
              />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
