import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * Partner Logos Strip — quiet horizontal row on Ivory.
 * Text-only treatment in Muted until real partner logos land.
 */

type Partner = { name: string };

/* TODO(founder): swap text for partner logo images (PNG or SVG, grayscale on
   hover-to-color transition per spec §2.6). Until then, these render as
   uppercase Muted text so the strip still reads as a partner row. */
const PARTNERS: Partner[] = [
  { name: "KEXP" },
  { name: "Benaroya Hall" },
  { name: "Chateau Ste. Michelle" },
  { name: "Pratham USA" },
  { name: "Town Hall Seattle" },
  { name: "Beats of Washington" },
];

export default function PartnerStrip() {
  return (
    <Section
      background="ivory"
      aria-labelledby="partners-heading"
      data-testid="partners-section"
      className="py-14 md:py-20"
    >
      <Container>
        <h2 id="partners-heading" className="sr-only">
          Our community partners
        </h2>
        <p
          data-testid="partners-label"
          className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-muted text-center mb-8"
        >
          In good company
        </p>

        <ul
          data-testid="partners-list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-6 items-center"
        >
          {PARTNERS.map((p, i) => (
            <li
              key={p.name}
              data-testid={`partner-${i}`}
              className="text-center"
            >
              <span className="font-body font-semibold text-[14px] md:text-[15px] uppercase tracking-[1.2px] text-muted hover:text-dark-text transition-colors">
                {p.name}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
