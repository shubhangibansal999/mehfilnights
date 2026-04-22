import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";

/**
 * DonateActionFrame — Sand section wrapping the PayPal embed card.
 *
 * Per Saloni §2.3: the Sand background is the "service surface" framing the
 * third-party PayPal embed. The white card + "SECURE DONATION" label makes
 * the embed feel intentional, not grafted.
 *
 * The embed itself is a placeholder for v1; PayPal integration is Phase 3.
 * Two Saffron CTAs on /donate (hero + closer) scroll-link to `#donate-form`
 * (this section's id).
 */

const SecureIcon = (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className="text-sage"
  >
    <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const CheckIcon = (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className="text-sage"
  >
    <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeartIcon = (
  <svg
    aria-hidden="true"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    className="text-sage"
  >
    <path
      d="M12 20s-7-4.5-7-11a4 4 0 017-2.5A4 4 0 0119 9c0 6.5-7 11-7 11z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DonateActionFrame() {
  return (
    <Section
      background="sand"
      aria-labelledby="donate-form-heading"
      data-testid="donate-action-frame-section"
      className="py-16 md:py-20"
    >
      <Container className="max-w-[720px]">
        <div
          role="region"
          aria-labelledby="donate-form-heading"
          id="donate-form"
          data-testid="donate-form-card"
          className="bg-warm-white border-2 border-deep-olive rounded-[16px] px-6 py-10 md:px-10 md:py-12 max-w-[620px] mx-auto"
        >
          <p className="font-body font-bold text-[11px] uppercase tracking-[2px] text-muted text-center mb-4">
            SECURE DONATION
          </p>
          <h2
            id="donate-form-heading"
            data-testid="donate-form-heading"
            className="font-display text-dark-text text-[24px] md:text-[28px] leading-[1.3] text-center mb-4"
          >
            Give through PayPal.
          </h2>
          <p className="font-body text-[15px] leading-[1.7] text-body-text text-center max-w-[480px] mx-auto mb-6">
            Your donation is processed securely by PayPal. You can pay with a
            PayPal account, a credit card, or a debit card — no PayPal account
            required. You&rsquo;ll receive an instant email receipt from PayPal
            plus a tax-deductibility letter from Mehfil Nights within 7 days.
          </p>

          {/* Screen-reader context for the third-party embed. */}
          <p className="sr-only">
            Donate via PayPal. A secure payment window will open when you
            click the PayPal button below.
          </p>

          {/* PayPal embed placeholder */}
          <div
            data-testid="paypal-embed-placeholder"
            className="my-8 py-10 px-6 bg-sand/70 border border-dashed border-clay rounded-[8px] text-center max-w-[400px] mx-auto"
          >
            <p className="font-body text-[14px] text-muted italic">
              PayPal donation button loads here.
            </p>
            {/*
              TODO(founder + phase-3): paste PayPal hosted-button ID / embed
              code here. Test the full donor flow end-to-end (instant receipt,
              redirect back, acknowledgment email) before launch.

              If PayPal Giving Fund is preferred over a hosted button, use the
              Giving Fund redirect URL in a Saffron Button instead of an embed.
            */}
          </div>

          <div
            data-testid="donate-reassurance-row"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4"
          >
            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-[12px] uppercase tracking-[1px] text-body-text">
              {SecureIcon}
              Secure
            </span>
            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-[12px] uppercase tracking-[1px] text-body-text">
              {CheckIcon}
              Tax-deductible
            </span>
            <span className="inline-flex items-center gap-1.5 font-body font-semibold text-[12px] uppercase tracking-[1px] text-body-text">
              {HeartIcon}
              Every gift tracked
            </span>
          </div>

          <p className="font-body text-[13px] text-muted italic text-center mt-6">
            Prefer to mail a check?{" "}
            <Link
              href="/contact"
              className="text-trust-teal underline hover:text-henna"
            >
              Contact us for details.
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
}
