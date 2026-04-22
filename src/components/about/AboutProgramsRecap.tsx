import type { ReactNode } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * AboutProgramsRecap — three-pillar recap on /about.
 *
 * Visually identical to the homepage ProgramPillars (same Sand card + Ivory
 * section + Deep-Olive icon + Turmeric accent dot) but with deliberately
 * shorter body copy so /about doesn't duplicate the homepage read.
 *
 * Design-system consistency is itself a trust signal — reviewers who see the
 * same card treatment on both pages read "this org doesn't improvise every
 * page."
 */

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
};

const CommunityIcon = (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="h-12 w-12">
    <circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M6 38c1.5-5 5-8 10-8s8.5 3 10 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M22 38c1.5-5 5-8 10-8s8.5 3 10 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="8" r="1.6" fill="#D4A843" />
  </svg>
);

const ArtistsIcon = (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="h-12 w-12">
    <rect
      x="19"
      y="8"
      width="10"
      height="20"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M14 24a10 10 0 0020 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M24 34v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 40h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="16" r="1.6" fill="#D4A843" />
  </svg>
);

const EducationIcon = (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className="h-12 w-12">
    <path
      d="M8 12h14c2 0 3 1 3 3v24c0-2-1-3-3-3H8V12z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M40 12H26c-2 0-3 1-3 3v24c0-2 1-3 3-3h14V12z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="10" r="1.6" fill="#D4A843" />
  </svg>
);

const PILLARS: Pillar[] = [
  {
    title: "Bring people together",
    body: "Ticketed Mehfil evenings in cozy Seattle venues — floor cushions, acoustic instruments, a room built for listening.",
    icon: CommunityIcon,
  },
  {
    title: "Platform independent artists",
    body: "A residency program that pays, produces, and promotes emerging South Asian musicians — with intentional support for women and non-binary voices.",
    icon: ArtistsIcon,
  },
  {
    title: "Connect world cultures",
    body: "Every Mehfil introduces the region, the era, and the poet behind each song. Understanding is the first step to caring.",
    icon: EducationIcon,
  },
];

export default function AboutProgramsRecap() {
  return (
    <Section
      background="ivory"
      aria-labelledby="about-programs-heading"
      data-testid="about-programs-section"
      className="py-16 md:py-24"
    >
      <Container>
        <div className="max-w-[760px] mb-12 md:mb-16">
          <h2
            id="about-programs-heading"
            data-testid="about-programs-heading"
            className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-3"
          >
            What we do
          </h2>
          <p
            data-testid="about-programs-subtitle"
            className="font-accent italic text-[19px] md:text-[22px] text-henna"
          >
            Three programs. One mission.
          </p>
        </div>

        <div
          data-testid="about-programs-grid"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              data-testid={`about-pillar-card-${i}`}
              className="bg-sand border border-light-line rounded-[12px] p-8 flex flex-col"
            >
              <div className="text-deep-olive mb-5" aria-hidden="true">
                {pillar.icon}
              </div>
              <h3 className="font-body font-semibold text-[22px] md:text-[24px] text-deep-olive leading-snug mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-[16px] leading-[1.7] text-body-text">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
