import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * OurCommitments — Option A of the Team/Board spec (pending Decisions Log Q4).
 * Sand background. Three commitment statements on the right, heading on the left.
 *
 * This is NOT a consolation prize — the three commitments (pay artists,
 * accessible tickets, transparent finances) are arguably better grant content
 * than a board list. See Saloni's About spec §2.5.
 *
 * TODO(founder): confirm Option A vs Option B (per Decisions Log Q4). If
 * founder approves Option B (board list), swap this component for TeamGrid.
 */

type Commitment = { h3: string; body: string };

const COMMITMENTS: Commitment[] = [
  {
    h3: "We pay every artist.",
    body: 'We don\'t do "exposure gigs." Every performer who takes our stage is paid a fair, pre-negotiated fee — regardless of ticket sales.',
  },
  {
    h3: "Ticket prices stay accessible.",
    body: "We set prices at what neighbors can afford, not what venues could charge. When costs rise, donations and sponsorships close the gap — not ticket buyers.",
  },
  {
    h3: "Every dollar has a line item.",
    body: "Financial documents are posted publicly once a year. When you give, you can see exactly what your gift paid for.",
  },
];

export default function OurCommitments() {
  return (
    <Section
      background="sand"
      aria-labelledby="commitments-heading"
      data-testid="commitments-section"
      className="py-16 md:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-14">
          <div>
            <p
              data-testid="commitments-eyebrow"
              className="font-accent italic text-[18px] text-henna mb-3"
            >
              How we work.
            </p>
            <h2
              id="commitments-heading"
              data-testid="commitments-heading"
              className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-4"
            >
              Our commitments.
            </h2>
            <p
              data-testid="commitments-subtitle"
              className="font-accent italic text-[19px] md:text-[22px] text-henna max-w-[440px]"
            >
              The practices that keep the room honest.
            </p>
          </div>

          <div
            data-testid="commitments-list"
            className="flex flex-col gap-10"
          >
            {COMMITMENTS.map((c, i) => (
              <article
                key={c.h3}
                data-testid={`commitment-${i}`}
              >
                <h3 className="font-body font-semibold text-[20px] text-deep-olive mb-3">
                  {c.h3}
                </h3>
                <p className="font-body text-[17px] leading-[1.7] text-body-text">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
