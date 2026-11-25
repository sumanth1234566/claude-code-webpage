/**
 * Single source of company facts. Only verified facts from the brief belong here.
 * Unknown values stay as visible [placeholders] until real figures are supplied.
 */
export const site = {
  name: "GoFIBER",
  founded: 2002,
  hq: "Long Beach, CA",
  areas: ["Long Beach", "Irvine"],
  coverage: "200+ square miles of Southern California",
  pitch:
    "GoFIBER provides high speed business internet, VoIP and managed network services over its own fiber network in Southern California.",
  yearsInBusiness: "20+ years",
  /** Final domain not decided yet; set NEXT_PUBLIC_SITE_URL when it is. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.gofiber.com",
  /** Hide from search engines while the site is a preview (domain not decided). */
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "true",
} as const;

/** Sales and support share the same phone and email. */
export const contact = {
  phone: "+1 (987) 654-3210",
  phoneHref: "tel:+19876543210",
  email: "sumanth.bandarupally@bellacode.com",
  emailHref: "mailto:sumanth.bandarupally@bellacode.com",
  hours: "10:00 AM – 7:00 PM IST",
} as const;

export const placeholders = {
  streetAddress: "[street address]",
  mapData: "[map data pending]",
} as const;

export const differentiators = [
  {
    title: "Our own fiber",
    body: "We own the last mile and don't resell through phone or cable companies.",
  },
  {
    title: "Competitive pricing",
    body: "Owning our infrastructure keeps overhead low, and that is reflected in what you pay.",
  },
  {
    title: "Reliability",
    body: "A network we build, run and maintain ourselves, with fewer hand-offs between providers.",
  },
  {
    title: "Responsive support",
    body: "A local team that answers and follows through, from installation to everyday questions.",
  },
] as const;

export const nav = [
  { href: "/internet", label: "Internet" },
  { href: "/voice", label: "Voice" },
  { href: "/number-porting", label: "Number Porting" },
  { href: "/coverage", label: "Coverage" },
  { href: "/about", label: "About" },
  { href: "/support", label: "Support" },
] as const;
