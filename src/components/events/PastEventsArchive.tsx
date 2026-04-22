import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { formatDatePill, type Event } from "@/lib/events";

/**
 * PastEventsArchive — Deep Olive grant-evidence strip on /events list.
 * 4-col desktop / 3-col tablet / 2-col 480–768px / 1-col <480px.
 * Compact cards (4:3 image placeholder) — these are retrospective tiles,
 * not clickable-with-urgency upcoming cards.
 *
 * Per Saloni §2.3: this is secretly the highest-value grant-evidence block
 * on the site. A program officer who scrolls past upcoming and sees a grid
 * of past events has their "are they real?" question answered faster than
 * any stat card.
 */

export type PastEventsArchiveProps = {
  events: Event[];
  /** Total past-event count ("XX Mehfils since 2020"). */
  totalCount?: number;
};

export default function PastEventsArchive({
  events,
  totalCount,
}: PastEventsArchiveProps) {
  if (events.length === 0) return null;
  const total = totalCount ?? events.length;

  return (
    <Section
      background="deep-olive"
      aria-labelledby="past-events-heading"
      data-testid="past-events-section"
      id="past-events"
      className="py-16 md:py-24"
    >
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div className="max-w-[680px]">
            <h2
              id="past-events-heading"
              data-testid="past-events-heading"
              className="font-display text-ivory text-[28px] md:text-[36px] leading-[1.2] mb-3"
            >
              What we&rsquo;ve done
            </h2>
            <p
              data-testid="past-events-subtitle"
              className="font-accent italic text-[19px] md:text-[22px] text-turmeric"
            >
              A look back at past Mehfils.
            </p>
          </div>
          <p
            data-testid="past-events-counter"
            className="font-body font-semibold text-[14px] text-turmeric text-center md:text-right"
          >
            {/* TODO(founder): confirm total past-event count once Sanity is wired. */}
            {total} Mehfil{total === 1 ? "" : "s"} since 2020
          </p>
        </div>

        <ul
          data-testid="past-events-grid"
          className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {events.map((event, i) => (
            <li key={event.slug}>
              <Link
                href={`/events/${event.slug}`}
                data-testid={`past-event-card-${i}`}
                aria-label={`${event.title}, ${formatDatePill(event.date)}`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turmeric rounded-[12px]"
              >
                <div className="relative aspect-[4/3] bg-deep-olive overflow-hidden rounded-[12px] border border-ivory/15">
                  {event.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={event.imageUrl}
                      alt={event.imageAlt ?? ""}
                      className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <svg
                      aria-hidden="true"
                      className="absolute inset-0 m-auto h-12 w-12 opacity-40"
                      viewBox="0 0 64 64"
                      fill="none"
                    >
                      <circle cx="32" cy="32" r="12" stroke="#D4A843" strokeWidth="1" />
                      <circle
                        cx="32"
                        cy="32"
                        r="20"
                        stroke="#D4A843"
                        strokeWidth="0.5"
                        opacity="0.6"
                      />
                      <circle cx="32" cy="32" r="3" fill="#D4A843" />
                    </svg>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute top-2 left-2 inline-flex items-center bg-turmeric text-deep-olive font-body font-semibold text-[11px] px-2 py-1 rounded-[4px]"
                  >
                    {formatDatePill(event.date)}
                  </span>
                </div>
                <div className="pt-3">
                  <h3 className="font-body font-semibold text-[16px] text-ivory leading-snug mb-1 group-hover:text-turmeric transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-body text-[12px] text-sage-muted truncate">
                    {event.venue}
                  </p>
                  <p className="mt-2 font-body text-[12px] text-turmeric underline-offset-2 group-hover:underline">
                    View details →
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
