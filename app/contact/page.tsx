import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactHeading } from "@/components/ContactHeading";
import { QuoteForm } from "@/components/QuoteForm";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Get a Quote",
  description: "Request a quote for GoFIBER business internet, VoIP, messaging, number porting and managed network services in Southern California.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-muted">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1fr_2fr]">
        <div>
          <Suspense fallback={<h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get a Quote</h1>}>
            <ContactHeading />
          </Suspense>
          <p className="mt-4 text-lg text-text-muted">
            Tell us about your business and the services you need. Our sales team will review your requirements and follow up with a quote.
          </p>
          <ul className="mt-8 space-y-3 text-text-muted">
            <li>✓ Business internet over our own fiber</li>
            <li>✓ Easy number porting</li>
            <li>✓ A local, responsive team</li>
          </ul>
          <p className="mt-8 text-sm text-text-muted">
            Prefer to call?{" "}
            <a href={contact.phoneHref} className="font-semibold text-brand-purple hover:underline">
              {contact.phone}
            </a>
            <br />
            Hours: {contact.hours}
            <br />
            Headquarters: {site.hq}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-10">
          <Suspense fallback={<p className="text-text-muted">Loading form…</p>}>
            <QuoteForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
