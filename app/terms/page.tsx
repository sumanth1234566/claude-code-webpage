import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "GoFIBER website terms of service.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      sections={[
        { heading: "Use of this website", body: "[To be completed by legal.]" },
        { heading: "Quotes and service availability", body: "[To be completed by legal: e.g. quotes and availability confirmations are subject to a signed service agreement.]" },
        { heading: "Limitation of liability", body: "[To be completed by legal.]" },
        { heading: "Changes to these terms", body: "[To be completed by legal.]" },
      ]}
    />
  );
}
