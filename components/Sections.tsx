import Link from "next/link";
import type { ReactNode } from "react";
import { products, productBySlug, productHref, type ProductSlug } from "@/content/products";

export function Section({
  id,
  title,
  intro,
  children,
  tone = "white",
  eyebrow,
}: {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
  tone?: "white" | "muted";
  eyebrow?: string;
}) {
  return (
    <section id={id} className={`${tone === "muted" ? "bg-muted" : "bg-white"}`} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-purple">{eyebrow}</p>}
          <h2 id={id ? `${id}-title` : undefined} className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-lg text-text-muted">{intro}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function CardGrid({ items, cols = 3 }: { items: { title: string; body: string }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <ul className={`grid gap-6 ${grid}`}>
      {items.map((b) => (
        <li key={b.title} className="rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
          <span aria-hidden="true" className="mb-5 block h-1 w-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-orange" />
          <h3 className="text-lg font-semibold">{b.title}</h3>
          <p className="mt-2 text-text-muted">{b.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function ProductGrid({ only }: { only?: ProductSlug[] }) {
  const list = only ? only.map(productBySlug) : products;
  return (
    <ul className={`grid gap-6 sm:grid-cols-2 ${only ? "" : "lg:grid-cols-3"}`}>
      {list.map((p) => (
        <li key={p.slug}>
          <Link
            href={productHref(p.slug)}
            className="group flex h-full flex-col rounded-2xl border border-black/5 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-purple/30 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-2 flex-1 text-text-muted">{p.short}</p>
            <span className="mt-6 text-sm font-semibold text-brand-purple">
              Learn more <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3 rounded-xl bg-white p-5 shadow-sm">
          <svg aria-hidden="true" className="mt-0.5 h-5 w-5 flex-none text-brand-purple" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
          </svg>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="max-w-3xl divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
      {items.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-2xl leading-none text-brand-purple transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function StepTimeline({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-sm">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-magenta text-sm font-bold text-white">
            {i + 1}
          </span>
          <h3 className="mt-4 font-semibold">{s.title}</h3>
          <p className="mt-2 text-sm text-text-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
