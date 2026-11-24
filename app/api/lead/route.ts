import { NextResponse } from "next/server";
import { deliverLead } from "@/lib/deliver";
import { LeadSchema, toFieldErrors } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request" } }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Accept silently and drop.
  if (body && typeof body === "object" && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: toFieldErrors(parsed.error) }, { status: 400 });
  }

  try {
    await deliverLead(parsed.data);
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "We couldn't send your request right now. Please try again, or call us." } },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
