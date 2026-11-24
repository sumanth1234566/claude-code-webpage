"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { QuoteLeadSchema, companySizes, serviceOptions, toFieldErrors, type FieldErrors } from "@/lib/leads";
import { track } from "@/lib/track";
import { ErrorSummary, Field, Honeypot, describedBy, inputCls } from "./FormField";
import { btn } from "./buttons";

// Field name → input id (for error-summary links).
const ids: Record<string, string> = {
  name: "q-name",
  workEmail: "q-email",
  company: "q-company",
  companySize: "q-size",
  location: "q-location",
  services: "q-services",
  phone: "q-phone",
  currentProvider: "q-provider",
  message: "q-message",
};

export function QuoteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const intent = params.get("intent") === "sales" ? "sales" : "quote";
  const preselect = params.get("service");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const onFirstInput = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "quote", intent });
  };

  const showErrors = (errs: FieldErrors) => {
    setErrors(errs);
    track("form_error", { form: "quote", fields: Object.keys(errs) });
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      type: "quote" as const,
      intent,
      name: String(fd.get("name") ?? ""),
      workEmail: String(fd.get("workEmail") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
      companySize: String(fd.get("companySize") ?? ""),
      location: String(fd.get("location") ?? ""),
      services: fd.getAll("services").map(String),
      phone: String(fd.get("phone") ?? ""),
      currentProvider: String(fd.get("currentProvider") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const parsed = QuoteLeadSchema.safeParse(data);
    if (!parsed.success) return showErrors(toFieldErrors(parsed.error));

    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; errors?: FieldErrors };
      if (!res.ok || !json.ok) {
        setSubmitting(false);
        return showErrors(json.errors ?? { form: "Something went wrong. Please try again." });
      }
      track("form_submit", { form: "quote", intent, services: data.services });
      router.push("/thank-you?type=quote");
    } catch {
      setSubmitting(false);
      showErrors({ form: "We couldn't send your request. Check your connection and try again." });
    }
  }

  const err = (k: string) => errors[k];

  return (
    <form noValidate onSubmit={onSubmit} onInput={onFirstInput} className="relative space-y-6" aria-describedby="q-required-note">
      <p id="q-required-note" className="text-sm text-text-muted">
        Fields marked <span className="text-red-700">*</span> are required.
      </p>
      <ErrorSummary errors={errors} labels={ids} summaryRef={summaryRef} />
      <Honeypot />

      <div className="grid gap-6 md:grid-cols-2">
        <Field id={ids.name} label="Full name" required error={err("name")}>
          <input id={ids.name} name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby={describedBy(ids.name, err("name"))} className={inputCls} />
        </Field>
        <Field id={ids.workEmail} label="Work email" required error={err("workEmail")}>
          <input id={ids.workEmail} name="workEmail" type="email" autoComplete="email" required aria-invalid={!!err("workEmail")} aria-describedby={describedBy(ids.workEmail, err("workEmail"))} className={inputCls} />
        </Field>
        <Field id={ids.company} label="Company" required error={err("company")}>
          <input id={ids.company} name="company" autoComplete="organization" required aria-invalid={!!err("company")} aria-describedby={describedBy(ids.company, err("company"))} className={inputCls} />
        </Field>
        <Field id={ids.phone} label="Phone" error={err("phone")}>
          <input id={ids.phone} name="phone" type="tel" autoComplete="tel" aria-invalid={!!err("phone")} aria-describedby={describedBy(ids.phone, err("phone"))} className={inputCls} />
        </Field>
        <Field id={ids.companySize} label="Company size" required error={err("companySize")}>
          <select id={ids.companySize} name="companySize" required defaultValue="" aria-invalid={!!err("companySize")} aria-describedby={describedBy(ids.companySize, err("companySize"))} className={inputCls}>
            <option value="" disabled>
              Select number of employees
            </option>
            {companySizes.map((s) => (
              <option key={s} value={s}>
                {s} employees
              </option>
            ))}
          </select>
        </Field>
        <Field id={ids.location} label="Location or service address" required error={err("location")}>
          <input id={ids.location} name="location" autoComplete="street-address" required aria-invalid={!!err("location")} aria-describedby={describedBy(ids.location, err("location"))} className={inputCls} />
        </Field>
      </div>

      <fieldset aria-invalid={!!err("services")} aria-describedby={describedBy(ids.services, err("services"))}>
        <legend className="text-sm font-semibold text-ink">
          Services of interest <span className="text-red-700" aria-hidden="true">*</span>
        </legend>
        <div id={ids.services} tabIndex={-1} className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceOptions.map((s) => (
            <label key={s.value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-black/15 bg-white px-4 py-3 has-[:checked]:border-brand-purple has-[:checked]:bg-brand-purple/5">
              <input type="checkbox" name="services" value={s.value} defaultChecked={preselect === s.value} className="h-4 w-4 accent-brand-purple" />
              <span className="text-sm">{s.label}</span>
            </label>
          ))}
        </div>
        {err("services") && (
          <p id={`${ids.services}-error`} className="mt-2 text-sm font-medium text-red-700">
            {err("services")}
          </p>
        )}
      </fieldset>

      <Field id={ids.currentProvider} label="Current provider" error={err("currentProvider")}>
        <input id={ids.currentProvider} name="currentProvider" aria-describedby={describedBy(ids.currentProvider, err("currentProvider"))} className={inputCls} />
      </Field>

      <Field id={ids.message} label="Message" error={err("message")} hint="Tell us about your locations, timelines or anything else we should know.">
        <textarea id={ids.message} name="message" rows={5} maxLength={2000} aria-describedby={describedBy(ids.message, err("message"), true)} className={inputCls} />
      </Field>

      <p className="text-xs text-text-muted">
        By submitting, you agree that GoFIBER may contact you about your request. See our{" "}
        <Link href="/privacy" className="underline hover:text-brand-purple">Privacy Policy</Link>.
      </p>
      <button type="submit" disabled={submitting} className={`${btn.primary} w-full sm:w-auto`}>
        {submitting ? "Sending…" : intent === "sales" ? "Contact Sales" : "Request a Quote"}
      </button>
    </form>
  );
}
