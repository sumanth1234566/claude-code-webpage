import type { ReactNode } from "react";

export const inputCls =
  "mt-2 block w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-base text-ink placeholder:text-text-muted/80 focus:border-brand-purple focus:outline-none focus:ring-2 focus:ring-brand-purple/30 aria-[invalid=true]:border-red-700";

export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-red-700" aria-hidden="true"> *</span>
        ) : (
          <span className="font-normal text-text-muted"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** aria-describedby helper. */
export const describedBy = (id: string, error?: string, hint?: boolean) =>
  [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;

/** Visually hidden honeypot: humans never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function ErrorSummary({
  errors,
  labels,
  summaryRef,
}: {
  errors: Record<string, string | undefined>;
  labels: Record<string, string>;
  summaryRef: React.RefObject<HTMLDivElement | null>;
}) {
  const entries = Object.entries(errors).filter(([, v]) => v);
  if (!entries.length) return null;
  return (
    <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-xl border border-red-700/30 bg-red-50 p-5 text-red-800">
      <h2 className="font-semibold">Please fix the following:</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {entries.map(([k, v]) => (
          <li key={k}>
            {labels[k] ? (
              <a href={`#${labels[k]}`} className="underline">
                {v}
              </a>
            ) : (
              v
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
