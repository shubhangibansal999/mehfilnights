import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * GiftTable — 4 gift tiers on Ivory. Tier 2 highlighted "MOST COMMON".
 *
 * Per Saloni §2.2: the highest-conversion element on /donate. Tier buttons
 * are Turmeric (not Saffron — these are scroll-to-action navigators, not
 * the final commit). Only the PayPal frame's surrounding Saffron hero/closer
 * are the final commit in the Saffron budget.
 *
 * TODO(founder): confirm all 4 dollar amounts and impact lines with real
 * program-cost data. If "rentals run $100–$150 per night" is inaccurate,
 * replace the specific numbers with softer language. Confirm $100 is
 * genuinely the most-common gift size before claiming it in the highlighted
 * tier pill.
 */

type Tier = {
  amount: number;
  label: string;
  impact: string;
  detail: string;
};

const TIERS: Tier[] = [
  {
    amount: 25,
    label: "GIFT",
    impact: "Covers floor cushions and chai for one mehfil.",
    detail:
      "Small gifts keep our ticket prices low — many listeners can't afford a $40 show, and shouldn't have to.",
  },
  {
    amount: 100,
    label: "MOST COMMON",
    impact: "Covers sound equipment for one evening.",
    detail:
      "Every mehfil needs a microphone, a mixer, and monitors. Rentals run $100–$150 per night.",
  },
  {
    amount: 500,
    label: "SUSTAINING",
    impact: "Pays one artist fairly for an evening's performance.",
    detail:
      "We never ask artists to play for exposure. Your gift pays a single artist's fee, door-to-door.",
  },
  {
    amount: 2500,
    label: "PRESENTING",
    impact: "Presents one full Mehfil — artists, venue, sound, all of it.",
    detail:
      "A presenting gift covers an entire evening: two artists, venue rental, sound, and logistics. You make the whole mehfil possible.",
  },
];

const HIGHLIGHTED_INDEX = 1; // $100 tier

export default function GiftTable() {
  return (
    <Section
      background="ivory"
      aria-labelledby="gift-table-heading"
      data-testid="gift-table-section"
      id="gift-table"
      className="py-16 md:py-24"
    >
      <Container className="max-w-[1000px]">
        <p className="font-accent italic text-[18px] text-henna mb-3">
          A gift at any size.
        </p>
        <h2
          id="gift-table-heading"
          data-testid="gift-table-heading"
          className="font-display text-dark-text text-[30px] md:text-[36px] leading-[1.2] mb-10 md:mb-12"
        >
          What your gift does
        </h2>

        <ul
          data-testid="gift-tiers-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {TIERS.map((tier, i) => {
            const isHighlighted = i === HIGHLIGHTED_INDEX;
            return (
              <li
                key={tier.amount}
                data-testid={`gift-tier-${i}`}
                className={[
                  "relative flex flex-col rounded-[12px] bg-warm-white p-6 pl-7",
                  isHighlighted
                    ? "border-2 border-turmeric"
                    : "border border-light-line",
                ].join(" ")}
              >
                {/* Left 4px Turmeric accent bar */}
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-6 w-1 h-6 bg-turmeric"
                />

                {isHighlighted && (
                  <span
                    data-testid={`gift-tier-${i}-pill`}
                    className="absolute top-3 right-3 bg-turmeric text-deep-olive font-body font-bold text-[11px] px-2 py-1 rounded-[4px]"
                  >
                    MOST COMMON
                  </span>
                )}

                <p
                  className={[
                    "font-body font-semibold text-[11px] uppercase tracking-[1.5px] mb-3",
                    isHighlighted ? "text-deep-olive" : "text-muted",
                  ].join(" ")}
                >
                  {tier.label}
                </p>

                <p
                  data-testid={`gift-tier-${i}-amount`}
                  className="font-display text-[44px] md:text-[48px] text-deep-olive leading-none mb-3"
                >
                  <span className="text-[28px] align-top">$</span>
                  {tier.amount.toLocaleString("en-US")}
                </p>

                <p className="font-body font-semibold text-[15px] text-dark-text leading-[1.3] mb-2">
                  {tier.impact}
                </p>
                <p className="font-body text-[13px] text-body-text leading-[1.5] mb-5 flex-1">
                  {tier.detail}
                </p>

                <Button
                  href={`#donate-form`}
                  variant="turmeric"
                  size="sm"
                  className="w-full"
                  aria-label={`Give $${tier.amount} — scroll to donation form`}
                >
                  Give ${tier.amount.toLocaleString("en-US")} →
                </Button>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
