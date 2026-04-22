import Container from "@/components/Container";
import Section from "@/components/Section";
import CountUp from "./CountUp";

/**
 * Impact Snapshot — 4 large Sage-green numbers on Ivory.
 * First trust handoff after the Deep Olive hero.
 *
 * Numbers below are realistic-looking placeholders for a small Seattle
 * nonprofit. Founder must confirm actuals before launch.
 */

type Stat = {
  value: string;
  label: string;
  context: string;
};

/* TODO(founder): confirm actual numbers — these are placeholder values
   sized to a small Seattle nonprofit's first five years. Do not ship publicly
   without founder sign-off on each figure. */
const STATS: Stat[] = [
  {
    value: "2,400+",
    label: "Community members gathered",
    context: "Since our first Mehfil in 2020.",
  },
  {
    value: "45",
    label: "Artists supported",
    context:
      "Local, national, and international — across every South Asian tradition.",
  },
  {
    value: "24",
    label: "Mehfils hosted",
    context:
      "In living rooms, coffee shops, concert halls, and neighborhood venues.",
  },
  {
    value: "480",
    label: "Volunteer hours given",
    context: "Powered by Mehfil-ites who keep ticket prices low and quality high.",
  },
];

export default function ImpactSnapshot() {
  return (
    <Section
      background="ivory"
      aria-labelledby="impact-heading"
      data-testid="impact-section"
      className="py-16 md:py-24"
    >
      <Container>
        {/* Visually-hidden H2 — eyebrow below does the visible work */}
        <h2 id="impact-heading" className="sr-only">
          Impact by the numbers
        </h2>

        <p
          data-testid="impact-eyebrow"
          className="font-accent italic text-[18px] text-body-text mb-10 md:mb-14"
        >
          The mehfil, by the numbers.
        </p>

        <ul
          data-testid="impact-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 lg:divide-x lg:divide-light-line"
        >
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              data-testid={`impact-stat-${i}`}
              className="lg:px-6 first:lg:pl-0 last:lg:pr-0"
            >
              <p
                data-testid={`impact-stat-value-${i}`}
                className="font-display text-sage text-[44px] md:text-[56px] leading-[1.05] mb-2"
              >
                <CountUp value={stat.value} />
              </p>
              <p className="font-body font-semibold text-[14px] uppercase tracking-[0.8px] text-deep-olive mb-2">
                {stat.label}
              </p>
              <p className="font-body text-[14px] leading-[1.5] text-body-text">
                {stat.context}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
