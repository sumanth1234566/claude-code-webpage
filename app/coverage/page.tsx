import type { Metadata } from "next";
import { AvailabilityCheck } from "@/components/AvailabilityCheck";
import { CoverageMap } from "@/components/CoverageMap";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Sections";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage: Southern California Business Fiber",
  description: "GoFIBER's own fiber network covers 200+ square miles of Southern California, including Long Beach and Irvine. Check availability at your address.",
  alternates: { canonical: "/coverage" },
};

export default function CoveragePage() {
  return (
    <>
      <Hero
        eyebrow="Coverage"
        title="Our fiber across Southern California"
        subtitle={`GoFIBER owns its last-mile fiber across ${site.coverage}, serving businesses in ${site.areas.join(" and ")}.`}
        location="coverage:hero"
        secondary={{ href: "#check", label: "Check availability" }}
      />
      <Section id="check" title="Check availability at your address" intro="Enter your business address and work email. Our team will confirm service at your location.">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <CoverageMap />
          <AvailabilityCheck location="coverage" />
        </div>
      </Section>
      <CtaBand location="coverage" />
    </>
  );
}
