import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { CardGrid, Section } from "@/components/Sections";
import { differentiators, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About GoFIBER",
  description: "Since 2002, GoFIBER has provided business internet, VoIP and managed network services over its own fiber network. Headquartered in Long Beach, CA.",
  alternates: { canonical: "/about" },
};

const facts = [
  { title: `${site.yearsInBusiness} in business`, body: `Serving Southern California businesses since ${site.founded}.` },
  { title: `Headquartered in ${site.hq}`, body: `We operate in ${site.areas.join(" and ")}.` },
  { title: "Our own network", body: `We own our last-mile fiber across ${site.coverage}.` },
];

export default function AboutPage() {
  return (
    <>
      <Hero eyebrow="About GoFIBER" title="A Southern California network, owned and operated by us" subtitle={site.pitch} location="about:hero" />
      <Section id="story" title="Who we are">
        <div className="max-w-3xl space-y-5 text-lg text-text-muted">
          <p>
            GoFIBER was founded in {site.founded} and is headquartered in {site.hq}. We provide high-speed business internet,
            VoIP and managed network services to businesses in {site.areas.join(" and ")}.
          </p>
          <p>
            Unlike providers that resell through phone or cable companies, we own our last-mile fiber. That means fewer
            hand-offs, lower overhead, and a team that can act directly on the network that serves you.
          </p>
        </div>
        <div className="mt-12">
          <CardGrid items={facts} />
        </div>
      </Section>
      <Section id="why" tone="muted" title="Why businesses choose GoFIBER">
        <CardGrid items={[...differentiators]} cols={4} />
      </Section>
      <CtaBand location="about" />
    </>
  );
}
