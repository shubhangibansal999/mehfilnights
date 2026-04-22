import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * OtherWaysToHelp — 4 tiles routing non-cash donors (volunteers, sponsors,
 * corporate matchers, in-kind givers) to /contact with a pre-filled subject.
 *
 * Per Saloni §2.5: CTAs are Teal text links (not full buttons) — these are
 * conversations, not transactions. Keeps Saffron scarce.
 */

type Tile = {
  icon: ReactNode;
  title: string;
  body: string;
  cta: string;
  subject: string;
};

const HandsIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <path
      d="M10 24v-6a4 4 0 014-4h12a4 4 0 014 4v6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 22c-2 0-4 2-4 4v4h6M30 22c2 0 4 2 4 4v4h-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const HandshakeIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <path
      d="M6 22l4-6h8l4 6M34 22l-4-6h-8l-4 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 22l4 4 4-4 4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const ScaleIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <path d="M20 8v24M10 32h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 18l6-8h12l6 8" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 18a6 6 0 0012 0M20 18a6 6 0 0012 0" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GiftIcon = (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="w-10 h-10">
    <rect x="6" y="14" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 14v18M6 22h28" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M13 14a4 4 0 017-3 4 4 0 017 3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const TILES: Tile[] = [
  {
    icon: HandsIcon,
    title: "Volunteer at an event",
    body: "Help us set up, greet guests, or run the ticket table at upcoming Mehfils. 3-hour shifts, no experience required.",
    cta: "Get in touch →",
    subject: "volunteer",
  },
  {
    icon: HandshakeIcon,
    title: "Sponsor a mehfil",
    body: "Corporate or foundation sponsors cover full-event costs in exchange for recognition. Logo on event materials + public thanks at the evening.",
    cta: "Let's talk →",
    subject: "sponsor",
  },
  {
    icon: ScaleIcon,
    title: "Corporate matching",
    body: "Many employers match charitable gifts 1:1 or 2:1. Check with your HR team or send us your employer name — we'll help you submit the match.",
    cta: "Ask about matching →",
    subject: "matching",
  },
  {
    icon: GiftIcon,
    title: "In-kind donations",
    body: "Venues, sound equipment, catering, printing services. If you can give something tangible to an evening, we'd love to hear from you.",
    cta: "Share what you have →",
    subject: "in-kind",
  },
];

export default function OtherWaysToHelp() {
  return (
    <Section
      background="warm-white"
      aria-labelledby="other-ways-heading"
      data-testid="other-ways-section"
      className="py-16 md:py-20"
    >
      <Container>
        <div className="mb-10 md:mb-12">
          <p className="font-accent italic text-[18px] text-henna mb-3">
            Not giving cash?
          </p>
          <h2
            id="other-ways-heading"
            data-testid="other-ways-heading"
            className="font-display text-dark-text text-[28px] md:text-[32px] leading-[1.2]"
          >
            Other ways to help
          </h2>
        </div>

        <ul
          data-testid="other-ways-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TILES.map((tile, i) => (
            <li
              key={tile.title}
              data-testid={`help-tile-${i}`}
              className="bg-ivory border border-light-line rounded-[12px] p-7 flex flex-col"
            >
              <div className="text-trust-teal mb-4">{tile.icon}</div>
              <h3 className="font-body font-semibold text-[20px] text-deep-olive leading-snug mb-3">
                {tile.title}
              </h3>
              <p className="font-body text-[14px] leading-[1.6] text-body-text mb-5 flex-1">
                {tile.body}
              </p>
              <Link
                href={`/contact?subject=${tile.subject}`}
                data-testid={`help-tile-${i}-cta`}
                className="font-body font-semibold text-[14px] text-trust-teal hover:underline"
              >
                {tile.cta}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
