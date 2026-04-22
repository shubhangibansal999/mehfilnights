"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Button from "./Button";

/**
 * isActiveRoute — treats "/events/[slug]" and "/events" as both under "Events",
 * so a visitor on an event detail page still sees the Events link highlighted.
 */
function isActiveRoute(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Header — sticky top nav.
 * Desktop: logo left · links center · saffron Donate CTA right.
 * Mobile (<768px): logo left · hamburger right, which toggles a slide-in panel.
 *
 * The saffron Donate button is persistent per v3 spec ("persistent Donate CTA"
 * is the #1 conversion pattern across the 10 top arts nonprofits surveyed).
 */

type NavLink = { href: string; label: string };

const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile panel on Escape for accessibility.
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileOpen]);

  // Lock body scroll when panel open.
  useEffect(() => {
    if (isMobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileOpen]);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 w-full bg-ivory border-b border-light-line"
    >
      <Container className="flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          data-testid="site-logo"
          className="font-display text-2xl md:text-[28px] text-dark-text leading-none"
          aria-label="Mehfil Nights — home"
        >
          Mehfil Nights
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Main"
          data-testid="main-nav"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_LINKS.map((link) => {
            const active = isActiveRoute(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                aria-current={active ? "page" : undefined}
                className={[
                  "font-body text-[14px] font-semibold tracking-[0.5px] transition-colors",
                  active
                    ? "text-henna underline underline-offset-[6px] decoration-turmeric decoration-2"
                    : "text-dark-text hover:text-trust-teal",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Donate — saffron (reserved for donation only) */}
        <div className="hidden md:block">
          <Button href="/donate" variant="saffron" size="sm">
            Donate
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-testid="mobile-menu-toggle"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setIsMobileOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-dark-text hover:bg-sand transition-colors"
        >
          {isMobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile slide-in panel */}
      {isMobileOpen && (
        <div
          id="mobile-nav-panel"
          data-testid="mobile-nav-panel"
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-ivory border-t border-light-line overflow-y-auto"
        >
          <Container className="py-8">
            <nav aria-label="Mobile" className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => {
                const active = isActiveRoute(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setIsMobileOpen(false)}
                    className={[
                      "font-body text-lg font-semibold transition-colors",
                      active
                        ? "text-henna underline underline-offset-[6px] decoration-turmeric decoration-2"
                        : "text-dark-text hover:text-trust-teal",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4">
                <Button
                  href="/donate"
                  variant="saffron"
                  size="md"
                  onClick={() => setIsMobileOpen(false)}
                >
                  Donate
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
