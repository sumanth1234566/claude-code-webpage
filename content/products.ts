
export type ProductSlug =
  | "internet"
  | "voice"
  | "messaging"
  | "number-porting"
  | "phone-numbers"
  | "managed-network";

export type Product = {
  slug: ProductSlug;
  name: string;
  short: string;
  summary: string;
  benefits: { title: string; body: string }[];
  included: string[];
  related: ProductSlug[];
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
};

export const products: Product[] = [
  {
    slug: "internet",
    name: "Business Internet",
    short: "High-speed business internet on our own fiber.",
    summary:
      "High-speed business internet delivered over GoFIBER's own fiber network, without reselling through phone or cable companies.",
    benefits: [
      { title: "Our own last mile", body: "Your connection runs on fiber we own and operate, end to end." },
      { title: "Built for reliability", body: "A network we build, run and maintain ourselves." },
      { title: "Competitive pricing", body: "Owning the infrastructure keeps overhead low. Pricing is quoted to your needs." },
      { title: "Local support", body: "A responsive team based in Southern California." },
    ],
    included: [
      "Business internet over GoFIBER fiber",
      "Installation planned with your team",
      "Support from our local team",
      "Options to add voice and managed network services",
    ],
    related: ["voice", "managed-network"],
    faq: [
      { q: "Is GoFIBER available at my address?", a: "Use the availability check on our Coverage page and our team will confirm service at your location." },
      { q: "Do you resell another provider's network?", a: "No. GoFIBER owns its last-mile fiber and does not resell through phone or cable companies." },
      { q: "How is pricing set?", a: "Pricing is quote-based, so it fits your location and requirements. Request a quote to get started." },
    ],
    seo: {
      title: "Business Internet Long Beach & Irvine",
      description:
        "High-speed business internet on GoFIBER's own fiber network in Long Beach, Irvine and across Southern California. Request a quote.",
    },
  },
  {
    slug: "voice",
    name: "VoIP Calling",
    short: "Reliable business voice for your whole team.",
    summary: "Reliable business voice over our network, with simple number porting and local support.",
    benefits: [
      { title: "Reliable calling", body: "Business voice that runs on a network we operate ourselves." },
      { title: "Keep your numbers", body: "Port your existing business numbers to GoFIBER with a guided process." },
      { title: "One platform", body: "Calling and business messaging from the same platform." },
    ],
    included: [
      "Business VoIP calling",
      "Number porting for existing numbers",
      "New business numbers when you need them",
      "Support from our local team",
    ],
    related: ["number-porting", "messaging"],
    faq: [
      { q: "Can I keep my current business numbers?", a: "Yes. Our Number Porting page explains how a switch works, step by step." },
      { q: "Can I add new numbers?", a: "Yes. New business numbers can be added quickly. See Phone Numbers." },
      { q: "Does VoIP work with GoFIBER internet?", a: "Yes. Voice and internet can be provided together. Ask our sales team for a combined quote." },
    ],
    seo: {
      title: "Business VoIP Irvine & Long Beach",
      description:
        "Reliable business VoIP calling from GoFIBER in Irvine, Long Beach and Southern California, with easy number porting. Request a quote.",
    },
  },
  {
    slug: "messaging",
    name: "Business Messaging",
    short: "Messaging from the same platform as your calling.",
    summary: "Business messaging from the same platform as your calling, so voice and messaging stay together.",
    benefits: [
      { title: "Same platform as calling", body: "Manage voice and messaging in one place." },
      { title: "Use your business numbers", body: "Message from the numbers your customers already know." },
      { title: "Local support", body: "Help from the same responsive team that supports your voice service." },
    ],
    included: [
      "Business messaging on the GoFIBER platform",
      "Works alongside GoFIBER VoIP calling",
      "Support from our local team",
    ],
    related: ["voice", "phone-numbers"],
    faq: [
      { q: "Do I need GoFIBER voice to use messaging?", a: "Messaging is provided from the same platform as calling. Our sales team can confirm the right setup for you." },
      { q: "Can I message from ported numbers?", a: "Yes. Numbers you port to GoFIBER can be used for business messaging as well as calling." },
    ],
    seo: {
      title: "Business Messaging",
      description: "Business messaging from GoFIBER on the same platform as your VoIP calling. Request a quote.",
    },
  },
  {
    slug: "number-porting",
    name: "Number Porting",
    short: "Move your existing business numbers to GoFIBER easily.",
    summary: "Keep the numbers your customers know. We guide the switch from start to finish.",
    benefits: [
      { title: "Keep your numbers", body: "Your existing business numbers move with you." },
      { title: "About 4 days", body: "A typical port takes about 4 days, and we keep you informed at each step." },
      { title: "Service stays up", body: "Your current service keeps working until activation on the confirmed port date." },
    ],
    included: [],
    related: ["voice", "phone-numbers"],
    faq: [
      { q: "Will my phone numbers change?", a: "No. Porting moves your existing numbers to GoFIBER. They stay the same." },
      { q: "Will there be downtime during the switch?", a: "Your current service keeps working while the port is processed. Once your current carrier confirms the port date (the FOC, or Firm Order Commitment), we activate your numbers on GoFIBER on that date. There may be a brief interruption during activation, and you will know the date in advance." },
      { q: "How long does porting take?", a: "A typical port takes about 4 days. Timing can vary with your current provider and the numbers involved." },
      { q: "Do I need to cancel my current service first?", a: "No. Keep your current service active until the port is complete. Cancelling early can put your numbers at risk." },
    ],
    seo: {
      title: "Port Your Business Number",
      description:
        "Port your business phone numbers to GoFIBER with a guided, step-by-step process. Keep your numbers and switch with confidence.",
    },
  },
  {
    slug: "phone-numbers",
    name: "Phone Numbers",
    short: "Get new business numbers quickly.",
    summary: "Get new business phone numbers quickly, ready to use with GoFIBER voice and messaging.",
    benefits: [
      { title: "Quick setup", body: "Add new business numbers when your team needs them." },
      { title: "Works with voice and messaging", body: "New numbers are ready for GoFIBER calling and messaging." },
      { title: "Room to grow", body: "Add numbers as you open locations or add staff." },
    ],
    included: [
      "New business phone numbers",
      "Use with GoFIBER VoIP and messaging",
      "Support from our local team",
    ],
    related: ["voice", "number-porting"],
    faq: [
      { q: "Can I choose local area codes?", a: "Yes. You can choose local area codes for new business numbers." },
      { q: "Can I combine new and ported numbers?", a: "Yes. Port your existing numbers and add new ones on the same service." },
    ],
    seo: {
      title: "Business Phone Numbers",
      description: "Get new business phone numbers quickly with GoFIBER, ready for voice and messaging. Request a quote.",
    },
  },
  {
    slug: "managed-network",
    name: "Managed Network Services",
    short: "Routers, firewalls, Wi-Fi and monitoring, managed by our team.",
    summary: "Managed network services from GoFIBER, so your team can focus on the business, not the network.",
    benefits: [
      { title: "One provider", body: "Connectivity and network management from the same team." },
      { title: "Responsive support", body: "A local team that knows your network." },
      { title: "Routers to Wi-Fi", body: "Routers, firewalls, Wi-Fi and monitoring, managed for you." },
    ],
    included: [
      "Managed routers",
      "Managed firewalls",
      "Managed Wi-Fi",
      "Network monitoring",
      "Works with GoFIBER business internet",
      "Support from our local team",
    ],
    related: ["internet", "voice"],
    faq: [
      { q: "What does managed network include?", a: "Routers, firewalls, Wi-Fi and network monitoring, managed by our team. The exact scope is agreed with you during the quote process." },
      { q: "Do I need GoFIBER internet?", a: "Talk to our sales team about the right combination for your business." },
    ],
    seo: {
      title: "Managed Network Services",
      description: "Managed network services from GoFIBER for businesses in Long Beach, Irvine and Southern California.",
    },
  },
];

export const productBySlug = (slug: ProductSlug): Product => {
  const p = products.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown product: ${slug}`);
  return p;
};

export const productHref = (slug: ProductSlug) => `/${slug}`;
