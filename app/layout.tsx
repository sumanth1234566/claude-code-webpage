import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { contact, placeholders, site } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Business Internet & VoIP in Long Beach and Irvine | GoFIBER Business Fiber", template: "%s | GoFIBER Business Fiber" },
  description: site.pitch,
  openGraph: { siteName: site.name, type: "website", locale: "en_US", images: ["/media/style.png"] },
  twitter: { card: "summary_large_image" },
  ...(site.noindex ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = { themeColor: "#5b3fa8" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TelecommunicationsService"],
  name: site.name,
  description: site.pitch,
  url: site.url,
  foundingDate: String(site.founded),
  telephone: "+19876543210",
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: placeholders.streetAddress,
    addressLocality: "Long Beach",
    addressRegion: "CA",
    addressCountry: "US",
  },
  areaServed: site.areas.map((name) => ({ "@type": "City", name })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={inter.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-white px-4 py-2 font-semibold text-brand-purple focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
