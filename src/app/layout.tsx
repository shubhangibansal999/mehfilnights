import type { Metadata } from "next";
import { DM_Serif_Display, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* -------------------------------------------------------------------------- */
/*  Fonts — three typefaces, no exceptions (per v3 brand guidelines)          */
/* -------------------------------------------------------------------------- */

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-accent",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "Mehfil Nights — South Asian Music Nonprofit · Seattle 501(c)(3)",
  description:
    "Seattle-based 501(c)(3) nonprofit building community through intimate South Asian live music. Support independent artists, attend a Mehfil, or make a tax-deductible donation.",
};

/* -------------------------------------------------------------------------- */
/*  Global JSON-LD — NonprofitOrganization                                    */
/*  Runs on every page for grant reviewers' schema scrapers + Google KG.      */
/* -------------------------------------------------------------------------- */

const SITE_URL = "https://mehfilnights.org";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NonprofitOrganization",
  name: "Mehfil Nights",
  url: SITE_URL,
  /* TODO(founder): drop a real logo at /public/logo.png (square, min 200×200). */
  logo: `${SITE_URL}/logo.png`,
  description:
    "Seattle-based 501(c)(3) nonprofit building community through intimate South Asian live music — supporting independent artists, honoring a centuries-old tradition, and keeping ticket prices accessible.",
  address: {
    "@type": "PostalAddress",
    /* TODO(founder): provide real street address (PO Box OK). */
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  email: "hello@mehfilnights.org",
  /* TODO(founder): verify each social URL exists. */
  sameAs: [
    "https://instagram.com/mehfilnights",
    "https://facebook.com/mehfilnights",
    "https://linkedin.com/company/mehfilnights",
    "https://youtube.com/@mehfilnights",
  ],
  /* TODO(founder): populate taxID with real EIN before launch. */
  taxID: "XX-XXXXXXX",
  nonprofitStatus: "Nonprofit501c3",
};

/* -------------------------------------------------------------------------- */
/*  Root layout                                                               */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    dmSerifDisplay.variable,
    instrumentSerif.variable,
    plusJakartaSans.variable,
  ].join(" ");

  return (
    <html lang="en" className={`${fontClasses} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Skip-to-content — first focusable element for keyboard users */}
        <a href="#main-content" className="skip-to-content" data-testid="skip-to-content">
          Skip to content
        </a>

        {/* Global NonprofitOrganization JSON-LD — surfaces on every page for
            schema scrapers used by grant reviewers and Google's Knowledge
            Graph. See PRD §4. */}
        <script
          type="application/ld+json"
          data-testid="organization-jsonld"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <Header />

        <main
          id="main-content"
          data-testid="main-content"
          className="flex-1 flex flex-col"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
