import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * ExpandedStats — richer version of the homepage ImpactSnapshot.
 * 2×2 grid at ≥1024px. Each card carries number, label, context paragraph,
 * trend indicator, and a methodology footnote.
 *
 * Per Saloni §2.2: trend row answers the silent "are they growing?" question.
 * Footnote signals measurement maturity (most nonprofit stat pages omit it).
 */

type Stat = {
  value: string;
  label: string;
  context: string;
  trend?: string;
  footnote?: string;
};

/* TODO(founder): replace all 4 numbers and all 4 trend lines with real,
   audited counts. If year-over-year growth data doesn't exist yet, leave the
   trend field empty — honesty beats padding. */
const STATS: Stat[] = [
  {
    value: "2,400+",
    label: "Audience members welcomed",
    context:
      "Across living rooms, coffee roasteries, concert halls, and neighborhood venues since 2020. Ticket prices have stayed below $35, always — because accessibility is not a bonus feature.",
    trend: "↑ +42% audience growth in the last 12 months",
    footnote: "Based on ticket records + door counts at free events.",
  },
  {
    value: "45",
    label: "Artists platformed",
    context:
      "Local, national, and international — from Seattle, Bellevue, the Bay Area, Toronto, Karachi, and Mumbai. Every artist is paid a pre-negotiated fee. We've never run an exposure gig.",
    trend: "↑ 6 new emerging artists in 2025",
    footnote: "Counts unique artists; some perform at multiple events.",
  },
  {
    value: "48",
    label: "Events hosted",
    context:
      "Ticketed Mehfil evenings, free community gatherings, and educational workshops combined. On average we host 6–8 Mehfils per year, with occasional residency-style runs.",
    trend: "→ Steady cadence, 6–8 events/yr since 2022",
    footnote: "Event = a single evening with ≥ 1 artist and ≥ 15 attendees.",
  },
  {
    value: "480+",
    label: "Volunteer hours contributed",
    context:
      "Powered by the Mehfil-ites — our informal volunteer corps — who handle setup, ticketing, sound, hospitality, and cleanup. Volunteer labor is why our ticket prices stay below market.",
    trend: "↑ +18% volunteer hours logged in 2025",
    footnote: "Self-reported via post-event debrief forms.",
  },
];

export default function ExpandedStats() {
  return (
    <Section
      background="ivory"
      aria-labelledby="impact-stats-heading"
      data-testid="expanded-stats-section"
      className="py-16 md:py-24"
    >
      <Container>
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <h2
            id="impact-stats-heading"
            data-testid="impact-stats-heading"
            className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-3"
          >
            By the numbers
          </h2>
          <p className="font-accent italic text-[18px] md:text-[20px] text-henna">
            All figures from our own records, through April 2026.
          </p>
        </div>

        <ul
          data-testid="expanded-stats-grid"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              data-testid={`expanded-stat-card-${i}`}
              className="bg-warm-white border border-light-line rounded-[12px] p-7 md:p-9"
            >
              <p
                aria-label={`${stat.value} ${stat.label}`}
                className="font-display text-sage text-[48px] md:text-[64px] leading-none mb-3"
              >
                <span aria-hidden="true">{stat.value}</span>
              </p>
              <p className="font-body font-semibold text-[14px] uppercase tracking-[0.8px] text-deep-olive mb-3">
                {stat.label}
              </p>
              <p className="font-body text-[15px] leading-[1.7] text-body-text mb-4">
                {stat.context}
              </p>
              {stat.trend && (
                <p className="font-body font-semibold text-[13px] text-sage mb-2">
                  {stat.trend}
                </p>
              )}
              {stat.footnote && (
                <p className="font-body italic text-[12px] text-muted">
                  {stat.footnote}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
