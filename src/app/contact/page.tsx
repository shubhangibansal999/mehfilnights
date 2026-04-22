import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import DirectContact from "@/components/contact/DirectContact";
import FAQSection from "@/components/contact/FAQSection";
import ContactClosingCTAs from "@/components/contact/ContactClosingCTAs";

/**
 * /contact — composition per Saloni's Contact v1 spec (docs/design/contact-v1.md).
 *
 * Replaces four bit.ly → Google Form redirects (volunteer, artist, private
 * event, general) with a single dynamic form. Subject dropdown drives which
 * additional fields reveal.
 *
 * Primary audience: artists, volunteers, private-event inquirers, and
 * everyone else who wants to reach the org.
 *
 * Section rhythm: Ivory hero → Sand form section → Ivory direct contact →
 * Warm-White FAQ → Ivory closing tiles. Zero Deep-Olive moments — a greeting
 * page doesn't need dramatic lighting.
 *
 * ============================================================================
 * TODO(founder) placeholders on this page (grep "TODO(founder)" for all):
 *   - Contact email (hello@mehfilnights.org) — confirm monitored inbox
 *   - Social handles + URLs (Instagram, YouTube)
 *   - Mailing address
 *   - EIN (appears in FAQ Q5)
 *   - FAQ content proofread + link accuracy
 *   - Form backend (Formspree or server action + email provider)
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Contact Us — Mehfil Nights · Seattle South Asian Music Nonprofit",
  description:
    "We read every message and typically respond within 24 hours. Send us a note about performing, volunteering, private events, partnerships, or just to say hello.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactForm />
      <DirectContact />
      <FAQSection />
      <ContactClosingCTAs />
    </>
  );
}
