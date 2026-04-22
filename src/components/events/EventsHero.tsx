import Container from "@/components/Container";

/**
 * EventsHero — short Deep Olive band on /events list.
 * Left-aligned at ≥768px / center ≤767px. Subscribe-for-alerts link at the
 * bottom catches the "nothing fits my calendar" visitor per Saloni §2.1.
 */
export default function EventsHero() {
  return (
    <section
      data-testid="events-hero"
      aria-labelledby="events-hero-heading"
      className="relative isolate overflow-hidden bg-deep-olive text-ivory min-h-[36vh] md:min-h-[44vh] flex items-center"
    >
      {/* 1px Turmeric hairline at the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-turmeric/40"
      />

      <Container className="relative z-10 py-14 md:py-20">
        <div className="max-w-[780px] text-center md:text-left">
          <p
            data-testid="events-hero-eyebrow"
            className="font-accent italic text-[18px] text-turmeric mb-4"
          >
            Upcoming Mehfils.
          </p>
          <h1
            id="events-hero-heading"
            data-testid="events-hero-heading"
            className="font-display text-ivory text-[32px] md:text-[44px] leading-[1.15] mb-5"
          >
            A room, an artist, an evening you&rsquo;ll remember.
          </h1>
          <p
            data-testid="events-hero-subtitle"
            className="font-accent italic text-[18px] md:text-[20px] text-sage-muted leading-[1.4] max-w-[580px] md:max-w-none mx-auto md:mx-0 mb-5"
          >
            Every Mehfil is acoustic, intimate, and small enough that the
            artist can hear the audience breathe.
          </p>
          <a
            href="#newsletter"
            data-testid="events-hero-subscribe"
            className="inline-block font-body font-semibold text-[14px] text-turmeric hover:text-ivory hover:underline transition-colors"
          >
            Can&rsquo;t make this one? Get alerts for the next mehfil{" "}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
