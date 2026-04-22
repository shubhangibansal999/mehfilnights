import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * PartnerGroups — partners grouped by type (Venue / Community / Funder).
 * Per Saloni §2.5: grant reviewers explicitly look for funders, so we separate
 * them from partners.
 *
 * If Funders group has zero entries, we omit that sub-section (don't show
 * "coming soon" — worse signal than absence).
 *
 * TODO(founder): confirm groupings. If no real funders exist, leave Funders
 * out entirely for v1 — add the group when a real grant lands.
 */

type PartnerGroup = {
  label: string;
  partners: string[];
};

const GROUPS: PartnerGroup[] = [
  {
    label: "VENUE PARTNERS",
    partners: [
      "Ballard Coffee Works",
      "Town Hall Seattle",
      "Fremont Abbey Arts Center",
      "Starbucks Reserve Roastery",
      "Benaroya Hall",
    ],
  },
  {
    label: "COMMUNITY PARTNERS",
    partners: ["KEXP", "Beats of Washington", "Pratham USA", "Chateau Ste. Michelle"],
  },
  /* {
       label: "FUNDERS",
       partners: [],
     } — omitted for v1 per Saloni §2.5 ("funders empty → drop the group"). */
];

export default function PartnerGroups() {
  return (
    <Section
      background="warm-white"
      aria-labelledby="partner-groups-heading"
      data-testid="partner-groups-section"
      className="py-14 md:py-20"
    >
      <Container>
        <div className="mb-10 md:mb-12 max-w-[760px]">
          <h2
            id="partner-groups-heading"
            data-testid="partner-groups-heading"
            className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-3"
          >
            Our partners
          </h2>
          <p className="font-accent italic text-[18px] md:text-[20px] text-henna">
            Institutions and individuals who made this possible.
          </p>
        </div>

        <div className="space-y-10">
          {GROUPS.map((group) => (
            <section
              key={group.label}
              aria-labelledby={`partner-group-${group.label}`}
              data-testid={`partner-group-${group.label}`}
            >
              <p
                id={`partner-group-${group.label}`}
                className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-muted mb-4"
              >
                {group.label}
              </p>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 items-center">
                {group.partners.map((p) => (
                  <li key={p}>
                    <span className="font-body font-semibold text-[14px] md:text-[15px] uppercase tracking-[1.2px] text-muted hover:text-dark-text transition-colors">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact?subject=partnership"
            data-testid="partner-groups-cta"
            className="font-body font-semibold text-[15px] text-trust-teal hover:underline"
          >
            Interested in partnering with us? Get in touch →
          </Link>
        </div>
      </Container>
    </Section>
  );
}
