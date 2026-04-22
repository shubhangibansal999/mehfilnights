import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * ContactClosingCTAs — two Sand tiles (Events + Donate).
 * NOTE: Saloni's spec calls for a Saffron "Donate now" button here, but the
 * site-wide Saffron budget (Header + Homepage DonateBand + /donate hero +
 * /donate closer = 4 total) reserves Saffron for /donate itself. On /contact
 * we use Turmeric to preserve the scarcity rule. This is a deliberate
 * deviation — see the audit note in the top-level README + task brief.
 */
export default function ContactClosingCTAs() {
  return (
    <Section
      background="ivory"
      aria-labelledby="contact-closing-heading"
      data-testid="contact-closing-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[880px]">
        <h2 id="contact-closing-heading" className="sr-only">
          Where to go next
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Tile 1 — Events */}
          <article
            data-testid="contact-closing-events-tile"
            className="bg-sand border border-light-line rounded-[12px] p-7 flex flex-col"
          >
            <p className="font-body font-bold text-[11px] uppercase tracking-[2px] text-muted mb-3">
              WHAT&rsquo;S NEXT
            </p>
            <h3 className="font-display text-dark-text text-[22px] leading-[1.2] mb-3">
              Come to a Mehfil.
            </h3>
            <p className="font-body text-[14px] leading-[1.6] text-body-text mb-5 flex-1">
              Three evenings on the calendar. Floor cushions, acoustic
              instruments, a room built for listening.
            </p>
            <div>
              <Button href="/events" variant="teal" size="sm">
                See upcoming events →
              </Button>
            </div>
          </article>

          {/* Tile 2 — Donate — Turmeric (not Saffron) */}
          <article
            data-testid="contact-closing-donate-tile"
            className="bg-sand border border-light-line rounded-[12px] p-7 flex flex-col"
          >
            <p className="font-body font-bold text-[11px] uppercase tracking-[2px] text-muted mb-3">
              HELP US HOST THE NEXT ONE
            </p>
            <h3 className="font-display text-dark-text text-[22px] leading-[1.2] mb-3">
              Become a donor.
            </h3>
            <p className="font-body text-[14px] leading-[1.6] text-body-text mb-5 flex-1">
              Every mehfil is paid for by people who believe in what they hear.
              Your gift keeps ticket prices low and artists paid.
            </p>
            <div>
              <Button href="/donate" variant="turmeric" size="sm">
                Donate now →
              </Button>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
