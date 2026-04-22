import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * FAQSection — 6 native <details>/<summary> accordions on Warm White.
 * No JS required for open/close (native semantics).
 *
 * TODO(founder): proofread all 6 Q&As. Confirm EIN in Q5, links to
 * /events and /impact, and that the 24-hour response commitment is honored.
 */

type QA = { q: string; a: React.ReactNode };

const FAQS: QA[] = [
  {
    q: "When do you host events?",
    a: (
      <>
        We typically host 6–8 Mehfils per year, concentrated in spring and
        fall. The next upcoming event — and our past event archive — is on our{" "}
        <Link href="/events" className="text-trust-teal underline">
          events page
        </Link>
        . Sign up for our newsletter (footer) to get event announcements first.
      </>
    ),
  },
  {
    q: "How do I get tickets?",
    a: (
      <>
        Every event has a &ldquo;Get Tickets&rdquo; button on its detail page,
        which links out to our ticketing partner. Tickets typically go on sale
        6–10 weeks before each event. We keep prices below $35 — always.
      </>
    ),
  },
  {
    q: "I'm a musician — how do I apply to perform?",
    a: (
      <>
        Fill out the form above with &ldquo;Artist submission&rdquo; as your
        subject. You&rsquo;ll need to share a link to your music (SoundCloud,
        YouTube, Spotify, or website) and a short bio. We review submissions
        quarterly and respond to every applicant. We prioritize independent
        South Asian artists, with intentional support for women and non-binary
        voices.
      </>
    ),
  },
  {
    q: "How can I volunteer?",
    a: (
      <>
        Fill out the form above with &ldquo;Volunteer&rdquo; as your subject.
        We&rsquo;ll follow up about our next volunteer orientation. Most
        volunteer shifts are 3 hours at a single event — ticketing, setup,
        sound, or hospitality.
      </>
    ),
  },
  {
    q: "Is Mehfil Nights a 501(c)(3)?",
    a: (
      <>
        Yes. We&rsquo;re registered with the IRS. Our EIN is XX-XXXXXXX.
        {/* TODO(founder): replace XX-XXXXXXX with real EIN. */} All donations
        are tax-deductible. See our{" "}
        <Link href="/impact" className="text-trust-teal underline">
          Impact page
        </Link>{" "}
        for our annual reports and financial disclosures.
      </>
    ),
  },
  {
    q: "Can I book Mehfil Nights for a private event?",
    a: (
      <>
        We offer limited private / At-Home event services as a separate service
        (not through our 501(c)(3) nonprofit). For private event inquiries, fill
        out the form above with &ldquo;Private event (At-Home)&rdquo; as your
        subject, and we&rsquo;ll follow up with availability and pricing.
      </>
    ),
  },
];

export default function FAQSection() {
  return (
    <Section
      background="warm-white"
      aria-labelledby="faq-heading"
      data-testid="faq-section"
      id="faq"
      className="py-16 md:py-24"
    >
      <Container className="max-w-[820px]">
        <p className="font-accent italic text-[18px] text-henna mb-3">
          Frequently asked
        </p>
        <h2
          id="faq-heading"
          data-testid="faq-heading"
          className="font-display text-dark-text text-[28px] md:text-[32px] leading-[1.2] mb-10"
        >
          Quick answers
        </h2>

        <ul className="space-y-3">
          {FAQS.map((item, i) => (
            <li key={item.q}>
              <details
                data-testid={`faq-item-${i}`}
                className="group bg-ivory border border-light-line rounded-[8px] transition-colors hover:bg-sand/40"
              >
                <summary
                  data-testid={`faq-summary-${i}`}
                  className="list-none flex items-center justify-between gap-4 px-5 py-4 cursor-pointer font-body font-semibold text-[16px] text-dark-text"
                >
                  <span>{item.q}</span>
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 text-deep-olive transition-transform group-open:rotate-180"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <div className="px-5 pb-5 font-body text-[15px] text-body-text leading-[1.7]">
                  {item.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
