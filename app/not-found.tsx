import Link from "next/link";
import { FiberLines } from "@/components/FiberLines";
import { btn } from "@/components/buttons";

export default function NotFound() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-fiber text-white">
      <div className="bg-fiber-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <FiberLines className="-z-10" animated />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">We couldn&apos;t find that page</h1>
        <p className="mt-4 text-lg text-white/95">The page may have moved. These links will get you back on track.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className={btn.onDark}>Go to home</Link>
          <Link href="/contact" className={btn.onDarkGhost}>Get a Quote</Link>
        </div>
      </div>
    </section>
  );
}
