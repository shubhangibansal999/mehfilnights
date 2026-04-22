import Container from "@/components/Container";
import Section from "@/components/Section";
import type { Event } from "@/lib/events";

/**
 * PastEventReflection — "What happened" block for past events only.
 * 2-column Sand: metrics list (left) + attendee/artist pull quote (right).
 *
 * Per Saloni §3.5: metrics per event (not just aggregated) signal "we track
 * what we do." Specific > aggregate for grant reviewers.
 */

export default function PastEventReflection({ event }: { event: Event }) {
  if (event.status !== "past") return null;
  const hasMetrics = !!event.pastMetrics;
  const hasQuote = !!event.pastQuote;
  if (!hasMetrics && !hasQuote) return null;

  const m = event.pastMetrics ?? {};

  return (
    <Section
      background="sand"
      aria-labelledby="past-reflection-heading"
      data-testid="past-reflection-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[900px]">
        <h2
          id="past-reflection-heading"
          data-testid="past-reflection-heading"
          className="font-display text-dark-text text-[28px] md:text-[32px] leading-[1.2] mb-8"
        >
          What happened
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {hasMetrics && (
            <dl
              data-testid="past-reflection-metrics"
              className="space-y-4"
            >
              {typeof m.audience === "number" && (
                <div className="flex items-baseline justify-between border-b border-clay/50 pb-3">
                  <dt className="font-body font-semibold text-[13px] uppercase tracking-[1.5px] text-muted">
                    Audience
                  </dt>
                  <dd className="font-display text-[22px] text-deep-olive">
                    {m.audience}
                  </dd>
                </div>
              )}
              {typeof m.artistsPaid === "number" && (
                <div className="flex items-baseline justify-between border-b border-clay/50 pb-3">
                  <dt className="font-body font-semibold text-[13px] uppercase tracking-[1.5px] text-muted">
                    Artists paid
                  </dt>
                  <dd className="font-display text-[22px] text-deep-olive">
                    {m.artistsPaid}
                  </dd>
                </div>
              )}
              {m.soldOut && (
                <div className="flex items-baseline justify-between border-b border-clay/50 pb-3">
                  <dt className="font-body font-semibold text-[13px] uppercase tracking-[1.5px] text-muted">
                    Venue
                  </dt>
                  <dd className="font-display text-[22px] text-deep-olive">
                    Sold out
                  </dd>
                </div>
              )}
              {typeof m.ticketPriceCap === "number" && (
                <div className="flex items-baseline justify-between border-b border-clay/50 pb-3">
                  <dt className="font-body font-semibold text-[13px] uppercase tracking-[1.5px] text-muted">
                    Tickets kept below
                  </dt>
                  <dd className="font-display text-[22px] text-deep-olive">
                    ${m.ticketPriceCap}
                  </dd>
                </div>
              )}
            </dl>
          )}

          {hasQuote && event.pastQuote && (
            <blockquote
              data-testid="past-reflection-quote"
              className="font-accent italic text-[20px] md:text-[22px] text-henna leading-[1.4]"
            >
              &ldquo;{event.pastQuote.text}&rdquo;
              <cite className="block font-body not-italic text-[14px] text-muted mt-3">
                — {event.pastQuote.attribution}
              </cite>
            </blockquote>
          )}
        </div>
      </Container>
    </Section>
  );
}
