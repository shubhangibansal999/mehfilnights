import Link from "next/link";
import Button from "@/components/Button";
import { formatDatePill, type Event } from "@/lib/events";

/**
 * EventCard — shared between the homepage "What's next" strip and the
 * /events upcoming-list grid.
 *
 * The parent section supplies background color; the card itself is always
 * Sand with a subtle border. On dark parents (homepage) the Sand pops; on
 * light parents (/events) the slightly stronger border (`variant="on-light"`)
 * keeps the edge legible.
 */

export type EventCardProps = {
  event: Event;
  /** Used for parent-aware border color. Default: "on-dark". */
  variant?: "on-dark" | "on-light";
  /** Index for testids (when in a grid). */
  index?: number;
};

export default function EventCard({
  event,
  variant = "on-dark",
  index,
}: EventCardProps) {
  const borderClass =
    variant === "on-light" ? "border-clay" : "border-light-line";
  const href = `/events/${event.slug}`;
  const testIdSuffix = typeof index === "number" ? `-${index}` : "";
  const datePill = formatDatePill(event.date);
  const ctaLabel = event.isFree ? "RSVP Free →" : "Get Tickets →";

  return (
    <article
      data-testid={`event-card${testIdSuffix}`}
      className={`bg-sand border ${borderClass} rounded-[12px] overflow-hidden flex flex-col`}
    >
      {/* Image area — uses provided imageUrl if present, else the Deep-Olive
          + Turmeric-glyph placeholder (identical to homepage pattern). */}
      <div className="relative aspect-[16/9] bg-deep-olive overflow-hidden">
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
            className="absolute inset-0 m-auto h-20 w-20 opacity-40"
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
          data-testid={`event-date-pill${testIdSuffix}`}
          aria-hidden="true"
          className="absolute top-2 left-2 inline-flex items-center bg-turmeric text-deep-olive font-body font-semibold text-[13px] px-3 py-1.5 rounded-[4px]"
        >
          {datePill}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <time
          dateTime={event.date}
          className="sr-only"
          data-testid={`event-date${testIdSuffix}`}
        >
          {datePill}
        </time>
        <h3 className="font-body font-semibold text-[20px] md:text-[22px] text-deep-olive leading-snug mb-2">
          <Link
            href={href}
            className="hover:text-henna transition-colors"
            data-testid={`event-title-link${testIdSuffix}`}
          >
            {event.title}
          </Link>
        </h3>
        <p className="font-body text-[14px] text-body-text mb-3 flex items-center gap-1.5">
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M12 21s-7-6.5-7-12a7 7 0 1114 0c0 5.5-7 12-7 12z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {event.venue}
          {event.neighborhood ? `, ${event.neighborhood}` : ""}
        </p>
        <p className="font-accent italic text-[16px] text-henna leading-snug mb-5 flex-1">
          {event.description}
        </p>
        <Button href={href} variant="turmeric" size="sm" className="w-full">
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
