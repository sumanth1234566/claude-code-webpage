"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState, type FormEvent } from "react";
import { AvailabilityLeadSchema, toFieldErrors, type FieldErrors } from "@/lib/leads";
import { track } from "@/lib/track";
import { ErrorSummary, Field, Honeypot, describedBy, inputCls } from "./FormField";
import { btn } from "./buttons";

export function AvailabilityCheck({ location, compact = false }: { location: string; compact?: boolean }) {
  const router = useRouter();
  const uid = useId().replace(/:/g, "");
  const ids = { address: `${uid}-address`, workEmail: `${uid}-email`, company: `${uid}-company` };
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const fail = (errs: FieldErrors) => {
    setErrors(errs);
    track("form_error", { form: "availability", location, fields: Object.keys(errs) });
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      type: "availability" as const,
      address: String(fd.get("address") ?? ""),
      workEmail: String(fd.get("workEmail") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const parsed = AvailabilityLeadSchema.safeParse(data);
    if (!parsed.success) return fail(toFieldErrors(parsed.error));

    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { ok: boolean; errors?: FieldErrors };
      if (!res.ok || !json.ok) {
        setSubmitting(false);
        return fail(json.errors ?? { form: "Something went wrong. Please try again." });
      }
      track("availability_check", { location });
      track("form_submit", { form: "availability", location });
      router.push("/thank-you?type=availability");
    } catch {
      setSubmitting(false);
      fail({ form: "We couldn't send your request. Check your connection and try again." });
    }
  }

  const err = (k: keyof typeof ids) => errors[k];

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onInput={() => {
        if (!started.current) {
          started.current = true;
          track("form_start", { form: "availability", location });
        }
      }}
      className="relative space-y-5 rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:p-8"
      aria-label="Check availability at your address"
    >
      <ErrorSummary errors={errors} labels={ids} summaryRef={summaryRef} />
      <Honeypot />
      <div className={`grid gap-5 ${compact ? "md:grid-cols-[2fr_1.5fr_auto] md:items-end" : "md:grid-cols-2"}`}>
        <div className={compact ? "" : "md:col-span-2"}>
          <Field id={ids.address} label="Business address" required error={err("address")}>
            <input id={ids.address} name="address" autoComplete="street-address" placeholder="Street, city, ZIP" required aria-invalid={!!err("address")} aria-describedby={describedBy(ids.address, err("address"))} className={inputCls} />
          </Field>
        </div>
        <Field id={ids.workEmail} label="Work email" required error={err("workEmail")}>
          <input id={ids.workEmail} name="workEmail" type="email" autoComplete="email" required aria-invalid={!!err("workEmail")} aria-describedby={describedBy(ids.workEmail, err("workEmail"))} className={inputCls} />
        </Field>
        {!compact && (
          <Field id={ids.company} label="Company" error={err("company")}>
            <input id={ids.company} name="company" autoComplete="organization" className={inputCls} />
          </Field>
        )}
        <div className={compact ? "" : "md:col-span-2"}>
          <button type="submit" disabled={submitting} className={`${btn.primary} w-full ${compact ? "md:w-auto" : "sm:w-auto"}`}>
            {submitting ? "Checking…" : "Check availability"}
          </button>
        </div>
      </div>
      <p className="text-sm text-text-muted">
        We&apos;ll confirm availability at your address and follow up by email. See our{" "}
        <Link href="/privacy" className="underline hover:text-brand-purple">Privacy Policy</Link>.
      </p>
    </form>
  );
}
