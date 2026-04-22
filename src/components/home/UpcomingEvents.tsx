import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * Upcoming Events — Deep Olive section with three Sand-colored event cards.
 * Second "night moment" on the page, deliberate mood shift.
 *
 * Events below are placeholder data. The Sanity Event content type will replace
 * this list in Phase 1 — shape kept simple (date / title / venue / description)
 * so the swap stays mechanical.
 */

type Event = {
  dateLabel: string; // e.g. "OCT 18"
  dateISO: string; // e.g. "2026-10-18" — real date for <time datetime>
  title: string;
  venue: string;
  description: string;
  href: string;
};

/* TODO(phase-1): replace with Sanity CMS data.
   Venues are real Seattle rooms the org has played or could plausibly book.
   Artist names are plausible placeholders — confirm with founder before launch. */
const EVENTS: Event[] = [
  {
    dateLabel: "OCT 18",
    dateISO: "2026-10-18",
    title: "A Ghazal Evening with Bhuwin Khanna",
    venue: "Ballard Coffee Works, Seattle",
    description:
      "Folk-Sufi blends from Rajasthan and Punjab, performed acoustically on floor cushions.",
    href: "#",
  },
  {
    dateLabel: "NOV 14",
    dateISO: "2026-11-14",
    title: "Mehfil × Berklee Indian Ensemble",
    venue: "Town Hall Seattle, First Hill",
    description:
      "A residency performance blending Carnatic, Hindustani, and contemporary fusion traditions.",
    href: "#",
  },
  {
    dateLabel: "JAN 24",
    dateISO: "2027-01-24",
    title: "Emerging Voices: Nikhil Iyer + Aarthi Kumar",
    venue: "Fremont Abbey Arts Center",
    description:
      "Two rising Seattle artists pair Coke Studio covers with original South Asian pop.",
    href: "#",
  },
];

export default function UpcomingEvents() {
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

        <div
          data-testid="events-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {EVENTS.map((event, i) => (
            <article
              key={event.title}
              data-testid={`event-card-${i}`}
              className="bg-sand border border-light-line rounded-[12px] overflow-hidden flex flex-col"
            >
              {/* Image fallback panel — Deep Olive with a quiet logo-mark glow. */}
              <div className="relative aspect-[16/9] bg-deep-olive overflow-hidden">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 m-auto h-20 w-20 opacity-40"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <circle cx="32" cy="32" r="12" stroke="#D4A843" strokeWidth="1" />
                  <circle cx="32" cy="32" r="20" stroke="#D4A843" strokeWidth="0.5" opacity="0.6" />
                  <circle cx="32" cy="32" r="3" fill="#D4A843" />
                </svg>
                <span
                  data-testid={`event-date-pill-${i}`}
                  aria-hidden="true"
                  className="absolute top-2 left-2 inline-flex items-center bg-turmeric text-deep-olive font-body font-semibold text-[13px] px-3 py-1.5 rounded-[4px]"
                >
                  {event.dateLabel}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <time
                  dateTime={event.dateISO}
                  className="sr-only"
                  data-testid={`event-date-${i}`}
                >
                  {event.dateLabel}
                </time>
                <h3 className="font-body font-semibold text-[20px] md:text-[22px] text-deep-olive leading-snug mb-2">
                  <Link
                    href={event.href}
                    className="hover:text-henna transition-colors"
                    data-testid={`event-title-link-${i}`}
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
                </p>
                <p className="font-accent italic text-[16px] text-henna leading-snug mb-5 flex-1">
                  {event.description}
                </p>
                <Button
                  href={event.href}
                  variant="turmeric"
                  size="sm"
                  className="w-full"
                >
                  Get Tickets →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
