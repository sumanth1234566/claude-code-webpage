import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "GoFIBER privacy policy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Information we collect", body: "[To be completed by legal: e.g. details you submit through our quote and availability forms, such as name, work email, company, phone and address.]" },
        { heading: "How we use your information", body: "[To be completed by legal: e.g. to respond to your request, prepare quotes and confirm service availability.]" },
        { heading: "Sharing your information", body: "[To be completed by legal.]" },
        { heading: "Data retention and security", body: "[To be completed by legal.]" },
        { heading: "Your rights", body: "[To be completed by legal, including any California (CCPA/CPRA) rights.]" },
      ]}
    />
  );
}
