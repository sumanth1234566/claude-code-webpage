import type { ReactNode } from "react";
import { contact, site } from "@/content/site";

/** Placeholder legal page. Content must be written or approved by GoFIBER's legal team before launch. */
export function LegalPage({ title, sections }: { title: string; sections: { heading: string; body: ReactNode }[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 rounded-lg border border-brand-orange/40 bg-brand-orange/10 px-4 py-3 text-sm text-ink">
          [Placeholder: pending legal review. This page will be replaced with {site.name}&apos;s approved {title.toLowerCase()}.]
        </p>
        <p className="mt-6 text-sm text-text-muted">Last updated: [date]</p>
        <div className="mt-10 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-semibold">{s.heading}</h2>
              <div className="mt-3 text-text-muted">{s.body}</div>
            </div>
          ))}
          <div>
            <h2 className="text-xl font-semibold">Contact us</h2>
            <p className="mt-3 text-text-muted">
              Questions about this page? Email{" "}
              <a href={contact.emailHref} className="text-brand-purple underline [overflow-wrap:anywhere]">{contact.email}</a> or call{" "}
              <a href={contact.phoneHref} className="text-brand-purple underline">{contact.phone}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
