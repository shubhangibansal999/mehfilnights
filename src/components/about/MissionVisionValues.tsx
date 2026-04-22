import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * MissionVisionValues — Mission / Vision / Values on Ivory.
 * Three-column block on desktop, single column ≤1024px (honest stacking).
 *
 * Icons are line-art SVGs in Turmeric. Block H3s are uppercase (institutional
 * weight without adding a fourth font). Values uses a bulleted list with
 * Turmeric square bullets.
 */

const CompassIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M14 26l4-10 8-4-4 10-8 4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const HorizonIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <circle cx="20" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 30h32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 14l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 14l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HandsIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <path
      d="M8 22c0-4 3-8 7-8M32 22c0-4-3-8-7-8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 22c0 6 4 10 10 10s10-4 10-10"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="20" cy="14" r="2" fill="currentColor" />
  </svg>
);

const VALUES = [
  "Artists first. We pay, we produce, we platform.",
  "Every neighbor welcome. No gatekeeping, no prerequisites.",
  "Acoustic intimacy. We trade spectacle for shared attention.",
  "Financial transparency. Every dollar stays in the room.",
  "Rooted, not preserved. Tradition lives by being lived.",
];

export default function MissionVisionValues() {
  return (
    <Section
      background="ivory"
      aria-labelledby="mvv-heading"
      data-testid="mvv-section"
      className="py-16 md:py-24"
    >
      <Container>
        <h2 id="mvv-heading" className="sr-only">
          Mission, Vision, and Values
        </h2>
        <p
          data-testid="mvv-eyebrow"
          className="font-accent italic text-[18px] text-henna text-center mb-10 md:mb-14"
        >
          What guides us.
        </p>

        <div
          data-testid="mvv-grid"
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0 lg:divide-x lg:divide-light-line"
        >
          {/* Mission */}
          <div
            data-testid="mvv-mission"
            className="lg:px-8 first:lg:pl-0 flex flex-col"
          >
            <div className="text-turmeric mb-5">{CompassIcon}</div>
            <h3
              className="font-body font-semibold text-[22px] text-deep-olive uppercase tracking-[1px] mb-4"
            >
              Mission
            </h3>
            <p className="font-body text-[16px] leading-[1.7] text-body-text">
              To connect communities across the Pacific Northwest through
              intimate South Asian live music — supporting independent artists,
              welcoming every neighbor, and honoring a centuries-old tradition.
            </p>
          </div>

          {/* Vision */}
          <div
            data-testid="mvv-vision"
            className="lg:px-8 flex flex-col"
          >
            <div className="text-turmeric mb-5">{HorizonIcon}</div>
            <h3
              className="font-body font-semibold text-[22px] text-deep-olive uppercase tracking-[1px] mb-4"
            >
              Vision
            </h3>
            <p className="font-body text-[16px] leading-[1.7] text-body-text">
              A Seattle where every neighborhood has a mehfil within walking
              distance — where South Asian music is part of the region&rsquo;s
              living cultural fabric, not a once-a-year festival.
            </p>
          </div>

          {/* Values */}
          <div
            data-testid="mvv-values"
            className="lg:px-8 last:lg:pr-0 flex flex-col"
          >
            <div className="text-turmeric mb-5">{HandsIcon}</div>
            <h3
              className="font-body font-semibold text-[22px] text-deep-olive uppercase tracking-[1px] mb-4"
            >
              Values
            </h3>
            <ul className="space-y-2">
              {VALUES.map((v) => (
                <li
                  key={v}
                  className="font-body text-[16px] leading-[1.7] text-body-text flex gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[10px] w-1 h-1 bg-turmeric shrink-0"
                  />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
