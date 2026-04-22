import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * PressStrip — 3 press mentions inline on Warm White.
 * PRD defers a standalone Press page; this is the compromise per Saloni §2.7.
 *
 * TODO(founder): replace these 3 placeholder press mentions with real coverage
 * (publication name, headline pull-quote, date, URL). If fewer than 3 real
 * mentions exist, drop this section entirely — fabricated press is worse than
 * no press section. Show 2 (2-column) only if that's the honest count.
 */

type PressItem = {
  publication: string;
  headline: string;
  date: string;
  url: string;
};

const ITEMS: PressItem[] = [
  {
    publication: "KEXP",
    headline:
      "A Seattle concert series makes South Asian music feel like home.",
    date: "March 2025",
    url: "#",
  },
  {
    publication: "The Seattle Times",
    headline:
      "Mehfil Nights is building a community one acoustic evening at a time.",
    date: "November 2024",
    url: "#",
  },
  {
    publication: "Crosscut",
    headline:
      "A small nonprofit keeps a centuries-old tradition alive in the Pacific Northwest.",
    date: "June 2024",
    url: "#",
  },
];

export default function PressStrip() {
  return (
    <Section
      background="warm-white"
      aria-labelledby="press-heading"
      data-testid="press-strip-section"
      className="py-14 md:py-20"
    >
      <Container>
        <h2 id="press-heading" className="sr-only">
          Press coverage
        </h2>
        <p
          data-testid="press-eyebrow"
          className="font-accent italic text-[18px] text-henna text-center mb-10"
        >
          In the press.
        </p>

        <ul
          data-testid="press-list"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {ITEMS.map((item, i) => (
            <li key={item.publication} className="border-t border-light-line pt-4">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`press-item-${i}`}
                className="block group"
              >
                <p className="font-body font-semibold text-[13px] uppercase tracking-[1.5px] text-muted mb-3">
                  {item.publication}
                </p>
                <p className="font-display text-[18px] md:text-[20px] text-dark-text leading-[1.3] mb-3 line-clamp-3">
                  {item.headline}
                </p>
                <p className="font-body text-[13px] text-muted mb-2">
                  {item.date}
                </p>
                <p className="font-body font-semibold text-[13px] text-trust-teal">
                  Read{" "}
                  <span aria-hidden="true">→</span>
                  <span className="sr-only">(opens in new tab)</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
