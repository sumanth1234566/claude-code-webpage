import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/Sections";
import { btn } from "@/components/buttons";

export const metadata: Metadata = {
  title: "Thank You",
  description: "We've received your request.",
  robots: { index: false, follow: true },
};

const next = [
  { title: "We review your request", body: "Our team reads the details you shared." },
  { title: "We contact you", body: "A member of our team follows up by email or phone." },
  { title: "We plan next steps", body: "Availability, a tailored quote, and a plan for your switch." },
];

export default function ThankYouPage() {
  return (
    <>
      <section className="bg-muted">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-white" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">Thank you. We&apos;ve received your request.</h1>
          <p className="mt-4 text-lg text-text-muted">Our team will be in touch soon. Here&apos;s what happens next.</p>
          <ol className="mt-12 grid gap-6 text-left md:grid-cols-3">
            {next.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="text-sm font-bold text-brand-purple">Step {i + 1}</span>
                <h2 className="mt-2 font-semibold">{s.title}</h2>
                <p className="mt-1 text-sm text-text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <Link href="/" className={`${btn.primary} mt-12`}>
            Back to home
          </Link>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl font-bold tracking-tight">Explore our services</h2>
          <div className="mt-8">
            <ProductGrid />
          </div>
        </div>
      </section>
    </>
  );
}
