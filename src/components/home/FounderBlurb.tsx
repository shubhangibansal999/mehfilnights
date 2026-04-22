import Container from "@/components/Container";
import Section from "@/components/Section";
import Link from "next/link";

/**
 * Founder Blurb — a note from the founder. NO portrait per Saloni's direction.
 * Decorative Turmeric line illustration (a stylized oil-lamp / diya) fills the
 * "image" column without resorting to a stock headshot.
 */
export default function FounderBlurb() {
  return (
    <Section
      background="transparent"
      aria-labelledby="founder-heading"
      data-testid="founder-blurb-section"
      className="py-16 md:py-24 bg-linen text-body-text"
    >
      {/* Linen isn't a Section-component preset; using transparent + bg-linen
          to hit --mn-linen exactly per spec §2.7. */}
      <Container>
        <h2 id="founder-heading" className="sr-only">
          A note from our founder
        </h2>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-[33%_67%] gap-10 md:gap-12 items-center">
          {/* Decorative diya-inspired line illustration — NO founder portrait yet */}
          <div
            data-testid="founder-illustration"
            className="mx-auto md:mx-0 w-40 h-40 md:w-52 md:h-52 flex items-center justify-center"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 160 160"
              fill="none"
              className="w-full h-full text-turmeric"
            >
              {/* Flame */}
              <path
                d="M80 30c-5 8-12 15-12 26 0 8 5 14 12 14s12-6 12-14c0-11-7-18-12-26z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Lamp bowl */}
              <path
                d="M40 92c0 10 18 18 40 18s40-8 40-18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M45 88c2-4 15-8 35-8s33 4 35 8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Base + stem */}
              <path d="M80 110v16" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M60 132h40"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Glow ring */}
              <circle
                cx="80"
                cy="70"
                r="52"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.4"
              />
              {/* Accent dots — the "sparkle" vocabulary from the logo */}
              <circle cx="28" cy="50" r="1.5" fill="currentColor" />
              <circle cx="132" cy="55" r="1.5" fill="currentColor" />
              <circle cx="20" cy="110" r="1.5" fill="currentColor" />
              <circle cx="140" cy="110" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {/* Text column */}
          <div>
            <p
              data-testid="founder-eyebrow"
              className="font-accent italic text-[18px] text-henna mb-5"
            >
              A note from our founder.
            </p>
            <blockquote
              data-testid="founder-quote"
              className="font-accent italic text-[19px] md:text-[22px] text-dark-text leading-[1.7] mb-6 max-w-[560px]"
            >
              We built Mehfil Nights because we couldn&rsquo;t find a room in
              Seattle where South Asian music lived the way it did back home —
              close, unhurried, shared. So we made one, then another, then a
              community. Thank you for being here.
            </blockquote>
            <p
              data-testid="founder-signature"
              className="font-body font-semibold text-[15px] text-body-text mb-4"
            >
              {/* TODO(founder): add real name + title */}
              — The Mehfil Nights Founder, Artistic Director
            </p>
            <Link
              href="/about"
              data-testid="founder-read-more"
              className="font-body font-semibold text-[14px] tracking-[0.5px] text-trust-teal hover:underline"
            >
              Read our full story →
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
