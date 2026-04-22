import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * DirectContact — email / social / mailing address on Ivory.
 * Saloni §2.3: respects readers who prefer email over filling a form.
 *
 * TODO(founder): confirm hello@mehfilnights.org exists and is monitored,
 * confirm all social URLs, and provide a real mailing address (PO Box OK)
 * for grant compliance.
 */

const InstagramIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-deep-olive">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const YoutubeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-deep-olive">
    <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 9.5v5l5-2.5-5-2.5z" fill="currentColor" />
  </svg>
);

const EnvelopeIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-deep-olive">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 7l9 7 9-7" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default function DirectContact() {
  return (
    <Section
      background="ivory"
      aria-labelledby="direct-contact-heading"
      data-testid="direct-contact-section"
      className="py-14 md:py-20"
    >
      <Container className="max-w-[880px] text-center">
        <h2 id="direct-contact-heading" className="sr-only">
          Direct contact information
        </h2>
        <p className="font-accent italic text-[18px] text-henna mb-10">
          Or reach us directly.
        </p>

        {/* Email */}
        <div className="mb-10">
          <p className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-muted mb-2">
            EMAIL
          </p>
          <a
            href="mailto:hello@mehfilnights.org"
            data-testid="direct-contact-email"
            className="font-display text-[22px] md:text-[24px] text-dark-text hover:text-trust-teal transition-colors"
          >
            {/* TODO(founder): confirm real contact email. */}
            hello@mehfilnights.org
          </a>
          <p className="font-body italic text-[13px] text-muted mt-2">
            For general questions, partnership inquiries, and press.
          </p>
        </div>

        {/* Social */}
        <div className="mb-10">
          <p className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-muted mb-3">
            FOLLOW ALONG
          </p>
          <ul
            data-testid="direct-contact-social"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3"
          >
            <li>
              {/* TODO(founder): confirm Instagram handle + URL. */}
              <a
                href="https://instagram.com/mehfilnights"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-deep-olive hover:text-henna"
                aria-label="Follow Mehfil Nights on Instagram (opens in new tab)"
              >
                {InstagramIcon}
                Instagram → @mehfilnights
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@mehfilnights"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-deep-olive hover:text-henna"
                aria-label="Subscribe to Mehfil Nights on YouTube (opens in new tab)"
              >
                {YoutubeIcon}
                YouTube → Mehfil Nights
              </a>
            </li>
            <li>
              <Link
                href="/#newsletter"
                className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-deep-olive hover:text-henna"
              >
                {EnvelopeIcon}
                Newsletter → monthly updates
              </Link>
            </li>
          </ul>
        </div>

        {/* Mailing address */}
        <div>
          <p className="font-body font-semibold text-[13px] uppercase tracking-[1px] text-muted mb-2">
            MAILING ADDRESS
          </p>
          <address
            data-testid="direct-contact-address"
            className="not-italic font-body text-[15px] text-body-text leading-[1.7]"
          >
            {/* TODO(founder): provide real mailing address (PO Box is fine). */}
            Mehfil Nights
            <br />
            [Street address, Suite XX]
            <br />
            Seattle, WA [ZIP]
          </address>
          <p className="font-body italic text-[13px] text-muted mt-2">
            For checks, physical documents, and IRS correspondence.
          </p>
        </div>
      </Container>
    </Section>
  );
}
