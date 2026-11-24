import type { Lead } from "../leads";
import { contact, site } from "@/content/site";

/** Customer auto-reply, sent from no-reply@gofiber.com when RESEND_API_KEY is set (see lib/deliver.ts). */
export function autoReply(lead: Lead): { subject: string; text: string } {
  const greeting = lead.type === "quote" ? `Hello ${lead.name},` : "Hello,";
  const what =
    lead.type === "quote"
      ? "We've received your quote request. A member of our sales team will review your requirements and contact you."
      : `We've received your availability check for ${lead.address}. Our team will confirm service at that location and contact you.`;

  return {
    subject: lead.type === "quote" ? `${site.name}: we've received your quote request` : `${site.name}: availability check received`,
    text: [
      greeting,
      "",
      what,
      "",
      `If you need to reach us sooner: ${contact.phone} · ${contact.email} (${contact.hours})`,
      "",
      `Thank you for considering ${site.name}.`,
      `${site.name} · ${site.hq}`,
    ].join("\n"),
  };
}
