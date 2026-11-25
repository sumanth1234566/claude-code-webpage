import type { Metadata } from "next";
import { AvailabilityCheck } from "@/components/AvailabilityCheck";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { ScrollVideo } from "@/components/ScrollVideo";
import { CardGrid, ProductGrid, Section } from "@/components/Sections";
import { SupportTeam } from "@/components/SupportTeam";
import { differentiators, site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Business Internet & VoIP in Long Beach and Irvine | GoFIBER Business Fiber" },
  description:
    "GoFIBER provides high speed business internet, VoIP and managed network services over its own fiber network in Long Beach, Irvine and Southern California.",
  alternates: { canonical: "/" },
};

const ownFiber = [
  { title: "We own the last mile", body: "The fiber that reaches your building is ours, built and operated by GoFIBER." },
  { title: `${site.coverage}`, body: "Our own network across the region, serving businesses in Long Beach, Irvine and beyond." },
  { title: "No phone or cable resellers", body: "We don't resell through phone or cable companies. One provider, accountable end to end." },
];

export default function Home() {
  return (
    <>
      <Hero
        size="lg"
        eyebrow={`Southern California business fiber · ${site.yearsInBusiness} in business`}
        title="Business internet and voice on our own fiber network"
        subtitle={site.pitch}
        location="home:hero"
      />

      <Section id="own-fiber" eyebrow="The GoFIBER difference" title="We own our fiber" intro="Owning our network means fewer hand-offs, lower overhead and a team that can act directly when you need us.">
        <CardGrid items={ownFiber} />
      </Section>

      <Section id="services" tone="muted" title="Services for your business" intro="Connectivity, voice and numbers from one provider.">
        <ProductGrid />
      </Section>

      <Section id="why" title="Why GoFIBER" intro="Reliable connectivity, simple migration and support that responds.">
        <CardGrid items={[...differentiators]} cols={4} />
      </Section>

      <Section id="support" tone="muted" eyebrow="Responsive support" title="A local team behind every connection">
        <SupportTeam />
      </Section>

      <Section id="coverage" title="Is GoFIBER available at your address?" intro="We serve businesses across 200+ square miles of Southern California. Enter your address and we'll confirm availability.">
        <AvailabilityCheck location="home:coverage" compact />
      </Section>

      <ScrollVideo />

      <CtaBand location="home" />
    </>
  );
}
