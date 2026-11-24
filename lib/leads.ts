import { z } from "zod";

export const serviceOptions = [
  { value: "internet", label: "Business Internet" },
  { value: "voice", label: "VoIP Calling" },
  { value: "messaging", label: "Business Messaging" },
  { value: "number-porting", label: "Number Porting" },
  { value: "phone-numbers", label: "Phone Numbers" },
  { value: "managed-network", label: "Managed Network Services" },
] as const;

export const companySizes = ["1–19", "20–99", "100–499", "500–999", "1000+"] as const;

const serviceValues = serviceOptions.map((s) => s.value) as [string, ...string[]];
const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const QuoteLeadSchema = z.object({
  type: z.literal("quote"),
  name: z.string().trim().min(1, "Enter your name").max(120),
  workEmail: z.email("Enter a valid work email").max(200),
  company: z.string().trim().min(1, "Enter your company name").max(160),
  companySize: z.enum(companySizes, "Select your company size"),
  location: z.string().trim().min(1, "Enter your location or address").max(240),
  services: z.array(z.enum(serviceValues)).min(1, "Select at least one service"),
  phone: optionalText(40),
  currentProvider: optionalText(120),
  message: optionalText(2000),
  intent: z.enum(["quote", "sales"]).optional(),
  website: optionalText(200), // honeypot
});

export const AvailabilityLeadSchema = z.object({
  type: z.literal("availability"),
  address: z.string().trim().min(1, "Enter the service address").max(240),
  workEmail: z.email("Enter a valid work email").max(200),
  company: optionalText(160),
  website: optionalText(200), // honeypot
});

export const LeadSchema = z.discriminatedUnion("type", [QuoteLeadSchema, AvailabilityLeadSchema]);
export type Lead = z.infer<typeof LeadSchema>;
export type FieldErrors = Partial<Record<string, string>>;

/** Flattens zod issues into { field: firstMessage }. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

