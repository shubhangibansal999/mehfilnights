import type { ReactNode } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * Three Program Pillars — Community, Artists, Education.
 * Sand-colored cards on an Ivory section. Line-art icons only
 * (no emoji, no photography) in Deep Olive with a Turmeric accent dot.
 */

type Pillar = {
  title: string;
  body: string;
  icon: ReactNode;
};

/* Inline SVG icons — simple line-art with a Turmeric accent dot per card.
   Kept local to this file to avoid a new icon dependency. */
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
    body: "We build rooms where a South Asian grandparent and a first-time listener feel equally at home. Floor cushions, a shared playlist, and the kind of quiet where a ghazal lands the way it was meant to.",
    icon: CommunityIcon,
  },
  {
    title: "Platform independent artists",
    body: "We pay artists, produce their shows, and put them in front of audiences who came to listen. We prioritize local and emerging voices — with intentional support for women and non-binary musicians across every South Asian tradition.",
    icon: ArtistsIcon,
  },
  {
    title: "Connect world cultures",
    body: "Every Mehfil introduces the stories behind the songs — the region, the era, the poet. We believe understanding is the first step to caring, and music is the most generous teacher we know.",
    icon: EducationIcon,
  },
];

export default function ProgramPillars() {
  return (
    <Section
      background="ivory"
      aria-labelledby="pillars-heading"
      data-testid="program-pillars-section"
      className="py-16 md:py-24"
    >
      <Container>
        <div className="max-w-[760px] mb-12 md:mb-16">
          <h2
            id="pillars-heading"
            data-testid="pillars-heading"
            className="font-display text-dark-text text-[28px] md:text-[36px] leading-[1.2] mb-3"
          >
            Three ways we keep the tradition alive
          </h2>
          <p
            data-testid="pillars-subtitle"
            className="font-accent italic text-[19px] md:text-[22px] text-henna"
          >
            Community. Artists. Education.
          </p>
        </div>

        <div
          data-testid="pillars-grid"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {PILLARS.map((pillar, i) => (
            <article
              key={pillar.title}
              data-testid={`pillar-card-${i}`}
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
