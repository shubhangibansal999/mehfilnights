"use client";

import { type FormEvent, useState } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Button from "@/components/Button";

/**
 * Newsletter Signup — low-pressure email capture on Ivory/Warm White.
 * Form is real (with visible label, focus ring, success state) but the
 * submit handler is a stub — no mailing-list integration yet.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* TODO(phase-3): wire this to Mailchimp (or ConvertKit — founder to choose).
       For now we just log + show the success state so the form is demo-able. */
    console.log("[newsletter stub] would subscribe:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Section
      background="warm-white"
      aria-labelledby="newsletter-heading"
      data-testid="newsletter-section"
      className="py-16 md:py-20"
    >
      <Container>
        <div className="max-w-[720px] mx-auto text-center">
          <h2
            id="newsletter-heading"
            data-testid="newsletter-heading"
            className="font-display text-dark-text text-[26px] md:text-[32px] leading-[1.2] mb-3"
          >
            Be the first to know about the next Mehfil.
          </h2>
          <p
            data-testid="newsletter-subtitle"
            className="font-accent italic text-[17px] md:text-[19px] text-henna mb-8"
          >
            One short email a month. Event dates, artist spotlights, no noise.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center max-w-[520px] mx-auto"
            aria-label="Newsletter signup"
            data-testid="newsletter-form"
          >
            <label htmlFor="home-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="home-newsletter-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              data-testid="newsletter-email-input"
              className="flex-1 rounded-[6px] bg-warm-white border border-clay text-dark-text placeholder:text-muted px-4 py-3 text-[15px] focus:outline-2 focus:outline-trust-teal focus:outline-offset-2"
            />
            <Button type="submit" variant="turmeric" size="md">
              Subscribe
            </Button>
          </form>

          {submitted && (
            <p
              role="status"
              data-testid="newsletter-success"
              className="mt-4 font-body text-[14px] text-sage"
            >
              Thanks — you&rsquo;re on the list.
            </p>
          )}

          <p
            data-testid="newsletter-reassurance"
            className="mt-5 font-body text-[13px] text-muted"
          >
            We&rsquo;ll never share your email. Unsubscribe any time.
          </p>
        </div>
      </Container>
    </Section>
  );
}
