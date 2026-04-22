import Button from "@/components/Button";

/**
 * EmptyState — "no upcoming events" Sand band.
 * Used on /events when getUpcomingEvents() returns []. Honest copy per
 * Saloni §2.2 — "We host 4–6 a year, announced 6–10 weeks ahead."
 */
export default function EmptyState() {
  return (
    <div
      data-testid="events-empty-state"
      className="bg-sand rounded-[16px] p-10 md:p-16 max-w-[620px] mx-auto text-center"
    >
      <h3 className="font-display text-[24px] md:text-[28px] text-dark-text leading-[1.2] mb-4">
        The next mehfil is being planned.
      </h3>
      <p className="font-body text-[16px] md:text-[17px] leading-[1.7] text-body-text mb-6">
        We host 4–6 Mehfils a year, announced 6–10 weeks ahead. The best way to
        hear about the next one is email — one short message when tickets open,
        never spam.
      </p>
      <div className="mb-3">
        <Button href="/#newsletter" variant="teal" size="md">
          Subscribe for event alerts →
        </Button>
      </div>
      <a
        href="#past-events"
        data-testid="empty-state-see-past"
        className="font-body font-semibold text-[14px] text-trust-teal underline"
      >
        See past events ↓
      </a>
    </div>
  );
}
