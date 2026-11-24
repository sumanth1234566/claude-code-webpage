import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/Hero";
import { productMetadata } from "@/components/ProductPage";
import { CardGrid, CheckList, FAQ, ProductGrid, Section, StepTimeline } from "@/components/Sections";
import { productBySlug } from "@/content/products";

export const metadata = productMetadata("number-porting");

const steps = [
  { title: "Request a quote", body: "Tell us which numbers you want to move and the services you need." },
  { title: "Share your account details", body: "Send your current account details and a recent bill so we can verify ownership." },
  { title: "We submit the port request", body: "We file the request with your current provider and track it for you." },
  { title: "We confirm your port date", body: "Your current carrier confirms the date (the FOC, or Firm Order Commitment). Your existing service keeps working until then." },
  { title: "We activate your numbers", body: "On the confirmed date we activate your numbers on GoFIBER. There may be a brief interruption during activation, and you will know the date in advance." },
];

const needs = [
  "A recent bill from your current provider",
  "Your account number and any account PIN or passcode",
  "The name and service address on the current account",
  "The list of numbers you want to port",
  "An authorized contact who can sign the port request",
];

export default function NumberPortingPage() {
  const p = productBySlug("number-porting");
  return (
    <>
      <Hero
        eyebrow="Number Porting"
        title="Keep your business numbers. Switch with confidence."
        subtitle="Moving to GoFIBER doesn't mean changing the numbers your customers know. We guide the switch from start to finish."
        location="product:number-porting"
      />
      <Section id="benefits" title="A switch without the stress">
        <CardGrid items={p.benefits} />
      </Section>
      <Section id="how" tone="muted" eyebrow="How it works" title="How switching works" intro="Five clear steps, with our team handling the paperwork. A typical port takes about 4 days.">
        <StepTimeline steps={steps} />
      </Section>
      <Section id="needs" title="What you'll need" intro="Having these ready helps the port go smoothly.">
        <CheckList items={needs} />
      </Section>
      <Section id="faq" tone="muted" title="Porting questions, answered">
        <FAQ items={p.faq} />
      </Section>
      <Section id="related" title="Works well with">
        <ProductGrid only={p.related} />
      </Section>
      <CtaBand location="product:number-porting" title="Ready to move your numbers?" body="Request a quote and we'll plan your port with you." />
    </>
  );
}
