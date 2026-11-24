import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Sections";
import { SupportTeam } from "@/components/SupportTeam";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Customer Support",
  description: "How to reach GoFIBER support. A responsive local team for business internet, VoIP and managed network customers.",
  alternates: { canonical: "/support" },
};

const channels = [
  { title: "Call support", value: contact.phone, href: contact.phoneHref, note: "For outages and urgent issues." },
  { title: "Email support", value: contact.email, href: contact.emailHref, note: "For account and non-urgent questions." },
  { title: "Support hours", value: contact.hours, href: undefined, note: "Our team is ready to help." },
];

export default function SupportPage() {
  return (
    <>
      <Hero
        eyebrow="Support"
        title="Support that responds"
        subtitle="When you need help, you reach a local team that knows our network, because we own it."
        location="support:hero"
        secondary={{ href: "#channels", label: "How to reach us" }}
      />
      <Section id="channels" title="How to reach support">
        <ul className="grid gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <li key={c.title} className="min-w-0 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-purple">{c.title}</h3>
              <p className="mt-3 text-xl font-bold [overflow-wrap:anywhere]">
                {c.href ? (
                  <a href={c.href} className="hover:text-brand-purple hover:underline">
                    {c.value}
                  </a>
                ) : (
                  c.value
                )}
              </p>
              <p className="mt-2 text-text-muted">{c.note}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section id="team" tone="muted" title="Our support team">
        <SupportTeam showLink={false} />
      </Section>
      <CtaBand location="support" title="Not a customer yet?" body="See how GoFIBER can support your business. Request a quote or talk to our sales team." />
    </>
  );
}
