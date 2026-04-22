"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import Container from "./Container";
import Button from "./Button";

/**
 * Footer — "dark intimate moment" per v3 spec.
 * Deep olive background with ivory text. Four columns on desktop,
 * stacked on mobile. Includes newsletter stub (no backend yet — onSubmit
 * prevents default until Phase 2 wires it up).
 */

const SITEMAP: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
];

const SOCIAL_LINKS: { href: string; label: string }[] = [
  { href: "https://instagram.com/mehfilnights", label: "Instagram" },
  { href: "https://facebook.com/mehfilnights", label: "Facebook" },
  { href: "https://linkedin.com/company/mehfilnights", label: "LinkedIn" },
  { href: "https://youtube.com/@mehfilnights", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Stub — real handler lands in a later phase.
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer
      data-testid="site-footer"
      className="bg-deep-olive text-ivory"
    >
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Logo + tagline */}
          <div data-testid="footer-brand">
            <div className="font-display text-[26px] text-ivory mb-3">
              Mehfil Nights
            </div>
            <p className="text-sage-muted text-[15px] leading-relaxed">
              An intimate gathering for South Asian music, poetry, and art —
              rooted in Seattle, open to all.
            </p>
          </div>

          {/* Column 2 — Sitemap */}
          <nav aria-label="Footer sitemap" data-testid="footer-sitemap">
            <h2 className="font-body font-semibold text-[14px] tracking-[0.5px] uppercase text-turmeric mb-4">
              Explore
            </h2>
            <ul className="flex flex-col gap-3">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    data-testid={`footer-link-${item.label.toLowerCase()}`}
                    className="text-ivory hover:text-turmeric transition-colors text-[15px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Contact + 501(c)(3) */}
          <div data-testid="footer-contact">
            <h2 className="font-body font-semibold text-[14px] tracking-[0.5px] uppercase text-turmeric mb-4">
              Contact
            </h2>
            <address className="not-italic text-[15px] leading-relaxed text-ivory">
              Seattle, WA, USA
              <br />
              <a
                href="mailto:hello@mehfilnights.org"
                className="hover:text-turmeric transition-colors"
              >
                hello@mehfilnights.org
              </a>
            </address>
            <p className="mt-4 text-sage-muted text-[13px] leading-relaxed">
              EIN: XX-XXXXXXX — 501(c)(3) nonprofit.
              <br />
              Donations are tax-deductible.
            </p>
          </div>

          {/* Column 4 — Newsletter + social */}
          <div data-testid="footer-newsletter">
            <h2 className="font-body font-semibold text-[14px] tracking-[0.5px] uppercase text-turmeric mb-4">
              Stay in the loop
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="newsletter-email-input"
                placeholder="your@email.com"
                className="w-full rounded-md bg-ivory/10 text-ivory placeholder:text-sage-muted border border-ivory/20 px-4 py-3 text-[14px] focus:outline-2 focus:outline-turmeric focus:outline-offset-2 focus:bg-ivory/15"
              />
              <Button type="submit" variant="turmeric" size="sm">
                Subscribe
              </Button>
              {submitted && (
                <p
                  role="status"
                  data-testid="newsletter-success"
                  className="text-sage-muted text-[13px]"
                >
                  Thanks — we will be in touch.
                </p>
              )}
            </form>

            <div className="mt-6">
              <h3 className="font-body font-semibold text-[13px] tracking-[0.5px] uppercase text-turmeric mb-3">
                Follow
              </h3>
              <ul className="flex flex-wrap gap-x-5 gap-y-2" data-testid="footer-social">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`social-${social.label.toLowerCase()}`}
                      className="text-ivory hover:text-turmeric transition-colors text-[14px]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="mt-14 pt-6 border-t border-ivory/15 text-[13px] text-sage-muted">
          <p data-testid="footer-copyright">
            &copy; 2026 Mehfil Nights. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
