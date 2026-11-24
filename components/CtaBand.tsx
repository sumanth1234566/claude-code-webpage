import { FiberLines } from "./FiberLines";
import { TrackedLink } from "./TrackedLink";
import { btn } from "./buttons";

export function CtaBand({
  location,
  title = "Ready to talk about your connectivity?",
  body = "Tell us about your locations and services. Our team will prepare a quote for your business.",
}: {
  location: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-fiber text-white">
      <div className="bg-fiber-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <FiberLines className="-z-10 opacity-70" />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-white/95">{body}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <TrackedLink href="/contact" location={`${location}:cta-band`} label="Get a Quote" className={btn.onDark}>
            Get a Quote
          </TrackedLink>
          <TrackedLink href="/contact?intent=sales" location={`${location}:cta-band`} label="Talk to Sales" className={btn.onDarkGhost}>
            Talk to Sales
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
