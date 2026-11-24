import type { ReactNode } from "react";
import { FiberLines } from "./FiberLines";
import { TrackedLink } from "./TrackedLink";
import { btn } from "./buttons";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  location: string;
  secondary?: { href: string; label: string };
  children?: ReactNode;
  size?: "lg" | "md";
};

export function Hero({ eyebrow, title, subtitle, location, secondary, children, size = "md" }: Props) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-fiber text-white">
      <div className="bg-fiber-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <FiberLines className="-z-10" animated />
      <div className={`mx-auto max-w-7xl px-6 ${size === "lg" ? "py-28 md:py-40" : "py-20 md:py-28"}`}>
        <div className="max-w-3xl">
          {eyebrow && <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/90">{eyebrow}</p>}
          <h1 className={`font-bold tracking-tight text-balance ${size === "lg" ? "text-4xl md:text-6xl" : "text-4xl md:text-5xl"}`}>
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/95 md:text-xl">{subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <TrackedLink href="/contact" location={location} label="Get a Quote" className={btn.onDark}>
              Get a Quote
            </TrackedLink>
            {secondary ? (
              <TrackedLink href={secondary.href} location={location} label={secondary.label} className={btn.onDarkGhost}>
                {secondary.label}
              </TrackedLink>
            ) : (
              <TrackedLink href="/contact?intent=sales" location={location} label="Talk to Sales" className={btn.onDarkGhost}>
                Talk to Sales
              </TrackedLink>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
