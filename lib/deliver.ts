import "server-only";
import { contact, site } from "@/content/site";
import { autoReply } from "./emails/autoReply";
import { serviceOptions, type Lead } from "./leads";

/**
 * Lead delivery. Configure with environment variables (see .env.example):
 *  - LEAD_NOTIFY_EMAIL  where new leads are emailed (default: the contact email)
 *  - LEAD_WEBHOOK_URL   optional webhook that receives each lead as JSON
 *  - RESEND_API_KEY     email provider key (https://resend.com); required to send email
 *  - EMAIL_FROM         sender for emails (default: GoFIBER <no-reply@gofiber.com>; domain must be verified)
 *
 * A request succeeds if at least one configured channel (email or webhook) accepts the lead.
 * With nothing configured (local development) the lead is only logged.
 * The customer auto-reply is best-effort and never fails the request.
 */

export class LeadDeliveryError extends Error {}

const from = () => process.env.EMAIL_FROM || `${site.name} <no-reply@gofiber.com>`;

async function sendEmail(apiKey: string, msg: { to: string; subject: string; text: string; replyTo?: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: from(), to: [msg.to], subject: msg.subject, text: msg.text, reply_to: msg.replyTo }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

function internalSummary(lead: Lead): { subject: string; text: string } {
  const at = new Date().toISOString();
  if (lead.type === "availability") {
    return {
      subject: `New availability check: ${lead.address}`,
      text: [`Availability check received ${at}`, "", `Address: ${lead.address}`, `Work email: ${lead.workEmail}`, `Company: ${lead.company || "-"}`].join("\n"),
    };
  }
  const services = lead.services.map((v) => serviceOptions.find((o) => o.value === v)?.label ?? v).join(", ");
  return {
    subject: `New ${lead.intent === "sales" ? "sales enquiry" : "quote request"}: ${lead.company}`,
    text: [
      `${lead.intent === "sales" ? "Talk to Sales" : "Quote"} request received ${at}`,
      "",
      `Name: ${lead.name}`,
      `Work email: ${lead.workEmail}`,
      `Phone: ${lead.phone || "-"}`,
      `Company: ${lead.company} (${lead.companySize} employees)`,
      `Location: ${lead.location}`,
      `Services: ${services}`,
      `Current provider: ${lead.currentProvider || "-"}`,
      "",
      "Message:",
      lead.message || "-",
    ].join("\n"),
  };
}

export async function deliverLead(lead: Lead): Promise<void> {
  const { website: _honeypot, ...clean } = lead;
  void _honeypot;
  const apiKey = process.env.RESEND_API_KEY;
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL || contact.email;

  const channels: Promise<string>[] = [];
  if (apiKey) {
    const m = internalSummary(lead);
    channels.push(sendEmail(apiKey, { to: notifyTo, ...m, replyTo: lead.workEmail }).then(() => "email"));
  }
  if (webhook) {
    channels.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receivedAt: new Date().toISOString(), source: "website", ...clean }),
        signal: AbortSignal.timeout(10_000),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook responded ${r.status}`);
        return "webhook";
      }),
    );
  }

  if (channels.length === 0) {
    console.warn("[lead] No delivery channel configured (set RESEND_API_KEY and/or LEAD_WEBHOOK_URL). Lead:", JSON.stringify(clean));
    return;
  }

  const results = await Promise.allSettled(channels);
  results.forEach((r) => r.status === "rejected" && console.error("[lead] delivery failed:", r.reason));
  if (!results.some((r) => r.status === "fulfilled")) {
    // Log the lead so it can be recovered from server logs, then report failure to the visitor.
    console.error("[lead] ALL CHANNELS FAILED. Lead:", JSON.stringify(clean));
    throw new LeadDeliveryError("Lead could not be delivered");
  }

  // Customer auto-reply: best effort.
  if (apiKey) {
    const reply = autoReply(lead);
    await sendEmail(apiKey, { to: lead.workEmail, ...reply, replyTo: contact.email }).catch((e) =>
      console.error("[lead] auto-reply failed:", e),
    );
  }
}
