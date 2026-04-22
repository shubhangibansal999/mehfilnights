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
